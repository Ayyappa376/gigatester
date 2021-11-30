import { API, Handler } from '@apis/index';
import { GroupInfo } from '@models/index';
import { appLogger, createGroup, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostGroups {
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

async function handler(request: PostGroups, response: Response) {
  appLogger.info({ PostGroups: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins can create and edit groups');
    return responseBuilder.forbidden(err, response);
  }

  if (!body.group) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Group to save is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await createGroup(body.group, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createGroup');
      return { error: e.message ? e.message : 'Error creating group.' };
    }
  );
  appLogger.info({ saveGroups: ok });

  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/groups',
};
//addUserToCognitoGroup('557fc8d9-6142-44b4-b360-7ad4b98a83b8','Clients').then(ok=>{
//	console.log(ok);
//})
