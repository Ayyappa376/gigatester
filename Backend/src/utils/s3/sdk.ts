/* **** WRAPPER FUNCTIONS FOR ACCESSING S3 **** */

import { config } from '@root/config';
import { appLogger } from '@root/utils';
import AWS, { S3 } from 'aws-sdk';

const s3Config = {
  apiVersion: '2006-03-01',
  region: config.region,
};

const s3: S3 = new AWS.S3(s3Config);

export function listObjects<T>(params: S3.ListObjectsRequest): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any =>
      s3.listObjects(
        params,
        (err: AWS.AWSError, data: S3.ListObjectsOutput) => {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          return resolve(data.Contents);
        }
      )
  );
}

export function listObjectsAll<T>(params: S3.ListObjectsRequest): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any => {
      s3.listObjects(
        params,
        async (err: AWS.AWSError, data: S3.ListObjectsOutput) => {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }
          let result: any = data.Contents;
          if (data.IsTruncated) {
            const newParams = params;
            newParams.Marker = data.NextMarker;
            const res: any = await listObjectsAll(newParams);
            result = result.concat(res);
            return resolve(result);
          }
          return resolve(result);
        }
      );
    }
  );
}

export function getObject<T>(params: S3.GetObjectRequest): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any =>
      s3.getObject(
        params,
        (err: AWS.AWSError, data: S3.GetObjectOutput) => {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }
          return resolve(data);
        }
      )
  );
}

export function getSignedUrlPromise(action: string, params: any): Promise<string> {
  return s3.getSignedUrlPromise(action, params);
}

export function createMultipartUpload(params: S3.CreateMultipartUploadRequest): Promise<any> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any =>
      s3.createMultipartUpload(
        params,
        (err: AWS.AWSError, data: S3.CreateMultipartUploadOutput) => {
        if (err) {
            appLogger.error(err);
            return reject(err);
        }
        return resolve(data);
      }
    )
  );
}

export function completeMultipartUpload(params: S3.CompleteMultipartUploadRequest): Promise<any> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any): any =>
      s3.completeMultipartUpload(
        params,
        (err: AWS.AWSError, data: S3.CompleteMultipartUploadOutput) => {
        if (err) {
          appLogger.error(err);
          return reject(err);
        }
        return resolve(data);
      }
    )
  );
}

export function upload(params: S3.PutObjectRequest): Promise<any> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: Error) => any): any =>
      s3.upload(
        params,
        (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          appLogger.error(err);
          return reject(err);
        }
        return resolve(data);
      }
    )
  );
}
