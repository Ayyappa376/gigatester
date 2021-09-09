/* **** THIS CODE IS FOR ADDING TEMPORARY TEST DATA FOR METRICS DASHBOARD TESTING **** */

const { Client } = require('@elastic/elasticsearch');
const {config} = require('./config');

const esClient = new Client({ node: config.elasticSearchURL });

async function addtestData(){
	//create mapping to ensure data consistency
	await createIndexMappings();
/*
	// **** Data for dev environment ****
	//generateDataFor(team, proj, dateStartStr, dateEndStr, minValue, maxValue)
	await generateDataFor("abc", "Products", "December 1, 2020", "February 28, 2021", 30, 80);
	await generateDataFor("Alpha", "Cloud Services", "October 1, 2020", "November 30, 2020", 80, 99);
	await generateDataFor("Team-1", "Automations", "April 7, 2020", "November 24, 2020", 40, 75);
	await generateDataFor("Team-2", "DevOps Services", "June 1, 2020", "August 31, 2020", 50, 99);
	generateDataFor("test team", "DevOpsMetricsBuild", "October 1, 2020", "October 14, 2020", 70,90);
	generateDataFor("Gteam", "DoItRightBuild", "October 1, 2020", "October 14, 2020", 70, 95);
*/
	// **** Data for beta environment ****
	//generateDataFor(team, proj, dateStartStr, dateEndStr, , minValue, maxValue)
	await generateDataFor("Truminds", "Development", "November 10, 2020", "February 28, 2021", 30, 80);
	await generateDataFor("Testing", "Testing", "August 1, 2020", "December 30, 2020", 40, 95);

	//We need to force an index refresh at this point, otherwise we will not get any result in the consequent search
	await esClient.indices.refresh({ index: `${config.env}_${config.buildIndex}`});
}

async function generateDataFor(team, proj, dateStartStr, dateEndStr, minValue, maxValue) {
	startDate = new Date(dateStartStr);
	endDate = new Date(dateEndStr);
//	startBuildNum = 1;
	for(var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
//		numBuildOnDay = Math.floor(Math.random() * maxBuildsPerDay) + 1;
		await generateData(team, proj, date, minValue, maxValue);
//		startBuildNum += numBuildOnDay;
	}
}

async function generateData(team, proj, date, minValue, maxValue) {
	var coverage = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	var duplications = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	var maintainability = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	var reliability = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	var security = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	await putData(team, proj, date, coverage, duplications, maintainability, reliability, security);

/*	var gap = Math.floor(16 * 3600000 / buildsCount);
	var baseHour = 7 * 3600000;
	for(var i = 0; i < buildsCount; i++) {
		var dateTime = new Date(date.getTime() + baseHour + (gap * i));
		var toss = Math.random();
		if(toss < 0.2) {
			var duration = Math.floor(Math.random() * 5) + 1;
			await putData(team, proj, startBuildNum + i, dateTime, duration, 'FAILURE');
		} else if(toss > 0.2) {
			var duration = Math.floor(Math.random() * 10) + 1;
			await putData(team, proj, startBuildNum + i, dateTime, duration, 'SUCCESS');
		} else {
			var duration = Math.floor(Math.random() * 8) + 1;
			await putData(team, proj, startBuildNum + i, dateTime, duration, 'ABORTED');
		}
	}
*/
}

async function putData(team, proj, date, coverage, duplications, maintainability, reliability, security) {
	await esClient.index({
		index: `${config.env}_${config.qualityIndex}`,
		body: {
			teamId: team, //string [keyword]
			projectName: proj, //string [keyword]
			timestamp: Math.floor(date.getTime() / 1000), //date(converted to seconds from epoch) [date, format: epoch_second]
			coverage: coverage, //number [short]
			duplications: duplications, //number [short]
			maintainability: maintainability, //number [short]
			reliability: reliability, //number [short]
			security: security, //number [short]
			url: `http://ec2-54-146-210-161.compute-1.amazonaws.com/sonarQube/${proj}`, //string [text]
		}
	});
}

async function createIndexMappings() {
	await esClient.indices.create({
		index: `${config.env}_${config.qualityIndex}`,
		body: {
			mappings: {
				properties: {
					teamId: { type: 'keyword' },
					projectName: { type: 'keyword' },
//					buildNum: { type: 'integer' },
					timestamp: { type: 'date', format: 'epoch_second' },
					coverage: { type: 'short' },
					duplications: { type: 'short' },
					maintainability: { type: 'short' },
					reliability: { type: 'short' },
					security: { type: 'short' },
					url: { type: 'text' }
				}
			}
		}
	})
}

addtestData().catch(console.error);

