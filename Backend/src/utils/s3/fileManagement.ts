import { appLogger } from '@utils/index';
import { completeMultipartUpload, createMultipartUpload, deleteObject, getObject, getSignedUrlPromise, listObjects, upload } from './sdk';

export const getFilesList = async (bucketName: string): Promise<any> => {
  const bucketParams = {
    Bucket: bucketName,
  };

  appLogger.info({ getListOfSoftwares_listObjects_params: bucketParams });
  return listObjects(bucketParams);
};

export const getFile = async (bucketName: string, fileKey: string): Promise<any> => {
  const bucketParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  appLogger.info({ getSoftware_getObject_params: bucketParams });
  return getObject(bucketParams);
};

export const getURLForFileUpload = async (bucketName: string, fileType: string, fileKey: string): Promise<any> => {
  const params = {
    Bucket: bucketName,
    ContentType: fileType,
    Expires: 60*24,       // Signed Url will stay signed for 1 day as we are storing these Urls in the frontend.
    Key: fileKey,
  };

  appLogger.info({ getURLForFileUpload_getSignedUrlPromise_params: params });
  return getSignedUrlPromise('putObject', params);
};

export const getURLForFileDownload = async (bucketName: string, fileKey: string): Promise<any> => {
  const params = {
    Bucket: bucketName,
    Expires: 60*24,       // Signed Url will stay signed for 1 day as we are storing these Urls in the frontend.
    Key: fileKey,
  };

  appLogger.info({ getURLForFileDownload_getSignedUrlPromise_params: params });
  return getSignedUrlPromise('getObject', params);
};

export const handleMultipartFileUpload = async (
  {
    bucketName,
    fileKey,
    fileType,
    partNumber,
    parts,
    uploadId,
  }: {
    bucketName: string;
    fileKey: string;
    fileType: string | undefined;
    partNumber: any | undefined;
    parts: any | undefined;
    uploadId: any | undefined;
  }
): Promise<any> => {
  if(fileType) {
    const params = {
        Bucket: bucketName,
        ContentType: fileType,
        Key: fileKey,
    };

    appLogger.info({handleMultipartUpload_createMultipartUpload_params: params});
    return createMultipartUpload(params);
  }

  if(partNumber) {
    const params = {
        Bucket: bucketName,
        Key: fileKey,
        PartNumber: partNumber,
        UploadId: uploadId
    };

    appLogger.info({ handleMultipartUpload_getSignedUrlPromise_params: params });
    return getSignedUrlPromise('uploadPart', params);
  }

  if(parts) {
    const params = {
        Bucket: bucketName,
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

export const uploadFile = async (bucketName: string, fileKey: string, buff: any): Promise<any> => {
  const params = {
    Body: buff,
    Bucket: bucketName,
    Key: fileKey,
  };
  appLogger.info({ uploadFile_upload_params: params });
  return upload(params);
};

export const deleteFile = async (bucketName: string, fileKey: string): Promise<any> => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };

  appLogger.info({ deleteFile_deleteObject_params: params });
  return deleteObject(params);
};
