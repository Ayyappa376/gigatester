export interface IGroupInfo {
  id: string;
  name: string;
  description?: string;
  parent?: string;
  children?: string[];
  [keyName: string]: any;
}
