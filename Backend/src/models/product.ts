export interface ProductInfo {
    apiKey?: string;
    apiKeyId?: string;
    description?: string;
    devices?: string[];
    feedbackAgentSettings?: FeedbackAgentSettings;
    id: string;
    name: string;
    platforms: string[];
    software?: string;
    softwareType?: string;
    status: string;
    testers?: TesterStatus[];
    testSuite?: string[];
    trackingSystem?: TrackingSystem;
    version: string;
    [keyName: string]: any;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}

export interface FeedbackAgentSettings {
    bugSettings?: BugSettings;
    captureSystemDetails?: boolean;
    feedbackSettings?: FeedbackSettings;
    feedbackTypes: FeedbackType[];
    invokeDelay?: number; //in seconds
    invokeOn: InvokeType[];
    logo?: string;
    platform: PlatformType;
    requireEmail?: RequireEmail; // make email optional or mandatory
    thanksStr?: string;
    title: string;
    uploadFileMaxSize: string; //in MB, allowed values 200, 400, 600, 800 or 1000
    videoAudioMaxDuration: string; //in min, allowed values 0.5, 1, 1.5, 2, 2.5 or 3
    widgetLookAndFeel: WidgetLAF;
}

export interface BugSettings {
    categories: Category[];
    dialogMsg?: string;
    severities: SeverityType[];
    thanksMsg?: string;
    title?: string;
    tooltip?: string;
}

export interface FeedbackSettings {
    categories: Category[];
    dialogMsg?: string;
    ratingIcon: RatingIconType;
    ratingLimit: number; //values 1,2,3,4,5
    thanksMsg?: string;
    title?: string;
    tooltip?: string;
}

export interface WidgetLAF {
    bgColor: string;
    fgColor: string;
    font: string;
    icon?: string;
    position: string;
    text: string;
 }

export interface Category {
    feedbacks?: string[];
    name: string;
}

export interface TrackingSystem {
    auth: {
        [key: string]: string;
    };
    type: TrackingSystemType;
    url: string;
    [key: string]: any;
}

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';

export type PlatformType = 'Web' | 'Mobile';
export const PLATFORM_TYPE_BROWSER: PlatformType = 'Web';
export const PLATFORM_TYPE_NATIVE_REACT: PlatformType = 'Mobile';

export type FeedbackType = 'FEEDBACK' | 'BUGS';
export const FEEDBACK_TYPE_FEEDBACK: FeedbackType = 'FEEDBACK';
export const FEEDBACK_TYPE_BUGS: FeedbackType = 'BUGS';

export type RatingIconType = 'STAR' | 'HEART' | 'EMOJI';
export const RATING_ICON_TYPE_STAR: RatingIconType = 'STAR';
export const RATING_ICON_TYPE_HEART: RatingIconType = 'HEART';
export const RATING_ICON_TYPE_EMOJI: RatingIconType = 'EMOJI';

export type SeverityType = 'Critical' | 'High' | 'Medium' | 'Low';
export const SEVERITY_TYPE_CRITICAL: SeverityType = 'Critical';
export const SEVERITY_TYPE_HIGH: SeverityType = 'High';
export const SEVERITY_TYPE_MEDIUM: SeverityType = 'Medium';
export const SEVERITY_TYPE_LOW: SeverityType = 'Low';

export type InvokeType = 'MANUAL' | 'AFTER_DELAY' | 'CONTEXT_CHANGE' | 'IDLE';
export const INVOKE_TYPE_MANUAL: InvokeType = 'MANUAL';
export const INVOKE_TYPE_AFTER_DELAY: InvokeType = 'AFTER_DELAY';
export const INVOKE_TYPE_CONTEXT_CHANGE: InvokeType = 'CONTEXT_CHANGE';
export const INVOKE_TYPE_IDLE: InvokeType = 'IDLE';

export type TrackingSystemType = 'SELF' | 'JIRA';
export const TRACKING_SYSTEM_SELF: TrackingSystemType = 'SELF';
export const TRACKING_SYSTEM_JIRA: TrackingSystemType = 'JIRA';

export type RequireEmail = 'MANDATORY' | 'OPTIONAL' ;
export const EMAIL_MANDATORY: RequireEmail = 'MANDATORY';
export const EMAIL_OPTIONAL: RequireEmail = 'OPTIONAL';
