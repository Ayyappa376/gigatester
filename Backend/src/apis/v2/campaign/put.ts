import { API, Handler } from '@apis/index';
import { CampaignInfo } from '@models/index';
import { appLogger, responseBuilder, updateCampaign } from '@utils/index';
import { Response } from 'express';

interface PutCampaigns {
  body: {
    values: CampaignInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutCampaigns, response: Response) {
  appLogger.info({ AddCampaigns: request }, 'Inside Handler');

  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access, Unauthorized user');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }
  const updateData: CampaignInfo = body.values;
  if (
    headers.user['cognito:groups'][0] === 'Manager' ||
    (headers.user['cognito:groups'][0] === 'Admin' && !updateData.manager)
  ) {
    updateData.manager = headers.user.email;
  }
  const ok: any = await updateCampaign(updateData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateCampaign');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updateCampaign: ok });
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
  route: '/api/v2/campaigns',
};
