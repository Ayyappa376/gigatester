import { API, Handler } from '@apis/index';
import { OrganizationInfo } from '@root/models';
import { appLogger, getOrganizationDetails, getOrganizationList, responseBuilder } from '@utils/index';
import { Response } from 'express';
import { URL } from 'url';

interface GetOrganizations {
  headers: {
    origin: string;
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id: string;
  };
}

async function handler(request: GetOrganizations, response: Response) {
  appLogger.info({ GetOrganizations: request }, 'Inside Handler');

  const { headers, params } = request;
  const cognitoUserId = headers.user['cognito:username'];
  const orgURL = new URL(headers.origin);
  const orgId = orgURL.hostname;
  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the organizations details and config details of a organization if the organization id is sent - edit organization
  //returns the config details of a organization if the organization id sent as 0 - create organization
  //returns the list of all organizations, if the organization id is not sent - list organizations
  let result: any;
   if(params.id === '0') {
     const organizationList: OrganizationInfo[] = await getOrganizationList();
     appLogger.info({ getOrganizationList: organizationList });
     result = {
      organizationList
     };
   } else {
      const organizationDetails: OrganizationInfo = await getOrganizationDetails(orgId);
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
