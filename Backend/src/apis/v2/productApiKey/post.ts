import { API, Handler } from '@apis/index';
 import { appLogger, generateAPIKeyForProduct, getAPIKeyForProduct, responseBuilder, saveAPIKeyToProduct } from '@utils/index';
import { Response } from 'express';

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
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins and Managers can create API Keys');
    return responseBuilder.forbidden(err, response);
  }

  getAPIKeyForProduct(body.productId)
  .then((products: any) => {
    appLogger.info({ getAPIKeyForProduct: products });
    if(products && products.length > 0) {
      return responseBuilder.ok({ apiKeyId: products[0].apiKeyId, apiKey: products[0].apiKey }, response); // successful response
    }

    generateAPIKeyForProduct(body.productId)
    .then((data: any) => {
      appLogger.info({ generateAPIKeyForProduct: data });

      try {
        saveAPIKeyToProduct(body.productId, data.id, data.value);
//       .then((ok: any) => {
//        appLogger.info({ saveAPIKeyToProduct: ok });
//        return responseBuilder.ok({ apiKeyId: data.id, apiKey: data.value }, response); // successful response
//      })
      } catch(err) {
        appLogger.error({ err }, 'saveAPIKeyToProduct'); // an error occurred
        return responseBuilder.internalServerError(new Error('Failed to save API Key'), response);
      }
    })
    .catch((err) => {
      appLogger.error({ err }, 'generateAPIKeyForProduct'); // an error occurred
      return responseBuilder.internalServerError(err, response);
    });
  })
  .catch((err) => {
    appLogger.error({ err }, 'getAPIKeyForProduct'); // an error occurred
    return responseBuilder.internalServerError(err, response);
  });
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/productApiKey/',
};
