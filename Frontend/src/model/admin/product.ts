import  { IObjectConfigDetails } from '..';
export interface IProductInfo {
  apiKey?: string;
  apiKeyId?: string;
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
  feedbackAgentSettings?: IFeedbackAgentSettings;
  status: string;
  trackingSystem?: TrackingSystem;
  [keyName: string]: any;
}

export interface ITesterStatus {
  id: string;
  approved: boolean;
}

export interface IFeedbackAgentSettings {
  platform: IPlatformType;
  feedbackTypes: IFeedbackType[];
  logo?: string;
  invokeDelay?: number; //in minutes
  invokeOn: IInvokeType[];
  title: string;
  uploadFileMaxSize: string; //in MB, allowed values 200, 400, 600, 800 or 1024
  videoAudioMaxDuration: string; //in min, allowed values 0.5, 1, 1.5, 2, 2.5 or 3
  widgetLookAndFeel: IWidgetLAF;
  bugSettings?: IBugSettings;
  feedbackSettings?: IFeedbackSettings;
}

export interface IBugSettings {
  categories: ICategory[];
  severities: ISeverityType[];
  title?: string;
}

export interface IFeedbackSettings {
  categories: ICategory[];
  ratingIcon: IRatingIconType;
  ratingLimit: number; //values 1,2,3,4,5
  title?: string;
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

export interface TrackingSystem {
  auth: {
      [key: string]: string;
  };
  type: TrackingSystemType;
  url: string;
  [key: string]: any;
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';

export type IPlatformType = 'Browser' | 'React Native';
export const PLATFORM_TYPE_BROWSER: IPlatformType = 'Browser';
export const PLATFORM_TYPE_NATIVE_REACT: IPlatformType = 'React Native';

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

export type IInvokeType = 'MANUAL' | 'AFTER_DELAY' | 'CONTEXT_CHANGE' | 'IDLE';
export const INVOKE_TYPE_MANUAL: IInvokeType = 'MANUAL';
export const INVOKE_TYPE_AFTER_DELAY: IInvokeType = 'AFTER_DELAY';
export const INVOKE_TYPE_CONTEXT_CHANGE: IInvokeType = 'CONTEXT_CHANGE';
export const INVOKE_TYPE_IDLE: IInvokeType = 'IDLE';

export type TrackingSystemType = 'SELF' | 'JIRA';
export const TRACKING_SYSTEM_SELF: TrackingSystemType = 'SELF';
export const TRACKING_SYSTEM_JIRA: TrackingSystemType = 'JIRA';
