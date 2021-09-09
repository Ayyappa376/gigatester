export interface RepoPullReqsDataItem {
  commitsAccepted: number;
  //  commitsCreated: number;
  commitsPending: number;
  commitsRejected: number;
  //  committerName: string;
  //  projectName: string;
  //  teamId: string;
  //  timestampEnd: number;
  //    timestampStart: number;
  //  url: string;
}

export interface RepoPullRaiserDataItem {
  commitsAccepted: number;
  commitsCreated: number;
  //  commitsPending: number;
  commitsRejected: number;
  committerName: string;
  projectName: string;
  teamId: string;
  //  timestampEnd: number;
  //    timestampStart: number;
  url: string;
}

export interface RepoPullRaiserList {
  committerName: string;
}

export interface RepoPullReqLifeDataItem {
  closedPullReqCount: number;
  //  committerName: string;
  //  projectName: string;
  //  teamId: string;
  timestampEnd: number;
  //    timestampStart: number;
  totalClosureTime: number;
}

export interface RepoDatabaseDataItem {
  acceptState?: string;
  projectName: string;
  pullId: number;
  raisedBy: string;
  raisedOn: number;
  //    reviewedBy: string;
  reviewedOn?: number;
  status: string;
  teamId: string;
  url: string;
}

export const STATUS_CLOSED = 'CLOSED';
export const STATUS_OPEN = 'OPEN';
export const STATE_ACCEPTED = 'ACCEPTED';
export const STATE_REJECTED = 'REJECTED';

//export const STATUS_RAISED = 'Raised';
//export const STATUS_ACCEPTED = 'Accepted';
//export const STATUS_REJECTED = 'Rejected';
