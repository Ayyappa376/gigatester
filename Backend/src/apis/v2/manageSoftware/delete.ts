import { API, Handler } from '@apis/index';
import { appLogger, getSoftwaresBucketName, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface GetFile {
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

async function handler(request: GetFile, response: Response) {
    appLogger.info({ GetFileConfig: request }, 'Inside Handler');
    const { headers } = request;
    const { params } = request;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }

    const s3 = new AWS.S3();
    if (params.fileName) {
    const bucketParams = {
        Bucket: getSoftwaresBucketName(),
        Key: params.fileName,
    };
    s3.deleteObject(bucketParams, function (err: any, data: any) {
        if (err) {
            appLogger.error(err, 'DeleteError');
        } else {
            appLogger.info({ fileList: data });
            return responseBuilder.ok(data, response);
        }
    });
}
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'delete',
    route: '/api/v2/software/delete/:fileName?',
};
