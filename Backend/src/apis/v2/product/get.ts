import { API, Handler } from '@apis/index';
import { ProductInfo } from '@models/index';
import { appLogger, getProductDetails,getProductsList, responseBuilder } from '@utils/index';
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
    console.log(params, "paramsss");
  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the platforms details and config details of a platform if the platform id is sent - edit platform
  //returns the config details of a platform if the platform id sent as 0 - create platform
  //returns the list of all platforms, if the platform id is not sent - list platforms
  let result: any;
  if (params.id) {
      const productDetails: ProductInfo = await getProductDetails(params.id,params.version);
      appLogger.info({ getProductDetails: productDetails });
      result = {
        product: [productDetails],
      };
    }
   else {
    const productDetailsList: ProductInfo[] = await getProductsList();
    appLogger.info({ getProductsList: productDetailsList });
    result = {
      products: productDetailsList,
    };
    console.log(result, "resulllllllllllt")
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/products/:id?/version/:version?',
};
