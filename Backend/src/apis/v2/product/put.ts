import { API, Handler } from '@apis/index';
import { ProductInfo } from '@models/index';
import { appLogger, responseBuilder, updateProduct } from '@utils/index';
import { Response } from 'express';

interface PutProducts {
  body: {
    products: ProductInfo[];
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutProducts, response: Response) {
  appLogger.info({ PutProducts: request }, 'Inside Handler');

  const { headers, body } = request;
  console.log(body, "body")
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can update products');
    return responseBuilder.forbidden(err, response);
  }

  if (body.products.length < 1) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Product to update is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await updateProduct(body.products[0], headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updatePlatform');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updatePlatform: ok });
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
  route: '/api/v2/products',
};
