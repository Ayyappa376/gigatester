import { API, Handler } from '@apis/index';
import { FeedbackSettings } from '@models/index';
import { appLogger, getProductFeedbackSettings, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetProducts {
  params: {
    apiKey: string;
    version: string;
  };
}

async function handler(request: GetProducts, response: Response) {
  appLogger.info({ GetProducts: request }, 'Inside Handler');

  const { params } = request;

  if (params.apiKey) {
    const feedbackSettings: Array<FeedbackSettings | undefined> = await getProductFeedbackSettings(params.apiKey, params.version);
    appLogger.info({ getProductFeedbackSettings: feedbackSettings });
    if(feedbackSettings && feedbackSettings.length > 0) {
      return responseBuilder.ok({ feedbackSettings: feedbackSettings[0] }, response);
    }
    return responseBuilder.ok({}, response);
  }
  return responseBuilder.badRequest(new Error('API Key missing'), response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/products/:apiKey?/:version?',
};
