//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan } from './sdk';

export const getUserFeedbackList = async (): Promise<any[]> => {
    const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
      TableName: 'dev_GT_feedback' //TableNames.getPlatformsTableName(),
    };

    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };
