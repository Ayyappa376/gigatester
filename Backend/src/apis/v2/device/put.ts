import { API, Handler } from '@apis/index';
import { DeviceInfo } from '@models/index';
import { appLogger, responseBuilder, updateDevice } from '@utils/index';
import { Response } from 'express';

interface PutDevices {
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

async function handler(request: PutDevices, response: Response) {
  appLogger.info({ PutDevices: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can update devices');
    return responseBuilder.forbidden(err, response);
  }

  if (body.devices.length < 1) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Device to update is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await updateDevice(body.devices[0], headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateDevice');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updateDevice: ok });
  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'put',
  route: '/api/v2/devices',
};
