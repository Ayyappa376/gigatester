import { API, Handler } from '@apis/index';
import { appLogger, deleteAPIKeyForProduct, removeAPIKeyFromProduct, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetApiKey {
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
    params: {
        apiKeyId: string;
    };
}

async function handler(request: GetApiKey, response: Response) {
  appLogger.info({ GetApiKeyConfig: request }, 'Inside Handler');
  const { headers, params } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins and Managers can create API Keys');
    return responseBuilder.forbidden(err, response);
  }

  if(params.apiKeyId) {
    deleteAPIKeyForProduct(params.apiKeyId)
    .then((data: any) => {
      appLogger.info({ deleteAPIKeyForProduct: data });
      try {
        removeAPIKeyFromProduct(params.apiKeyId);
//      .then((ok: any) => {
//        appLogger.info({ saveAPIKeyToProduct: ok });
//        return responseBuilder.ok({ data }, response); // successful response
//      })
      } catch(err) {
        appLogger.error({ err }, 'saveAPIKeyToProduct'); // an error occurred
        return responseBuilder.internalServerError(new Error("Failed to remove API Key"), response);
      }
    })
    .catch((err) => {
      appLogger.error({ err }, 'deleteAPIKeyForProduct'); // an error occurred
      return responseBuilder.internalServerError(err, response);
    });
  }
  return responseBuilder.badRequest(new Error('No APIKey to delete'), response);
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'delete',
    route: '/api/v2/productApiKey/:apiKeyId?',
};
