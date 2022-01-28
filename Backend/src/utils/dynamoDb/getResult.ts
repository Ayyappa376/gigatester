import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, AssessmentDocument } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { get } from './sdk';

export const getResult = async ({
  assessmentId,
  userId,
}: {
  assessmentId: string;
  userId: string;
}): Promise<AssessmentDocument> => {
  if (!userId || !assessmentId) {
    const err = new Error('Missing userId or assessmentId');
    appLogger.error(err);
    throw err;
  }

  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      assessmentId,
      userId,
    },
    TableName: TableNames.getAssessmentsTableName(),
  });

  appLogger.info({ getResult_get_params: params });
  return get<AssessmentDocument>(params);
};
