import { API, Handler } from '@apis/index';
import { AppFeedback } from '@models/index';
import { appLogger, createAppFeedback, responseBuilder  } from '@utils/index';
import { Response } from 'express';

interface PostAppFeedback {
  body: {
    appFeedback: AppFeedback;
  };
  headers: any;
}

async function handler(request: PostAppFeedback, response: Response) {
  appLogger.info({ PostAppFeedback: request }, 'Inside Handler');

  const { body } = request;
//   const { params } = request;

  const ok: any = await createAppFeedback(body.appFeedback).catch(
    (e) => {
      appLogger.error({ err: e }, 'createAppFeedback');
      return { error: e.message ? e.message : 'Error in creating Feedback' };
    }
  );
  appLogger.info({ createAppFeedback: ok });

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
  route: '/api/v2/appFeedback/',
};
