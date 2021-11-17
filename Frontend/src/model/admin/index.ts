import { ICreateTeamParamsRequest } from './create-team'

export interface IAdmin {
    createTeamParams: ICreateTeamParamsRequest
}

export * from './campaign';
export * from './device';
export * from './platform';
export * from './create-team';
export * from './create-user';
