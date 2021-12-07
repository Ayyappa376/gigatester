import { API, Handler } from '@apis/index';
import { /*ConfigItem, */UserInfo } from '@models/index';
//import { config } from '@root/config';
import { appLogger, /*getCreateUserConfig, */getUserDetails, getUsersList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetUsers {
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
    role?: string;
  };
}

async function handler(request: GetUsers, response: Response) {
  appLogger.info({ GetUsers: request }, 'Inside Handler');

  const { headers, params, query } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the users details and config details of a user if the user id is sent - edit user
  //returns the config details of a user if the user id sent as 0 - create user
  //returns the list of all users, if the user id is not sent - list users
  let result: any;
  if (params.id) {
//    if(params.id === '0') {
//      const userConfig: ConfigItem = await getCreateUserConfig(config.defaults.orgId);
//      appLogger.info({ getCreateUserConfig: userConfig });
//      result = {
//        userConfig: userConfig.config,
//      };
//    } else {
      const userDetails: UserInfo = await getUserDetails(params.id);
      appLogger.info({ getUserDetails: userDetails });
//      const userConfig: ConfigItem = await getCreateUserConfig(config.defaults.orgId);
//      appLogger.info({ getCreateUserConfig: userConfig });
      result = {
//        userConfig: userConfig.config,
        users: [userDetails],
      };
//    }
  } else {
    const userDetailsList: UserInfo[] = await getUsersList(query.role);
    appLogger.info({ getUsersList: userDetailsList });
    result = {
      users: userDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/users/:id?',
};
