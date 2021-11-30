import { API, Handler } from '@apis/index';
import { appLogger, disableOrganization, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelOrganizations {
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

async function handler(request: DelOrganizations, response: Response) {
  appLogger.info({ DelOrganizations: request }, 'Inside Handler');

  const { headers, params } = request;

  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can delete organizations');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Organization id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await disableOrganization(params.id);
  appLogger.info({ deleteOrganization_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/organizations/:id',
};
