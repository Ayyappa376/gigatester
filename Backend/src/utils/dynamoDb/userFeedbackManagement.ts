//import { SeverityType } from '@models/index';
import { FeedbackType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName, getProductDetails } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
//import { ServerResponse } from 'http';
import { queryRaw } from './sdk';

interface Params {
  filterCategory?: string;
  filterRating?: string;
  filterSeverity?: string;
  items?: string;
  lastEvalKey?: string;
  lastEvalKeyCreatedOn?: string;
  lastEvalKeyfeedbackType?: string;
  lastEvalKeyId?: string;
  startDate?: string;
  endDate?: string;
  order?: string;
  prodId?: string;
  prodVersion?: string;
  search?: string;
  type?: FeedbackType;
}

interface GetChartDataProps {
  filterCategory?: string;
  filterRating?: string;
  filterSeverity?: string;
  prodId?: string;
  prodVersion?: string;
  type: FeedbackType;
  search?: string;
  startDate?: string;
  endDate?: string;
}

interface ItemsData {
  Items: AppFeedback[];
  LastEvaluatedKey: object;
  Count: number;
}

export interface ProcessedData {
  [key: string]: number;
}

export interface AppFeedback {
  bugPriority: string | string[];
  createdOn: number;
  feedbackCategory?: string | string[];
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

// const NUMBER_OF_DAYS_OF_FEEDBACK = 120;

export const getUserFeedbackList = async ({type, items, search, lastEvalKey, lastEvalKeyId, lastEvalKeyCreatedOn, lastEvalKeyfeedbackType, filterRating, startDate, endDate, filterSeverity, filterCategory, prodId, prodVersion, order}: Params): Promise<any[]> => {
    const params: DynamoDB.QueryInput = <DynamoDB.QueryInput>{
      TableName: getAppFeedbackTableName(),
    };

    const EAN: any = {};
    const EAV: any = {};
    let FE: string = '';

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
      for(let i = 0; i < rating.length; i += 1) {
        const el = rating[i];
        EAN['#rating'] = 'productRating';
        EAV[`:ratingVal${i}`] = parseInt(el, 10);
        if(i === 0) {
          if(rating.length === 1) {
            FE += FE ? ` and #rating = :ratingVal${i}` : `#rating = :ratingVal${i}`;
          } else {
            FE += FE ? ` and (#rating = :ratingVal${i}` : `(#rating = :ratingVal${i}`;
          }
        } else if(i === (rating.length - 1)) {
          FE += ` or #rating = :ratingVal${i})`;
        } else {
          FE += ` or #rating = :ratingVal${i}`;
        }
      }
    }

    if(filterSeverity) {
      const severity = filterSeverity.split(',');
      for(let i = 0; i < severity.length; i += 1) {
        const el = severity[i];
        EAN['#severity'] = 'bugPriority';
        EAV[`:severityVal${i}`] = el;
        if(i === 0) {
          if(severity.length === 1) {
            FE += FE ? ` and #severity = :severityVal${i}` : `#severity = :severityVal${i}`;
          } else {
            FE += FE ? ` and (#severity = :severityVal${i}` : `(#severity = :severityVal${i}`;
          }
        } else if(i === (severity.length - 1)) {
          FE += ` or #severity = :severityVal${i})`;
        } else {
          FE += ` or #severity = :severityVal${i}`;
        }
      }
    }

    if(filterCategory) {
      const categories = filterCategory.split(',');
      for(let i = 0; i < categories.length; i += 1) {
        const el = categories[i];
        EAN['#category'] = 'feedbackCategory';
        EAV[`:categoryVal${i}`] = el;
        if(i === 0) {
          if(categories.length === 1) {
            FE += FE ? ` and #category = :categoryVal${i}` : `#category = :categoryVal${i}`;
          } else {
            FE += FE ? ` and (#category = :categoryVal${i}` : `(#category = :categoryVal${i}`;
          }
        } else if(i === (categories.length - 1)) {
          FE += ` or #category = :categoryVal${i})`;
        } else {
          FE += ` or #category = :categoryVal${i}`;
        }
      }
    }

