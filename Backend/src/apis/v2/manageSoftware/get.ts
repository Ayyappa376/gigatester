import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import { appLogger, responseBuilder } from '@utils/index';
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
        fileKey: string;
        uploadKey: string;
        contentType: string;
    };
}

async function handler(request: GetTeam, response: Response) {
    appLogger.info({ GetTeamConfig: request }, 'Inside Handler');
    const { headers } = request;
    const { params } = request;
    
    const BUCKET_NAME = `${config.defaults.orgId}-${config.s3.gigaTesterSoftwareBucket}`;

    const cognitoUserId = headers.user['cognito:username'];

    if (!cognitoUserId) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Unauthorized');
        return responseBuilder.unauthorized(err, response);
    }
    //returns the teams details, config details of a team and the organization id if the team id is sent - edit team
    //returns the config details of a team and the organization id if the team id is not sent - create team
    const bucketParams = {
        Bucket: BUCKET_NAME,
    };
    const s3 = new AWS.S3();

    if (params.fileKey) 
    {
        if (params.fileKey === 'all') 
        {
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
    else {
        try {
            const url = await s3.getSignedUrlPromise('getObject', {
                Bucket: BUCKET_NAME,
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
}


export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'get',
    route: '/api/v2/software/:fileKey?',
};
