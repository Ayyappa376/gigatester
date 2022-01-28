//import { CampaignInfo, ConfigItem, DeviceInfo, PlatformInfo, ProductInfo } from '@models/index';
//import * as TableNames from '@utils/dynamoDb/getTableNames';
import { FeedbackType, FilterType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { queryRaw, scan } from './sdk';

export type BudPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type FeedbackCategory = 'Video' | 'Audio' | 'Screen' | 'Images' | 'Other';

interface Params {
  filter?: string;
  filterRating?: string;
  filterSeverity?: string;
  filterCategory?: string;
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
  prodId?: string;
  prodVersion?: string;
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

const NUMBER_OF_DAYS_OF_FEEDBACK = 30;

export const getUserFeedbackList = async ({type, items, search, lastEvalKey, filter, filterType, filterRating, filterSeverity, filterCategory, prodId, prodVersion, order}: Params): Promise<any[]> => {
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

    if(filterRating) {
      const rating = filterRating.split(',');
      if(rating.length > 0) {
        rating.forEach((el, i) => {
          EAN['#rating'] = 'productRating';
          EAV[`:ratingVal${i}`] = parseInt(el, 10);
          if(i === 0) {
            if(rating.length === 1) {
              FE += FE ? ` and #rating = :ratingVal${i}` : `#rating = :ratingVal${i}`;
            } else {
              FE += FE ? ` and (#rating = :ratingVal${i}` : `(#rating = :ratingVal${i}`;
            }
          } else if (i === rating.length - 1) {
            FE += ` or #rating = :ratingVal${i})`;
          } else {
            FE += ` or #rating = :ratingVal${i}`;
          }
        });
      }
    }

    if(filterSeverity) {
      const severity = filterSeverity.split(',');
      if(severity.length > 0) {
        severity.forEach((el, i) => {
          EAN['#severity'] = 'bugPriority';
          EAV[`:severityVal${i}`] = el;
          if(i === 0) {
            if(severity.length === 1) {
              FE += FE ? ` and #severity = :severityVal${i}` : `#severity = :severityVal${i}`;
            } else {
              FE += FE ? ` and (#severity = :severityVal${i}` : `(#severity = :severityVal${i}`;
            }
          } else if (i === severity.length - 1) {
            FE += ` or #severity = :severityVal${i})`;
          } else {
            FE += ` or #severity = :severityVal${i}`;
          }
        });
      }
    }

    if(filterCategory) {
      const categories = filterCategory.split(',');
      if(categories.length > 0) {
        categories.forEach((el, i) => {
          EAN['#category'] = 'feedbackCategory';
          EAV[`:categoryVal${i}`] = el;
          if(i === 0) {
            if(categories.length === 1) {
              FE += FE ? ` and #category = :categoryVal${i}` : `#category = :categoryVal${i}`;
            } else {
              FE += FE ? ` and (#category = :categoryVal${i}` : `(#category = :categoryVal${i}`;
            }
          } else if (i === categories.length - 1) {
            FE += ` or #category = :categoryVal${i})`;
          } else {
            FE += ` or #category = :categoryVal${i}`;
          }
        });
      }
    }

   /*  if(search) {
      EAN['#comments'] = 'feedbackComments';
      EAV[':keyWord'] = search;
      FE += FE ? ' and contains(#comments, :keyWord)' : 'contains(#comments, :keyWord)';
    } */
    const today = new Date();
    const lastDate = new Date().setDate(today.getDate() - NUMBER_OF_DAYS_OF_FEEDBACK);

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
    params.IndexName = 'feedbackType-createdOn-index'; // Need to remove hardcoding, and name should be based on the subdomain.

    params.Limit = items ? parseInt(items, 10) : 100;

    if(lastEvalKey) {
      const exKeyStart: any = JSON.parse(lastEvalKey);
      params.ExclusiveStartKey = exKeyStart;
    }

    appLogger.info('getUserFeedbackList: ', { params });
    return queryRaw<any>(params);
  };

export const getUserFeedbackListForChart = async ({type, items, search, lastEvalKey, filter, filterType, prodId, prodVersion}: Params): Promise<any[]> => {
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

export const getChartData = async({type, prodId, prodVersion}: GetChartDataProps) => {
  let chartType: FeedbackType = 'FEEDBACK';
  if(type !== 'FEEDBACK-CHART') {
    chartType = 'BUG_REPORT';
  }
  const data = await getUserFeedbackListForChart({type: chartType, prodId, prodVersion});
  return type === 'FEEDBACK-CHART' ? processFeedbackChartData(data) : processBugReportChartData(data);
};
