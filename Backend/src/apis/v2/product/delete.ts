import { API, Handler } from '@apis/index';
import { appLogger, deleteProduct, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelProducts {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id: string;
    version: string;
  };
}

async function handler(request: DelProducts, response: Response) {
  appLogger.info({ DelProducts: request }, 'Inside Handler');

  const { headers, params } = request;

  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can delete products');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Product id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await deleteProduct(params.id, params.version);
  appLogger.info({ deleteProduct_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/products/:id?/:version?',
};
