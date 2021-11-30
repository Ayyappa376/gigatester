import { API, Handler } from '@apis/index';
import { GroupInfo } from '@models/index';
import { appLogger, responseBuilder, updateGroup } from '@utils/index';
import { Response } from 'express';

interface PutGroups {
  body: {
    group: GroupInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutGroups, response: Response) {
  appLogger.info({ PutGroups: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins can update groups');
    return responseBuilder.forbidden(err, response);
  }

  if (!body.group) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Group to update is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await updateGroup(body.group, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateGroup');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updateGroup: ok });
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
  route: '/api/v2/groups',
};