    if(search) {
      EAN['#comments'] = 'feedbackComments';
      EAN['#severity'] = 'bugPriority';
      EAN['#category'] = 'feedbackCategory';
      EAN['#platformInfo'] = 'platformInfo';
      EAN['#userId'] = 'userId';
      EAV[':keyWord'] = search;
      // FE += FE ? ' or contains(#comments, :keyWord)' : 'contains(#comments, :keyWord)';
      FE += FE ? ' and (contains(#userId, :keyWord) or contains(#platformInfo, :keyWord) or contains(#severity, :keyWord) or contains(#comments, :keyWord) or contains(#category, :keyWord))' : '(contains(#userId, :keyWord) or contains(#platformInfo, :keyWord) or contains(#severity, :keyWord) or contains(#comments, :keyWord) or contains(#category, :keyWord))';
    }

    // const today = new Date();
    // const lastDate = new Date().setDate(today.getDate() - NUMBER_OF_DAYS_OF_FEEDBACK);

    EAV[':type'] = type;
     // EAV[':startDate'] = startDate;

    if(FE) {
      params.FilterExpression = FE;
    }

    if(endDate && startDate) {
      const lastDate = new Date(parseInt(endDate, 10)).getTime();
      const beginDate = new Date(parseInt(startDate, 10)).getTime();
      EAV[':startDate'] = beginDate;
      EAV[':endDate'] = lastDate;
      params.KeyConditionExpression = 'feedbackType=:type AND createdOn BETWEEN :endDate AND :startDate';
    } else {
      params.KeyConditionExpression = 'feedbackType=:type';
    }

    if(Object.keys(EAN).length > 0) {
      params.ExpressionAttributeNames = EAN;
    }

    if(Object.keys(EAV).length > 0) {
      params.ExpressionAttributeValues = EAV;
    }
    //  AND createdOn>:lastDate';
    // "createdOn BETWEEN :startDate and :lastDate"
    params.ScanIndexForward = order && order === 'asc' ? true : false;
  params.IndexName = 'feedbackType-createdOn-index'; // Need to remove hardcoding, and name should be based on the subdomain.

    params.Limit = items ? parseInt(items, 10) : 100;

    if(lastEvalKeyCreatedOn && !lastEvalKey) {
      const exKeyStart: any = {
        createdOn: parseInt(lastEvalKeyCreatedOn,10),
        feedbackType: lastEvalKeyfeedbackType,
        id: lastEvalKeyId
      };
      params.ExclusiveStartKey = exKeyStart;
    } else if(lastEvalKey) {
      const exKeyStart: any = JSON.stringify(lastEvalKey);
      params.ExclusiveStartKey = exKeyStart;
    }

    appLogger.info('getUserFeedbackList: ', { params });
    return queryRaw<any>(params);

  };

export const getUserFeedbackItemList = async ({type, items, search, filterRating, startDate, endDate, filterSeverity, filterCategory, prodId, prodVersion, order}: Params): Promise<any[]> => {
  let feedback: any;
  let count: number = 0;
  let itemList: Set<any> = new Set();
  feedback = await getUserFeedbackList({type,items, search, prodId, prodVersion, order, filterRating, filterSeverity, filterCategory, startDate, endDate});
  let lastEvalKey: string = JSON.stringify(feedback.LastEvaluatedKey);
  while(lastEvalKey) {
    itemList = new Set([...itemList].concat(feedback.Items));
    count += feedback.Count;
    feedback = await getUserFeedbackList({type,items, search, lastEvalKey, prodId, prodVersion, order, filterRating, filterSeverity, filterCategory, startDate, endDate});
    lastEvalKey = feedback.LastEvaluatedKey ? JSON.stringify(feedback.LastEvaluatedKey) : '';
  }
  itemList = new Set([...itemList].concat(feedback.Items));
  count += feedback.Count;
  feedback.Count = count;
  feedback.Items = [...itemList];
  return feedback;
};

