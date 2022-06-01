import { API, Handler } from '@apis/index';
import {
  appLogger,
  getChartData,
  // getUserFeedbackItemList,
  getUserFeedbackList,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

export type FilterType = 'category' | 'rating' | 'keyword' | 'severity';

export type FeedbackType = 'FEEDBACK' | 'BUG_REPORT' | 'FEEDBACK-CHART' | 'BUG-REPORT-CHART';

interface UserFeedbackRequest {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    type: FeedbackType;
  };
  query: {
    filterCategory?: string;
    startDate?: string;
    endDate?: string;
    filterRating?: string;
    filterSeverity?: string;
    items?: string;
    lastEvalKeyId?: string;
    lastEvalKeyfeedbackType?: string;
    lastEvalKeyCreatedOn?: string;
    order?: string;
    prodId?: string;
    prodVersion?: string;
    search?: string;
  };
}

async function handler(
  request: UserFeedbackRequest,
  response: Response
): Promise<any> {
  appLogger.info({ UserFeedbackRequest: request }, 'Inside Handler');
  const { headers, params, query } = request;
  const {type} = params;
  const {items, search, prodId, lastEvalKeyCreatedOn,lastEvalKeyId, lastEvalKeyfeedbackType, prodVersion, order, filterRating, filterSeverity, filterCategory, startDate, endDate} = query;

//  const { user: { email: userId } } = headers;
  if (!headers.user) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin' &&
    headers.user['cognito:groups'][0] !== 'Member'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  try {
    let feedback: any;
    if(!type) {
      feedback = await getUserFeedbackList({});
      return responseBuilder.ok({Items: feedback }, response);
    }
    if(type === 'FEEDBACK-CHART' || type === 'BUG-REPORT-CHART') {
      const chartData = await getChartData({type, prodId, search, filterCategory, filterRating, filterSeverity, prodVersion, startDate, endDate});
      return responseBuilder.ok({Items: chartData }, response);
    }
    feedback = await getUserFeedbackList({type, items, search, prodId, prodVersion, order, filterRating, filterSeverity, filterCategory, startDate, endDate, lastEvalKeyId,lastEvalKeyfeedbackType,lastEvalKeyCreatedOn });
    return responseBuilder.ok({Items: feedback }, response);
  } catch (err) {
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(<Error>err, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/userFeedback/:type?',
};
