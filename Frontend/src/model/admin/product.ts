import  { IObjectConfigDetails } from '..';
export interface IProductInfo {
  apiId?:string;
  apiKey?:string;
  id: string;
  version: string[];
  name: string;
  description?: string;
  devices?: string[];
  software?: string;
  softwareType?:string;
  platforms: string[];
  testSuite?: string[];
  testers?: ITesterStatus[];
  categories?: Category[];
  [keyName: string]: any;
}

export interface ITesterStatus {
  id: string;
  approved: boolean;
}

export interface Category {
  name?: string;
  feedbacks?: string[];
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}