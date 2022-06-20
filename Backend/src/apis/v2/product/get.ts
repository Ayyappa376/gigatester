import { API, Handler } from '@apis/index';
import {ConfigItem, ProductInfo  } from '@models/index';
import { config } from '@root/config';
import { appLogger, getCreateProductConfig, getProductDetails, getProductsList, getUserProductsList, responseBuilder } from '@utils/index';
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
  query: {
    type?: string;
  };
}

async function handler(request: GetProducts, response: Response) {
  appLogger.info({ GetProducts: request }, 'Inside Handler');
  const { headers, params, query } = request;
  const { type } = query;
  const cognitoUserId = headers.user['cognito:username'];
  const email = headers.user.email;
  if(!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the products details and config details of a product if the product id is sent - edit product
  //returns the config details of a product if the product id sent as 0 - create product
  //returns the list of all products, if the product id is not sent - list products
  let result: any;
    if(type && !params.id) {
      const productDetailsList: ProductInfo[] = await getUserProductsList(email, type);
      appLogger.info({ getProductsList: productDetailsList });
      result = {
        products: productDetailsList,
      };
    } else if (params.id && !type) {
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
