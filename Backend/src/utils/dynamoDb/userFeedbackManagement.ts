//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { FeedbackType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan } from './sdk';

interface Params {
  filter?: string;
  filterType?: string;
  items?: number;
  lastEvalKey?: string;
  prodId?: string;
  prodVersion?: string;
  search?: string;
  type?: FeedbackType;
}

export const getUserFeedbackList = async ({type, items, search, lastEvalKey, filter, filterType, prodId, prodVersion}: Params): Promise<any[]> => {
    let params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
      TableName: getAppFeedbackTableName(),
    };
    const EAN: any = {};
    const EAV: any = {};
    let FE: string = '';

    if(type) {
      EAN['#type'] = 'feedbackType';
      EAV[':type'] = type;
      FE += FE ? ' and #type = :type' : '#type = :type';
    }

    if(prodId) {
      EAN['#prodId'] = 'productId';
      EAV[':prodId'] = prodId;
      FE = '#prodId = :prodId';
      if(prodVersion) {
        EAN['#prodVersion'] = 'productVersion';
        EAV[':prodVersion'] = prodVersion;
        FE += FE ? ' and #prodVersion = :prodVersion' : '#prodVersion = :prodVersion';
      }
    }

    if(FE) {
      params = {
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        FilterExpression: FE,
        TableName: getAppFeedbackTableName(),
      };
    }

    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };
