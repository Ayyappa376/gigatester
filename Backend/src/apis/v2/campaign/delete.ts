import { API, Handler } from '@apis/index';
import { appLogger, deleteCampaign, responseBuilder } from '@utils/index';
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
  appLogger.info({ DelCampaigns: request }, 'Inside Handler');

  const { headers, params } = request;

  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin and Managers can delete campaigns');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Campaign id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await deleteCampaign(params.id);
  appLogger.info({ deleteCampaign_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/campaigns/:id',
};
