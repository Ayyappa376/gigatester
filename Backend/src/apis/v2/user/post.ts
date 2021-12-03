import { API, Handler } from '@apis/index';
import { UserInfo } from '@models/index';
import { appLogger, createUser, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostUsers {
  body: {
    user: UserInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostUsers, response: Response) {
  appLogger.info({ PostUsers: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can create users');
    return responseBuilder.forbidden(err, response);
  }

  if (body.user) {
    const err = new Error('BadRequest:Missing values');
    appLogger.error(err, 'User to create is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await createUser(body.user).catch(
    (e) => {
      appLogger.error({ err: e }, 'createUser');
      return { error: e.message ? e.message : 'User already exists' };
    }
  );
  appLogger.info({ createUser: ok });

  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/users',
};

// async function x(createData: any){
//     const ok = await createUser(createData, 'rachitjobs7@gmail.com').catch(e => {
//         // console.log({e});
//         return ({error : 'User already exists'});
//     });
//     return ok;
// }
// var t = {
//     id: 'TechnoBrad',
//     name: 'TechnoBrad'
// }
// x(t).then(res=>{
//   console.log(typeof(res),Object.keys(res), {res})
// //   if(res.Error){

// //   }
// }).catch(e=>{
//     console.log(e);
// })
