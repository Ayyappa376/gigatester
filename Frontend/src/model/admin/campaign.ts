import  { IObjectConfigDetails, IProductInfo } from '..';
 
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

export interface ICampaignParams {
  campaignConfig: IObjectConfigDetails;
  campaigns?: ICampaignInfo[];
}

export const STATUS_CAMPAIGN_DRAFT = 'draft';
export const STATUS_CAMPAIGN_ACTIVE = 'active';
export const STATUS_CAMPAIGN_ENDED = 'ended';
