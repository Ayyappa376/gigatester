/*tslint:disable*/
import { API, Handler } from '@apis/index';
import { Question } from '@models/index';
import { updateQuestion, appLogger, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface UpdateQuestion {
  body: Question;
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: UpdateQuestion, response: Response) {
  appLogger.info({ UpdateQuestion: request }, 'Inside Handler');

  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  const createData: Question = body;

  const ok: any = await updateQuestion(createData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateQuestion');
      return { error: e.message ? e.message : 'Question already exists' };
    }
  );
  appLogger.info({ updateQuestion: ok });

  /*    const oldQuestionId = createData.id;
    const arr: string[] = createData.id.split('_');
    let ver: string = '';
    if (arr.length <= 1) {
        ver = '1';
        createData.id = `ques_${createData.id}_${ver}`;
        createData.version = ver;
    } else {
        ver = (parseInt(arr[2]) + 1).toString();
        createData.id = `${arr[0]}_${arr[1]}_${ver}`;
        createData.version = ver;
    }
    // createData.questionnaireAttached = '0000';
    console.log(createData.id);

    const ok: any = await addQuestion(createData).catch((e) => {
        appLogger.error({ err: e }, 'createQuestion');
        return { error: e.message ? e.message : 'Internal Error' };
    });
    appLogger.info({ createTeam: ok });

    // Now we need to get all the questionnaires and update them with the updated
    // Question id if the question is mapped to the assessment
    // parameter true is passed to fetch all the questions
    const allQuestionnaires = await getQuestionnaire(true);
    const questionnairesUpdated: string[] = [];
    allQuestionnaires.forEach(async(questionnaire: any) => {
        if (!questionnairesUpdated.includes(questionnaire.questionnaireId)) {
            const questionIndex = questionnaire.questions.indexOf(oldQuestionId);
            if(questionIndex >= 0) {
                questionnaire.questions[questionIndex] = createData.id;
                const create: QuestionnaireUpdate = questionnaire;
                create.modifiedBy = headers.user.email;
                create.version = await getTheLatestQuestionnaireVersion(questionnaire.questionnaireId);
                const done = await updateQuestionnaire(create);
                questionnairesUpdated.push(questionnaire.questionnaireId);
                appLogger.info({'questionnaire_update_status:': done});
            }
        }
    })
*/
  if (ok && ok.error) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/admin/createquestion',
};
/*tslint:enable*/
// async function x(createData: any){
//     const ok = await createTeam(createData, 'rachitjobs7@gmail.com').catch(e => {
//         // console.log({e});
//         return ({error : 'Team already exists'});
//     });
//     return ok;
// }
// var t = {
//     teamId: 'TechnoBrad',
//     teamName: 'TechnoBrad'
// }
// x(t).then(res=>{
//   console.log(typeof(res),Object.keys(res), {res})
// //   if(res.Error){

// //   }
// }).catch(e=>{
//     console.log(e);
// })
