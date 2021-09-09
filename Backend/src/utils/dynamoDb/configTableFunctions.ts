import {
  CollectorConfigDetails,
  ConfigItem,
  GeneralConfigDetails,
  TeamConfigDetails,
  UserConfigDetails,
} from '@models/index';
import { config } from '@root/config';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { get, update } from './sdk';

const SYSTEM_CONFIG = 'SystemConfig';
const USER_CONFIG = 'UserConfig';
const TEAM_CONFIG = 'TeamConfig';
const GENERAL_CONFIG = 'GeneralConfig';
const COLLECTOR_CONFIG = 'CollectorConfig';

export const getAllConfigTypes = async (orgId: string): Promise<any> => {
  const configTypes = [
    { type: USER_CONFIG, name: 'Configure User Attributes' },
    { type: TEAM_CONFIG, name: 'Configure Team Attributes' },
    { type: GENERAL_CONFIG, name: 'Configure General Settings' },
    { type: COLLECTOR_CONFIG, name: 'Configure Collector Settings' },
  ];
  return configTypes;
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

export const getGeneralConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, GENERAL_CONFIG);

export const getCollectorConfig = async (orgId: string): Promise<ConfigItem> =>
  getConfig(orgId, COLLECTOR_CONFIG);

const setConfig = async (
  orgId: string,
  type: string,
  configDetails:
    | UserConfigDetails
    | TeamConfigDetails
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
  configDetails: UserConfigDetails
): Promise<ConfigItem> => setConfig(orgId, USER_CONFIG, configDetails);

export const setTeamConfig = async (
  orgId: string,
  configDetails: TeamConfigDetails
): Promise<ConfigItem> => setConfig(orgId, TEAM_CONFIG, configDetails);

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
  return (<GeneralConfigDetails>generalConfig.config)
    .performanceMetricsConstant;
};
