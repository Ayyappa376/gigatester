import { API, Handler } from '@apis/index';
import { appLogger, deactivatePlatform, responseBuilder } from '@utils/index';
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
  appLogger.info({ GetPlatformConfig: request }, 'Inside Handler');

  const { headers } = request;
  const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];
  if (!cognitoUserId || !params.id) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  const resp: any = await deactivatePlatform(params.id, headers.user.email);
  appLogger.info({ deactivatePlatform_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/platforms/:id',
};
