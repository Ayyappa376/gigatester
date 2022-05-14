export interface IOrganizationInfo {
  emailDomains?: string[];
  name: string;
  url: string;
  orgPrefix: string;
  status: string;
}

export interface IResourceDetails {
  cognito: {
      appClientId: string;
      appClientURL: string;
      systemPassword: string;
      systemUser: string;
      userPoolId: string;
      userPoolRegion: string;
  };
  dynamoDB: {
      dbRegion: string;
  };
  s3: {
      bucketRegion: string;
  };
}

export const STATUS_VERIFY_ORG_PENDING = 'Pending';
export const STATUS_VERIFY_ORG_APPROVED = 'Approved';
export const STATUS_VERIFY_ORG_REJECTED = 'Rejected';
export const STATUS_VERIFY_ORG_DELETED = 'Deleted';
export const STATUS_VERIFY_ORG_ALL = 'All';
