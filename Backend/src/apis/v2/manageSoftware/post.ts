import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import {
    appLogger,
    responseBuilder
} from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk')
const fs = require('fs');
const path = require('path');

interface UploadSoftware {
    body: {
        file: any;
    };
    headers: {
        user: {
            email: string;
        };
    };
}

async function handler(request: UploadSoftware, response: Response) {
    appLogger.info({ UploadSoftware: request }, 'Inside Handler');
    const { headers, body } = request;
    const accessKeyId = 'AKIARM6CF5OGVV24FR42';
    const secretAccessKey = '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';
    const BUCKET_NAME = `${config.defaults.orgId}-${config.s3.gigaTesterSoftwareBucket}`;

    if (
        headers.user['cognito:groups'][0] !== 'Manager' &&
        headers.user['cognito:groups'][0] !== 'Admin'
    ) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Forbidden');
        return responseBuilder.forbidden(err, response);
    }

    const fileStream = fs.createReadStream(body.file);

    try {
        const s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        })

        const params = {
            Bucket: BUCKET_NAME,
            Key: path.basename(body.file),
            Body: fileStream
        }

        appLogger.info({ uploadSoftwareFile_params: params });

        s3.upload(params, (error: Error, data: any) => {
            if (error) {
                appLogger.error(error, 's3UploadError');
            }
            appLogger.info({ s3UploadData: data });
            return responseBuilder.ok({ message: 'Uploaded' }, response);
        })
    } catch (err) {
        appLogger.error(err, 'Internal Server Error');
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/software',
};
