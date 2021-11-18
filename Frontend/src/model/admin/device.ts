import  { IObjectConfigDetails } from '..';

export interface IDeviceInfo {
  id: string;
  name: string;
  description?: string;
  platforms: string[];
  [keyName: string]: any;
}

export interface IDeviceParams {
    deviceConfig: IObjectConfigDetails;
    devices?: IDeviceInfo[];
}
