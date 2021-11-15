import { API, Handler } from '@apis/index';
import { PlatformInfo } from '@models/index';
import { appLogger, createPlatform, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostPlatforms {
  body: {
    values: PlatformInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostPlatforms, response: Response) {
  appLogger.info({ AddPlatforms: request }, 'Inside Handler');

  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  const createData: PlatformInfo = body.values;
  if (
    headers.user['cognito:groups'][0] === 'Manager' ||
    (headers.user['cognito:groups'][0] === 'Admin' && !createData.manager)
  ) {
    createData.manager = headers.user.email;
  }
  const ok: any = await createPlatform(createData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createPlatform');
      return { error: e.message ? e.message : 'Platform already exists' };
    }
  );
  appLogger.info({ createPlatform: ok });

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
  route: '/api/v2/platforms',
};

// async function x(createData: any){
//     const ok = await createPlatform(createData, 'rachitjobs7@gmail.com').catch(e => {
//         // console.log({e});
//         return ({error : 'Platform already exists'});
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
