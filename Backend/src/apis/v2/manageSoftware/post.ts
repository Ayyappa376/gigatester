import { API, Handler } from '@apis/index';
import {
    appLogger,
    // uploadSoftwareFile,
    responseBuilder
} from '@utils/index';
import { Response } from 'express';
const AWS = require('aws-sdk')
const fs = require('fs');
const path = require('path');

// const multer = require('multer')

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
    // const { assignee, type } = body;
    if (
        headers.user['cognito:groups'][0] !== 'Manager' &&
        headers.user['cognito:groups'][0] !== 'Admin'
    ) {
        const err = new Error('InvalidUser');
        appLogger.error(err, 'Forbidden');
        return responseBuilder.forbidden(err, response);
    }

    var fileStream = fs.createReadStream(body.file);

    try {
        console.log(body.file, 'ttttttttttttttttttttttttttttttttttttttttttttttttt', body.file.name)

        const s3 = new AWS.S3({
            accessKeyId: 'AKIARM6CF5OGVV24FR42',
            secretAccessKey: '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'
        })

        const params = {
            Bucket: 'dev-gigatester-manage-software',
            Key: path.basename(body.file),
            Body: fileStream
        }

        appLogger.info({ uploadSoftwareFile_params: params });
        console.log(params, 'pppppppppppppppppppppppppppppppppppppppppppppppppppppp');

        s3.upload(params, (error: Error, data: any) => {
            if (error) {
                appLogger.info({ s3UploadError: error });
                console.log(error, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            }
            appLogger.info({ s3UploadData: data });
            console.log(data, 'dddddddddddddddddddddddddddddddddddddddddddddd')
            return responseBuilder.ok({ message: 'Uploaded' }, response);

        })
        // const upload = multer({ storage }).single('image')
        // await uploadSoftwareFile(body.file);

    } catch (err) {
        appLogger.error(err, 'Internal Server Error');
        // responseBuilder.internalServerError(err, response);
    }
}

export const api: API = {
    handler: <Handler>(<unknown>handler),
    method: 'post',
    route: '/api/v2/software',
};
