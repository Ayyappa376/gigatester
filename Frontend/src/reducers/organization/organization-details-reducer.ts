import { SET_ORGANIZATION_DETAILS, SET_ORGANIZATION_MODE, OrganizationDetailsActions } from '../../actions/organization';         
import { initialState } from '../../model';
import { IOrganizationDetails } from '../../model/organization';

export const organizationValuesReducer = {
    [SET_ORGANIZATION_DETAILS]
    (state: IOrganizationDetails, action: OrganizationDetailsActions<IOrganizationDetails>) {
        return {
            ...state,
            ...action.payload
        };
    },    
    [SET_ORGANIZATION_MODE]
    (state: IOrganizationDetails, action: OrganizationDetailsActions<string>) {
        return {
            ...state,
            mode: action.payload
        };
    }
}
