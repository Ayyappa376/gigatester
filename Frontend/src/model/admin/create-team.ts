import { FetchAction } from '../';

export interface ICreateTeamParamsRequest {
    data: ITeamParams | null,
    status: FetchAction,
    error?: object | null
}

export interface ITeamAttributes {
    value?: any;
    options?: any;
    Mandatory: boolean;
    displayName: string;
    type: string;
}
export interface ITeamParams {
    config: ITeamConfig
    orgId: string;
    values?: any;
}

export interface ITeamConfig {
    [keyName: string]: ITeamAttributes;
}