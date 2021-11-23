import { API, Handler } from '@apis/index';
import { appLogger, deletePlatform, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelPlatforms {
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
}

async function handler(request: DelPlatforms, response: Response) {
  appLogger.info({ DelPlatforms: request }, 'Inside Handler');

  const { headers, params } = request;

  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can delete platforms');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Platform id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await deletePlatform(params.id, headers.user.email);
  appLogger.info({ deletePlatform_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/platforms/:id',
};
