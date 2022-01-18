import { API, Handler } from '@apis/index';
import { appLogger, getURLForSoftwareUpload, handleMultipartSoftwareUpload, responseBuilder, uploadSoftware } from '@utils/index';
import { Response } from 'express';

interface UploadSoftware {
    body: any;
    headers: {
        user: {
            email: string;
        };
    };
    params: {
        type: string;
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

    switch(params.type) {
        case 'medium' : {
            getURLForSoftwareUpload(body.fileType, body.fileName)
            .then((url: string) => {
                appLogger.info({ getURLForFileUpload: url });
                return responseBuilder.ok({
                    filePath: url,
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': '*'
                    }
                }, response);
            })
            .catch((err) => {
                appLogger.error(err, 'getURLForFileUpload_error');
                return responseBuilder.internalServerError(new Error('Error Getting File Upload URL'), response);
            });
            break;
        }
        case 'large': {
            handleMultipartSoftwareUpload({
                fileKey: body.fileName,
                fileType: body.fileType,
                partNumber: body.partNumber,
                parts: body.parts,
                uploadId: body.uploadId,
            })
            .then((data: any) => {
                appLogger.info({ handleMultipartUpload: data });
                return responseBuilder.ok({ data }, response);
            })
            .catch((err) => {
                appLogger.error(err, 'handleMultipartUpload_error');
                return responseBuilder.internalServerError(new Error('Error Uploading multipart file'), response);
            });
            break;
        }
        case 'small':
        default: {
            uploadSoftware(body.fileName, Buffer.from (body.file, 'base64'))
            .then((data: any) => {
                appLogger.info({ uploadFile: data });
                return responseBuilder.ok({ data }, response);
            })
            .catch((err) => {
                appLogger.error(err, 'uploadFile_error');
                return responseBuilder.internalServerError(new Error('Error Uploading file'), response);
            });
        }
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/softwares/:type?',
};

/*
import { API, Handler } from '@apis/index';
import { appLogger, getSoftwaresBucketName, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

interface UploadSoftware {
    body: {
        file: any;
        fileName: string;
    };
    headers: {
        user: {
            email: string;
        };
    };
    params: {
        type: string;
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

    const s3 = new AWS.S3();

    if(params.type === 'profilePic') {
        const fileBody = body;
        const base64String = fileBody.file;
        const fileName = fileBody.fileName;
        const buff = Buffer.from (base64String, 'base64');

        try {
            const params1 = {
                Body: buff,
                Bucket: getSoftwaresBucketName(),
                Key: fileName,
            };
            appLogger.info({ uploadSoftwareFile_params: params1 });
            s3.putObject(params1, (error: Error, data: any) => {
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
*/
