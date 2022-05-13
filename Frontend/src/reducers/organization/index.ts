import createReducer from '../createReducer';
import { initialState } from '../../model';
import { IOrganizationDetails } from '../../model/organization';
import { organizationValuesReducer } from './organization-details-reducer';

const defaultState = initialState.organizationDetails;
const organizationDetailsReducer = {
    ...organizationValuesReducer,
}

export const organizationDetails = createReducer<IOrganizationDetails>(defaultState, organizationDetailsReducer);
