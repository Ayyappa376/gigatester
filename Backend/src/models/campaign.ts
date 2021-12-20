export interface CampaignInfo {
    createdBy?: string;
    createdOn?: number;
    description?: string;
    endDate?: number;
    id: string;
    managers: string[];
    name: string;
    products: string[];
    startDate: number;
    status: string;
    [keyName: string]: any;
}

export const STATUS_CAMPAIGN_DRAFT = 'draft';
export const STATUS_CAMPAIGN_ACTIVE = 'active';
export const STATUS_CAMPAIGN_ENDED = 'ended';
