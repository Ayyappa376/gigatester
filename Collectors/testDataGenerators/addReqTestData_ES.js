/* **** THIS CODE IS FOR ADDING TEMPORARY TEST DATA FOR METRICS DASHBOARD TESTING **** */

const { Client } = require('@elastic/elasticsearch');
const {config} = require('./config');

const esClient = new Client({ node: config.elasticSearchURL });

async function addtestData(){
	//create mapping to ensure data consistency
	await createIndexMappings();
/*
	// **** Data for dev environment ****
	//generateDataFor(team, proj, dateStartStr, dateEndStr, typeList, numPriorities, maxItems)
	await generateDataFor("abc", "Products", "December 1, 2020", "February 28, 2021", ['Features', 'Bugs'], 3, 5);
	await generateDataFor("Alpha", "Cloud Services", "October 1, 2020", "November 30, 2020", ['Features', 'Bugs', 'Tasks'], 3, 5);
	await generateDataFor("Team-1", "Automations", "April 7, 2020", "November 20, 2020", ['Requirement', 'Issues'], 3, 5);
	await generateDataFor("Team-2", "DevOps Services", "June 1, 2020", "August 25, 2020", ['Features', 'Bugs'], 4, 5);
	generateDataFor("test team", "DevOpsMetricsBuild", "October 1, 2020", "October 10, 2020", ['Requirement', 'Issues'], 3, 5);
	generateDataFor("Gteam", "DoItRightBuild", "October 1, 2020", "October 10, 2020", ['Story', 'Bugs', 'Tasks'], 3, 5);
*/
	// **** Data for beta environment ****
	//generateDataFor(team, proj, dateStartStr, dateEndStr, maxBuildsPerDay)
	await generateDataFor("Truminds", "Development", "November 10, 2020", "February 28, 2021", ['Story', 'Bugs', 'Tasks'], 3, 5);
	await generateDataFor("Testing", "Testing", "August 1, 2020", "December 26, 2020", ['Features', 'Bugs'], 4, 5);

	//We need to force an index refresh at this point, otherwise we will not get any result in the consequent search
	await esClient.indices.refresh({ index: `${config.env}_${config.buildIndex}`});
}

async function generateDataFor(team, proj, dateStartStr, dateEndStr, typeList, numPriorities, maxItems) {
	startDate = new Date(dateStartStr);
	endDate = new Date(dateEndStr);
	startItemNum = 1;
	for(var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
		numItemOnDay = Math.floor(Math.random() * maxItems) + 1;
		await generateData(team, proj, date, numItemOnDay, startItemNum, typeList, numPriorities);
		startItemNum += numItemOnDay;
	}
}

async function generateData(team, proj, date, itemCount, startItemNum, typeList, numPriorities) {
	var gap = Math.floor(16 * 3600000 / itemCount);
	var baseHour = 7 * 3600000;
	for(var i = 0; i < itemCount; i++) {
		var createDate = new Date(date.getTime() + baseHour + (gap * i));
		var priority = Math.floor(Math.random() * numPriorities) + 1;
		var type = typeList[Math.floor(Math.random() * typeList.length)];
		var toss = Math.random();
		if(toss < 0.334) {
			await putData(team, proj, startItemNum + i, priority, type, createDate, null, null);
		} else if(toss < 0.667) {
			var startDate = new Date(createDate.getTime() + Math.floor(Math.random() * 4*24*3600000));
			await putData(team, proj, startItemNum + i, priority, type, createDate, startDate, null);
		} else {
			var startDate = new Date(createDate.getTime() + Math.floor(Math.random() * 4*24*3600000));
			var closeDate = new Date(startDate.getTime() + Math.floor(Math.random() * 4*24*3600000));
			await putData(team, proj, startItemNum + i, priority, type, createDate, startDate, closeDate);
		}
	}
}

async function putData(team, proj, itemId, priority, type, createDate, startDate, closeDate) {
	await esClient.index({
		index: `${config.env}_${config.reqIndex}`,
		body: {
		    teamId: team, //string [keyword]
		    projectName: proj, //string [keyword]
		    itemId: itemId.toString(), //string [keyword]
		    itemPriority: priority.toString(), //string [keyword]
		    itemType: type, //string [keyword]
		    status: closeDate ? 'Done' : (startDate ? 'In Progress' : 'To Do'), //string (To Do/In Progress/Done) [keyword]
		    closedOn: closeDate ? Math.floor(closeDate.getTime() / 1000) : null, //date(converted to seconds from epoch) [date, format: epoch_second]
		    createdOn: Math.floor(createDate.getTime() / 1000), //date(converted to seconds from epoch) [date, format: epoch_second]
		    startedOn: startDate ? Math.floor(startDate.getTime() / 1000) : null, //date(converted to seconds from epoch) [date, format: epoch_second]
		    url: `https://jira.atlassian.com/${proj}/${itemId}`, //[text]
//                cycleTime: //timestampClosedOn - timestampStartedOn
//                leadTime: timestampClosedOn - timestampCreatedOn
		}
	});
}

async function createIndexMappings() {
	await esClient.indices.create({
		index: `${config.env}_${config.reqIndex}`,
		body: {
			mappings: {
				properties: {
					teamId: { type: 'keyword' },
					projectName: { type: 'keyword' },
					itemId: { type: 'keyword' },
					itemPriority: { type: 'keyword' },
					itemType: { type: 'keyword' },
					status: { type: 'keyword' },
					closedOn: { type: 'date', format: 'epoch_second' },
					createdOn: { type: 'date', format: 'epoch_second' },
					startedOn: { type: 'date', format: 'epoch_second' },
					url: { type: 'text' }
				}
			}
		}
	})
}

addtestData().catch(console.error);

