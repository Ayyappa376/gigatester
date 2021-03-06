import { API, Handler } from '@apis/index';
import { ConfigItem, TeamInfo } from '@models/index';
import { config } from '@root/config';
import {
  appLogger,
  getCollectorConfig,
  getTeamDetails,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

interface GetMetricsTool {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    teamId: string;
  };
}

async function handler(request: GetMetricsTool, response: Response) {
  appLogger.info({ GetMetricsTool: request }, 'Inside Handler');

  const { headers, params } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  let result: any;
  const teamDetails: TeamInfo = await getTeamDetails(params.teamId);
  appLogger.info({ getTeamDetails: teamDetails });
  const configMap: ConfigItem = await getCollectorConfig(config.defaults.orgId);
  appLogger.info({ getCollectorConfig: configMap });
  result = {
    config: configMap.config,
    metrics: teamDetails.metrics ? teamDetails.metrics : [],
    orgId: config.defaults.orgId,
    services: teamDetails.services,
    teamId: params.teamId,
    teamName: teamDetails.teamName,
  };
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/metrics/team/:teamId',
};
