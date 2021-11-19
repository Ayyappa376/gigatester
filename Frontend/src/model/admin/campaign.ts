import  { IDeviceInfo, IObjectConfigDetails, IPlatformInfo } from '..';
 
export interface ICampaignInfo {
  active: string;
  createdBy?: string;
  createdOn?: number;
  managers?: string[];
  id: string;
  name: string;
  products: IProductInfo[];
  type?: string;
  [keyName: string]: any;
}

export interface IProductInfo {
  devices: IDeviceInfo[];
  id: string;
  name: string;
  instructions?: string;
  software?: string;
  platforms: IPlatformInfo[];
//  testSuite: IQuestionnaire;
  testSuite: any;
}

export interface ICampaignParams {
    campaignConfig: IObjectConfigDetails;
    campaigns?: ICampaignInfo[];
}
