import { API, Handler } from '@apis/index';
import { DeviceInfo } from '@models/index';
import { appLogger, createDevice, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostDevices {
  body: {
    devices: DeviceInfo[];
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostDevices, response: Response) {
  appLogger.info({ PostDevices: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can create devices');
    return responseBuilder.forbidden(err, response);
  }

  if (body.devices.length < 1) {
    const err = new Error('BadRequest:Missing values');
    appLogger.error(err, 'Device to create is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await createDevice(body.devices[0], headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createDevice');
      return { error: e.message ? e.message : 'Device already exists' };
    }
  );
  appLogger.info({ createDevice: ok });

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
  route: '/api/v2/devices',
};

// async function x(createData: any){
//     const ok = await createDevice(createData, 'rachitjobs7@gmail.com').catch(e => {
//         // console.log({e});
//         return ({error : 'Device already exists'});
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
