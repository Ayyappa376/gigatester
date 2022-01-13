import { appLogger, getSoftwaresBucketName } from '@utils/index';
import { completeMultipartUpload, createMultipartUpload, getObject, getSignedUrlPromise, listObjects, upload } from './sdk';

export const getSoftwaresList = async (): Promise<any> => {
  const bucketParams = {
    Bucket: getSoftwaresBucketName(),
  };

  appLogger.info({ getListOfSoftwares_listObjects_params: bucketParams });
  return listObjects(bucketParams);
};

export const getSoftware = async (fileKey: string): Promise<any> => {
  const bucketParams = {
    Bucket: getSoftwaresBucketName(),
    Key: fileKey,
  };

  appLogger.info({ getSoftware_getObject_params: bucketParams });
  return getObject(bucketParams);
};

export const getURLForFileUpload = async (fileType: string, fileKey: string): Promise<any> => {
  const params = {
    Bucket: getSoftwaresBucketName(),
    ContentType: fileType,
    Expires: 60,
    Key: fileKey,
  };

  appLogger.info({ getURLForMediumFileUpload_getSignedUrlPromise_params: params });
  return getSignedUrlPromise('putObject', params);
};

export const handleMultipartUpload = async (
  {
    fileKey,
    fileType,
    partNumber,
    parts,
    uploadId,
  }: {
    fileKey: string;
    fileType: string | undefined;
    partNumber: any | undefined;
    parts: any | undefined;
    uploadId: any | undefined;
  }
): Promise<any> => {
  if(fileType) {
    const params = {
        Bucket: getSoftwaresBucketName(),
        ContentType: fileType,
        Key: fileKey,
    };

    appLogger.info({handleMultipartUpload_createMultipartUpload_params: params});
    return createMultipartUpload(params);
  }

  if(partNumber) {
    const params = {
        Bucket: getSoftwaresBucketName(),
        Key: fileKey,
        PartNumber: partNumber,
        UploadId: uploadId
    };

    appLogger.info({ handleMultipartUpload_getSignedUrlPromise_params: params });
    return getSignedUrlPromise('uploadPart', params);
  }

  if(parts) {
    const params = {
        Bucket: getSoftwaresBucketName(),
        Key: fileKey,
        MultipartUpload: {
            Parts: parts
        },
        UploadId: uploadId,
    };
    appLogger.info({handleMultipartUpload_completeMultipartUpload_params: params});
    return completeMultipartUpload(params);
  }
};

export const uploadFile = async (fileKey: string, buff: any): Promise<any> => {
  const params = {
    Body: buff,
    Bucket: getSoftwaresBucketName(),
    Key: fileKey,
  };
  appLogger.info({ uploadFile_upload_params: params });
  return upload(params);
};
