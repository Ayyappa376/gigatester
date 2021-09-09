export interface IDeploymentDataItem {
  countSuccessBuilds: number;
  timestamp: number;
}

export interface ILeadTimeDataItem {
  issueCount: number;
  timestamp: number;
  totalLeadTime: number;
}

export interface IMeanTimeToRestoreDataItem {
  issueCount: number;
  timestamp: number;
  totalRestoreTime: number;
}

export interface IChangeFailureRateDataItem {
  countFailBuilds: number;
  timestamp: number;
  totalBuilds: number;
}

export const LEAD_TIME_STATUS_CLOSED = 'Closed';
