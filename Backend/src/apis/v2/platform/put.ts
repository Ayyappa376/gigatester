import { API, Handler } from '@apis/index';
import { PlatformInfo } from '@models/index';
import { appLogger, responseBuilder, updatePlatform } from '@utils/index';
import { Response } from 'express';

interface PutPlatforms {
  body: {
    values: PlatformInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutPlatforms, response: Response) {
  appLogger.info({ AddPlatforms: request }, 'Inside Handler');

  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access, Unauthorized user');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }
  const updateData: PlatformInfo = body.values;
  if (
    headers.user['cognito:groups'][0] === 'Manager' ||
    (headers.user['cognito:groups'][0] === 'Admin' && !updateData.manager)
  ) {
    updateData.manager = headers.user.email;
  }
  const ok: any = await updatePlatform(updateData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updatePlatform');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updatePlatform: ok });
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
  route: '/api/v2/platforms',
};
