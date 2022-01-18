import { API, Handler } from '@apis/index';
import { appLogger, getURLForFeedbackFileDownload, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetTeam {
    body: any;
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
    params: {
        fileKey: string;
    };
}

async function handler(request: GetTeam, response: Response) {
    appLogger.info({ GetTeamConfig: request }, 'Inside Handler');
    const { headers, params, body } = request;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }

    if (params.fileKey && params.fileKey !== 'multiple') {
            try {
                const url = await getURLForFeedbackFileDownload(params.fileKey);
                appLogger.info({ downloadUrl: url });
                return responseBuilder.ok({ filePath: url }, response);
            } catch (err) {
                appLogger.error(err, 'downloadFileError');
            }
    } else if(params.fileKey === 'multiple') {
        const responseBody: { [key: string]: string} = {};
        if(body && body.length > 0) {
            Promise.all(body.map(async(imgUrl: string) => {
                const urlSplit = imgUrl.split('/');
                const name = urlSplit[urlSplit.length - 1];
                const url = await getURLForFeedbackFileDownload(name);
                responseBody[imgUrl] = url;
            }))
            .then(() => responseBuilder.ok(responseBody, response))
            .catch((err: any) => responseBuilder.internalServerError(err, response));
        } else {
            const err = new Error('BadRequest: Missing body.');
            responseBuilder.badRequest(err, response);
        }
    } else {
        const err = new Error('BadRequest: Missing params');
        responseBuilder.badRequest(err, response);
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'get',
    route: '/api/v2/signedurl/:fileKey',
};
