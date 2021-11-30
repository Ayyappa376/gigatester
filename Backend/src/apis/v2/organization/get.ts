import { API, Handler } from '@apis/index';
import { /*ConfigItem, */OrganizationInfo } from '@models/index';
//import { config } from '@root/config';
import { appLogger, /*getCreateOrganizationConfig, */getOrganizationDetails, getOrganizationsList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetOrganizations {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id: string;
  };
  query: {
    status?: string;
  };
}

async function handler(request: GetOrganizations, response: Response) {
  appLogger.info({ GetOrganizations: request }, 'Inside Handler');

  const { headers, params, query } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the organizations details and config details of a organization if the organization id is sent - edit organization
  //returns the config details of a organization if the organization id sent as 0 - create organization
  //returns the list of all organizations, if the organization id is not sent - list organizations
  let result: any;
  if (params.id) {
//    if(params.id === '0') {
//      const organizationConfig: ConfigItem = await getCreateOrganizationConfig(config.defaults.orgId);
//      appLogger.info({ getCreateOrganizationConfig: organizationConfig });
//      result = {
//        organizationConfig: organizationConfig.config,
//      };
//    } else {
      const organizationDetails: OrganizationInfo = await getOrganizationDetails(params.id);
      appLogger.info({ getOrganizationDetails: organizationDetails });
//      const organizationConfig: ConfigItem = await getCreateOrganizationConfig(config.defaults.orgId);
//      appLogger.info({ getCreateOrganizationConfig: organizationConfig });
      result = {
//        organizationConfig: organizationConfig.config,
        organizations: [organizationDetails],
      };
//    }
  } else {
    const organizationDetailsList: OrganizationInfo[] = await getOrganizationsList(query.status);
    appLogger.info({ getOrganizationsList: organizationDetailsList });
    result = {
      organizations: organizationDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/organizations/:id?',
};
