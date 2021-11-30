export interface OrganizationInfo {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
    email: string;
    id: string;
    name: string;
    orgPrefix?: string;
    phone: string;
    state: string;
    status: string;
    subdomainURL?: string;
    website?: string;
    zipCode: string;
}

export const STATUS_VERIFY_ORG_PENDING = 'Pending';
export const STATUS_VERIFY_ORG_APPROVED = 'Approved';
export const STATUS_VERIFY_ORG_REJECTED = 'Rejected';
export const STATUS_VERIFY_ORG_DELETED = 'Deleted';
export const STATUS_VERIFY_ORG_ALL = 'All';
