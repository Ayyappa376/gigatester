//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { FeedbackType, FilterType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan, scanNonRecursiveRaw } from './sdk';

interface Params {
  filter?: string;
  filterType?: FilterType;
  items?: string;
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
      FE += FE ? ' and #prodId = :prodId' : '#prodId = :prodId';
      if(prodVersion) {
        EAN['#prodVersion'] = 'productVersion';
        EAV[':prodVersion'] = prodVersion;
        FE += FE ? ' and #prodVersion = :prodVersion' : '#prodVersion = :prodVersion';
      }
    }

    const populateParams = (filterOn: string) => {
      EAN['#filterOn'] = filterOn;
      EAV[':filter'] = filterType === 'rating' && filter ? parseInt(filter): filter;
      FE += FE ? ' and #filterOn = :filter' : '#filterOn = :filter';
    }

    if(filterType) {
      switch(filterType) {
        case 'rating':
          populateParams('productRating');
          break;
        case 'category':
          populateParams('feedbackCategory');
          break;
        case 'keyword':
          //populateParams('productRating')  // This is equivalent to search
          break;
        case 'severity':
          populateParams('bugPriority');
          break;
        default:
          // generate a 501 error statement
      }
    }
   /*  if(search) {
      EAN['#comments'] = 'feedbackComments';
      EAV[':keyWord'] = search;
      FE += FE ? ' and contains(#comments, :keyWord)' : 'contains(#comments, :keyWord)';
    } */

    if(FE) {
      params = {
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        FilterExpression: FE,
        TableName: getAppFeedbackTableName(),
      };
    }

    if(items) {
      params.Limit = parseInt(items);
      return scanNonRecursiveRaw<any>(params);
    }

    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };
