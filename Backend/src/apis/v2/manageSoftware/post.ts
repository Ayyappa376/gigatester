import { API, Handler } from '@apis/index';
import { config } from '@root/config';
import {
    appLogger,
    responseBuilder
} from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');

interface UploadSoftware {
    body: any;
    headers: {
        user: {
            email: string;
        };
    };
    // params: {
    //     // fileKey: string;
    //     fileUploadName: string
    // };
}

async function handler(request: UploadSoftware, response: Response) {
    appLogger.info({ UploadSoftware: request }, 'Inside Handler');
    const { headers, body } = request;
    console.log("headerrrrrrrrrrrrrrrrrr", headers, "headerrrrrrrrrrrrrrrrrr")
    console.log("bodyyyyyyyyyyyy", body, "bodyyyyyyyyyyyyyyyy")
    const BUCKET_NAME = `${config.defaults.orgId}-${config.s3.gigaTesterSoftwareBucket}`;
    // const fileBody = request.body;
    // const base64String = fileBody.file;
    // const fileName = fileBody.fileName;
    // const buff = Buffer.from (base64String, 'base64')
    // try{
    //     const params = {
    //         body:buff,
    //         key: fileName,
    //     }
    //     await S3.putObject(params).promise()

    // }
    // catch{

    // }

    const s3 = new AWS.S3();
        try {
            const url = await s3.getSignedUrlPromise('putObject', {
                Bucket: BUCKET_NAME,
                Expires: 60,
                Key: body.fileName,
                ContentType: body.fileType,
            });
            appLogger.info({ downloadUrl: url });
            console.log(url, "presigned url")
            return responseBuilder.ok({headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
            filePath: url }, response);
        } catch (err) {
            appLogger.error(err, 'UploadFileError');
        }
    
    // if (
    //     headers.user['cognito:groups'][0] !== 'Manager' &&
    //     headers.user['cognito:groups'][0] !== 'Admin'
    // ) {
    //     const err = new Error('InvalidUser');
    //     appLogger.error(err, 'Forbidden');
    //     return responseBuilder.forbidden(err, response);
    // }

    // const fileStream = fs.createReadStream(body.file);

    // try {
    //     const s3 = new AWS.S3();

    //     const params = {
    //         Body: buff,
    //         Bucket: BUCKET_NAME,
    //         Key: fileName,
    //     };

    //     appLogger.info({ uploadSoftwareFile_params: params });

    //     s3.putObject(params, (error: Error, data: any) => {
    //         if (error) {
    //             appLogger.error(error, 's3UploadError');
    //         }
    //         appLogger.info({ s3UploadData: data });
    //         return responseBuilder.ok({ message: 'Uploaded' }, response);
    //     });
    // } catch (err) {
    //     appLogger.error(err, 'Internal Server Error');
    // }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/software/upload/',
};
