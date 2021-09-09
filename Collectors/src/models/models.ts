//CollectorConfig structure from Config table in dynamoDB
export interface ConfigItem {
    config: CollectorConfigDetails;
//    name: string;
    orgId: string;
    type: string;
}

export interface CollectorConfigDetails {
    [key: string]: CollectorConfig[];
}

export interface CollectorConfig {
    attributes: any;
    collectorSchedule: number;
    name: string;
    nextCollectorRunTimestamp: number;
    nextProcessorRunTimestamp: number;
    processorSchedule: number;
    type: string;
}

//all build data
export interface BuildDatabaseDataItem {
    buildNum: number;
    duration: number;
    projectName: string;
    repoBranch?: string;
    repoURL?: string;
    result: string;
    status: boolean;
    teamId: string;
    timestamp: number; // or date
    url: string;
}

export const RESULT_PASS = 'SUCCESS';
export const RESULT_FAIL = 'FAILURE';
export const RESULT_INPROGRESS = 'IN PROGRESS';
export const RESULT_OTHER = 'OTHER'; //Like Aborted, In Progress or Error etc.
export const STATUS_BUILDING = true;
export const STATUS_BUILT = false;

//all repository data
export interface RepoDatabaseDataItem {
    acceptState?: string;
    projectName: string;
    pullId: number; //or string
    raisedBy: string;
    raisedOn: number; //or date
//    reviewedBy: string;
    reviewedOn?: number; //or date
    status: string;
    teamId: string;
    url: string;
}

export const STATUS_CLOSED = 'CLOSED';
export const STATUS_OPEN = 'OPEN';
export const STATE_ACCEPTED = 'ACCEPTED';
export const STATE_REJECTED = 'REJECTED';

export const STATUS_RAISED = 'Raised';
export const STATUS_ACCEPTED = 'Accepted';
export const STATUS_REJECTED = 'Rejected';

//all requirements data
export interface ReqDatabaseDataItem {
  closedOn?: number;
  createdOn: number;
  // cycleTime?: number; //cycle time = timestampClosedOn - timestampStartedOn
  itemId: string;
  itemPriority: string;
  itemType: string;
  // leadTime?: number; //lead time = timestampClosedOn - timestampCreatedOn
  projectName: string;
  startedOn?: number;
  status: string;
  teamId: string;
  url: string;
}

export const REQ_STATUS_NEW = 'To Do'; //should be 'To Do'
//export const REQ_STATUS_ASSIGNED = 'Assigned';
export const REQ_STATUS_INPROGRESS = 'In Progress'; //should be 'In Progress'
//export const REQ_STATUS_TESTING = 'Testing';
export const REQ_STATUS_CLOSED = 'Done'; //should be 'Done'
export const REQ_TYPE_BUGS = 'Bugs';
export const REQ_TYPE_STORY = 'Story';

//all quality data
export interface QualityDatabaseDataItem {
  teamId: string,
  projectName: string,
  metrics: string;
  timestamp: number;
  value: number;
  url:string;
}

/*
exports.TeamsMetricsConfig = [
	{
		teamId: "Gteam",
		metrics: [
			{
				toolName: "Jenkins",
				url: "ec2-107-21-184-82.compute-1.amazonaws.com:8080",
				username: "JenkinsAdmin",
				password: "3.14Nimbus",
				job: "DoItRightBuild"
			},
			{
				toolName: "AWSCodeCommit",
				url: "https://codecommit.us-east-1.amazonaws.com",
				username: "AKIAQ2S4FEWF4257FMNV",
				password: "6DngNkAklr8MVc5n+7aKo2jrtBpzOSYOxe+Vh8AL",
				region: 'us-east-1',
				repoName: 'opsai'
			}
		]
	}
];
*/