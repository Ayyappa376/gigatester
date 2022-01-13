//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { IFeedbackType } from '@root/apis/v2/userFeedback/get';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan } from './sdk';
import * as TableNames from '@utils/dynamoDb/getTableNames';

interface IParams {
  type?: IFeedbackType;
  search?: string;
  items?: number;
  filter?: string;
  filterType?: string;
  lastEvalKey?: string;
  prodId?: string;
  prodVersion?: string;
}

export const getUserFeedbackList = async ({type, items, search, lastEvalKey, filter, filterType, prodId, prodVersion}: IParams): Promise<any[]> => {
    let params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
      TableName: TableNames.getAppFeedbackTableName(),
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
        TableName: TableNames.getAppFeedbackTableName(),
      };
    }

    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };
