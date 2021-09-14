export interface RepoPullReqsDataItem {
  commitsAccepted: number;
  commitsPending: number;
  commitsRejected: number;
}

export interface RepoPullRaiserDataItem {
  commitsAccepted: number;
  commitsCreated: number;
  commitsRejected: number;
  committerName: string;
  projectName: string;
  service: string;
  teamId: string;
  url: string;
}

export interface RepoDataItemLists {
  committerName: string[];
}

export interface RepoPullReqLifeDataItem {
  closedPullReqCount: number;
  timestampEnd: number;
  totalClosureTime: number;
}

export interface RepoDatabaseDataItem {
  acceptState?: string;
  projectName: string;
  pullId: number;
  raisedBy: string;
  raisedOn: number;
  repoName: string;
  reviewedOn?: number;
  servicePath: string;
  status: string;
  teamId: string;
  url: string;
}

export const STATUS_CLOSED = 'CLOSED';
export const STATUS_OPEN = 'OPEN';
export const STATE_ACCEPTED = 'ACCEPTED';
export const STATE_REJECTED = 'REJECTED';
