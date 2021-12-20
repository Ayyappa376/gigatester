import  { IObjectConfigDetails } from '..';
 
export interface ICampaignInfo {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdBy?: string;
  createdOn?: number;
  managers: string[];
  products: IProductInfo[];
  startDate: number;
  endDate?: number;
  [keyName: string]: any;
}
export interface IProductInfo {
  apiKey?:string;
  apiId?:string;
  id: string;
  name: string;
  description?: string;
  devices?: string[];
  software?: string;
  softwareType?:string;
  platforms: string[];
  testSuite?: string[];
  testers?: ITesterStatus[];
  [keyName: string]: any;
}

export interface ITesterStatus {
    id: string;
    approved: boolean;
}

export interface ICampaignParams {
  campaignConfig: IObjectConfigDetails;
  campaigns?: ICampaignInfo[];
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}

export const STATUS_CAMPAIGN_DRAFT = 'draft';
export const STATUS_CAMPAIGN_ACTIVE = 'active';
export const STATUS_CAMPAIGN_ENDED = 'ended';
