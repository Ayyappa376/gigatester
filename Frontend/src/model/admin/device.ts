import  { IFieldConfigAttributes } from '..';

export interface IDeviceInfo {
  id: string;
  name: string;
  description?: string;
  [keyName: string]: any;
}

export interface IDeviceParams {
    deviceConfig: IDeviceConfig;
    devices?: IDeviceInfo[];
}

export interface IDeviceConfig {
    [keyName: string]: IFieldConfigAttributes;
}
