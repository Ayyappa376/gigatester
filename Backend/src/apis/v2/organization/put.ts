import { API, Handler } from '@apis/index';
import { OrganizationInfo } from '@models/index';
import { appLogger, responseBuilder, updateOrganization } from '@utils/index';
import { Response } from 'express';

interface PutOrganizations {
  body: {
    organization: OrganizationInfo;
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PutOrganizations, response: Response) {
  appLogger.info({ PutOrganizations: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can update organizations');
    return responseBuilder.forbidden(err, response);
  }

  if (body.organization) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Organization to update is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await updateOrganization(body.organization).catch(
    (e) => {
      appLogger.error({ err: e }, 'updateOrganization');
      return { error: e.message ? e.message : 'Invalid or Illegal inputs' };
    }
  );
  appLogger.info({ updateOrganization: ok });
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
  route: '/api/v2/organizations',
};
