 export interface ConfigTableItems {
    Item: ConfigItem[];
}

export interface ConfigItem {
    config: SystemConfigDetails | UserConfigDetails | TeamConfigDetails | GeneralConfigDetails | CollectorConfigDetails;
    name: string;
    orgId: string;
    type: string;
}

export interface SystemConfigDetails {
    appClientId: string;
    appClientURL: string;
    logLevel: string;
    userpoolId: string;
}

export interface UserConfigDetails {
    [key: string]: FieldConfigAttributes;
}

export interface TeamConfigDetails {
    [key: string]: FieldConfigAttributes;
}

export interface FieldConfigAttributes {
    custom: boolean;
    displayName: string;
    mandatory: boolean;
    options?: any;
    type: string;
}

export interface GeneralConfigDetails {
    levels: LevelAttributes[];
    performanceMetricsConstant: number;
}

export interface LevelAttributes {
    color: string;
    lowerLimit: number;
    name: string;
    upperLimit: number;
}

export interface CollectorConfigDetails {
    [key: string]: CollectorConfig[];
}

export interface CollectorConfig {
    attributes: CollectorAttributesDetails;
    collectorSchedule: string;
    name: string;
    nextCollectorRunTimestamp: number;
    nextProcessorRunTimestamp: number;
    processorSchedule: string;
}

export interface CollectorAttributesDetails {
    [key: string]: FieldConfigAttributes;
}
