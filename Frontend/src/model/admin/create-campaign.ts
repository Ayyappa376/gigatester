import  { IFieldConfigAttributes, IPlatformInfo } from '..';
 
export interface ICampaignInfo {
  active: string;
  createdBy?: string;
  createdOn?: number;
  manager?: string;
  managerId?: string;
  id: string;
  name: string;
  products: IProductInfo[];
  type?: string;
  [keyName: string]: any;
}

export interface IProductInfo {
  id: string;
  name: string;
  instructions?: string;
  software?: string;
  platforms: IPlatformInfo[];
//  testSuite: IQuestionnaire;
  testSuite: any;
}

export interface ICampaignParams {
    campaignConfig: ICampaignConfig;
    campaigns?: ICampaignInfo[];
}

export interface ICampaignConfig {
    [keyName: string]: IFieldConfigAttributes;
}
