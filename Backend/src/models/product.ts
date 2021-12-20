export interface ProductInfo {
    devices?: string[];
    id: string;
    description?: string; //description
    name: string;
    platforms: string[];
    software?: string;
    testers?: TesterStatus[]; 
    testSuite?: string;
    version: string[];
    [keyName: string]: any;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}