export const getUserFeedbackListForChart = async ({type, startDate, endDate, items, search, lastEvalKey, filterCategory, filterRating, filterSeverity, prodId, prodVersion}: Params): Promise<any> => {
    let params: DynamoDB.QueryInput = <DynamoDB.QueryInput>{
      TableName: getAppFeedbackTableName(),
    };
    const EAN: any = {};
    const EAV: any = {};
    let FE: string = '';

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
      for(let i = 0; i < rating.length; i += 1) {
        const el = rating[i];
        EAN['#rating'] = 'productRating';
        EAV[`:ratingVal${i}`] = parseInt(el, 10);
        if(i === 0) {
          if(rating.length === 1) {
            FE += FE ? ` and #rating = :ratingVal${i}` : `#rating = :ratingVal${i}`;
          } else {
            FE += FE ? ` and (#rating = :ratingVal${i}` : `(#rating = :ratingVal${i}`;
          }
        } else if(i === (rating.length - 1)) {
          FE += ` or #rating = :ratingVal${i})`;
        } else {
          FE += ` or #rating = :ratingVal${i}`;
        }
      }
    }

    if(filterSeverity) {
      const severity = filterSeverity.split(',');
      for(let i = 0; i < severity.length; i += 1) {
        const el = severity[i];
        EAN['#severity'] = 'bugPriority';
        EAV[`:severityVal${i}`] = el;
        if(i === 0) {
          if(severity.length === 1) {
            FE += FE ? ` and #severity = :severityVal${i}` : `#severity = :severityVal${i}`;
          } else {
            FE += FE ? ` and (#severity = :severityVal${i}` : `(#severity = :severityVal${i}`;
          }
        } else if(i === (severity.length - 1)) {
          FE += ` or #severity = :severityVal${i})`;
        } else {
          FE += ` or #severity = :severityVal${i}`;
        }
      }
    }

    if(search) {
      EAN['#comments'] = 'feedbackComments';
      EAN['#severity'] = 'bugPriority';
      EAN['#category'] = 'feedbackCategory';
      EAN['#platformInfo'] = 'platformInfo';
      EAN['#userId'] = 'userId';
      EAV[':keyWord'] = search;
      // FE += FE ? ' or contains(#comments, :keyWord)' : 'contains(#comments, :keyWord)';
      FE += FE ? ' and (contains(#userId, :keyWord) or contains(#platformInfo, :keyWord) or contains(#severity, :keyWord) or contains(#comments, :keyWord) or contains(#category, :keyWord))' : '(contains(#userId, :keyWord) or contains(#platformInfo, :keyWord) or contains(#severity, :keyWord) or contains(#comments, :keyWord) or contains(#category, :keyWord))';
    }

    if(filterCategory) {
      const categories = filterCategory.split(',');
      for(let i = 0; i < categories.length; i += 1) {
        const el = categories[i];
        EAN['#category'] = 'feedbackCategory';
        EAV[`:categoryVal${i}`] = el;
        if(i === 0) {
          if(categories.length === 1) {
            FE += FE ? ` and #category = :categoryVal${i}` : `#category = :categoryVal${i}`;
          } else {
            FE += FE ? ` and (#category = :categoryVal${i}` : `(#category = :categoryVal${i}`;
          }
        } else if(i === (categories.length - 1)) {
          FE += ` or #category = :categoryVal${i})`;
        } else {
          FE += ` or #category = :categoryVal${i}`;
        }
      }
    }

    if(FE) {
      params = {
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        FilterExpression: FE,
        TableName: getAppFeedbackTableName(),
      };
      EAV[':type'] = type;
      params.IndexName = 'feedbackType-createdOn-index';
      if(endDate && startDate) {
        // const today = new Date();
        // const lastDate = new Date().setDate(today.getDate() - 10);
        // const intEndDate = new Date(parseInt(endDate))
        const lastDate = new Date(parseInt(endDate, 10)).getTime();
        const beginDate = new Date(parseInt(startDate, 10)).getTime();
        EAV[':startDate'] = beginDate;
        EAV[':endDate'] = lastDate;
        params.KeyConditionExpression = 'feedbackType=:type AND createdOn BETWEEN :endDate and :startDate';
      } else {
        params.KeyConditionExpression = 'feedbackType=:type';
      }
    }
    appLogger.info({ getPlatformList_scan_params: params });
    return queryRaw<any[]>(params);
  };

