import { SET_ORGANIZATION_DETAILS, REMOVE_ORGANIZATION_DETAILS, SET_ORGANIZATION_MODE } from './organization-actions';

export interface OrganizationDetailsActions<T> {
    type: SET_ORGANIZATION_DETAILS | REMOVE_ORGANIZATION_DETAILS | SET_ORGANIZATION_MODE;
    payload: T;
}

export * from './organization-actions';