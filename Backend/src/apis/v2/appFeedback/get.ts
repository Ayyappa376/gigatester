import { API, Handler } from '@apis/index';
import { AppFeedback } from '@models/index';
import { appLogger, getappFeedbackList, responseBuilder } from '@utils/index';
// import { config } from '@root/config';
import { Response } from 'express';

type FilterType = 'category' | 'rating' | 'keyword' | 'severity';

type IFeedbackType = 'FEEDBACK' | 'BUG_REPORT';

interface GetAppFeedback {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    type: IFeedbackType;
  };
  query: {
    items: number;
    lastEvalKey: string;
    search: string;
    filter: string;
    filterType: FilterType;
  }
}

async function handler(request: GetAppFeedback, response: Response) {
  appLogger.info({ GetAppFeedback: request }, 'Inside Handler');

  const { headers, params, query } = request;
  const {type} = params;
  const {items, search, lastEvalKey, filter, filterType} = query;
//   const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  let result: any;
  if(!type) {
    const appFeedbackDetailsList: AppFeedback[] = await getappFeedbackList({});
    appLogger.info({ getappFeedbackList: appFeedbackDetailsList });
    result = {
      appFeedback: appFeedbackDetailsList,
    };
    return responseBuilder.ok(result, response);
  }
  const appFeedbackDetailsList: AppFeedback[] = await getappFeedbackList({type, search, items, filter, filterType, lastEvalKey});
  appLogger.info({ getappFeedbackList: appFeedbackDetailsList });
  result = {
    appFeedback: appFeedbackDetailsList,
  };
  return responseBuilder.ok(result, response);
    
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/appFeedback/:type?',
};
