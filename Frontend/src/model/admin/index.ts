import { ICreateTeamParamsRequest } from './create-team'

export interface IAdmin {
    createTeamParams: ICreateTeamParamsRequest
}

export * from './create-campaign';
export * from './create-team';
export * from './create-user';
