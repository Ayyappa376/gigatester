import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, getCampaignsList, getDevicesList, getPlatformConfig, getProductsList } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { deleteItem, get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

// Creating Platform and validating parameters
export const createPlatform = async (platformData: PlatformInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }

  const item: PlatformInfo = {
    id: `platform_${uuidv1()}`,
    name: platformData.name,
  };

  Object.keys(platformData).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'name'
      )
    ) {
      if (platformData[val].length > 0 && typeof platformData[val] === 'object') {
        item[val] = new Array();
        platformData[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
              item[val].push(ele.split('Other:')[1]);
          } else {
            item[val].push(ele);
          }
        });
      } else {
        item[val] = platformData[val];
      }
    }
  });

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
    TableName: TableNames.getPlatformsTableName(),
  });

  appLogger.info({ createPlatform_put_params: params });
  return put<DynamoDB.PutItemInput>(params);
};

//fetch platform Config from dynamoDb and fill in the options
export const getCreatePlatformConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const platformConfig: ConfigItem = await getPlatformConfig(orgId);
  appLogger.info({ getPlatformConfig: platformConfig });
  return platformConfig;
};

// fetch platform info
export const getPlatformDetails = async (id: string): Promise<PlatformInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getPlatformsTableName(),
  });
  appLogger.info({ getPlatformDetails_get_params: params });
  return get<PlatformInfo>(params);
};

// delete a platform, if it is not used anywhere
export const deletePlatform = async (id: string, userId: string): Promise<PlatformInfo | undefined> => {
  const products: ProductInfo[] = await getProductsList();
  const campaigns: CampaignInfo[] = await getCampaignsList(userId);
  const devices: DeviceInfo[] = await getDevicesList();
  const platformUsed: boolean = campaigns.some((campaign: CampaignInfo) =>
    products.some((product: ProductInfo) =>
      product.platforms.some((platformId: string) =>
        (platformId === id) ? true : false
      )
    )
  ) && devices.some((device: DeviceInfo) =>
    device.platforms.some((platformId: string) =>
      (platformId === id) ? true : false
  )
);

  if(!platformUsed) {
    const params: DynamoDB.DeleteItemInput = <DynamoDB.DeleteItemInput>(<unknown>{
      Key: {
        id,
      },
      TableName: TableNames.getPlatformsTableName()
    });
    appLogger.info({ deletePlatform_delete_params: params });
    return deleteItem(params);
  }
  return undefined;
};

//Update platform details -- used by update createPlatform API
export const updatePlatform = async (updateInfo: PlatformInfo, userId: string) => {
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
        val === 'id'
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
    },
    TableName: TableNames.getPlatformsTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updatePlatform_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

export const getPlatformsList = async (): Promise<PlatformInfo[]> => {
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    TableName: TableNames.getPlatformsTableName(),
  };

  appLogger.info({ getPlatformList_scan_params: params });
  return scan<PlatformInfo[]>(params);
};
