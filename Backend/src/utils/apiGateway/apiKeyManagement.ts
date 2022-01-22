import { config } from '@root/config';
import { appLogger } from '@root/utils';
import AWS, {  } from 'aws-sdk';

const apiGatewayConfig = {
  apiVersion: '2015-07-09',
  region: config.region,
};

const stage: string = process.env.DB_ENV ? process.env.DB_ENV : 'development';

const apigateway = new AWS.APIGateway(apiGatewayConfig);

export const generateAPIKeyForProduct = async(productId: string): Promise<any> => new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any => {
    const apiKeyParams = {
      enabled: true,
      name: productId,
      stageKeys: [ {
        restApiId: config.defaults.restApiId[stage],
        stageName: process.env.DB_ENV,
      } ]
    };

    apigateway.createApiKey(apiKeyParams, function (err: any, appKeyData: any) {
      if(err) {
        appLogger.error({ err }, 'createApiKey'); // an error occurred
        reject(err);
      }
      const usagePlanParams = {
        keyId: appKeyData.id, /* required */
        keyType: 'API_KEY', /* required */
        usagePlanId: config.defaults.usagePlanId[stage] /* required */
      };
      apigateway.createUsagePlanKey(usagePlanParams, function(error: any, data: any) {
        if(error) {
          appLogger.error({ err: error }, 'createUsagePlanKey'); // an error occurred
          reject(error);
        }
        resolve(data); // successful response
      });
    });
  }
);

export const deleteAPIKeyForProduct = async(apiKeyId: string): Promise<any> => new Promise(
  (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any => {
    const apiParams = {
        apiKey: apiKeyId,
    };
    apigateway.deleteApiKey(apiParams, function (err: any, data: any) {
      if (err) {
          appLogger.error(err, 'Delete Error');
          reject(err);
      }
//      appLogger.info({ deleteApiKey: data });
      resolve(data);
    });
  }
);
