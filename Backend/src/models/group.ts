export interface GroupInfo {
  children?: string[];
  description?: string;
  id: string;
  name: string;
  parent?: string;
  [keyName: string]: any;
}
