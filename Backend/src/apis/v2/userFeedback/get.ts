import { API, Handler } from '@apis/index';
import {
  appLogger,
  getUserFeedbackList,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

type FilterType = 'category' | 'rating' | 'keyword' | 'severity';

export type IFeedbackType = 'FEEDBACK' | 'BUG_REPORT';

interface UserFeedbackRequest {
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
    prodId?: string;
    prodVersion?: string;
    items: number;
    lastEvalKey: string;
    search: string;
    filter: string;
    filterType: FilterType;
  };
}

async function handler(
  request: UserFeedbackRequest,
  response: Response
): Promise<any> {
  appLogger.info({ UserFeedbackRequest: request }, 'Inside Handler');
  const { headers, params, query } = request;
  const {type} = params;
  const {items, search, lastEvalKey, filter, filterType, prodId, prodVersion} = query;

//  const { user: { email: userId } } = headers;
  if (!headers.user) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  try {
    if(!type) {
      const feedback: any[] = await getUserFeedbackList({});
      return responseBuilder.ok({Items: feedback }, response);  
    }
    const feedback: any[] = await getUserFeedbackList({type,items, search, lastEvalKey, filter, filterType, prodId, prodVersion});
    return responseBuilder.ok({Items: feedback }, response);
  } catch (err) {
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(err, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/userFeedback/:type?',
};