// const convertFirstLetterToUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const feedbackProcessBarChartData = (items: AppFeedback[]) => {
  const ratingData: ProcessedData = {1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0};
  for(const item of items) {
    if(item.productRating /*&& (typeof item.productRating !== 'string')*/) {
        ratingData[item.productRating.toString()] += 1;
    }
  }
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

export const bugProcessBarChartData = async({data, prodId, prodVersion, chartType}: {chartType: string; data: AppFeedback[]; prodId?: string; prodVersion?: string}) => {
  if(prodId) {
  // const severities: string[] = await getSeveritiesList({prodId, prodVersion, chartType});
    const severityData: ProcessedData = {};
    // severities.forEach((el) => {
    //   severityData[el] = 0;
    // });
  //   if(data.length > 0) {
  //     data.forEach((item: any) => {
  //         if(item.bugPriority && (item.feedbackType === 'BUG_REPORT' || item.productRating === 0/* || (typeof item.productRating === undefined)*/)) {
  //             severityData[convertFirstLetterToUppercase(item.bugPriority)] = 0;
  //         }
  //     });
  // }
    if(data.length > 0) {
      const unknownKey = 'unknown';
      for(const item of data) {
        if((item.feedbackType === 'BUG_REPORT'/* || item.productRating === 0 || (typeof item.productRating === undefined)*/)) {
          if(Array.isArray(item.bugPriority)) {
            for(const priority of item.bugPriority) {
              if(priority === '') {
                if(severityData[unknownKey]) {
                  severityData[unknownKey] += 1;
                } else {
                  severityData[unknownKey] = 1;
                }
              } else {
                if(!severityData[priority]) {
                  severityData[priority] = 1;
                } else {
                  severityData[priority] += 1;
                }
              }
            }
          } else if(item.bugPriority && (item.bugPriority !== '')) {
            if(!severityData[item.bugPriority]) {
              severityData[item.bugPriority] = 1;
            } else {
              severityData[item.bugPriority] += 1;
            }
          } else {
            if(severityData[unknownKey]) {
              severityData[unknownKey] += 1;
            } else {
              severityData[unknownKey] = 1;
            }
          }
        }
      }
    }
    return severityData;
  }
  return {};
};

export const getCategoriesList = ({prodId, prodVersion, chartType}: {chartType: string; prodId: string; prodVersion: string}): Promise<string[]> => new Promise(async(resolve, reject) => {
    const categoryList: string[] = [];
    const productInfo = await getProductDetails(prodId, prodVersion);
    if (chartType === 'FEEDBACK') {
      if(productInfo && productInfo.feedbackAgentSettings && productInfo.feedbackAgentSettings.feedbackSettings && productInfo.feedbackAgentSettings.feedbackSettings.categories.length) {
        productInfo.feedbackAgentSettings.feedbackSettings.categories.map((el: any) => {
          categoryList.push(el.name);
        });
      }
    } else if (chartType === 'BUG_REPORT') {
      if(productInfo && productInfo.feedbackAgentSettings && productInfo.feedbackAgentSettings.bugSettings && productInfo.feedbackAgentSettings.bugSettings.categories.length) {
        productInfo.feedbackAgentSettings.bugSettings.categories.map((el: any) => {
          categoryList.push(el.name);
        });
      }
    }
    return resolve(categoryList);
  });

  export const getSeveritiesList = ({prodId, prodVersion, chartType}: {chartType: string; prodId: string; prodVersion: string}): Promise<string[]> => new Promise(async(resolve, reject) => {
    const severityList: string[] = [];
    const productInfo = await getProductDetails(prodId, prodVersion);
    if (chartType === 'BUG_REPORT') {
      if(productInfo && productInfo.feedbackAgentSettings && productInfo.feedbackAgentSettings.bugSettings && productInfo.feedbackAgentSettings.bugSettings.severities.length) {
        productInfo.feedbackAgentSettings.bugSettings.severities.map((el: any) => {
          severityList.push(el);
        });
      }
    }
    return resolve(severityList);
  });

