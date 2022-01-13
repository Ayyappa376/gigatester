import { API, Handler } from '@apis/index';
import { appLogger, deleteSoftware, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface DeleteSoftware {
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
    params: {
        fileName: string;
    };
}

async function handler(request: DeleteSoftware, response: Response) {
    appLogger.info({ GetFileConfig: request }, 'Inside Handler');
    const { headers } = request;
    const { params } = request;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }

    if (params.fileName) {
        deleteSoftware(params.fileName)
        .then((data: any) => {
            appLogger.info({ deleteSoftware: data });
            return responseBuilder.ok(data, response);
        })
        .catch((err) => {
            appLogger.error(err, 'deleteSoftware_error');
            return responseBuilder.internalServerError(new Error('Error deleting software'), response);
        });
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'delete',
    route: '/api/v2/software/delete/:fileName?',
};
