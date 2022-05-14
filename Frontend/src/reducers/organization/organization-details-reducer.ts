import { SET_ORGANIZATION_DETAILS, SET_ORGANIZATION_MODE, OrganizationDetailsActions } from '../../actions/organization';         
import { initialState } from '../../model';
import { IOrganizationInfo } from '../../model/organization';

export const organizationValuesReducer = {
    [SET_ORGANIZATION_DETAILS]
    (state: IOrganizationInfo, action: OrganizationDetailsActions<IOrganizationInfo>) {
        return {
            ...state,
            ...action.payload
        };
    },    
    [SET_ORGANIZATION_MODE]
    (state: IOrganizationInfo, action: OrganizationDetailsActions<string>) {
        return {
            ...state,
            mode: action.payload
        };
    }
}
