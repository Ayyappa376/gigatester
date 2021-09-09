export interface BuildGraphDataItem {
  countFailBuilds: number;
  countOtherBuilds: number;
  countSuccessBuilds: number;
  //    projectName: string;
  //    teamId: string;
  timestampEnd: number;
  //    timestampStart: number;
}

export interface BuildListDataItem {
  buildNum: number;
  duration: number;
  projectName: string;
  status: string;
  teamId: string;
  timestamp: number;
  url: string;
}

export interface BuildDatabaseDataItem {
  buildNum: number;
  duration: number;
  projectName: string;
  repoBranch: string;
  repoURL: string;
  result: string;
  status: boolean;
  teamId: string;
  timestamp: number;
  url: string;
}

export const RESULT_PASS = 'SUCCESS';
export const RESULT_FAIL = 'FAILURE';
export const RESULT_INPROGRESS = 'IN PROGRESS';
export const RESULT_OTHER = 'OTHER'; //Like Aborted, In Progress or Error etc.
export const STATUS_BUILDING = true;
export const STATUS_BUILT = false;
