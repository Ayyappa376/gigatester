import { API, Handler } from '@apis/index';
//import { addUserToTeam } from '@root/utils/dynamoDb/addUserToTeam';
// import { addUserToCognitoGroup } from '@root/utils/dynamoDb/cognitoUserFunctions';
import { UserDocument } from '@models/index';
import {
  addUserToCognitoGroup,
  appLogger,
  getUserDocument,
  removeUserFromCognitoGroup,
  resetUserPassword,
  responseBuilder,
  updateDynamoUser,
  // updateCognitoUserToLowerCase
} from '@utils/index';
import { Response } from 'express';

interface UpdateUser {
  body: {
    emailId: string;
    id: string;
    resetPassword?: boolean;
    roles: string[];
    //        supervisor?: string;
    // teams?: any[];
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

async function handler(request: UpdateUser, response: Response) {
  appLogger.info({ UpdateUser: request }, 'Inside Handler');

  const { headers, body } = request;
  // if (
  //   headers.user['cognito:groups'][0] !== 'Manager' &&
  //   headers.user['cognito:groups'][0] !== 'Admin'
  // ) {
  //   const err = new Error('InvalidUser');
  //   appLogger.error(err, 'Unauthorized');
  //   return responseBuilder.unauthorized(err, response);
  // }
  const managerDetails: UserDocument = await getUserDocument({
    cognitoUserId: headers.user['cognito:username'],
  });
  appLogger.info({ getUserDocument: managerDetails });
  // if (
  //   managerDetails &&
  //   managerDetails.roles &&
  //   !managerDetails.roles.includes('Manager') &&
  //   !managerDetails.roles.includes('Admin')
  // ) {
  //   const err = new Error('Forbidden Access, Unauthorized user');
  //   appLogger.error(err, 'Forbidden');
  //   return responseBuilder.forbidden(err, response);
  // }
  const userDetails: any = await getUserDocument({ cognitoUserId: body.id });
  appLogger.info({ getUserDocument: userDetails });
  // if (
  //   !(headers.user['cognito:groups'][0] === 'Admin') &&
  //   !userDetails.order.includes(headers.user.email)
  // ) {
  //   const err = new Error('Forbidden Access, Unauthorized user');
  //   appLogger.error(err, 'Forbidden');
  //   return responseBuilder.forbidden(err, response);
  // }
  const removeRoles = new Array();
  if (userDetails.roles) {
    for (const role of userDetails.roles) {
      if (!body.roles.includes(role)) {
        removeRoles.push(role);
      }
    }
    appLogger.info({ removingRoles: removeRoles });
    for (const role of removeRoles) {
      try {
        const res = await removeUserFromCognitoGroup(userDetails.id, role);
//        .then((res: any) => {
          //result
          appLogger.info({ removeUserFromCognitoGroup: res });
//        })
//        .catch((e) => {
      } catch(e) {
          appLogger.error({ err: e }, 'Error while adding  user to group');
      }
//        });
    }
  }
  appLogger.info({ addingRoles: body.roles });
  for (const role of body.roles) {
    try {
      const res = await addUserToCognitoGroup(userDetails.id, role);
//      .then((res: any) => {
        //result
        appLogger.info({ addUserToCognitoGroup: res });
//      })
//      .catch((e) => {
    } catch(e) {
        appLogger.error({ err: e }, 'Error while adding  user to group');
    }
//      });
  }
  appLogger.info({ resetPasswordStatus: body.resetPassword });
  body.resetPassword ? await resetUserPassword(userDetails.id, userDetails.emailId) : await updateDynamoUser(userDetails.id, managerDetails, body);
  return responseBuilder.ok({ message: 'ok' }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/admin/users',
};
