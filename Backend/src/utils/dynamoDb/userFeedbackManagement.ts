//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan } from './sdk';

export const getUserFeedbackList = async (prodId: string | undefined, prodVersion: string | undefined): Promise<any[]> => {
    let params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
      TableName: 'dev_GT_feedback' //TableNames.getFeedbackTableName(),
    };

    if(prodId) {
      const EAN: any = {};
      EAN['#prodId'] = 'productId';
      const EAV: any = {};
      EAV[':prodId'] = prodId;
      let FE = '#prodId = :prodId';

      if(prodVersion) {
        EAN['#prodVersion'] = 'productVersion';
        EAV[':prodVersion'] = prodVersion;
        FE += ' and #prodVersion = :prodVersion';
      }

      params = {
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        FilterExpression: FE,
        TableName: 'dev_GT_feedback' //TableNames.getFeedbackTableName(),
      };
    }

    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };
