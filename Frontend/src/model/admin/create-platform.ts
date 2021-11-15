import  { IFieldConfigAttributes } from '..';

export interface IPlatformInfo {
  id: string;
  name: string;
  altNames?: string;
  [keyName: string]: any;
}

export interface IPlatformParams {
    platformConfig: IPlatformConfig;
    platforms?: IPlatformInfo[];
}

export interface IPlatformConfig {
    [keyName: string]: IFieldConfigAttributes;
}
