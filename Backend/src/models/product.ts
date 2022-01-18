export interface ProductInfo {
    apiId?: string;
    apiKey?: string;
    categories?: Category[];
    description?: string;
    devices?: string[];
    id: string;
    name: string;
    platforms: string[];
    software?: string;
    softwareType?: string;
    status: string;
    testers?: TesterStatus[];
    testSuite?: string[];
    version: string;
    [keyName: string]: any;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}

export interface Category {
    feedbacks?: string[];
    name?: string;
}

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';
