import { ConfigItem, DeviceInfo, PlatformInfo, ProductInfo, STATUS_PRODUCT_ACTIVE, STATUS_PRODUCT_DELETED, TestSuite } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, getDevicesList, getPlatformsList, getProductConfig,  getTestSuites} from '@utils/index';
import { DynamoDB } from 'aws-sdk';
//import { getUserDocumentFromEmail } from './getUserDocument';
import { get, put, query, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

export const createProduct = async (productData: ProductInfo, userId: string): Promise<ProductInfo> => {
    if (!userId) {
      const err = new Error('Unauthorized attempt');
      appLogger.error(err);
      throw err;
    }
    const item: ProductInfo = {
        devices: productData.devices,
        id: productData.id,
        // instructions: productData.instructions,
        name: productData.name,
        platforms: productData.platforms,
        software: productData.software,
        status: STATUS_PRODUCT_ACTIVE,
        // testers: productData.testers,
        testSuite: productData.testSuite,
        version: productData.version
      };

    Object.keys(productData).forEach((val, i) => {
      if (
        !(
          val === 'id' ||
          val === 'name' ||
          val === 'version'
        )
      ) {
        if (productData[val].length > 0 && typeof productData[val] === 'object') {
          item[val] = new Array();
          productData[val].forEach((ele: any, j: number) => {
            if ((typeof(ele) === 'string') && (ele.match(regex))) {
                item[val].push(ele.split('Other:')[1]);
            } else {
              item[val].push(ele);
            }
          });
        } else {
          item[val] = productData[val];
        }
      }
    });

    const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
        ConditionExpression: 'attribute_not_exists(id)',
        Item: item,
        TableName: TableNames.getProductsTableName(),
      });
    appLogger.info({ createCampaign_put_params: params });
    return put<ProductInfo>(params);
};
export const getCreateProductConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const productConfig: ConfigItem = await getProductConfig(orgId);
  appLogger.info({ getProductConfig: productConfig });

  const platforms: PlatformInfo[] = await getPlatformsList();
  const platformsKey = 'platforms';
  productConfig.config[platformsKey].options = {};
  platforms.forEach((val: PlatformInfo) => productConfig.config[platformsKey].options[val.id] = val.name);
  const testSuite: TestSuite[] = await getTestSuites();
  const testSuiteKey = 'testSuite';
  productConfig.config[testSuiteKey].options = {};
  testSuite.forEach((val: PlatformInfo) => productConfig.config[testSuiteKey].options[val.id] = val.name);
  const devices: DeviceInfo[] = await getDevicesList();
  const devicesKey = 'devices';
  productConfig.config[devicesKey].options = {};
  devices.forEach((val: DeviceInfo) => productConfig.config[devicesKey].options[val.id] = val.name);

  return productConfig;
};

export const getProductDetails = async (id: string, version: string): Promise<ProductInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
      version,
    },
    TableName: TableNames.getProductsTableName(),
  });
  appLogger.info({ getProductDetails_get_params: params });
  return get<ProductInfo>(params);
};

export const getProductsList = async (): Promise<ProductInfo[]> => {
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    TableName: TableNames.getProductsTableName(),
  };

  appLogger.info({ getProductsList_scan_params: params });
  return scan<ProductInfo[]>(params);
};

export const deleteProduct = async (id: string, version: string): Promise<ProductInfo> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':val': STATUS_PRODUCT_DELETED },
    Key: {
      id,
      version,
    },
    TableName: TableNames.getProductsTableName(),
    UpdateExpression: 'SET #status = :val',
  });
  appLogger.info({ deleteCampaign_update_params: params });
  return update<ProductInfo>(params);
};

