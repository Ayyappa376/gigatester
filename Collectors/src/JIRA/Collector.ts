import * as HttpRequest from '../utils/httpRequest';
import { appLogger/*, config, getTableNameForOrg*/ } from '../utils';
//import * as esDBFuncs from '../elasticsearch/esFuncs';
import { getLastState, setLastState } from '../elasticsearch';
import { Jconfig, IJIRAJobInfo } from './Jconfig';
import { ReqDatabaseDataItem } from '../models';

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
		appLogger.info('JIRA Collector', {input: input});
		getDataFromJIRA(input);
		callback(null, "JIRA Collector exiting");
	} catch(err) {
		appLogger.error(err);
		callback(new Error("JIRA Collector existed with error"), null);
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

async function getDataFromJIRA(jobDetails: IJIRAJobInfo) {
	//get last fetched time from sate
	const lastState = await getLastState({
		toolName: Jconfig.name,
		teamId: jobDetails.teamId,
		project: jobDetails.projectName,
		url: jobDetails.url
	});
	appLogger.info({lastState: lastState});
	const baseURL = `${jobDetails.url}/rest/api/3/search?jql=project%20%3D%20%27${jobDetails.projectName}%27`;
	const now: Date = new Date(Date.now());
	const toDateStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}%20${now.getHours()}:${now.getMinutes()}`;
	if(lastState) {
		//get all issues that werere updated after last accessed
		const from: Date = new Date(lastState.lastAccessed);
		const fromDateStr = `${from.getFullYear()}-${from.getMonth()}-${from.getDate()}%20${from.getHours()}:${from.getMinutes()}`;
//		const url = `${baseURL}%27%20AND%20updatedDate%3E%3D%27${fromDateStr}%27%20AND%20updatedDate%3C%3D%27${toDateStr}%27`;
		const url = `${baseURL}%27%20AND%20updated%3E%3D%27${fromDateStr}%27%20AND%20updated%3C%3D%27${toDateStr}%27`;
		getDataFromJIRAWithURL(jobDetails, url);
	} else {
		//get all issues in system
//		const url = `${baseURL}%20AND%20updatedDate%3C%3D%27${toDateStr}%27`;
		const url = `${baseURL}%20AND%20updated%3C%3D%27${toDateStr}%27`;
		getDataFromJIRAWithURL(jobDetails, url);
	}
	
	//store last fetched time in state
	setLastState({
		toolName: Jconfig.name, 
		teamId: jobDetails.teamId,
		project: jobDetails.projectName,
		url: jobDetails.url,
		lastAccessed: now.getTime()
	});
}

async function getDataFromJIRAWithURL(jobDetails: IJIRAJobInfo, url: string) {
	const auth = `${jobDetails.email}:${jobDetails.appToken}`;

	//TODO: data will be paged, so send request till there is no more data	
	HttpRequest.httpRequest(getReqMethod, url, null, auth)
	.then((res: any) => {
		if(res.statusCode < 200 || res.statusCode >= 300) {
			appLogger.error('Error: Error receiving data' + res.statusCode);
			throw new Error('Error receiving data');
		} else {
			try {
				const data = JSON.parse(res.body);
				data.issues.forEach((issue: any) => {
					storeInDB(jobDetails, issue);
				});
			} catch (error) {
				appLogger.error({JIRAGetDataParseError: error});
				throw error;
			}
		}
	})
	.catch((err) => {
		appLogger.error({JIRAGetError: err});
		throw err;
	})
}

function storeInDB(jobDetails: IJIRAJobInfo, issueData: any) {
/*	const filter = {
		term: {
			teamId: jobDetails.teamId,
			projectName: jobDetails.projectName,
			itemId: issueData.id
		}
	};
*/	
	const item: ReqDatabaseDataItem = {
		teamId: jobDetails.teamId,
		projectName: jobDetails.projectName,
		itemId: issueData.id,
		itemPriority: issueData.fields.priority.name,
		itemType: issueData.fields.issuetype.name,
		status: issueData.fields.status.name,
		createdOn: issueData.fields.created.getTime(),
		url: issueData.self
	};
	
	if(issueData.fields.status.name === jobDetails.startState) {
		item.startedOn = issueData.fields.updated.getTime();
	}

	if(issueData.fields.status.name === jobDetails.closeState) {
		item.closedOn = issueData.fields.updated.getTime();
		if(! item.startedOn) {
			item.startedOn = issueData.fields.updated.getTime();
		}
	}
	appLogger.info("Storing item :", item);
//	esDBFuncs.update(getTableNameForOrg(config.reqIndex), filter, item);
}
