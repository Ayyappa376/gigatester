import { AppFeedback } from '@models/index';
import { FeedbackType } from '@root/apis/v2/userFeedback/get';
import { appLogger, getAppFeedbackTableName } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { put, scan } from './sdk';

interface Params {
  filter?: string;
  filterType?: string;
  items?: number;
  lastEvalKey?: string;
  search?: string;
  type?: FeedbackType;
}

export const createAppFeedback = async (
    data: AppFeedback
  ): Promise<AppFeedback> => {
    const newAppFeedback: AppFeedback = {
     createdOn: Date.now(),
     feedbackComment: data.feedbackComment,
     id: `feedback_${uuidv1()}`,
     productId: data.productId,
     productRating: data.productRating,
     productVersion: data.productVersion,
     userId: data.userId
    };
    console.log(newAppFeedback);
    const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
      Item: newAppFeedback,
      TableName: getAppFeedbackTableName(),
    });

    appLogger.info({ createAppFeedback_put_params: params });
    return put<AppFeedback>(params);
  };

  export const getappFeedbackList = async ({type, search, items, filter, filterType, lastEvalKey}: Params): Promise<AppFeedback[]> => {
    let params: DynamoDB.ScanInput;
    if(!type) {
      params = <DynamoDB.ScanInput>{
        TableName: getAppFeedbackTableName(),
      };
    } else {
      params = <DynamoDB.ScanInput>{
        ExpressionAttributeNames: {
          '#type': 'feedbackType',
        },
        ExpressionAttributeValues: { ':type': type },
        FilterExpression: '#type = :type',
        TableName: getAppFeedbackTableName(),
      };
    }

    appLogger.info({ getAppFeedbackList_scan_params: params });
    return scan<AppFeedback[]>(params);
  };
