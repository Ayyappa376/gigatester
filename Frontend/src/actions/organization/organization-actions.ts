import { IOrganizationDetails } from '../../model/organization';
import { OrganizationDetailsActions } from '.';

export type SET_ORGANIZATION_DETAILS = 'SET_ORGANIZATION_DETAILS';
export const SET_ORGANIZATION_DETAILS: SET_ORGANIZATION_DETAILS = 'SET_ORGANIZATION_DETAILS';

export type REMOVE_ORGANIZATION_DETAILS = 'REMOVE_ORGANIZATION_DETAILS';
export const REMOVE_ORGANIZATION_DETAILS: REMOVE_ORGANIZATION_DETAILS = 'REMOVE_ORGANIZATION_DETAILS';

export type SET_ORGANIZATION_MODE = 'SET_ORGANIZATION_MODE';
export const SET_ORGANIZATION_MODE: SET_ORGANIZATION_MODE = 'SET_ORGANIZATION_MODE';

export function saveOrganizationDetails(data: IOrganizationDetails): OrganizationDetailsActions<IOrganizationDetails> {
    return {
        type: 'SET_ORGANIZATION_DETAILS',
        payload: {
            ...data
        }
    }
}

export function removeOrganizationDetails(): OrganizationDetailsActions<{}> {
    return {
        type: 'REMOVE_ORGANIZATION_DETAILS',
        payload: {}
    }
}

export function setOrganizationMode(data: string): OrganizationDetailsActions<string> {
    return {
        type: 'SET_ORGANIZATION_MODE',
        payload: data
    }
}

