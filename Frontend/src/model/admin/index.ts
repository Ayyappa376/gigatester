import { ISignedUrls } from '..';
import { ICreateTeamParamsRequest } from './create-team'

export interface IAdmin {
    createTeamParams: ICreateTeamParamsRequest;
    signedUrls: ISignedUrls
}

export * from './campaign';
export * from './device';
export * from './platform';
export * from './product';
export * from './group';
export * from './create-team';
export * from './create-user';
export * from './feedbackComments';
