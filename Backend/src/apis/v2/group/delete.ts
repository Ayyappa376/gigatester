import { API, Handler } from '@apis/index';
import { appLogger, deleteGroup, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DelGroups {
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

//Deleting a group will delete the entire subtree under that group
async function handler(request: DelGroups, response: Response) {
  appLogger.info({ DelGroups: request }, 'Inside Handler');

  const { headers, params } = request;

  if (headers.user['cognito:groups'][0] !== 'Admin') {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admin can delete groups');
    return responseBuilder.forbidden(err, response);
  }

  if (!params.id) {
    const err = new Error('BadRequest: Missing params');
    appLogger.error(err, 'Group id to delete is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const resp: any = await deleteGroup(params.id);
  appLogger.info({ deleteGroup_Resp: resp });
  return responseBuilder.ok(resp, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'delete',
  route: '/api/v2/groups/:id',
};
