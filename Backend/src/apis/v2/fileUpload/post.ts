import { API, Handler } from '@apis/index';
import { appLogger, getURLForFileUpload, handleMultipartUpload, responseBuilder, uploadFile } from '@utils/index';
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
            getURLForFileUpload(body.fileType, body.fileName)
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
            handleMultipartUpload({
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
            uploadFile(body.fileName, Buffer.from (body.file, 'base64'))
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
    route: '/api/v2/file/:type?',
};
