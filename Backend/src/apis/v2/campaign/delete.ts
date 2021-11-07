import { API, Handler } from '@apis/index';
import { appLogger, deactivateCampaign, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelCampaigns {
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

async function handler(request: DelCampaigns, response: Response) {
  appLogger.info({ GetCampaignConfig: request }, 'Inside Handler');

  const { headers } = request;
  const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];
  if (!cognitoUserId || !params.id) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  const resp: any = await deactivateCampaign(params.id);
  appLogger.info({ deactivateCampaign_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/campaigns/:id',
};
