import { API, Handler } from '@apis/index';
import { GroupInfo } from '@models/index';
import {
  appLogger,
  getGroupDetails,
  getGroupsList,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

interface GetGroups {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id?: string;
  };
}

async function handler(request: GetGroups, response: Response) {
  appLogger.info({ GetGroups: request }, 'Inside Handler');

  const { headers, params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }

  //returns the group details and its hierarchy, if the group id is sent - to get all the groups another entity belongs to
  //returns the list of all groups and their hierarchies, if the group id is not sent - list all groups
  let result: any;
  if (params.id) {
    const groupDetails: GroupInfo = await getGroupDetails(params.id);
    appLogger.info({ getGroupDetails: groupDetails });
    result = groupDetails;
  } else {
    const userEmail = (headers.user['cognito:groups'][0] === 'Admin')
    ? 'admin'
    : (headers.user['cognito:groups'][0] === 'Manager')
      ? headers.user.email
      : undefined;

    const groupDetailsList: GroupInfo[] = await getGroupsList(userEmail);
    appLogger.info({ getGroupsList: groupDetailsList });
    result = {};
    groupDetailsList.forEach((group: GroupInfo) => {
      result[group.id] = group;
    });
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/groups/:id?',
};
