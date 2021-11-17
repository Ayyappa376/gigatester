import { API, Handler } from '@apis/index';
import { appLogger, deactivateDevice, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelDevices {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id: string;
  };
}

async function handler(request: DelDevices, response: Response) {
  appLogger.info({ DelDevices: request }, 'Inside Handler');

  const { headers, params } = request;

  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can delete devices');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Device id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await deactivateDevice(params.id, headers.user.email);
  appLogger.info({ deactivateDevice_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/devices/:id',
};
