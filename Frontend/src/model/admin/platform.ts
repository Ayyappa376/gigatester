import  { IObjectConfigDetails } from '..';

export interface IPlatformInfo {
  id: string;
  name: string;
  description?: string;
  [keyName: string]: any;
}

export interface IPlatformParams {
    platformConfig: IObjectConfigDetails;
    platforms?: IPlatformInfo[];
}
