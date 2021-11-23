export interface CampaignInfo {
    createdBy?: string;
    createdOn?: number;
    description?: string;
    endDate?: number;
    id: string;
    managers: string[];
    name: string;
    products: ProductInfo[];
    startDate: number;
    status: string;
    [keyName: string]: any;
}

export interface ProductInfo {
    devices?: string[];
    id: string;
    instructions?: string;
    name: string;
    platforms: string[];
    software?: string;
    testers?: TesterStatus[];
    testSuite?: string;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}

export const STATUS_CAMPAIGN_DRAFT = 'draft';
export const STATUS_CAMPAIGN_PUBLISHED = 'published';
export const STATUS_CAMPAIGN_ENDED = 'ended';
