import { API, Handler } from '@apis/index';
import {
  appLogger,
  getJIRADetails,
  responseBuilder,
} from '@utils/index';
import { Response } from 'express';

export type FilterType = 'category' | 'rating' | 'keyword' | 'severity';

export type ExternalSystemType = 'JIRA' | 'BUG_REPORT' | 'FEEDBACK-CHART' | 'BUG-REPORT-CHART';

interface ExternalTrackingSystemRequest {
  body: any;
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

}

async function handler(
  request: ExternalTrackingSystemRequest,
  response: Response
): Promise<any> {
  appLogger.info({ ExternalTrackingSystemRequest: request }, 'Inside Handler');
  const { headers, params, body } = request;
  const {type} = params;
  console.log(body, 'bodyyyyyyy')
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
    let auth = body.auth;
    let externalSystemUrl = body.externalSystemUrl;
    if(type) {
      severity = await getJIRADetails(auth, externalSystemUrl);
      console.log(severity, 'severrity');
      return responseBuilder.ok({Severity: severity }, response);
    }
    // put a log here
    else{
    return responseBuilder.ok({Severity: severity }, response);
    }
  } catch (err) {
    appLogger.error(err, 'Internal Server Error');
    responseBuilder.internalServerError(<Error>err, response);
  }
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/externalTrackingSystem/:type?',
};
