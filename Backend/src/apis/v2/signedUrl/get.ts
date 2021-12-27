import { API, Handler } from '@apis/index';
import { appLogger, getSoftwaresBucketName, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface GetTeam {
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
    params: {
//        contentType: string;
        fileKey: string;
//        uploadKey: string;
    };
}

async function handler(request: GetTeam, response: Response) {
    appLogger.info({ GetTeamConfig: request }, 'Inside Handler');
    const { headers, params } = request;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }
    //returns the teams details, config details of a team and the organization id if the team id is sent - edit team
    //returns the config details of a team and the organization id if the team id is not sent - create team
    const s3 = new AWS.S3();

    if (params.fileKey) {
            try {
                const url = await s3.getSignedUrlPromise('getObject', {
                    Bucket: 'dev-gigatester-manage-feedback',
                    Expires: 60,
                    Key: params.fileKey,
                });
                appLogger.info({ downloadUrl: url });
                return responseBuilder.ok({ filePath: url }, response);
            } catch (err) {
                appLogger.error(err, 'downloadFileError');
            }
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'get',
    route: '/api/v2/signedurl/:fileKey',
};
