import { API, Handler } from '@apis/index';
import { TestSuite } from '@models/index';
import {
  appLogger,
  checktestSuiteNameExist,
  createTestSuite,
  getNewTestSuiteId,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

interface PostTestSuite {
  body: {
    testSuite?: TestSuite;
    type: string;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostTestSuite, response: Response) {
  const { body, headers } = request;
  try {
    if (body.type === 'create' && body.testSuite) {
      let id = '';
      body.testSuite.createdBy = headers.user.email;
      const isNameExist = await checktestSuiteNameExist(
        body.testSuite.name
      );
      if (isNameExist) {
        const error = new Error(
          'testSuite already exist. Please use a different name.'
        );
        appLogger.error(
          error,
          'testSuite already exist. Please use a different name.'
        );
        return responseBuilder.badRequest(error, response);
      }
      const done = await createTestSuite(body.testSuite);
      if (!done) {
        id = await getNewTestSuiteId(body.testSuite);
      }
      return responseBuilder.ok({ id }, response);
    }

    const err = new Error('Internal error.');
    appLogger.error(err, 'Bad Request');
    return responseBuilder.internalServerError(err, response);
  } catch (err) {
    const error = new Error('Internal Server error');
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(error, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/testSuite',
};
