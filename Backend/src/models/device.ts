export interface DeviceInfo {
    description?: string;
    id: string;
    name: string;
    platforms: string[];
    [keyName: string]: any;
}
