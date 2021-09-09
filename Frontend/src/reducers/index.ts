import { History } from 'history';
import { combineReducers } from 'redux';
import { IAssesment, IAuthDetails, IAdmin } from '../model';
import * as assesmentReducer from './assesment';
import * as userReducer from './user';
import * as adminReducer from './admin';
import * as displayStateReducer from './display';
import * as systemDetailsReducer from './system';
import { IDisplayState } from '../model/display';
import { ISystemDetails } from '../model/system';

export interface IRootState {
	assesment: IAssesment;
	user: IAuthDetails;
	admin: IAdmin;
	display: IDisplayState;
	systemDetails: ISystemDetails;
}

export default (history: History) =>
	combineReducers({
		...assesmentReducer,
		...userReducer,
		...adminReducer,
		...displayStateReducer,
		...systemDetailsReducer
	});
