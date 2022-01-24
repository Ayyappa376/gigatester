import { API, Handler } from '@apis/index';
import { OrganizationInfo } from '@models/index';
import { appLogger, createOrganization, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostOrganizations {
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

async function handler(request: PostOrganizations, response: Response) {
  appLogger.info({ PostOrganizations: request }, 'Inside Handler');

  const { headers, body } = request;
  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can create organizations');
    return responseBuilder.forbidden(err, response);
  }

  if (!body.organization) {
    const err = new Error('BadRequest:Missing values');
    appLogger.error(err, 'Organization to create is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const ok: any = await createOrganization(body.organization).catch(
    (e) => {
      appLogger.error({ err: e }, 'createOrganization');
      return { error: e.message ? e.message : 'Organization already exists' };
    }
  );
  appLogger.info({ createOrganization: ok });

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
  route: '/api/v2/organizations',
};
