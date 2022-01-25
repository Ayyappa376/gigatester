import { TestSuite } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
// import { QuestionnaireCreate } from './questionnaireManagement';
import { get, scan } from './sdk';

export const getTestSuites = async (
  fetchAll?: boolean
): Promise<TestSuite[]> => {
  let params = <DynamoDB.ScanInput>{
    Limit: Number.MAX_SAFE_INTEGER,
    TableName: TableNames.getTestSuitesTableName(),
  };
  if (fetchAll) {
    appLogger.info({ getQuestionnaire_fetchAll_scan_params: params });
    return scan<TestSuite[]>(params);
  }
  params = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#active': 'active',
    },
    ExpressionAttributeValues: {
      ':active': true,
    },
    FilterExpression: '#active = :active',
    Limit: Number.MAX_SAFE_INTEGER,
    TableName: TableNames.getTestSuitesTableName(),
  };
  appLogger.info({ getQuestionnaire_scan_params: params });
  return scan<TestSuite[]>(params);
};

export const getTestSuitesIds = async (
  id: string
): Promise<string[]> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id
    },
    TableName: TableNames.getTestSuitesTableName(),
  });
  appLogger.info({ getTestCaseIds_get_params: params });
  return get<TestSuite>(params).then((item) => item.questions);
};

export const getTestSuitesId = async (
  id: string,
//   version?: string
): Promise<TestSuite> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id
    },
    TableName: TableNames.getTestSuitesTableName(),
  });
  appLogger.info({ getTestSuitesId_get_params: params });
  return get<TestSuite>(params);
};

export const getNewTestSuiteId = async (data: TestSuite) => {
  const allTestSuite = await getTestSuites(true);
  let id = '';
  allTestSuite.forEach((element) => {
    if (element.name === data.name) {
      const date = Date.now();
      if (date - element.createdOn < 5000 && element.createdBy === data.createdBy) {
        id = element.id;
      }
    }
  });
  return id;
};

export const checktestSuiteNameExist = async (
  name: string
): Promise<any> => {
  const allTestSuite = await getTestSuites(true);
  let nameExist = false;
  allTestSuite.forEach((element) => {
    if (element.name === name) {
      nameExist = true;
    }
  });
  return nameExist;
};
export const getRandomize = async (
  testSuiteType: string,
) => {
  const testSuite= await getTestSuitesId(
    testSuiteType,
  );
  return testSuite.randomize ? testSuite.randomize : false;
};
