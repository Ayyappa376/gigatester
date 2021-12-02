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
    body: any;
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

    if(params.type === 'small'){
        const fileBody = request.body;
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
    else if(params.type === 'medium'){
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
    }
    else if(params.type === 'large'){
        if(body.fileType){
            let bucketParams = {
                Bucket: BUCKET_NAME,
                Key: body.fileName,
                ContentType: body.fileType,
            };
        
            s3.createMultipartUpload(bucketParams,  function (err: any, uploadId: any) {
                if (err) {
                    appLogger.error(err, 'fileListError');
                } else {
                    appLogger.info({ uploadId: uploadId });
                    return responseBuilder.ok({ data: uploadId }, response);
                }
            })
        
        }
        else if(body.partNumber){
            let bucketParams = {
                Bucket: BUCKET_NAME,
                Key: body.fileName,
                PartNumber: body.partNumber,
                UploadId:body.uploadId
            };
        
            s3.getSignedUrl('uploadPart',bucketParams,  function (err: any, preSignedUrl: any) {
                if (err) {
                    appLogger.error(err, 'fileListError');
                } else {
                    appLogger.info({ preSignedUrl: preSignedUrl });
                    return responseBuilder.ok({ data: preSignedUrl }, response);
                }
            })
        }
        else if(body.parts){
            console.log(body.parts);
            let bucketParams = {
                Bucket: BUCKET_NAME,
                Key: body.fileName,
                UploadId: body.uploadId,
                MultipartUpload: {
                    Parts: body.parts
                }
                
            };
            console.log(bucketParams,"bucketParams");
            s3.completeMultipartUpload(bucketParams,  function (err: any, data: any) {
                if (err) {
                    appLogger.error(err, 'fileUploadError');
                } else {
                    appLogger.info({ CompletedUpload: data });
                    
                    return responseBuilder.ok( {data: data }, response);
                }
            })
        }
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/file/:type?',
};
