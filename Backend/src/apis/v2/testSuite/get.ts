import { API, Handler } from '@apis/index';
import { TestSuite } from '@models/index';
import {
  getTestSuites,
  getTestSuitesId,
} from '@root/utils/index';
import { appLogger, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetTestSuites {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  query: {
    latest: boolean;
    id: string;
    // questionnaireVersion: string;
    status: string;
  };
}

/*
  Fetches testSuites from the testSuites table
  - If requestUrl is /api/v2/questionnaire, then
    - If the query has questionnaireId and questionnaireVersion, send the test suites with that particular Id and version.
    - If the query has latest=true, send only the latest version of the test suites.
    - If the user is Admin, then
      - If query is 'status=all', fetch all testSuites from the testSuites table
      - If no query or query is 'status=active', fetch only active testSuites from the questionaires table
    - If the user not Admin, then fetch only the testSuites assigned to the team the user belongs to.
*/
async function handler(request: GetTestSuites, response: Response) {
  appLogger.info({ GetTestSuites: request }, 'Inside Handler');

  try {
    if (request.query.id && request.query.id !== '') {
      const testSuite = await getTestSuitesId(
        request.query.id,
        // request.query.questionnaireVersion
      );
      appLogger.info({ getTestSuitesId: testSuite });
      return responseBuilder.ok(testSuite, response);
    }

    const { user } = request.headers;
    const status = request.query.status ? request.query.status : 'active';
    const latest = request.query.latest ? request.query.latest : false;
    const fetchTestSuitesList =
      status === 'all'
        ? await getTestSuites(true)
        : await getTestSuites(false);
    appLogger.info({ getQuestionnaire: fetchTestSuitesList });
    const getTestSuitesList: TestSuite[] = [];

    // Filling the getQuestionnaireList based on the latest flag.
    for (const testSuite of fetchTestSuitesList) {
      if (latest) {
        let itemExist = false;
        getTestSuitesList.forEach((el: any, i: number) => {
          if (el.id === testSuite.id) {
            itemExist = true;
            getTestSuitesList[i] = testSuite;
          }
        });
        if (!itemExist) {
            getTestSuitesList.push(testSuite);
        }
      } else {
        getTestSuitesList.push(testSuite);
      }
    }

    getTestSuitesList.sort((a: TestSuite, b: TestSuite) => {
      const aStr = a.name.toLowerCase();
      const bStr = b.name.toLowerCase();
      return aStr.localeCompare(bStr);
    });

    if (user['cognito:groups'][0] === 'Admin') {
      return responseBuilder.ok(getTestSuitesList, response);
    }
  } catch (err) {
    const error = new Error("Internal Server Error")
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(error, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/testSuite/:id?',
};
