import { API, Handler } from '@apis/index';
import {
  QuestionnaireUpdate,
  updateQuestionnaire,
} from '@root/utils/dynamoDb/questionnaireManagement';
import {
  appLogger,
  getQuestionnaireId,
  getTheLatestQuestionnaireVersion,
  publishQuestion,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

interface PostQuestionnaire {
  body: {
    questionnaire?: QuestionnaireUpdate;
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

async function handler(request: PostQuestionnaire, response: Response) {
  const { body, headers } = request;
  try {
    if (body.type === 'update' && body.questionnaire) {
      const create: QuestionnaireUpdate = body.questionnaire;
      create.modifiedBy = headers.user.email;
      const latestVersion = await getTheLatestQuestionnaireVersion(
        create.questionnaireId
      );
      const latestQuestionnaire = await getQuestionnaireId(
        create.questionnaireId,
        latestVersion
      );
      let doVersionUpdate = false;

      if (create.questions && create.active) {
        if (
          latestQuestionnaire.timeOut !== create.timeOut ||
          latestQuestionnaire.hideResult !== create.hideResult
        ) {
          doVersionUpdate = true;
        }
        if (latestQuestionnaire.questions.length !== create.questions.length) {
          doVersionUpdate = true;
        } else {
          // Now checking if mapped categories are same too and the order of the questions too.
          create.questions.forEach((questionId: string, i: number) => {
            if (
              questionId !== latestQuestionnaire.questions[i] &&
              create.categoriesMap[questionId] !==
                latestQuestionnaire.categoriesMap[questionId]
            ) {
              doVersionUpdate = true;
            }
          });
        }
      }

      if (doVersionUpdate) {
        create.version = (parseInt(latestVersion, 10) + 1).toString();
        create.active = false;
      }
      const done = await updateQuestionnaire(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        return responseBuilder.internalServerError(err, response);
      }
      return responseBuilder.ok({ message: 'created' }, response);
    }

    if (body.type === 'create' && body.questionnaire) {
      const create: QuestionnaireUpdate = body.questionnaire;
      create.createdBy = headers.user.email;
      create.modifiedBy = headers.user.email;
      // This block will be called only when the quesionnaire is updated while
      // mapping question for the first time, so giving the version 1
      create.version = '1';
      const done = await updateQuestionnaire(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        return responseBuilder.internalServerError(err, response);
      }
      return responseBuilder.ok({ message: 'created' }, response);
    }

    if (body.type === 'publish' && body.questionnaire) {
      const create: QuestionnaireUpdate = body.questionnaire;
      if (
        body.questionnaire &&
        body.questionnaire.questions &&
        body.questionnaire.questions.length === 0
      ) {
        const err = new Error(
          'Please map the questions to the questionnaire before publishing.'
        );
        appLogger.error(
          err,
          'Please map the questions to the questionnaire before publishing..'
        );
        return responseBuilder.badRequest(err, response);
      }
      create.publishedOn = Date.now();
      create.publishedBy = headers.user.email;
      const done = await updateQuestionnaire(create);
      if (done) {
        const err = new Error('Internal error.');
        appLogger.error(err, 'Internal error.');
        return responseBuilder.internalServerError(err, response);
      }
      //also publish all the questions
      if (create.active && create.questions) {
        create.questions.forEach(publishQuestion);
      }
      return responseBuilder.ok({ message: 'published' }, response);
    }

    const err1 = new Error('Internal error.');
    appLogger.error(err1, 'Internal error.');
    return responseBuilder.internalServerError(err1, response);

  } catch (error) {
    appLogger.error(error, 'Internal Server Error');
    responseBuilder.internalServerError(new Error('Error encountered while saving questionnaire'), response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/questionnaire',
};
