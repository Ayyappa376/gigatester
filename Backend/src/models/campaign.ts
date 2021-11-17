import { DeviceInfo, PlatformInfo, Questionnaire } from '.';

export interface CampaignInfo {
    active: string;
    createdBy: string;
    createdOn: number;
    id: string;
    managers?: string[];
    modifiedBy?: string;
    modifiedOn?: number;
    name: string;
    products: ProductInfo[];
    type?: string;
    [keyName: string]: any;
}

export interface ProductInfo {
    devices: DeviceInfo[];
    id: string;
    instructions?: string;
    name: string;
    platforms: PlatformInfo[];
    software?: string;
    testSuite: Questionnaire;
}
