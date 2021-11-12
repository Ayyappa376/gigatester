import { API, Handler } from '@apis/index';
import { CampaignInfo, ConfigItem } from '@models/index';
import { config } from '@root/config';
import { appLogger, getCampaignDetails, getCampaignsList, getCreateCampaignConfig, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetCampaigns {
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

async function handler(request: GetCampaigns, response: Response) {
  appLogger.info({ GetCampaigns: request }, 'Inside Handler');

  const { headers } = request;
  const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the campaigns details and config details of a campaign if the campaign id is sent - edit campaign
  //returns the config details of a campaign if the campaign id sent as 0 - create campaign
  //returns the list of all campaigns, if the campaign id is not sent - list campaigns
  let result: any;
  if (params.id) {
    if(params.id === '0') {
      const campaignConfig: ConfigItem = await getCreateCampaignConfig(config.defaults.orgId);
      appLogger.info({ getCreateCampaignConfig: campaignConfig });
      result = {
        campaignConfig: campaignConfig.config,
      };
    } else {
      const campaignDetails: CampaignInfo = await getCampaignDetails(params.id);
      appLogger.info({ getCampaignDetails: campaignDetails });
      const campaignConfig: ConfigItem = await getCreateCampaignConfig(config.defaults.orgId);
      appLogger.info({ getCreateCampaignConfig: campaignConfig });
      result = {
        campaignConfig: campaignConfig.config,
        campaigns: [campaignDetails],
      };
    }
  } else {
    const campaignDetailsList: CampaignInfo[] = await getCampaignsList(headers.user.email);
    appLogger.info({ getCampaignsList: campaignDetailsList });
    result = {
      campaigns: campaignDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/campaigns/:id?',
};
