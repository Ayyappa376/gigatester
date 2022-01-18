import { deleteFile, getFile, getFilesList, getURLForFileDownload, getURLForFileUpload, handleMultipartFileUpload, uploadFile } from './fileManagement';
import { getSoftwaresBucketName } from './getBucketNames';

export const getSoftwaresList = async (): Promise<any> =>
  getFilesList(getSoftwaresBucketName());

export const getSoftware = async (fileKey: string): Promise<any> =>
  getFile(getSoftwaresBucketName(), fileKey);

export const getURLForSoftwareUpload = async (fileType: string, fileKey: string): Promise<any> =>
  getURLForFileUpload(getSoftwaresBucketName(), fileType, fileKey);

export const getURLForSoftwareDownload = async (fileKey: string): Promise<any> =>
  getURLForFileDownload(getSoftwaresBucketName(), fileKey);

export const handleMultipartSoftwareUpload = async (
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
): Promise<any> =>
  handleMultipartFileUpload({
    bucketName: getSoftwaresBucketName(),
    fileKey,
    fileType,
    partNumber,
    parts,
    uploadId,
  });

export const uploadSoftware = async (fileKey: string, buff: any): Promise<any> =>
  uploadFile(getSoftwaresBucketName(), fileKey, buff);

export const deleteSoftware = async (fileKey: string): Promise<any> =>
  deleteFile(getSoftwaresBucketName(), fileKey);
