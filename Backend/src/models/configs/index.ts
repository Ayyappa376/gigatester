 export interface ConfigTableItems {
    Item: ConfigItem[];
}

export interface ConfigItem {
    config: SystemConfigDetails | ObjectConfigDetails | GeneralConfigDetails | CollectorConfigDetails;
    orgId: string;
    type: string;
}

export interface SystemConfigDetails {
    appClientId: string;
    appClientURL: string;
    logLevel: string;
    systemPassword: string;
    systemUser: string;
    userpoolId: string;
    userpoolRegion: string;
}

export interface ObjectConfigDetails {
    [key: string]: FieldConfigAttributes;
}

export interface FieldConfigAttributes {
    custom: boolean;
    defaultValue?: string;
    displayName: string;
    helpText?: string;
    mandatory: boolean;
    options?: any;
    position?: number;
    type: string;
}

export interface GeneralConfigDetails {
    archiveDays: number;
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
