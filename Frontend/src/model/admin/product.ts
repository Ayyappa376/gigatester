import  { IObjectConfigDetails } from '..';
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
  }
  
  export interface ITesterStatus {
      id: string;
      approved: boolean;
  }

  export interface IProductParams {
    productConfig: IObjectConfigDetails;
    products?: IProductInfo[];
}