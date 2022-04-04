import { API, Handler } from '@apis/index';
import {
  appLogger,
  getJIRASeverityDetails,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';


export type ExternalSystemType = 'JIRA';

interface ExternalTrackingSystemRequest {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    type: ExternalSystemType;
  };
  query: {
    appToken: string;
    email: string;
    url: string;
  };
}

async function handler(
  request: ExternalTrackingSystemRequest,
  response: Response
): Promise<any> {
  appLogger.info({ ExternalTrackingSystemRequest: request }, 'Inside Handler');
  const { headers, params, query } = request;
  const {type} = params;
  const {email, appToken, url} = query;
//  const { user: { email: userId } } = headers;
  if (!headers.user) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Forbidden');
    return responseBuilder.forbidden(err, response);
  }

  try {
    let severity: string[] = [];
    const auth = {
      appToken,
      email,
    };
    const externalSystemUrl = url;
    if(type) {
      severity = await getJIRASeverityDetails(auth, externalSystemUrl);
      console.log(severity, 'severrity');
      return responseBuilder.ok({Severity: severity }, response);
    }
    return responseBuilder.ok({Severity: severity }, response);
  } catch(err) {
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(<Error>err, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/externalTrackingSystem/:type?',
};
