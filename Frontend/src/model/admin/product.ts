import  { IObjectConfigDetails } from '..';
export interface IProductInfo {
  apiId?: string;
  apiKey?: string;
  id: string;
  version: string;
  name: string;
  description?: string;
  devices?: string[];
  software?: string;
  softwareType?: string;
  platforms: string[];
  testSuite?: string[];
  testers?: ITesterStatus[];
  categories?: ICategory[];
  status: string;
  [keyName: string]: any;
}

export interface ITesterStatus {
  id: string;
  approved: boolean;
}

export interface ICategory {
  name?: string;
  feedbacks?: string[];
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';
