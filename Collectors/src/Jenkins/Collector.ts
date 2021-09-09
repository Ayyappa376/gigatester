import * as HttpRequest from '../utils/httpRequest';
import { appLogger, config, getTableNameForOrg } from '../utils';
import * as esDBFuncs from '../elasticsearch/esFuncs';
import { getLastState, setLastState } from '../elasticsearch';
import { Jconfig, IJenkinsJobInfo } from './Jconfig';
import { BuildDatabaseDataItem, /*RESULT_PASS, RESULT_FAIL, RESULT_INPROGRESS, RESULT_OTHER,*/ STATUS_BUILDING/*, STATUS_BUILT*/ } from '../models';

interface ESBuildDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: BuildDatabaseDataItem;
  _type: string;
}

const jenkinsReqMethod = 'GET';

//callback is a method which takes err and data as parameter
module.exports = (input: any, callback: (err: any, data: any) => void) => {
	try {
		appLogger.info('Jenkins Collector', {input: input});
		getDataFromJenkins(input);
		callback(null, "Jenkins Collector exiting");
	} catch(err) {
		appLogger.error(err);
		callback(new Error("Jenkins Collector existed with error"), null);
	}
}

/*
function execute(jobs) {
	for (var i = 0; i < jobs.length; i++) {
//		appLogger.info("Job " + i);
//		appLogger.info(jobs[i]);
		getDataFromJenkins(jobs[i]);
	}
}
*/

async function getDataFromJenkins(jobDetails: IJenkinsJobInfo) {
	//get builds that were in progress
	var filter = {
		term: {
			teamId: jobDetails.teamId,
			projectName: jobDetails.job,
			status: STATUS_BUILDING
		}
	};
	const result: ESBuildDatabaseDataItem[] = await esDBFuncs.searchAll(getTableNameForOrg(config.buildIndex), filter, []);
	appLogger.info({getDataFromJenkins: result});
	if(result) {
		for(var i = 0; i < result.length; i++) {
			getBuildDataFromJenkinsForBuild(jobDetails, result[i]._source.buildNum);
		}
	}
	
	//get new build details
	const lastState = await getLastState({
		toolName: Jconfig.name,
		teamId: jobDetails.teamId,
		project: jobDetails.job,
		url: jobDetails.url
	});
	const startNum = (lastState) ? (1 + lastState.details.buildNum) : 1;
	appLogger.info({startNum:startNum});
	const getLastBuildNumURL = `${jobDetails.url}/job/${jobDetails.job}/lastBuild/api/json?tree=number`;
	const auth = `${jobDetails.userName}:${jobDetails.password}`;
	HttpRequest.httpRequest(jenkinsReqMethod, getLastBuildNumURL, null, auth)
	.then((res: any) => {
		if(res.statusCode < 200 || res.statusCode >= 300) {
			appLogger.error('Error: Error receiving data' + res.statusCode);
			throw new Error('Error receiving data');
		} else {
			try {
				const data = JSON.parse(res.body);
				const endNumber = data.number;
				for(var i = startNum; i <= endNumber; i++) {
					getBuildDataFromJenkinsForBuild(jobDetails, i);
				}
				setLastState({
					toolName: Jconfig.name, 
					teamId: jobDetails.teamId,
					project: jobDetails.job,
					url: jobDetails.url,
					lastAccessed: Date.now(),
					details: {buildNum: endNumber}
				});
			} catch (error) {
				appLogger.error({JenkinsGetDataParseError: error});
				throw error;
			}
		}
	})
	.catch((err) => {
		appLogger.error({JenkinsGetError: err});
		throw err;
	})
}

function getBuildDataFromJenkinsForBuild(jobDetails: any, buildNum: number) {
	const getBuildNumberInfoURL = `${jobDetails.url}/job/${jobDetails.job}/${buildNum}/api/json?tree=number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]`;
	const auth = `${jobDetails.userName}:${jobDetails.password}`;
	HttpRequest.httpRequest(jenkinsReqMethod, getBuildNumberInfoURL, null, auth)
	.then((res: any) => {
		if(res.statusCode < 200 || res.statusCode >= 300) {
			appLogger.error('Error: Error receiving data: ' + res.statusCode);
			throw new Error('Error receiving data');
		} else {
			try {
				const data: any = JSON.parse(res.body);
				storeInDB(jobDetails.teamId, jobDetails.job, data, `${jobDetails.url}/job/${jobDetails.job}/${buildNum}`);
			} catch (error) {
				appLogger.error({Error: error});
				throw error;
			}
		}
	})
	.catch((err) => {
		appLogger.error({Error: err});
		throw err;
	})
}

function storeInDB(teamId: string, jobName: string, buildInfo: any, url: string) {
	const filter = {
		term: {
			teamId: teamId,
			projectName: jobName,
			buildNum: buildInfo.number
		}
	};
	const item: BuildDatabaseDataItem = {
		teamId,
		projectName: jobName,
		buildNum: buildInfo.number,
		status: buildInfo.building, //STATUS_BUILDING or STATUS_BUILT
		result: buildInfo.result,
		timestamp: Math.floor(buildInfo.timestamp / 1000),
		duration: buildInfo.duration,
		url
	};
	for (var i = 0; i < buildInfo.actions.length; i++ ) {
		if(buildInfo.actions[i]['_class'] == 'hudson.plugins.git.util.BuildData') {
			item.repoURL = buildInfo.actions[i].remoteUrls[0];
			item.repoBranch = buildInfo.actions[i].lastBuiltRevision.branch[0].name;
		}
	}
	appLogger.info("Storing item :", item);
	esDBFuncs.update(getTableNameForOrg(config.buildIndex), filter, item);
}
