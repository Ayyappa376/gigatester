export interface ProductInfo {
    apiId?: string;
    apiKey?: string;
    description?: string;
    devices?: string[];
    feedbackSettings?: FeedbackSettings;
    id: string;
    name: string;
    platforms: string[];
    software?: string;
    softwareType?: string;
    status: string;
    testers?: TesterStatus[];
    testSuite?: string[];
    version: string;
    [keyName: string]: any;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}

export interface FeedbackSettings {
    categories?: Category[];
    feedbackTypes: FeedbackType[];
    logo?: string;
    ratingIcon: RatingIconType;
    severities: SeverityType[];
    title: string;
    uploadFileMaxSize: string;
    widgetLookAndFeel: WidgetLAF;
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
    feedback?: string[];
    name: string;
}

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

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';
