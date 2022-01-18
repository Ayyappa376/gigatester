export const SEVERITY_CRITICAL = 'Critical';
export const SEVERITY_HIGH = 'High';
export const SEVERITY_MEDIUM = 'Medium';
export const SEVERITY_LOW = 'Low';

export const RATING_ONE = "1";
export const RATING_TWO = "2";
export const RATING_THREE = "3";
export const RATING_FOUR = "4";
export const RATING_FIVE = "5";

export const SATISFIED= 'Satisfied'
export const DISSATISFIED= 'Dissatisfied'
export const SOMEWHAT_SATISFIED= 'Somewhat Satisfied'

export const CATEGORY_VIDEO = "Video";
export const CATEGORY_AUDIO = "Audio";
export const CATEGORY_SCREEN = "Screen";
export const CATEGORY_IMAGES = "Images";
export const CATEGORY_OTHER = "Other";

export type FeedbackType = 'FEEDBACK' | 'BUG_REPORT';

export type FeedbackCategory = 'Video' | 'Audio' | 'Screen' | 'Images' | 'Other';

export type BudPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export const CONST_FEEDBACK = 'FEEDBACK';
export const CONST_BUG_REPORT = 'BUG_REPORT';

export interface ProductInfo {
    description?: string;
    devices?: string[];
    id: string;
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

export interface ILimitedProductDetails {
    id: string;
    name: string;
}

export interface IProductNameIdMapping {
    [key : string] : {
        name: string;
        version: string[];
    }
}

export interface IAppFeedback {
    createdOn: number;
    feedbackComments ? : string[];
    id: string;
    productId ? : string;
    productRating: number;
    productVersion ? : string;
    userId ? : string;
    sourceIP?: string;
    feedbackCategory?: FeedbackCategory;
    bugPriority: BudPriority;
    feedbackMedia: {
      image?: string,
      video?: string,
      file?: string,
      audio?: string
    },
    feedbackType: FeedbackType;
  }