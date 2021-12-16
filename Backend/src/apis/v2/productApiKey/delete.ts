import { API, Handler } from '@apis/index';
import { appLogger, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface GetApiKey {
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
    params: {
        apiKey: string;
    };
}

async function handler(request: GetApiKey, response: Response) {
    appLogger.info({ GetApiKeyConfig: request }, 'Inside Handler');
    const { headers } = request;
    const { params } = request;
    const cognitoUserId = headers.user['cognito:username'];
    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }
    const apigateway = new AWS.APIGateway();
    if (params.apiKey) {
    const apiParams = {
        apiKey: params.apiKey,
    };
    apigateway.deleteApiKey(apiParams, function (err: any, data: any) {
        if (err) {
            appLogger.error(err, 'Delete Error');
        } else {
            appLogger.info({ apiKey: data });
            return responseBuilder.ok(data, response);
        }
    });
}
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'delete',
    route: '/api/v2/productApiKey/:apiKey?',
};
