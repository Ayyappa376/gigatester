import { TestSuite } from '@models/index';
// import { generate } from '@utils/common';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { put, update } from './sdk';

// add new test suite
export const createTestSuite = async (
    data: TestSuite
  ): Promise<TestSuite> => {
    const newTestSuite: TestSuite = {
      active: false,
      categories: data.categories,
      categoriesMap: data.categoriesMap,
      createdBy: data.createdBy,
      createdOn: Date.now(),
      description: data.description || 'default',
      id: `testsuite_${uuidv1()}`,
      name: data.name,
      questions: data.questions || [],
      randomize: data.randomize
    //   hideResult: data.hideResult,
    //   benchmarkScore: data.benchmarkScore,
    //   showRecommendations: data.showRecommendations,
    //   timeOut: data.timeOut,
    //   timeOutTime: data.timeOutTime,
    //   version: '1',
    //   warningTimePercentage: data.warningTimePercentage,
    };
    const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
      Item: newTestSuite,
      TableName: TableNames.getTestSuitesTableName(),
    });

    appLogger.info({ createTestSuites_put_params: params });
    return put<TestSuite>(params);
  };

// fetch test suite info
//   export const getTestSuitesDetails = async (id: string): Promise<TestSuite> => {
//     const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
//       Key: {
//         id,
//       },
//       TableName: TableNames.getTestSuitesTableName(),
//     });
//     appLogger.info({ getCampaignDetails_get_params: params });
//     return get<TestSuite>(params);
//   };

export const updateTestSuite = async (
  data: TestSuite
): Promise<any> => {
  let SET = 'SET ';
  const EAN: any = {};
  const EAV: any = {};
  Object.keys(data).forEach((val: any, i: number) => {
    if (
      val !== 'id' &&
      val !== 'modifiedOn'
    ) {
      EAN[`#${val}`] = val;
      EAV[`:${val}`] = data[val];
      SET =
        SET.length === 4
          ? SET + `#${val} = :${val}`
          : SET + `, #${val} = :${val}`;
    }
  });
  EAN[`#modifiedOn`] = 'modifiedOn';
  EAV[`:modifiedOn`] = Date.now();
  SET = SET + `, #modifiedOn = :modifiedOn`;

  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      id: data.id,
    },
    TableName: TableNames.getTestSuitesTableName(),
    UpdateExpression: SET,
  });
  appLogger.info({ updateTestSuite_update_params: params });
  return update(params);
};

export const archiveTestSuite = async (data: any): Promise<any> => {
  const item: any = data;
  item.archiveId = item.id;
  item.id = `arch_${uuidv1()}`;
  item.archiveCreatedOn = Date.now();
  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    Item: item,
    TableName: TableNames.getTestSuitesTableName(),
  });

  appLogger.info({ archiveTestSuite_put_params: params });
  await put<DynamoDB.PutItemOutput>(params);
  return item.id;
};
