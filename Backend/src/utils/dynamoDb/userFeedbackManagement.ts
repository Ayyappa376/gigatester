//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { FeedbackType, FilterType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { queryRaw, scan, scanNonRecursiveRaw } from './sdk';

export type BudPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type FeedbackCategory = 'Video' | 'Audio' | 'Screen' | 'Images' | 'Other';

interface Params {
  filter?: string;
  filterType?: FilterType;
  items?: string;
  lastEvalKey?: string;
  order?: string;
  prodId?: string;
  prodVersion?: string;
  search?: string;
  type?: FeedbackType;
}

interface GetChartDataProps {
  type: FeedbackType;
}

export interface ProcessedData {
  [key: string]: number;
}

export interface AppFeedback {
  bugPriority: BudPriority;
  createdOn: number;
  feedbackCategory?: FeedbackCategory;
  feedbackComments?: string[];
  feedbackMedia: {
    audio?: string;
    file?: string;
    image?: string;
    video?: string;
  };
  feedbackType: FeedbackType;
  id: string;
  productId?: string;
  productRating: number;
  productVersion?: string;
  sourceIP?: string;
  userId?: string;
}

export const getUserFeedbackList = async ({type, items, search, lastEvalKey, filter, filterType, prodId, prodVersion, order}: Params): Promise<any[]> => {
    const params: DynamoDB.QueryInput = <DynamoDB.QueryInput>{
      TableName: getAppFeedbackTableName(),
    };
    const EAN: any = {};
    const EAV: any = {};
    let FE: string = '';

    /* if(type) {
      EAN['#type'] = 'feedbackType';
      EAV[':type'] = type;
      FE += FE ? ' and #type = :type' : '#type = :type';
    } */

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
      EAV[':filter'] = filterType === 'rating' && filter ? parseInt(filter, 10): filter;
      FE += FE ? ' and #filterOn = :filter' : '#filterOn = :filter';
    };

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
    const today = new Date();
    const lastDate = new Date().setDate(today.getDate() - 30);

    EAV[':type'] = type;
    EAV[':lastDate'] = lastDate;

    if(FE) {
      params.FilterExpression = FE;
    }

    if(Object.keys(EAN).length > 0) {
      params.ExpressionAttributeNames = EAN;
    }

    if(Object.keys(EAV).length > 0) {
      params.ExpressionAttributeValues = EAV;
    }

    params.KeyConditionExpression = 'feedbackType=:type AND createdOn>:lastDate';
    params.ScanIndexForward = order && order === 'asc' ? true : false;
    params.IndexName = 'feedbackType-createdOn-index';

    params.Limit = items ? parseInt(items, 10) : 100;

    if(lastEvalKey) {
      const exKeyStart: any = JSON.parse(lastEvalKey);
      params.ExclusiveStartKey = exKeyStart;
    }
    return queryRaw<any>(params);
  };

export const getUserFeedbackListReursive = async ({type, items, search, lastEvalKey, filter, filterType, prodId, prodVersion}: Params): Promise<any[]> => {
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
      EAV[':filter'] = filterType === 'rating' && filter ? parseInt(filter, 10): filter;
      FE += FE ? ' and #filterOn = :filter' : '#filterOn = :filter';
    };

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
      if(lastEvalKey) {
        const exKeyStart: any = {
          id: lastEvalKey
        };
        params.ExclusiveStartKey = exKeyStart;
      }
      params.Limit = parseInt(items, 10);
      return scanNonRecursiveRaw<any>(params);
    }
    appLogger.info({ getPlatformList_scan_params: params });
    return scan<any[]>(params);
  };

const convertFirstLetterToUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const feedbackProcessBarChartData = (items: AppFeedback[]) => {
    const ratingData: ProcessedData = {1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.productRating /*&& (typeof item.productRating !== 'string')*/) {
                ratingData[item.productRating.toString()] += 1;
            }
        });
    }
    console.log(ratingData);
    return ratingData;
};

export const feedbackProcessPieChartData = (pData: ProcessedData) => {
    let dissatisfied = 0;
    let satisfied = 0;
    let somewhatSatisfied = 0;
    dissatisfied = pData['1'] + pData['2'];
    somewhatSatisfied = pData['3'];
    satisfied = pData['4'] + pData['5'];
    return {dissatisfied, satisfied, somewhatSatisfied};
};

export const bugProcessBarChartData = (items: AppFeedback[]) => {
    const severityData: ProcessedData = {Critical : 0, High : 0, Medium : 0, Low : 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.bugPriority && (item.feedbackType === 'BUG_REPORT' || item.productRating === 0/* || (typeof item.productRating === undefined)*/)) {
                severityData[convertFirstLetterToUppercase(item.bugPriority)] += 1;
            }
        });
    }
    return severityData;
};

export const bugProcessPieChartData = (items: AppFeedback[]) => {
    const categoryData: ProcessedData = {Audio : 0, Video : 0, Screen : 0, Images : 0, Other: 0};
    if(items.length > 0) {
        items.forEach((item) => {
            if(item.feedbackCategory && (item.feedbackType === 'BUG_REPORT' || item.productRating === 0/* || (typeof item.productRating === undefined)*/)) {
                categoryData[convertFirstLetterToUppercase(item.feedbackCategory)] += 1;
            }
        });
    }
    return categoryData;
};

const processFeedbackChartData = (data: AppFeedback[]) => {
  const barChartData = feedbackProcessBarChartData(data);
  const pieChartData = feedbackProcessPieChartData(barChartData);
  return {
    barChartData, pieChartData
  };
};

const processBugReportChartData = (data: AppFeedback[]) => {
  const barChartData = bugProcessBarChartData(data);
  const pieChartData = bugProcessPieChartData(data);
  return {
    barChartData, pieChartData
  };
};

export const getChartData = async({type}: GetChartDataProps) => {
  let chartType: FeedbackType = 'FEEDBACK';
  if(type !== 'FEEDBACK-CHART') {
    chartType = 'BUG_REPORT';
  }
  const data = await getUserFeedbackListReursive({type: chartType});
  return type === 'FEEDBACK-CHART' ? processFeedbackChartData(data) : processBugReportChartData(data);
};
