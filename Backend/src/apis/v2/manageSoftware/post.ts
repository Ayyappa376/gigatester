import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import {
    appLogger,
    responseBuilder
} from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface UploadSoftware {
    headers: {
        user: {
            email: string;
        };
    };
    body: {
        file: any,
        fileName: string,
    };
    params: {
        type : string
    };
}

async function handler(request: UploadSoftware, response: Response) {
    appLogger.info({ UploadSoftware: request }, 'Inside Handler');
    const { headers, params, body } = request;
       
    if (
        headers.user['cognito:groups'][0] !== 'Manager' &&
        headers.user['cognito:groups'][0] !== 'Admin'
    ) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Forbidden');
        return responseBuilder.forbidden(err, response);
    }

    const BUCKET_NAME = `${config.defaults.orgId}-${config.s3.gigaTesterSoftwareBucket}`;
    const s3 = new AWS.S3();

    if(params.type === 'profilePic'){
        const fileBody = body;
        const base64String = fileBody.file;
        const fileName = fileBody.fileName;
        const buff = Buffer.from (base64String, 'base64')

        try {
            const params = {
                Body: buff,
                Bucket: BUCKET_NAME,
                Key: fileName,
            };
            appLogger.info({ uploadSoftwareFile_params: params });
            s3.putObject(params, (error: Error, data: any) => {
                if (error) {
                    appLogger.error(error, 's3UploadError');
                }
                appLogger.info({ s3UploadData: data });
                return responseBuilder.ok({ message: 'Uploaded' }, response);
            });
        } catch (err) {
            appLogger.error(err, 'Internal Server Error');
        }
    }
   
}



export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/software/upload/:type?',
};
