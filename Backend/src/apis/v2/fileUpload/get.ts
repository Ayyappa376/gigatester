import { API, Handler } from '@apis/index';
import { appLogger, getSoftware, getSoftwaresList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetSoftware {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    contentType: string;
    fileKey: string;
    uploadKey: string;
  };
}

async function handler(request: GetSoftware, response: Response) {
  appLogger.info({ GetSoftwareConfig: request }, 'Inside Handler');
  const { headers } = request;
  const { params } = request;

  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }

  if (params.fileKey) {
    const software: any = await getSoftware(params.fileKey);
    appLogger.info({ getSoftware: software });
    return responseBuilder.ok(software, response);
  }

  const softwaresList: any = await getSoftwaresList();
  appLogger.info({ getListOfSoftwares: softwaresList });
  return responseBuilder.ok(softwaresList, response);
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'get',
    route: '/api/v2/file/:fileKey?',
};
