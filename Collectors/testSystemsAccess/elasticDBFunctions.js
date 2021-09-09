/*
 **** THIS CODE IS FOR CREATING TABLES IN ELASTICSEARCH ****
 */
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'http://ec2-34-234-42-134.compute-1.amazonaws.com:9200',
});
//const esClient = new Client({ node: 'http://localhost:9200' });

async function run() {
  //create index
  /*
	await esClient.indices.create({
		index: 'first-index',
		body: {
			mappings: {
				properties: {
					team: { type: 'text' },
					project: { type: 'text' },
					buildId: { type: 'integer' },
					timestamp: { type: 'date' },
					url: { type: 'text' }
				}
			}
		}
	})
*/
  //insert some data
  /*
	await esClient.index({
		index: 'first-index',
		body: {
			team: 'team1',
			project: 'proj1',
			buildId: 1,
			timestamp: new Date("December 10 2020").getTime(),
			url: 'https://www.google.com?s=123'
		}
	});

	await esClient.index({
		index: 'first-index',
		body: {
			team: 'team1',
			project: 'proj2',
			buildId: 2,
			timestamp: new Date("December 11 2020").getTime(),
			url: 'https://www.google.com?s=123'
		}
	});

	await esClient.index({
		index: 'first-index',
		body: {
			team: 'team2',
			project: 'proj1',
			refresh: true,
			buildId: 3,
			timestamp: new Date("December 12 2020").getTime(),
			url: 'https://www.google.com?s=123'
		}
	});
	
	//We need to force an index refresh at this point, otherwise we will not get any result in the consequent search
	await esClient.indices.refresh({ index: 'first-index'});

	//update operation
	await esClient.update({
		index: 'first-index',
		id: 'Mc4wXHYBYcqFrlQ4QMIF',
		refresh: true,
		body: { // can use both script and doc here
			doc: {
				project: 'proj2' //just changing or adding a field requires to be inside doc
			}
		}
	});
*/
  /*
	//update by query
	await esClient.updateByQuery({
		index: 'first-index',
		refresh: true,
		body: { // can use only script here
			script: {
				source: 'ctx._source["project"] = "proj1"'
			},
			query: {
				match: {
					team: 'team1'
				}
			}
		}
	});
*/
  /*
	//delete index
	await esClient.indices.delete({index: 'dev_repo-data'});
*/
  //search
  var teamNames = ['Alpha', 'abc'];
  var fromDate = Math.floor(new Date('January 5, 2021').getTime() / 1000);
  var toDate = Math.floor(new Date('January 12, 2021').getTime() / 1000);
  //	console.log({fromDate: fromDate, toDate: toDate});
  var filters = [
    //		{ terms: { teamId: teamNames} },
    //		{ bool: { should: [
    //				{ range: { closedOn: { gt: fromDate, lte: toDate } } },
    //				{ range: { startedOn: { gt: fromDate, lte: toDate } } },
    //				{ range: { createdOn: { gt: fromDate, lte: toDate } } },
    //		] } },
    { range: { closedOn: { gt: fromDate, lte: toDate } } },
    //		{ range: { raisedOn: { lte: toDate } } },
    { term: { status: 'Done' } },
    { term: { itemType: 'Bugs' } },
  ];
  var notFilters = [{ exists: { field: 'acceptState' } }];
  var indexName = 'dev_req-data';
  /*	const { body } = await esClient.search({
		index: indexName,
		body: {
			size: 100,
			from: 0,
			query: {
				bool: {
					filter: filters
				}
//				match: { teamId: 'Alpha' }
//				match_all: {}
			}
		}
	});

	console.log(body);
	console.log(body.hits.hits);
*/
  //	var results = await searchAll(indexName, filters, notFilters);
  var results = await searchAll(indexName, filters, []);
}

async function searchAll(indexName, filters, notFilters) {
  return new Promise((resolve, reject) => {
    const query =
      !notFilters || notFilters === []
        ? { bool: { filter: filters } }
        : { bool: { filter: filters, must_not: notFilters } };

    // first we do a search, and specify a scroll timeout
    esClient.search(
      {
        index: indexName,
        body: {
          size: 1,
          from: 0,
          query: query,
        },
      },
      function (err, resp) {
        if (err) {
          appLogger.error(err);
          return reject(err);
        } else {
          // collect all the records
          const total = resp.body.hits.total.value;
          if (total === 0) {
            return resolve([]);
          } else {
            esClient.search(
              {
                index: indexName,
                body: {
                  size: 100,
                  from: 0,
                  query: query,
                },
              },
              function (err1, resp1) {
                if (err1) {
                  appLogger.error(err1);
                  return reject(err1);
                } else {
                  return resolve(resp1.body.hits.hits);
                }
              }
            );
          }
        }
      }
    );
  });
}

run().catch((err) => console.log(err));
//run().catch(console.log);
