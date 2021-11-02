import { appLogger } from '@utils/index';
const AWS = require('aws-sdk')
// const uuid = require('uuid/v4')

export const uploadSoftwareFile = async ({
    fileName,
    filePath
}: {
    fileName: string,
    filePath: string
}) => {

    console.log(fileName, 'aaaaa', filePath)
    const s3 = new AWS.S3({
        accessKeyId: 'AKIARM6CF5OGVV24FR42',
        secretAccessKey: '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'
    })

    const params = {
        Bucket: 'dev-gigatester-manage-software',
        Key: filePath,
        // Body: body
    }

    appLogger.info({ uploadSoftwareFile_params: params });
    console.log(params, 'pppppppppppppppppppppppppppppppppppppppppppppppppppppp');

    s3.upload(params, (error: Error, data: any) => {
        if (error) {
            appLogger.info({ s3UploadError: error });
            console.log(error)
        }
        appLogger.info({ s3UploadData: data });
        console.log(data)
    })
};