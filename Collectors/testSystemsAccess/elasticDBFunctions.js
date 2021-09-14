/*
 **** THIS CODE IS FOR CREATING TABLES IN ELASTICSEARCH ****
 */
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
	auth: {
		password: 'pinimbus',
		username: 'doitright-user',
	  },
	  node: 'http://10.155.223.144:9200', //dish internal env
//	node: 'http://34.234.42.134:9200', //pinimbus env
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
/*
  //insert some data
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
*/
/*
	//update operation
	await esClient.update({
		index: 'dish_state-data',
		id: 'sELTDnoB06xhIW0X0YYH',
		refresh: true,
		body: { // can use both script and doc here
			doc: {
				lastAccessed: 1622485800000
			}
		}
	});
*/
/*
	//update by query - not working
	await esClient.updateByQuery({
		index: 'dish_state-data',
		refresh: true,
		body: { // can use only script here
			script: {
				source: 'ctx._source.lastAccessed = 1622485800000'
			},
			query: {
				match: { toolName: 'JIRA' }
			}
		}
	});
*/
/*
	//delete index
	await esClient.indices.delete({
		index: 'dish_build-data'
	});
*/
/*
  //reindex documents
  await esClient.reindex({
	body: {
		source: { index: 'dish_build-data' },
		  dest: { index: 'dish_build-data_old' }
	}
  })
*/
/*
  //delete document from index
  await esClient.delete({
	index: 'dish_req-data',
	refresh: true,
	id: 'Mc4wXHYBYcqFrlQ4QMIF'
  });
*/

  //delete document from index by query
  await esClient.deleteByQuery({
	index: 'dish_build-data',
	refresh: true,
	body: {
		query: {
//			match_all: {}
			match: { teamId: 'bigdata services' }
		}
	}
  });
/*
  await esClient.deleteByQuery({
	index: 'dev_repo-data',
	refresh: true,
	body: {
		query: {
			match_all: {}
//			match: { toolName: 'JIRA' }
		}
	}
  });
  await esClient.deleteByQuery({
	index: 'dev_req-data',
	refresh: true,
	body: {
		query: {
			match_all: {}
//			match: { toolName: 'JIRA' }
		}
	}
  });
  await esClient.deleteByQuery({
	index: 'dev_quality-data',
	refresh: true,
	body: {
		query: {
			match_all: {}
//			match: { toolName: 'GitLabCICD' }
		}
	}
  });
  await esClient.deleteByQuery({
	index: 'dev_state-data',
	refresh: true,
	body: {
		query: {
			match_all: {}
//			match: { toolName: 'GitLabCICD' }
		}
	}
  });
*/
/*
  //search
  var teamNames = ['Alpha', 'abc'];
  var services = ["prod1/mserv11", "prod2"];
  var serviceRegexp = services.map((service) => '.*' + service + '.*').join('|');
  var fromDate = Math.floor(new Date('March 5, 2021').getTime() / 1000);
  var toDate = Math.floor(new Date('March 12, 2021').getTime() / 1000);
  //	console.log({fromDate: fromDate, toDate: toDate});
  var filters = [
    		{ terms: { teamId: teamNames} },
    		{ regexp: { servicePath: serviceRegexp } },
    //		{ bool: { should: [
    //				{ range: { closedOn: { gt: fromDate, lte: toDate } } },
    //				{ range: { startedOn: { gt: fromDate, lte: toDate } } },
    //				{ range: { createdOn: { gt: fromDate, lte: toDate } } },
    //		] } },
    { range: { endTimestamp: { gt: fromDate, lte: toDate } } },
    //		{ range: { raisedOn: { lte: toDate } } },
    //{ term: { status: 'Done' } },
    //{ term: { itemType: 'Bugs' } },
  ];
  var notFilters = [{ exists: { field: 'acceptState' } }];
  var indexName = 'dev_build-data';
	const { body } = await esClient.search({
		index: indexName,
		body: {
			size: 100,
			from: 0,
			query: {
				bool: {
					filter: filters
				}
//				match: { projectName: 'DYNO' }
//				match_all: {}
			}
		}
	});

	console.log(body);
	console.log(body.hits.hits);

  //	var results = await searchAll(indexName, filters, notFilters);
//  var results = await searchAll(indexName, filters, []);
*/
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
