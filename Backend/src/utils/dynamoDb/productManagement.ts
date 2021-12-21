import { ProductInfo, ConfigItem, PlatformInfo, TestSuite, DeviceInfo } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, getProductConfig, getPlatformsList, getTestSuites, getDevicesList} from '@utils/index';
import { DynamoDB } from 'aws-sdk';
//import { getUserDocumentFromEmail } from './getUserDocument';
import { deleteItem, get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

export const createProduct = async (productData: ProductInfo, userId: string): Promise<ProductInfo> => {
    if (!userId) {
      const err = new Error('Unauthorized attempt');
      appLogger.error(err);
      throw err;
    }
    console.log(productData, "productData");
    console.log(productData.devices, "productData.devices");
    const item: ProductInfo = {
        devices: productData.devices,
        id: productData.id,
        // instructions: productData.instructions,
        name: productData.name,
        platforms: productData.platforms,
        software: productData.software,
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
}
export const getCreateProductConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const productConfig: ConfigItem = await getProductConfig(orgId);
  appLogger.info({ getProductConfig: productConfig });

  const platforms: PlatformInfo[] = await getPlatformsList();
  const platforms_key = 'platforms';
  productConfig.config[platforms_key].options = {};
  platforms.forEach((val: PlatformInfo) => productConfig.config[platforms_key].options[val.id] = val.name);
  const testSuite: TestSuite[] = await getTestSuites();
  const testSuite_key = 'testSuite';
  productConfig.config[testSuite_key].options = {};
  testSuite.forEach((val: PlatformInfo) => productConfig.config[testSuite_key].options[val.id] = val.name);
  const devices: DeviceInfo[] = await getDevicesList();
  const devices_key = 'devices';
  productConfig.config[devices_key].options = {};
  devices.forEach((val: DeviceInfo) => productConfig.config[devices_key].options[val.id] = val.name);

  return productConfig;
};
export const getProductDetails = async (id: string,version: string): Promise<ProductInfo> => {
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

export const deleteProduct = async (id: string, version: string, userId: string): Promise<ProductInfo | undefined> => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
  const params: DynamoDB.DeleteItemInput = <DynamoDB.DeleteItemInput>(<unknown>{
      Key: {
      id,
      version,
      },
      TableName: TableNames.getProductsTableName(),
  });
  appLogger.info({ deleteProduct_delete_params: params });
  return deleteItem(params);
};

export const updateProduct = async (updateInfo: ProductInfo, userId: string) => {
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
    return update<DynamoDB.UpdateItemInput>(params);
  };
  

