import createReducer from '../createReducer';
import { initialState } from '../../model';
import { IOrganizationInfo } from '../../model/organization';
import { organizationValuesReducer } from './organization-details-reducer';

const defaultState = initialState.organizationDetails;
const organizationDetailsReducer = {
    ...organizationValuesReducer,
}

export const organizationDetails = createReducer<IOrganizationInfo>(defaultState, organizationDetailsReducer);
