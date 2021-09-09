import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { AssessmentDocument } from './createNewAssessmentDocument';

import { scan } from './sdk';

function getStartOfMonth(): number {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  date.setDate(1);
  date.setHours(0, 0, 0);
  return date.getTime();
}

function getUserTypeParams(userId: string): DynamoDB.ScanInput {
  if (!userId) {
    const err = new Error('userId missing');
    appLogger.error(err);
    throw err;
  }

  return <DynamoDB.ScanInput>{
    Limit: Number.MAX_SAFE_INTEGER,
    ScanFilter: {
      userId: {
        AttributeValueList: [userId],
        ComparisonOperator: 'EQ',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getTeamTypeParams(teamMembers: string[] | undefined) {
  if (!teamMembers) {
    const err = new Error('teamMembers missing');
    appLogger.error(err);
    throw err;
  }

  return <DynamoDB.ScanInput>{
    Limit: Number.MAX_SAFE_INTEGER,
    ScanFilter: {
      date: {
        AttributeValueList: [getStartOfMonth()],
        ComparisonOperator: 'GE',
      },
      result: {
        ComparisonOperator: 'NOT_NULL',
      },
      userId: {
        AttributeValueList: teamMembers,
        ComparisonOperator: 'IN',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

const getAssessmentHistory = async ({
  userId,
  type,
  teamMembers,
}: {
  teamMembers?: string[];
  type: string;
  userId: string;
}): Promise<any> => {
  if (!type) {
    const err = new Error('type missing');
    appLogger.error(err);
    throw err;
  }

  let params: DynamoDB.ScanInput;

  switch (type) {
    case 'user':
      params = getUserTypeParams(userId);
      break;
    case 'manager':
      // params = getManagerTypeParams();
      params = getTeamTypeParams(teamMembers);
      break;
    case 'team':
      params = getTeamTypeParams(teamMembers);
      break;
    default:
      throw new Error('Invalid type');
  }

  appLogger.info({ getAssessmentHistory_scan_params: params });
  return scan<AssessmentDocument[]>(params);
};

//TODO: CHECK for an incomplete/pending assessment for a partcular questionnaire
export const checkForOldAssessment = async ({
  userId,
  type,
  teamMembers,
  quesType,
  team,
}: {
  quesType?: string;
  team: string;
  teamMembers?: string[];
  type: string;
  userId: string;
}): Promise<any> => {
  if (!type) {
    const err = new Error('type missing');
    appLogger.error(err);
    throw err;
  }
  const check = await getAssessmentHistory({ userId, type });
  appLogger.info({ getAssessmentHistory: check });
  for (const a of check) {
    //tslint:disable-next-line:strict-comparisons
    if (
      !a.result &&
      Object.keys(a.assessmentDetails).length >= 0 &&
      a.type === quesType &&
      team === a.team
    ) {
      return a;
    }
  }
  return false;
};