export const updateProduct = async (updateInfo: ProductInfo, userId: string): Promise<ProductInfo> => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
  const EAN: any = {};
  const EAV: any = {};
  let SET = 'SET ';
  let sep = '';
  Object.keys(updateInfo).forEach((val, i) => {
    if (
      !(
        val === 'id' || val === 'version'
      )
    ) {
      if (
        updateInfo[val].length > 0 &&
        typeof updateInfo[val] === 'object'
      ) {
        const item = new Array();
        updateInfo[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
            item.push(ele.split('Other:')[1]);
          } else {
            item.push(ele);
          }
        });
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = item;
        SET = SET + `${sep} #${val} = :${val}`;
        sep = ',';
      } else {
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = updateInfo[val];
        SET = SET + `${sep} #${val} = :${val}`;
        sep = ',';
      }
    }
  });
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      id: updateInfo.id,
      version: updateInfo.version,
    },
    TableName: TableNames.getProductsTableName(),
    UpdateExpression: SET,
  });
  appLogger.info({ updateProduct_update_params: params });
  return update<ProductInfo>(params);
};

export const getAPIKeyForProduct = async (id: string): Promise<ProductInfo[]> => {
  const params: DynamoDB.QueryInput = <DynamoDB.QueryInput>(<unknown>{
    ExpressionAttributeValues: { ':id': id },
    KeyConditionExpression: 'id = :id',
    ProjectionExpression: 'apiKeyId, apiKey',
    TableName: TableNames.getProductsTableName(),
  });
  appLogger.info({ getAPIKeyForProduct_query_params: params });
  return query<ProductInfo[]>(params);
};

export const saveAPIKeyToProduct = async (id: string, apiKeyId: string, apiKey: string) => {
  const params: DynamoDB.QueryInput = <DynamoDB.QueryInput>(<unknown>{
    ExpressionAttributeValues: { ':id': id },
    KeyConditionExpression: 'id = :id',
    TableName: TableNames.getProductsTableName(),
  });
  appLogger.info({ saveAPIKeyToProduct_query_params: params });
  try {
    const products: ProductInfo[] = await query<ProductInfo[]>(params);
    appLogger.info({ saveAPIKeyToProduct_query_results: products });

    for(const product of products) {
      const uParams: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
        ExpressionAttributeNames: { '#apiKeyId': 'apiKeyId', '#apiKey': 'apiKey' },
        ExpressionAttributeValues: { ':apiKeyId': apiKeyId, ':apiKey': apiKey },
        Key: {
          id: product.id,
          version: product.version,
        },
        TableName: TableNames.getProductsTableName(),
        UpdateExpression: 'SET #apiKey = :apiKey, #apiKeyId = :apiKeyId',
      });
      appLogger.info({ saveAPIKeyToProduct_update_params: uParams });
      try {
        const data = await update<ProductInfo> (uParams);
        appLogger.info({ saveAPIKeyToProduct_update_results: data });
      } catch(err) {
        appLogger.error({ err }, 'saveAPIKeyToProduct_update');
      }
    }
  } catch(err) {
    appLogger.error({ err }, 'saveAPIKeyToProduct_query');
  }
};

export const removeAPIKeyFromProduct = async (apiKeyId: string) => {
  const params: DynamoDB.QueryInput = <DynamoDB.QueryInput>(<unknown>{
    ExpressionAttributeValues: { ':apiKeyId': apiKeyId },
    FilterExpression: 'apiKeyId = :apiKeyId',
    TableName: TableNames.getProductsTableName(),
  });
  appLogger.info({ removeAPIKeyFromProduct_scan_params: params });
  try {
    const products: ProductInfo[] = await scan<ProductInfo[]>(params);
    appLogger.info({ removeAPIKeyFromProduct_scan_results: products });

    for(const product of products) {
      const uParams: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
        Key: {
          id: product.id,
          version: product.version,
        },
        TableName: TableNames.getProductsTableName(),
        UpdateExpression: 'REMOVE apiKey, apiKeyId',
      });
      appLogger.info({ removeAPIKeyFromProduct_update_params: uParams });

      try {
        const data = await update<ProductInfo> (uParams);
        appLogger.info({ removeAPIKeyFromProduct_update_results: data });
      } catch(err) {
        appLogger.error({ err }, 'removeAPIKeyFromProduct_update');
      }
    }
  } catch(err) {
    appLogger.error({ err }, 'removeAPIKeyFromProduct_query');
  }
};
