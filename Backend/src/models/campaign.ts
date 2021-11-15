import { PlatformInfo, Questionnaire } from '.';

export interface CampaignInfo {
    active: string;
    createdBy: string;
    createdOn: number;
    id: string;
    manager?: string;
    managerId?: string;
    modifiedBy?: string;
    modifiedOn?: number;
    name: string;
    products: ProductInfo[];
    type?: string;
    [keyName: string]: any;
}

export interface ProductInfo {
    id: string;
    instructions?: string;
    name: string;
    platforms: PlatformInfo[];
    software?: string;
    testSuite: Questionnaire;
}
