import  { ICollectorConfigDetails } from '..';

export interface ITeamMetricsDetails {
    config: ICollectorConfigDetails,
    orgId: string,
    metrics: IMetricsTool[];
    teamId: string;
    teamName: string;
}

export interface IMetricsTool {
    toolName: string;
    toolType: string;
    [keyName: string]: any;
}
