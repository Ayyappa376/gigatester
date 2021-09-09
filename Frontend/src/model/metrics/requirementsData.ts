export interface IReqStatusDataItem {
  countInProgress: number;
  countNew: number;
  countResolved: number;
  timestamp: number;
}

export interface IReqLTCTDataItem {
  issueCount: number;
  timestamp: number;
  totalCycleTime: number;
  totalLeadTime: number;
  //    leadTimeBenchmark: number;
  //    cycleTimeBenchmark: number;
}

export interface IReqListDataItem {
  closedOn: number;
  createdOn: number;
  itemId: string;
  itemPriority: string;
  itemType: string;
  projectName: string;
  startedOn: number;
  status: string;
  teamId: string;
  url: string;
}

export interface IReqDataItem {
  itemPriority: string[];
  itemType: string[];
}

export const REQ_STATUS_NEW = 'New';
export const REQ_STATUS_ASSIGNED = 'Assigned';
export const REQ_STATUS_INPROGRESS = 'In Progress';
export const REQ_STATUS_TESTING = 'Testing';
export const REQ_STATUS_CLOSED = 'Closed';
