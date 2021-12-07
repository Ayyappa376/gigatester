import { API, Handler } from '@apis/index';
import { appLogger, getSoftwaresBucketName, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

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

    const s3 = new AWS.S3();

    if (params.fileKey) {
        if (params.fileKey === 'all') {
            const bucketParams = {
                Bucket: getSoftwaresBucketName(),
            };
            // Call S3 to obtain a list of the objects in the bucket
            s3.listObjects(bucketParams, function (err: any, data: any) {
                if (err) {
                    appLogger.error(err, 'fileListError');
                } else {
                    appLogger.info({ fileList: data });
                    return responseBuilder.ok(data, response);
                }
            });
        } else {
            const bucketParams = {
                Bucket: getSoftwaresBucketName(),
                Key: params.fileKey,
            };
            s3.getObject(bucketParams, function (err: any, data: any) {
                if (err) {
                    appLogger.error(err, 'File not found');
                } else {
                    appLogger.info({ file: data });
                    return responseBuilder.ok(data, response);
                }
            });
        }
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'get',
    route: '/api/v2/file/:fileKey?',
};
