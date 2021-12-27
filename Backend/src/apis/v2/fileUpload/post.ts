import { API, Handler } from '@apis/index';
import { appLogger, getSoftwaresBucketName, responseBuilder } from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk');

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

const s3 = new AWS.S3();

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
            try {
                const url = await s3.getSignedUrlPromise('putObject', {
                    Bucket: getSoftwaresBucketName(),
                    ContentType: body.fileType,
                    Expires: 60,
                    Key: body.fileName,
                });
                appLogger.info({ downloadUrl: url });
                return responseBuilder.ok({
                    filePath: url,
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': '*'
                    }
                }, response);
            } catch (err) {
                appLogger.error(err, 'UploadFileError');
            }
            break;
        }
        case 'large': {
            if(body.fileType) {
                const bucketParams = {
                    Bucket: getSoftwaresBucketName(),
                    ContentType: body.fileType,
                    Key: body.fileName,
                };

                s3.createMultipartUpload(bucketParams,  function (err: any, uploadId: any) {
                    if (err) {
                        appLogger.error(err, 'fileListError');
                    } else {
                        appLogger.info({ uploadId });
                        return responseBuilder.ok({ data: uploadId }, response);
                    }
                });
            } else if(body.partNumber) {
                const bucketParams = {
                    Bucket: getSoftwaresBucketName(),
                    Key: body.fileName,
                    PartNumber: body.partNumber,
                    UploadId: body.uploadId
                };

                s3.getSignedUrl('uploadPart',bucketParams,  function (err: any, preSignedUrl: any) {
                    if (err) {
                        appLogger.error(err, 'fileListError');
                    } else {
                        appLogger.info({ preSignedUrl });
                        return responseBuilder.ok({ data: preSignedUrl }, response);
                    }
                });
            } else if(body.parts) {
                const bucketParams = {
                    Bucket: getSoftwaresBucketName(),
                    Key: body.fileName,
                    MultipartUpload: {
                        Parts: body.parts
                    },
                    UploadId: body.uploadId,
                };
                appLogger.info({fileUpload_large_completeMultipartUpload_params: bucketParams});
                s3.completeMultipartUpload(bucketParams,  function (err: any, data: any) {
                    if (err) {
                        appLogger.error(err, 'fileUploadError');
                    } else {
                        appLogger.info({ CompletedUpload: data });
                        return responseBuilder.ok({data}, response);
                    }
                });
            }
            break;
        }
        case 'small':
        default: {
            const fileBody = request.body;
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
                s3.upload(params1, (error: Error, data: any) => {
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
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/file/:type?',
};
