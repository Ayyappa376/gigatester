import { API, Handler } from '@apis/index';
import { ProductInfo } from '@models/index';
import { appLogger, createProduct, responseBuilder } from '@utils/index';
import { Response } from 'express';
import uuidv1 from 'uuid/v1';

interface PostProducts {
  body: {
    products: ProductInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostProducts, response: Response) {
  appLogger.info({ PostProducts: request }, 'Inside Handler');
  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins and Managers can create campaigns');
    return responseBuilder.forbidden(err, response);
  }
  body.products[0].id = `product_${uuidv1()}`;
  const createData: ProductInfo = body.products[0];
  const ok: any = await createProduct(createData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createProduct');
      return { error: e.message ? e.message : 'Product already exists' };
    }
  );
  appLogger.info({ createProduct: ok });

  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok, productId:  body.products.id }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/products',
};
