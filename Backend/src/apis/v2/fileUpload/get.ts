import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import { appLogger, responseBuilder } from '@utils/index';
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
        fileKey: string;
        uploadKey: string;
        contentType: string;
    };
}

async function handler(request: GetSoftware, response: Response) {
    appLogger.info({ GetSoftwareConfig: request }, 'Inside Handler');
    const { headers } = request;
    const { params } = request;
    
    const BUCKET_NAME = `${config.defaults.orgId}-${config.s3.gigaTesterSoftwareBucket}`;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }
  
    const s3 = new AWS.S3();

    if (params.fileKey) 
    {
        if (params.fileKey === 'all') 
        {
            const bucketParams = {
                Bucket: BUCKET_NAME,
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
        }
        else 
            {
                const bucketParams = {
                    Bucket: BUCKET_NAME,
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
