import  { IFieldConfigAttributes } from '..';

export interface ICampaignInfo {
  active: string;
  createdBy?: string;
  createdOn?: number;
  manager?: string;
  managerId?: string;
  id: string;
  name: string;
  [keyName: string]: any;
}
  
export interface ICampaignParams {
    campaignConfig: ICampaignConfig;
    campaigns?: ICampaignInfo[];
}

export interface ICampaignConfig {
    [keyName: string]: IFieldConfigAttributes;
}
