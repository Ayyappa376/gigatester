export interface ReqStatusDataItem {
  countInProgress: number;
  countNew: number;
  countResolved: number;
  timestamp: number;
}

export interface ReqLTCTDataItem {
  issueCount: number;
  timestamp: number;
  totalCycleTime: number;
  totalLeadTime: number;
  //    leadTimeBenchmark: number;
  //    cycleTimeBenchmark: number;
}

export interface ReqListDataItem {
  closedOn?: number;
  createdOn: number;
  //    cycleTime: number; //cycle time = timestampClosedOn - timestampStartedOn
  itemId: string;
  itemPriority: string;
  itemType: string;
  //    leadTime: number; //lead time = timestampClosedOn - timestampCreatedOn
  projectName: string;
  startedOn?: number;
  status: string;
  teamId: string;
  url: string;
}

export interface ReqDataItem {
  itemPriority: string[];
  itemType: string[];
}

export interface ReqDatabaseDataItem {
  closedOn?: number;
  createdOn: number;
  //    cycleTime?: number; //cycle time = timestampClosedOn - timestampStartedOn
  itemId: string;
  itemPriority: string;
  itemType: string;
  //    leadTime?: number; //lead time = timestampClosedOn - timestampCreatedOn
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
