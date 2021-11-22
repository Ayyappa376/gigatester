import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, getCampaignsList, getDeviceConfig, getPlatformsList } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { deleteItem, get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

// Creating Device and validating parameters
export const createDevice = async (deviceData: DeviceInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }

  const item: DeviceInfo = {
    id: `device_${uuidv1()}`,
    name: deviceData.name,
    platforms: deviceData.platforms
  };

  Object.keys(deviceData).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'name'
      )
    ) {
      if (deviceData[val].length > 0 && typeof deviceData[val] === 'object') {
        item[val] = new Array();
        deviceData[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
              item[val].push(ele.split('Other:')[1]);
          } else {
            item[val].push(ele);
          }
        });
      } else {
        item[val] = deviceData[val];
      }
    }
  });

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
    TableName: TableNames.getDevicesTableName(),
  });

  appLogger.info({ createDevice_put_params: params });
  return put<DynamoDB.PutItemInput>(params);
};

//fetch device Config from dynamoDb and fill in the options
export const getCreateDeviceConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const deviceConfig: ConfigItem = await getDeviceConfig(orgId);
  appLogger.info({ getDeviceConfig: deviceConfig });

  const platforms: PlatformInfo[] = await getPlatformsList();
  const key = 'platforms';
  deviceConfig.config[key].options = {};
  platforms.forEach((val: PlatformInfo) => deviceConfig.config[key].options[val.id] = val.name);
  return deviceConfig;
};

// fetch device info
export const getDeviceDetails = async (id: string): Promise<DeviceInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getDevicesTableName(),
  });
  appLogger.info({ getDeviceDetails_get_params: params });
  return get<DeviceInfo>(params);
};

// delete a device, if it is not used anywhere
export const deleteDevice = async (id: string, userId: string): Promise<DeviceInfo | undefined> => {
  const campaigns: CampaignInfo[] = await getCampaignsList(userId);
  const deviceUsed: boolean = campaigns.some((campaign: CampaignInfo) =>
    campaign.products.some((product: ProductInfo) =>
      product.devices ? product.devices.some((deviceId: string) =>
        (deviceId === id) ? true : false
      ) : false
    )
  );

  if(!deviceUsed) {
    const params: DynamoDB.DeleteItemInput = <DynamoDB.DeleteItemInput>(<unknown>{
      Key: {
        id,
      },
      TableName: TableNames.getDevicesTableName()
    });
    appLogger.info({ deleteDevice_delete_params: params });
    return deleteItem(params);
  }
  return undefined;
};

//Update device details -- used by update createDevice API
export const updateDevice = async (updateInfo: DeviceInfo, userId: string) => {
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
    TableName: TableNames.getDevicesTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateDevice_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

export const getDevicesList = async (): Promise<DeviceInfo[]> => {
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    TableName: TableNames.getDevicesTableName(),
  };

  appLogger.info({ getDeviceList_scan_params: params });
  return scan<DeviceInfo[]>(params);
};
