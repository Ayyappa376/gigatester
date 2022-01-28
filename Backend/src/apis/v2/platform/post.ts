import { API, Handler } from '@apis/index';
import { PlatformInfo } from '@models/index';
import { appLogger, createPlatform, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostPlatforms {
  body: {
    platforms: PlatformInfo[];
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostPlatforms, response: Response) {
  appLogger.info({ PostPlatforms: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can create platforms');
    return responseBuilder.forbidden(err, response);
  }

  if (body.platforms.length < 1) {
    const err = new Error('BadRequest:Missing values');
    appLogger.error(err, 'Platform to create is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await createPlatform(body.platforms[0], headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createPlatform');
      return { error: e.message ? e.message : 'Platform already exists' };
    }
  );
  appLogger.info({ createPlatform: ok });

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
  route: '/api/v2/platforms',
};
