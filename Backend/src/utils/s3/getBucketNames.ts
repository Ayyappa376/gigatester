import { config } from '@root/config';

export function getSoftwaresBucketName(): string {
  return `${config.defaults.orgId}-${config.s3Bucket.softwares}`;
}

export function getProfilePhotosBucketName(): string {
  return `${config.defaults.orgId}_${config.s3Bucket.profilePhotos}`;
}

export function getProductPhotosBucketName(): string {
  return `${config.defaults.orgId}_${config.s3Bucket.productPhotos}`;
}
