import { API, Handler } from '@apis/index';
import { UserDocument } from '@models/index';
import { config } from '@root/config';
import {
  addCognitoUser,
  addDynamoUser,
  addUserToCognitoGroup,
  appLogger,
  getUserDocument,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

interface AddUser {
  body: {
    emailId: string;
    roles?: string[];
    supervisor?: string;
    teams?: any[];
    temporaryPassword?: string;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: AddUser, response: Response) {
  appLogger.info({ AddUser: request }, 'Inside Handler');
  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }
  const managerDetails: UserDocument = await getUserDocument({
    cognitoUserId: headers.user['cognito:username'],
  });
  appLogger.info({ getUserDocument: managerDetails });
  if (
    managerDetails &&
    managerDetails.roles &&
    !managerDetails.roles.includes('Manager') &&
    !managerDetails.roles.includes('Admin')
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  if(! body.roles) {
    body.roles = config.defaults.groups;
  }
  const userDetails: any = await addCognitoUser(body.emailId).catch(
    (e) => {
      appLogger.error({ err: e }, 'addCognitoUser');
      return { error: e.message ? e.message : 'User already exists' };
    }
  );
  appLogger.info({ addCognitoUser: userDetails });
  if (userDetails.error) {
    const err = new Error(userDetails.error);
    appLogger.error(err, 'Forbidden');
    return responseBuilder.badRequest(err, response);
  }
  body.roles.forEach((role: string) => {
    addUserToCognitoGroup(userDetails.User.Username, role)
      .then((res: any) => {
        //res
        appLogger.info({ addUserToCognitoGroup: res });
      })
      .catch((e) => {
        appLogger.error({ err: e }, 'Error while adding user to group');
      });
  });
  // await addUserToCognitoGroup(userDetails.User.Username, body.roles);
  const addResponse: any = await addDynamoUser(
    userDetails.User.Username,
    managerDetails,
    body
  ).catch((e) => {
    appLogger.error({ err: e }, 'addDynamoUser');
    return { error: e.message ? e.message : 'User already exists' };
  });
  appLogger.info({ addDynamoUser: addResponse });
  if (addResponse) {
    const err = new Error(addResponse.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: 'ok' }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/admin/users',
};
