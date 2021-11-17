import {
  CollectorConfigDetails,
  ConfigItem,
  GeneralConfigDetails,
  ObjectConfigDetails,
//  ServiceConfigDetails,
//  TeamConfigDetails,
//  UserConfigDetails,
} from '@models/index';
import { config } from '@root/config';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { get, scan, update } from './sdk';

const SYSTEM_CONFIG = 'SystemConfig';
const USER_CONFIG = 'UserConfig';
const TEAM_CONFIG = 'TeamConfig';
const CAMPAIGN_CONFIG = 'CampaignConfig';
const DEVICE_CONFIG = 'DeviceConfig';
const PLATFORM_CONFIG = 'PlatformConfig';
const SERVICE_CONFIG = 'ServiceConfig';
const GENERAL_CONFIG = 'GeneralConfig';
const COLLECTOR_CONFIG = 'CollectorConfig';

export const getAllConfigTypes = async (orgId: string): Promise<any> => {
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>(<unknown>{
    AttributesToGet: [
      'type',
    ],
    ScanFilter: {
      orgId: {
        AttributeValueList: [ orgId ],
        ComparisonOperator: 'EQ',
      },
      type: {
        AttributeValueList: [ SYSTEM_CONFIG ],
        ComparisonOperator: 'NE',
      }
    },
    TableName: TableNames.getConfigsTableName(),
  });

  appLogger.info({ getAllConfigTypes_scan_params: params });
  return scan<any>(params);
};

const getConfig = async (orgId: string, type: string): Promise<ConfigItem> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      orgId,
      type,
    },
    TableName: TableNames.getConfigsTableName(),
  });

  appLogger.info({ getConfig_get_params: params });
  return get<ConfigItem>(params);
};

export const getSystemConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, SYSTEM_CONFIG);

export const getUserConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, USER_CONFIG);

export const getTeamConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, TEAM_CONFIG);

export const getCampaignConfig = async (orgId: string): Promise<ConfigItem> =>
getConfig(orgId, CAMPAIGN_CONFIG);

export const getDeviceConfig = async (orgId: string): Promise<ConfigItem> =>
getConfig(orgId, DEVICE_CONFIG);

export const getPlatformConfig = async (orgId: string): Promise<ConfigItem> =>
getConfig(orgId, PLATFORM_CONFIG);

export const getServiceConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, SERVICE_CONFIG);

export const getGeneralConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, GENERAL_CONFIG);

export const getCollectorConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, COLLECTOR_CONFIG);

const setConfig = async (
  orgId: string,
  type: string,
  configDetails:
  ObjectConfigDetails
//    | UserConfigDetails
//    | TeamConfigDetails
//    | ServiceConfigDetails
    | GeneralConfigDetails
    | CollectorConfigDetails
): Promise<ConfigItem> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: { '#config': 'config' },
    ExpressionAttributeValues: { ':config': configDetails },
    Key: {
      orgId,
      type,
    },
    TableName: TableNames.getConfigsTableName(),
    UpdateExpression: `SET #config = :config`,
  });

  appLogger.info({ setConfig_update_params: params });
  return update<ConfigItem>(params);
};

export const setUserConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails //UserConfigDetails
): Promise<ConfigItem> => setConfig(orgId, USER_CONFIG, configDetails);

export const setTeamConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails //TeamConfigDetails
): Promise<ConfigItem> => setConfig(orgId, TEAM_CONFIG, configDetails);

export const setCampaignConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails
): Promise<ConfigItem> => setConfig(orgId, CAMPAIGN_CONFIG, configDetails);

export const setDeviceConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails
): Promise<ConfigItem> => setConfig(orgId, DEVICE_CONFIG, configDetails);

export const setPlatformConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails
): Promise<ConfigItem> => setConfig(orgId, PLATFORM_CONFIG, configDetails);

export const setServiceConfig = async (
  orgId: string,
  configDetails: ObjectConfigDetails //ServiceConfigDetails
): Promise<ConfigItem> => setConfig(orgId, SERVICE_CONFIG, configDetails);

export const setGeneralConfig = async (
  orgId: string,
  configDetails: GeneralConfigDetails
): Promise<ConfigItem> => setConfig(orgId, GENERAL_CONFIG, configDetails);

export const setCollectorConfig = async (
  orgId: string,
  configDetails: CollectorConfigDetails
): Promise<ConfigItem> => setConfig(orgId, COLLECTOR_CONFIG, configDetails);

export const getResultLevels = async () => {
  const orgId = config.defaults.orgId;
  const generalConfig: ConfigItem = await getGeneralConfig(orgId);
  return (<GeneralConfigDetails>generalConfig.config).levels;
};

export const getPerformanceMetricsConstant = async () => {
  const orgId = config.defaults.orgId;
  const generalConfig: ConfigItem = await getGeneralConfig(orgId);
  return (<GeneralConfigDetails>generalConfig.config).performanceMetricsConstant;
};

export const getArchiveDays = async () => {
  const orgId = config.defaults.orgId;
  const generalConfig: ConfigItem = await getGeneralConfig(orgId);
  return (<GeneralConfigDetails>generalConfig.config).archiveDays;
};
