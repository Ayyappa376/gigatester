import { API, Handler } from '@apis/index';
import { UserInfo } from '@models/index';
import { appLogger, responseBuilder, updateUser } from '@utils/index';
import { Response } from 'express';

interface PutUsers {
  body: {
    user: UserInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutUsers, response: Response) {
  appLogger.info({ PutUsers: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can update users');
    return responseBuilder.forbidden(err, response);
  }

  if (body.user) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'User to update is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await updateUser(body.user).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateUser');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updateUser: ok });
  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/users',
};
