import  { IObjectConfigDetails } from '..';
export interface IProductInfo {
  apiId?: string;
  apiKey?: string;
  id: string;
  version: string;
  name: string;
  description?: string;
  devices?: string[];
  software?: string;
  softwareType?: string;
  platforms: string[];
  testSuite?: string[];
  testers?: ITesterStatus[];
  feedbackSettings?: IFeedbackSettings;
  status: string;
  [keyName: string]: any;
}

export interface ITesterStatus {
  id: string;
  approved: boolean;
}

export interface IFeedbackSettings {
  categories: ICategory[];
  feedbackTypes: IFeedbackType[];
  logo?: string;
  ratingIcon: IRatingIconType;
  severities: ISeverityType[];
  title: string;
  uploadFileMaxSize: string; //in GB, allowed values 1, 2, 3, 4 or 5
  videoAudioMaxDuration: string; //in min, allowed values 1, 2, 3, 4 or 5
  widgetLookAndFeel: IWidgetLAF;
}

export interface IWidgetLAF {
  bgColor: string;
  fgColor: string;
  font: string;
  icon: string;
  position: string;
  text: string;
}

export interface ICategory {
  feedbacks?: string[];
  name: string;
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}

export type IFeedbackType = 'FEEDBACK' | 'BUGS';
export const FEEDBACK_TYPE_FEEDBACK: IFeedbackType = 'FEEDBACK';
export const FEEDBACK_TYPE_BUGS: IFeedbackType = 'BUGS';

export type IRatingIconType = 'STAR' | 'HEART' | 'EMOJI';
export const RATING_ICON_TYPE_STAR: IRatingIconType = 'STAR';
export const RATING_ICON_TYPE_HEART: IRatingIconType = 'HEART';
export const RATING_ICON_TYPE_EMOJI: IRatingIconType = 'EMOJI';

export type ISeverityType = 'Critical' | 'High' | 'Medium' | 'Low';
export const SEVERITY_TYPE_CRITICAL: ISeverityType = 'Critical';
export const SEVERITY_TYPE_HIGH: ISeverityType = 'High';
export const SEVERITY_TYPE_MEDIUM: ISeverityType = 'Medium';
export const SEVERITY_TYPE_LOW: ISeverityType = 'Low';

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';
