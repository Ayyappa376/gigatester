import AWS from "aws-sdk";
import { getFeedbackBucketName } from ".";

const s3 = new AWS.S3();

export const getSignedUrl = async(filename: string) => {
    const url = await s3.getSignedUrlPromise('getObject', {
        Bucket: getFeedbackBucketName(),
        Expires: 60,
        Key: filename,
    });
    return url;
}
