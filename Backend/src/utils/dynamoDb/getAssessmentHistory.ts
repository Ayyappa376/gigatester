import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { AssessmentDocument } from './createNewAssessmentDocument';
import { getQuestionnaire } from './getQuestionnaire';
import { scan } from './sdk';

// AWS.config.update({
//   region: 'us-east-1',
//   endpoint: 'http://localhost:8000',
// });

function getStartOfMonth(): number {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  // date.setMonth(date.getMonth() - 3);
  date.setDate(1);
  date.setHours(0, 0, 0);
  return date.getTime();
}

function getAssessmentResultByQuestionnaire(
  team: string | undefined,
  questionnaireId: string | undefined,
  questionnaireVersion: string | undefined
) {
  const version = questionnaireVersion ? questionnaireVersion : '1';

  return <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#id': 'type',
      '#version': 'questionnaireVersion',
      // '#team': 'team',
    },
    ExpressionAttributeValues: {
      ':id': questionnaireId,
      ':version': version,
      // ':team': team,
    },
    FilterExpression: '#id = :id and #version = :version',
    Limit: Number.MAX_SAFE_INTEGER,
    TableName: TableNames.getAssessmentsTableName(),
  };
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
      date: {
        AttributeValueList: [getStartOfMonth()],
        ComparisonOperator: 'GE',
      },
      userId: {
        AttributeValueList: [userId],
        ComparisonOperator: 'EQ',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getTeamTypeParamsWithQuestionnaireId(
  teamMembers: string[] | undefined,
  questionnaireId: string | undefined,
  questionnaireVersion: string | undefined
) {
  if (!teamMembers || !questionnaireId) {
    throw new Error('teamMembers/questionnaireId missing');
  }
  const version = questionnaireVersion ? questionnaireVersion : '1';

  return <DynamoDB.ScanInput>{
    ScanFilter: {
      date: {
        AttributeValueList: [getStartOfMonth()],
        ComparisonOperator: 'GE',
      },
      questionnaireVersion: {
        AttributeValueList: [version],
        ComparisonOperator: 'EQ',
      },
      result: {
        ComparisonOperator: 'NOT_NULL',
      },
      type: {
        AttributeValueList: [questionnaireId],
        ComparisonOperator: 'EQ',
      },
      userId: {
        AttributeValueList: teamMembers,
        ComparisonOperator: 'IN',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getTeamNameTypeParamsWithQuestionnaireId(
  team: string | undefined,
  questionnaireId: string | undefined,
  questionnaireVersion: string | undefined
) {
  const version = questionnaireVersion ? questionnaireVersion : '1';

  return <DynamoDB.ScanInput>{
    ScanFilter: {
      date: {
        AttributeValueList: [getStartOfMonth()],
        ComparisonOperator: 'GE',
      },
      questionnaireVersion: {
        AttributeValueList: [version],
        ComparisonOperator: 'EQ',
      },
      result: {
        ComparisonOperator: 'NOT_NULL',
      },
      team: {
        AttributeValueList: [team],
        ComparisonOperator: 'EQ',
      },
      type: {
        AttributeValueList: [questionnaireId],
        ComparisonOperator: 'EQ',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getTypeParamsWithQuestionnaireId(
  questionnaireId: string | undefined,
  questionnaireVersion: string | undefined
) {
  if (!questionnaireId) {
    throw new Error('questionnaireId missing');
  }
  const version = questionnaireVersion ? questionnaireVersion : '1';

  return <DynamoDB.ScanInput>{
    ScanFilter: {
      date: {
        AttributeValueList: [getStartOfMonth()],
        ComparisonOperator: 'GE',
      },
      questionnaireVersion: {
        AttributeValueList: [version],
        ComparisonOperator: 'EQ',
      },
      result: {
        ComparisonOperator: 'NOT_NULL',
      },
      type: {
        AttributeValueList: [questionnaireId],
        ComparisonOperator: 'EQ',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getTypeParamsForFeedback() {
  return <DynamoDB.ScanInput>{
    ScanFilter: {
      feedback: {
        ComparisonOperator: 'NOT_NULL',
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

function getTeamNameTypeParams(team: string | undefined) {
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
      team: {
        AttributeValueList: [team],
        ComparisonOperator: 'EQ',
      },
    },
    TableName: TableNames.getAssessmentsTableName(),
  };
}

function getParamsByTeam(type: string, teamMembers: string[]) {
  const EAV = {};
  teamMembers.forEach(function (value: any, index: number) {
    const titleKey = ':member' + index;
    EAV[titleKey.toString()] = value;
  });
  EAV[':type'] = type;
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#type': 'type',
      '#user': 'userId',
    },
    ExpressionAttributeValues: EAV,
    FilterExpression: `#type = :type and #user IN (${Object.keys(
      EAV
    ).toString()})`,
    TableName: TableNames.getAssessmentsTableName(),
  };
  return params;
}

function getParamsByQuestionnaire(type: string) {
  const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#type': 'type',
    },
    ExpressionAttributeValues: {
      ':type': type,
    },
    FilterExpression: '#type = :type',
    TableName: TableNames.getAssessmentsTableName(),
  };
  return params;
}

//Fetch Assessments for a 'user' or for 'team' or all user and team belonging to a 'manager'
export const getAssessmentHistory = async ({
  questionnaireId,
  questionnaireVersion,
  team,
  teamMembers,
  type,
  userId,
}: {
  questionnaireId?: string;
  questionnaireVersion?: string;
  team?: string;
  teamMembers?: string[];
  type: string;
  userId: string;
}): Promise<any> => {
  if (!type) {
    const err = new Error('type missing');
    appLogger.error(err);
    throw err;
  }

  const questionnaireDetails: any = await getQuestionnaire(true);
  appLogger.info({ getQuestionnaire: questionnaireDetails });
  const questionnaireMap = {};
  // console.log(questionnaireDetails);
  questionnaireDetails.forEach((questionnaire: any) => {
    questionnaireMap[questionnaire.questionnaireId] = questionnaire.name;
  });
  // console.log(questionnaireMap);
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
      // Here we require team members
      params = getTeamTypeParams(teamMembers);
      break;
    case 'team_name':
      // Here we require team name
      params = getTeamNameTypeParams(team);
      break;
    case 'qid':
      //get all assessment for a questionnaireId used in dashboard
      params = getTeamTypeParamsWithQuestionnaireId(
        teamMembers,
        questionnaireId,
        questionnaireVersion
      );
      break;
    case 'qid_team':
      //get all assessment for a questionnaireId and a team used in dashboard
      params = getTeamNameTypeParamsWithQuestionnaireId(
        team,
        questionnaireId,
        questionnaireVersion
      );
      break;
    case 'qid_teams':
      //get all assessment for a questionnaireId and a team used in dashboard
      params = getAssessmentResultByQuestionnaire(
        team,
        questionnaireId,
        questionnaireVersion
      );
      break;
    case 'all_teams':
      //get all assessment for a questionnaireId for all the teams used in dashboard
      params = getTypeParamsWithQuestionnaireId(
        questionnaireId,
        questionnaireVersion
      );
      break;
    case 'feedback':
      //get all assessment containing feedback
      params = getTypeParamsForFeedback();
      break;
    default:
      throw new Error('Invalid type');
  }
  const strLiteral = 'assessmentName';
  appLogger.info({ getAssessmentHistory_scan_params: params });
  return scan<AssessmentDocument[]>(params).then((assessmentDocuments: any) =>
    assessmentDocuments.map((assessmentDocument: any) => {
      if (questionnaireId) {
        delete assessmentDocument.result.recommendations;
      }
      assessmentDocument[strLiteral] =
        questionnaireMap[assessmentDocument.type];

      return assessmentDocument;
    })
  );
};

export const getAssessmentByQuestionnaire = async ({
  type,
  questionnaireId,
  teamMembers,
}: {
  questionnaireId: string;
  teamMembers?: string[];
  type: string;
}): Promise<any> => {
  if (!type) {
    throw new Error('type missing');
  }

  const questionnaireDetails: any = await getQuestionnaire(true);
  const questionnaireMap = {};
  // console.log(questionnaireDetails);
  questionnaireDetails.forEach((questionnaire: any) => {
    questionnaireMap[questionnaire.questionnaireId] = questionnaire.name;
  });
  // console.log(questionnaireMap);
  let params: DynamoDB.ScanInput;
  switch (type) {
    case 'byTeam':
      params = teamMembers
        ? getParamsByTeam(questionnaireId, teamMembers)
        : getParamsByQuestionnaire(questionnaireId);
      break;
    default:
      throw new Error('Invalid type');
  }
  const strLiteral = 'assessmentName';
  return scan<AssessmentDocument[]>(params).then((assessmentDocuments: any) =>
    assessmentDocuments.map((assessmentDocument: any) => {
      assessmentDocument[strLiteral] =
        questionnaireMap[assessmentDocument.type];
      return assessmentDocument;
    })
  );
};
