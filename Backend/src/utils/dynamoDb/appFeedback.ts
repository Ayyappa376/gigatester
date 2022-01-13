import { AppFeedback } from '@models/index';
import { IFeedbackType } from '@root/apis/v2/userFeedback/get';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { put, scan } from './sdk';

interface IParams {
  type?: IFeedbackType;
  search?: string;
  items?: number;
  filter?: string;
  filterType?: string;
  lastEvalKey?: string;
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
      TableName: TableNames.getAppFeedbackTableName(),
    });

    appLogger.info({ createAppFeedback_put_params: params });
    return put<AppFeedback>(params);
  };

  export const getappFeedbackList = async ({type, search, items, filter, filterType, lastEvalKey} : IParams): Promise<AppFeedback[]> => {
    let params: DynamoDB.ScanInput;
    if(!type) {
      params = <DynamoDB.ScanInput>{
        TableName: TableNames.getAppFeedbackTableName(),
      };
    } else {
      params = <DynamoDB.ScanInput>{
        TableName: TableNames.getAppFeedbackTableName(),
        ExpressionAttributeNames: {
          '#type': 'feedbackType',
        },
        ExpressionAttributeValues: { ':type': type },
        FilterExpression: '#type = :type',
      };
    }

    appLogger.info({ getAppFeedbackList_scan_params: params });
    return scan<AppFeedback[]>(params);
  };
