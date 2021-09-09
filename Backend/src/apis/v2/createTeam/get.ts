import { API, Handler } from '@apis/index';
import { CreateTeamConfig, TeamInfo } from '@models/index';
import { getCreateTeamConfig, getTeamDetails } from '@root/utils/dynamoDb/createTeams';
import { appLogger, getUserOrgId, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetTeam {
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

async function handler(request: GetTeam, response: Response) {
    appLogger.info({GetTeamConfig: request}, 'Inside Handler');

    const { headers } = request;
    const { params } = request;
    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }
    let result: any;
    if(params.teamId) {
        const teamDetails: TeamInfo = await getTeamDetails(params.teamId);
        appLogger.info({getTeamDetails: teamDetails});
        const teamConfig: CreateTeamConfig = await getCreateTeamConfig(teamDetails.orgId);
        appLogger.info({getCreateTeamConfig: teamConfig});
        result = {
            config: teamConfig.config,
            orgId: teamConfig.orgId,
            values: teamDetails
        };
    } else {
        const orgId: string = await getUserOrgId(cognitoUserId);
        appLogger.info({getUserOrgId: orgId});
        const teamConfig: CreateTeamConfig = await getCreateTeamConfig(orgId);
        appLogger.info({getCreateTeamConfig: teamConfig});
        result = teamConfig;
    }
    return responseBuilder.ok(result, response);
}

export const api: API = {
    handler: <Handler><unknown>handler,
    method: 'get',
    route: '/api/v2/admin/createteam/:teamId?',
};
