/* **** THIS CODE IS FOR ADDING TEMPORARY TEST DATA FOR METRICS DASHBOARD TESTING **** */

const { Client } = require('@elastic/elasticsearch');
const {config} = require('./config');

const esClient = new Client({ node: config.elasticSearchURL });

async function addtestData(){
	//create mapping to ensure data consistency
	await createIndexMappings();
/*
	// **** Data for dev environment ****
	//generateDataFor(team, proj, memberArray, dateStartStr, dateEndStr, maxReqLifeInHrs)
	await generateDataFor("abc", "prods", ["abc@company.com", "xyz@company.com", "def@company.com"], "December 1, 2020", "February 28, 2021", 24);
	await generateDataFor("Alpha", "CloudServices", ["abc@company.com", "xyz@company.com"], "October 1, 2020", "November 30, 2020", 48);
	await generateDataFor("Team-1", "automate", ["def@company.com", "ijklm@company.com", "abcde@company.com"], "April 7, 2020", "November 21, 2020", 72);
	await generateDataFor("Team-2", "DevOps", ["ram@tech.com", "dan@tech.com"], "June 1, 2020", "August 30, 2020", 24);
	await generateDataFor("test team", "opmetrics", ["ram@tech.com", "dan@tech.com", "sam@tech.com", "tom@tech.com"], "October 1, 2020", "December 8, 2020", 24);
	await generateDataFor("Gteam", "opsai", ["Pankaj Gamnani", "Abhishek Marathe", "Mihika"], "October 1, 2020", "October 12, 2020", 48);
*/
	// **** Data for beta environment ****
	//generateDataFor(team, proj, memberArray, dateStartStr, dateEndStr, maxReqLifeInHrs)
	await generateDataFor("Truminds", "Development", ["gargi", "hassan", "rachit"], "February 28, 2020", "January 6, 2021", 24);
	await generateDataFor("Testing", "Testing", ["vaida", "rachit", "arvenka"], "August 1, 2020", "December 30, 2020", 48);

	//We need to force an index refresh at this point, otherwise we will not get any result in the consequent search
	await esClient.indices.refresh({ index: `${config.env}_${config.repoIndex}`});
}

async function generateDataFor(team, proj, memberArray, dateStartStr, dateEndStr, maxReqLifeInHrs) {
	startDate = new Date(dateStartStr);
	endDate = new Date(dateEndStr);
	startPullNum = 1;
	for(var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
		for(var i = 0; i < memberArray.length; i++ ) {
			var reqCount = Math.floor(Math.random() * 6);
			await generateData(team, proj, memberArray[i], date, maxReqLifeInHrs, startPullNum, reqCount);
			startPullNum += reqCount;
		}
	}
}

async function generateData(team, proj, name, date, maxReqLifeInHrs, startPullNum, reqCount) {
	var rand = Math.floor(Math.random() * 8);
	var gap = Math.floor((10 - rand) * 3600000 / reqCount);
	var baseHour = (rand + 9) * 3600000;
	for(var i = 0; i < reqCount; i++) {
		var lifeInHrs = Math.floor(Math.random() * maxReqLifeInHrs) + 1;
		var createdOnDateTime = new Date(date.getTime() + baseHour + (gap * i));
		var reviewedOnDateTime = new Date(createdOnDateTime.getTime() + (lifeInHrs * 3600000));
		var toss = Math.random();
		if(toss < 0.2) {
			await putData(team, proj, name, startPullNum + i, 'CLOSED', 'REJECTED', createdOnDateTime, reviewedOnDateTime);
		} else if(toss > 0.2) {
			await putData(team, proj, name, startPullNum + i, 'CLOSED', 'ACCEPTED', createdOnDateTime, reviewedOnDateTime);
		} else {
			await putData(team, proj, name, startPullNum + i, 'OPEN', null, createdOnDateTime, null);
		}
	}
}

async function putData(team, proj, name, pullId, status, acceptState, createdOnDate, reviewedOnDate) {
	await esClient.index({
		index: `${config.env}_${config.repoIndex}`,
		body: {
		    teamId: team, //string [keyword]
		    projectName: proj, //string [keyword]
		    raisedBy: name, //string [keyword]
		    pullId: pullId, //number, [integer/keyword]
		    status: status, //string (OPEN/CLOSED) [keyword]
		    acceptState: (status === 'CLOSED') ? acceptState : null, //string (ACCEPTED/REJECTED) [keyword]
		    raisedOn: Math.floor(createdOnDate.getTime() / 1000), //date(converted to seconds from epoch) [date, format: epoch_second]
		    reviewedOn: (status === 'CLOSED') ? Math.floor(reviewedOnDate.getTime() / 1000) : null, //date(converted to seconds from epoch) [date, format: epoch_second]
		    url: "https://console.aws.amazon.com/codesuite/codecommit/repositories?region=us-east-1" //[text]
		}
	});
}

async function createIndexMappings() {
	await esClient.indices.create({
		index: `${config.env}_${config.repoIndex}`,
		body: {
			mappings: {
				properties: {
					teamId: { type: 'keyword' },
					projectName: { type: 'keyword' },
					raisedBy: { type: 'keyword' },
					pullId: { type: 'integer' }, //keyword
					status: { type: 'keyword' },
					acceptState: { type: 'keyword' },
					raisedOn: { type: 'date', format: 'epoch_second' },
					reviewedOn: { type: 'date', format: 'epoch_second' },
					url: { type: 'text' }
				}
			}
		}
	})
}

addtestData().catch(console.error);

