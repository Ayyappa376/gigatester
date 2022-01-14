import createReducer from '../createReducer';
import { initialState, IAdmin } from '../../model';
import { adminCreateTeamReducer } from './create-team';
import { adminUpdateSignedUrlsReducer } from './feedback-comments';

const defaultState = initialState.admin;

const adminReducers = {
    ...adminCreateTeamReducer,
    ...adminUpdateSignedUrlsReducer
}

export const admin = createReducer<IAdmin>(defaultState, adminReducers);
