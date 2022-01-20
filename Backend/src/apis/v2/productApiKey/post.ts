import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import { appLogger, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface PostProductApiKey {
  body: any;
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostProductApiKey, response: Response) {
  appLogger.info({ PostProductApiKey: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can create platforms');
    return responseBuilder.forbidden(err, response);
  }
  const apiKeyParams = {
    enabled: true,
    name: body.productId,
    stageKeys: [ {
      restApiId: config.defaults.restApiId,
      stageName: process.env.DB_ENV,
    } ]
  };
    const apigateway = new AWS.APIGateway();

    apigateway.createApiKey(apiKeyParams, function (err: any, appKeyData: any) {
      if(err) {
        appLogger.error({ err }, 'createApiKey'); // an error occurred
        return responseBuilder.internalServerError(err, response);
      }
      const usagePlanParams = {
        keyId: appKeyData.id, /* required */
        keyType: 'API_KEY', /* required */
        usagePlanId: 'v7z5d7' /* required */
      };
      apigateway.createUsagePlanKey(usagePlanParams, function(error: any, data: any) {
        if(error) {
          appLogger.error({ err: error }, 'createUsagePlanKey'); // an error occurred
          return responseBuilder.internalServerError(error, response);
        }
        return responseBuilder.ok({ data }, response); // successful response
      });
    });
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/productApiKey/',
};
