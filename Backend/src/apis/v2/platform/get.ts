import { API, Handler } from '@apis/index';
import { ConfigItem, PlatformInfo } from '@models/index';
import { config } from '@root/config';
import { appLogger, getCreatePlatformConfig, getPlatformDetails, getPlatformsList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetPlatforms {
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

async function handler(request: GetPlatforms, response: Response) {
  appLogger.info({ GetPlatforms: request }, 'Inside Handler');

  const { headers } = request;
  const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the platforms details and config details of a platform if the platform id is sent - edit platform
  //returns the config details of a platform if the platform id sent as 0 - create platform
  //returns the list of all platforms, if the platform id is not sent - list platforms
  let result: any;
  if (params.id) {
    if(params.id === '0') {
      const platformConfig: ConfigItem = await getCreatePlatformConfig(config.defaults.orgId);
      appLogger.info({ getCreatePlatformConfig: platformConfig });
      result = {
        platformConfig: platformConfig.config,
      };
    } else {
      const platformDetails: PlatformInfo = await getPlatformDetails(params.id);
      appLogger.info({ getPlatformDetails: platformDetails });
      const platformConfig: ConfigItem = await getCreatePlatformConfig(config.defaults.orgId);
      appLogger.info({ getCreatePlatformConfig: platformConfig });
      result = {
        platformConfig: platformConfig.config,
        platforms: [platformDetails],
      };
    }
  } else {
    const platformDetailsList: PlatformInfo[] = await getPlatformsList(headers.user.email);
    appLogger.info({ getPlatformsList: platformDetailsList });
    result = {
      platforms: platformDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/platforms/:id?',
};
