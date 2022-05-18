import { API, Handler } from '@apis/index';
import { OrganizationInfo } from '@root/models';
import { appLogger, getOrganizationDetails, getOrganizationList, responseBuilder } from '@utils/index';
import { Response } from 'express';
import { URL } from 'url';

interface GetOrganizations {
  headers: {
    origin: string;
  };
  params: {
    id?: string;
  };
}

async function handler(request: GetOrganizations, response: Response) {
  appLogger.info({ GetOrganizations: request }, 'Inside Handler');

  const { headers, params } = request;
  let result: any;
  if(!params.id) {
    const organizationList: OrganizationInfo[] = await getOrganizationList();
    appLogger.info({ getOrganizationList: organizationList });
    result = {
      organizationList
    };
  } else if(params.id === '0') {
    const orgURL = new URL(headers.origin);
    const orgId = orgURL.hostname;
    const organizationDetails: OrganizationInfo = await getOrganizationDetails(orgId);
    result = {
      organizationDetails
    };
  } else {
    const organizationDetails: OrganizationInfo = await getOrganizationDetails(params.id);
    result = {
      organizationDetails
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/organizations/:id',
};
