import { API, Handler } from '@apis/index';
import { AppFeedback } from '@models/index';
import { appLogger, getappFeedbackList, responseBuilder } from '@utils/index';
// import { config } from '@root/config';
import { Response } from 'express';

interface GetAppFeedback {
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

async function handler(request: GetAppFeedback, response: Response) {
  appLogger.info({ GetAppFeedback: request }, 'Inside Handler');

  const { headers } = request;
//   const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  let result: any;
    const appFeedbackDetailsList: AppFeedback[] = await getappFeedbackList();
    appLogger.info({ getappFeedbackList: appFeedbackDetailsList });
    result = {
      appFeedback: appFeedbackDetailsList,
    };
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/appFeedback/:id?',
};
