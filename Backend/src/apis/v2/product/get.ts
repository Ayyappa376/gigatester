import { API, Handler } from '@apis/index';
import {ConfigItem, ProductInfo  } from '@models/index';
import { config } from '@root/config';
import { appLogger, getCreateProductConfig, getProductDetails, getProductsList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetProducts {
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

async function handler(request: GetProducts, response: Response) {
  appLogger.info({ GetProducts: request }, 'Inside Handler');

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
  //returns the list of all products, if the product id is not sent - list products
  let result: any;
  if (params.id) {
    if(params.id === '0') {
      const productConfig: ConfigItem = await getCreateProductConfig(config.defaults.orgId);
      appLogger.info({ getCreateProductConfig: productConfig });
      result = {
        productConfig: productConfig.config,
      };
    } else {
      const productDetails: ProductInfo = await getProductDetails(params.id,params.version);
      appLogger.info({ getProductDetails: productDetails });
      const productConfig: ConfigItem = await getCreateProductConfig(config.defaults.orgId);
      appLogger.info({ getCreateProductConfig: productConfig });
      result = {
        productConfig: productConfig.config,
        products: [productDetails],
      };
    }
    } else {
    const productDetailsList: ProductInfo[] = await getProductsList();
    appLogger.info({ getProductsList: productDetailsList });
    result = {
      products: productDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/products/:id?/:version?',
};
