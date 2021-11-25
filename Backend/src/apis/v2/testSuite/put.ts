/*tslint:disable*/
import { API, Handler } from '@apis/index';
// import { getQuestionnaire, getQuestionnairesAssigned, getUserDocument } from '@root/utils/index';
import {
  responseBuilder,
  appLogger,
//   getTheLatestQuestionnaireVersion,
  // getTestSuitesId,
  publishQuestion
} from '@utils/index';
import { TestSuite } from '@models/index';
import { Response } from 'express';
import {
  updateTestSuite
} from '@root/utils/dynamoDb/testSuiteManagement';

interface PostTestSuite {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  body: {
    type: string;
    testSuite?: TestSuite;
  };
}

async function handler(request: PostTestSuite, response: Response) {
  const { body, headers } = request;
  console.log(request, "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  console.log(body,"bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", headers , "heaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddddders")
  try {
    if (body.type === 'update' && body.testSuite) {
      const create: TestSuite = body.testSuite;
      create.modifiedBy = headers.user.email;
      console.log(create, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
      // const latestTestSuite = await getTestSuitesId(
      //   create.id,
      // );
    //   let doVersionUpdate = false;

    //   if (create.questions && create.active) {
        // if (
        //   latestQuestionnaire.timeOut !== create.timeOut ||
        //   latestQuestionnaire.hideResult !== create.hideResult
        // ) {
        //   doVersionUpdate = true;
        // }
        // if (latestTestSuite.questions.length !== create.questions.length) {
        //   doVersionUpdate = true;
        // } else {
        //   Now checking if mapped categories are same too and the order of the questions too.
        //   create.questions.forEach((questionId: string, i: number) => {
        //     if (
        //       questionId !== latestTestSuite.questions[i] &&
        //       create.categoriesMap[questionId] !==
        //       latestTestSuite.categoriesMap[questionId]
        //     ) {
        //       doVersionUpdate = true;
        //     }
        //   });
        // }
    //   }

    //   if (doVersionUpdate) {
    //     create.version = (parseInt(latestVersion, 10) + 1).toString();
    //     create.active = false;
    //   }
      const done = await updateTestSuite(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        console.log(response, "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        return responseBuilder.internalServerError(err, response);
      }
      return responseBuilder.ok({ message: 'created' }, response);
    } else if (body.type === 'create' && body.testSuite) {
      const create: TestSuite = body.testSuite;
      create.createdBy = headers.user.email;
      create.modifiedBy = headers.user.email;
      // This block will be called only when the quesionnaire is updated while
      // mapping question for the first time, so giving the version 1
      //   create.version = '1';
      const done = await updateTestSuite(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        return responseBuilder.internalServerError(err, response);
      }
      return responseBuilder.ok({ message: 'created' }, response);
    } else if (body.type === 'publish' && body.testSuite) {
      const create: TestSuite = body.testSuite;
      if (
        body.testSuite &&
        body.testSuite.questions &&
        body.testSuite.questions.length === 0
      ) {
        const err = new Error(
          'Please map the questions to the testSuite before publishing.'
        );
        appLogger.error(
          err,
          'Please map the questions to the testSuite before publishing..'
        );
        return responseBuilder.badRequest(err, response);
      }
      create.publishedOn = Date.now();
      create.publishedBy = headers.user.email;
      const done = await updateTestSuite(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        return responseBuilder.internalServerError(err, response);
      }
      //also publish all the questions
      if (create.active && create.questions) {
        create.questions.forEach((questionId: string) =>
          publishQuestion(questionId)
        );
      }
      return responseBuilder.ok({ message: 'published' }, response);
    } else {
      const err = new Error('Internal error.');
      appLogger.error(err, 'Internal error.');
      return responseBuilder.internalServerError(err, response);
    }
  } catch (err) {
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(err, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/testSuite',
};
/*tslint:enable*/
