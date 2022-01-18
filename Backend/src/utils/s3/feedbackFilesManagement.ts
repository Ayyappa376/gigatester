import { getURLForFileDownload } from './fileManagement';
import { getFeedbackFilesBucketName } from './getBucketNames';

export const getURLForFeedbackFileDownload = async(filename: string) =>
    getURLForFileDownload(getFeedbackFilesBucketName(), filename);
