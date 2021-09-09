import * as HttpRequest from '../utils/httpRequest';
import { appLogger, config, getTableNameForOrg } from '../utils';
import * as esDBFuncs from '../elasticsearch/esFuncs';
import { getLastState, setLastState } from '../elasticsearch';
import { SQconfig, ISonarJobInfo } from './SQconfig';
import { QualityDatabaseDataItem } from '../models';

/*
interface ESReqDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: ReqDatabaseDataItem;
  _type: string;
}
*/

const getReqMethod = 'GET';
//const postReqMethod = 'POST';

//callback is a method which takes err and data as parameter
module.exports = (input: any, callback: (err: any, data: any) => void) => {
	try {
		appLogger.info('SonarQube Collector', {input: input});
		getDataFromSonar(input);
		callback(null, "SonarQube Collector exiting");
	} catch(err) {
		appLogger.error(err);
		callback(new Error("SonarQube Collector existed with error"), null);
	}
}

/*
function execute(jobs) {
	for (var i = 0; i < jobs.length; i++) {
//		appLogger.log("Job " + i);
//		appLogger.log(jobs[i]);
		getDataFromJenkins(jobs[i]);
	}
}
*/

async function getDataFromSonar(jobDetails: ISonarJobInfo) {
	//get last fetched time from sate
	const lastState = await getLastState({
		toolName: SQconfig.name,
		teamId: jobDetails.teamId,
		project: jobDetails.projectName,
		url: jobDetails.url
	});
	appLogger.info({lastState: lastState});
	const baseURL = `${jobDetails.url}/api/measures/search_history?component=${jobDetails.projectName}&metrics=${jobDetails.metrics.join(',')}`;
	const now: Date = new Date(Date.now());
	const toDateStr = now.toDateString();
	if(lastState) {
		//get all issues that werere updated after last accessed
		const from: Date = new Date(lastState.lastAccessed);
		const fromDateStr = from.toDateString();
		const url = `${baseURL}&from=${fromDateStr}&to=${toDateStr}`;
		getDataFromSonarWithURL(jobDetails, url);
	} else {
		//get all issues in system
		const url = `${baseURL}&to=${toDateStr}`;
		getDataFromSonarWithURL(jobDetails, url);
	}
	
	//store last fetched time in state
	setLastState({
		toolName: SQconfig.name, 
		teamId: jobDetails.teamId,
		project: jobDetails.projectName,
		url: jobDetails.url,
		lastAccessed: now.getTime()
	});
}

async function getDataFromSonarWithURL(jobDetails: ISonarJobInfo, url: string) {
//	const auth = `${jobDetails.username}:${jobDetails.appToken}`;
	const auth = jobDetails.appToken;

	//TODO: data will be paged, so send request till there is no more data	
	HttpRequest.httpRequest(getReqMethod, url, null, auth)
	.then((res: any) => {
		if(res.statusCode < 200 || res.statusCode >= 300) {
			appLogger.error('Error: Error receiving data' + res.statusCode);
			throw new Error('Error receiving data');
		} else {
			try {
				const data = JSON.parse(res.body);
				data.measures.forEach((measure: any) => {
					storeInDB(jobDetails, measure);
				});
			} catch (error) {
				appLogger.error({SonarQubeGetDataParseError: error});
				throw error;
			}
		}
	})
	.catch((err) => {
		appLogger.error({SonarQubeGetError: err});
		throw err;
	})
}

function storeInDB(jobDetails: ISonarJobInfo, data: any) {
	data.history.forEach((historyItem: any) => {
		const item: QualityDatabaseDataItem = {
			teamId: jobDetails.teamId,
			projectName: jobDetails.projectName,
			metrics: data.metric,
			timestamp: new Date(historyItem.date).getTime(),
			value: historyItem.value,
			url: `${jobDetails.url}/projects?search=${jobDetails.projectName}`
		};
		appLogger.info("Storing item :", item);
		esDBFuncs.insert(getTableNameForOrg(config.qualityIndex), item);
	})
}