export const processPieChartData = async({data, prodId, prodVersion, chartType, filterCategory}: {chartType: string; data: AppFeedback[]; prodId?: string; prodVersion?: string, filterCategory?:string}) => {
  if(prodId) {
    // const categories: string[] = await getCategoriesList({prodId, prodVersion, chartType});
    const categoryData: ProcessedData = {};
    if(data.length > 0) {
      const unknownKey = 'unknown';
      for(const item of data) {
        if(Array.isArray(item.feedbackCategory)) {
          for(const category of item.feedbackCategory) {
            if(category === '') {
              if(categoryData[unknownKey]) {
                categoryData[unknownKey] += 1;
              } else {
              categoryData[unknownKey] = 1;
              }
            } else {
              if(!categoryData[category]) {
                categoryData[category] = 1;
              } else {
                categoryData[category] += 1;
              }
            }
          }
        } else if(item.feedbackCategory && (item.feedbackCategory !== '')) {
          if(filterCategory){
            let feedbackComments = typeof item?.feedbackComments === 'string' ? JSON.parse(item?.feedbackComments) : item?.feedbackComments;            
            let comments = feedbackComments?.standardFeedback ? feedbackComments.standardFeedback : feedbackComments[item.feedbackCategory] ? feedbackComments[item.feedbackCategory] : [];            
            if(comments.length > 0){
              for(const comment of comments) {
                let name = item.feedbackCategory+' - '+comment
                if(!categoryData[name]) {
                  categoryData[name] = 1; 
                } else {                
                  categoryData[name] += 1; 
                }
              }
            } else{
              if(categoryData[unknownKey]) {
                categoryData[unknownKey] += 1;
              } else {
                categoryData[unknownKey] = 1;
              }
            } 
          } else {
            if(!categoryData[item.feedbackCategory]) {
              categoryData[item.feedbackCategory] = 1;
            } else {
              categoryData[item.feedbackCategory] += 1;
            }
          }
        } else {
          if(categoryData[unknownKey]) {
            categoryData[unknownKey] += 1;
          } else {
          categoryData[unknownKey] = 1;
          }
        }
      }
    }
    return categoryData;
  }
  return {};
};

const processFeedbackChartData = async({data, prodId, prodVersion, chartType, filterCategory}: {chartType: string; data: AppFeedback[]; prodId?: string; prodVersion?: string, filterCategory?: string})  => {
  const barChartData = feedbackProcessBarChartData(data);
  const pieChartData = await processPieChartData({data, prodId, prodVersion, chartType, filterCategory});
  return {
    barChartData, pieChartData
  };
};

const processBugReportChartData = async({data, prodId, prodVersion, chartType, filterCategory}: {chartType: string; data: AppFeedback[]; prodId?: string; prodVersion?: string, filterCategory?:string}) => {
  const barChartData = await bugProcessBarChartData({data, prodId, prodVersion, chartType});
  const pieChartData = await processPieChartData({data, prodId, prodVersion, chartType, filterCategory});
  return {
    barChartData, pieChartData
  };
};

export const getChartData = async({type, prodId,search, prodVersion, startDate, filterCategory, filterRating, filterSeverity, endDate}: GetChartDataProps) => {
  let chartType: FeedbackType = 'FEEDBACK';
  if(type !== 'FEEDBACK-CHART') {
    chartType = 'BUG_REPORT';
  }
  const itemList: ItemsData = await getUserFeedbackListForChart({type: chartType, prodId, prodVersion, search, filterCategory, filterRating, filterSeverity, startDate, endDate});
  const data: AppFeedback[] = itemList.Items;
  return type === 'FEEDBACK-CHART' ? processFeedbackChartData({data, prodId, prodVersion, chartType, filterCategory}) : processBugReportChartData({data, prodId, prodVersion, chartType, filterCategory});
};
