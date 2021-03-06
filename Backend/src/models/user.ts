export interface UserInfo {
    active: boolean;
    createdOn: number;
    detailsOrgUser?: OrgUserProfile;
    detailsTester?: TesterProfile;
    emailId: string;
    emailVerified: string;
    id: string;
    name: string;
    roles: string[];
}

interface OrgUserProfile {
    createdBy: string;
    groupIds: string[];
    lastModifiedBy: string;
    lastModifiedOn: number;
    orgId: string;
    [keyName: string]: any;
}

export interface TesterProfile {
    addressLine1?: string;
    addressLine2?: string;
    approvedOrgs?: string[];
    city?: string;
    country?: string;
    devices?: string[];
    phone?: string;
    platforms?: string[];
    profileCompleted: boolean;
    state?: string;
    zipCode?: string;
    [keyName: string]: any;
}

export const ROLE_USER_SUPERADMIN = 'SuperAdmin';
export const ROLE_USER_ADMIN = 'Admin';
export const ROLE_USER_EXECUTIVE = 'Executive';
export const ROLE_USER_MANAGER = 'Manager';
export const ROLE_USER_MEMBER = 'Member';
export const ROLE_USER_TESTER = 'Tester';
export const ROLE_USER_ORGUSER = 'OrgUsers';
export const ROLE_USER_ALL = 'All';
