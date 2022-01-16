export interface ProductInfo {
    apiId?:string;
    apiKey?: string;
    description?: string;
    devices?: string[];
    categories?: Category[];
    id: string;
    name: string;
    platforms: string[];
    software?: string;
    softwareType?:string;
    testers?: TesterStatus[];
    testSuite?: string[];
    version: string[];
    [keyName: string]: any;
}


export interface TesterStatus {
    approved: boolean;
    id: string;
}

export interface Category {
    name?: string;
    feedbacks?: string[];
}
