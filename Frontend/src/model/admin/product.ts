import  { IObjectConfigDetails } from '..';
export interface IProductInfo {
  apiKey?: string;
  apiKeyId?: string;
  id: string;
  groups?: string[];
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
  trackingSystem?: ITrackingSystem;
  emailConfig?: IEmailConfiguration;
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
  thanksStr?: string;
  title: string;
  uploadFileMaxSize: string; //in MB, allowed values 200, 400, 600, 800 or 1024
  videoAudioMaxDuration: string; //in min, allowed values 0.5, 1, 1.5, 2, 2.5 or 3
  requireEmail?: boolean;
  captureSystemDetails?: boolean;
  remoteBtns?: IRemoteBtnSettings[];
  widgetLookAndFeel: IWidgetLAF;
  bugSettings?: IBugSettings;
  feedbackSettings?: IFeedbackSettings;
  featureReqSettings?: IFeatureReqSettings;
}

export interface IBugSettings {
  categories: ICategory[];
  severities: string[];
  dialogMsg?: string;
  thanksMsg?: string;
  icon?: string;
  title?: string;
  tooltip?: string;
  reqComments: boolean;
  reqDisplayEmail?: boolean;
  showSeverity: boolean;
}

export interface IFeedbackSettings {
  categories: ICategory[];
  ratingIcon: IRatingIconType;
  ratingLimit: number; //values 1,2,3,4,5
  dialogMsg?: string;
  thanksMsg?: string;
  icon?: string;
  title?: string;
  tooltip?: string;
  reqComments: boolean;
  reqDisplayEmail?: boolean;
}

export interface IFeatureReqSettings {
  dialogMsg?: string;
  thanksMsg?: string;
  icon?: string;
  title?: string;
  tooltip?: string;
  reqComments: boolean;
  reqDisplayEmail?: boolean;
}

export interface IWidgetLAF {
  bgColor: string;
  fgColor: string;
  font: string;
  fontWeight: number;
  fontStyle: string;
  text: string;
  icon?: string;
  position: IWidgetPosition;
  rotation?: string;
  custom?: ICustomProperties;
}

export interface ICustomProperties {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  borderRadius?: string;
  rotation?: string;
  margin?: string;
  padding?: string;
}

export interface IRemoteBtnSettings {
  name: string;
  btnId?: string;
  enabled: boolean;
}

export interface ICategory {
  feedbacks?: string[];
  name: string;
}

export interface ITrackingSystem {
  auth: {
      [key: string]: string;
  };
  project: string;
//  severity: boolean;
  type: ITrackingSystemType;
  url: string;
//  uploadToTrackingSystem: boolean;
  [key: string]: any;
}

export interface IEmailConfiguration {
  feedbackTypes: string[]; //Feedback or bugs
  ratingLimit?: {
    [key: string]: boolean;
  };
  severityLimit?: {
    [key: string]: boolean;
  };
  emailText: {
    [key: string]: string; // ex: Feedback : 'Dear customer ....'
  }
}

export interface IProductParams {
  productConfig: IObjectConfigDetails;
  products?: IProductInfo[];
}

export const MAIN_BUTTON = 'MainButton';
export const FEEDBACK_OPT = 'FeedbackOpt';
export const BUGS_OPT = 'BugsOpt';
export const FEATURE_OPT = 'FeatureOpt';

export const STATUS_PRODUCT_ACTIVE = 'active';
export const STATUS_PRODUCT_DELETED = 'deleted';
//export const STATUS_PRODUCT_ARCHIVED = 'archived';

export type IPlatformType = 'Web' | 'Mobile';
export const PLATFORM_TYPE_BROWSER: IPlatformType = 'Web';
export const PLATFORM_TYPE_NATIVE_REACT: IPlatformType = 'Mobile';

export type IFeedbackType = 'FEEDBACK' | 'BUGS' | 'FEATURE_REQUEST';
export const FEEDBACK_TYPE_FEEDBACK: IFeedbackType = 'FEEDBACK';
export const FEEDBACK_TYPE_BUGS: IFeedbackType = 'BUGS';
export const FEEDBACK_TYPE_FEATURE_REQ: IFeedbackType = 'FEATURE_REQUEST';

export const FeedbackTypesObj: any = {
  'FEEDBACK': 'Submit Feedback',
  'BUGS': 'Submit Bugs',
  'FEATURE_REQUEST': 'Submit Feature Request',
}

export type IRatingIconType = 'STAR' | 'HEART' | 'EMOJI';
export const RATING_ICON_TYPE_STAR: IRatingIconType = 'STAR';
export const RATING_ICON_TYPE_HEART: IRatingIconType = 'HEART';
export const RATING_ICON_TYPE_EMOJI: IRatingIconType = 'EMOJI';

export type IInvokeType = 'MANUAL' | 'AFTER_DELAY' | 'CONTEXT_CHANGE' | 'IDLE';
export const INVOKE_TYPE_MANUAL: IInvokeType = 'MANUAL';
export const INVOKE_TYPE_AFTER_DELAY: IInvokeType = 'AFTER_DELAY';
export const INVOKE_TYPE_CONTEXT_CHANGE: IInvokeType = 'CONTEXT_CHANGE';
export const INVOKE_TYPE_IDLE: IInvokeType = 'IDLE';

export type ITrackingSystemType = 'SELF' | 'JIRA';
export const TRACKING_SYSTEM_SELF: ITrackingSystemType = 'SELF';
export const TRACKING_SYSTEM_JIRA: ITrackingSystemType = 'JIRA';

export type IFeedbotConfigSettingsType = 'CATEGORIES' | 'SEVERITIES' | 'COMMENTS' | 'STANDARD FEEDBACK';
export const FEEDBOT_CATEGORIES: IFeedbotConfigSettingsType = 'CATEGORIES';
export const FEEDBOT_SEVERITIES: IFeedbotConfigSettingsType = 'SEVERITIES';
export const FEEDBOT_COMMENTS: IFeedbotConfigSettingsType = 'COMMENTS';
export const FEEDBOT_STANDARD_FEEDBACK: IFeedbotConfigSettingsType = 'STANDARD FEEDBACK';

export type IWidgetPosition = 'RIGHT_MIDDLE' | 'RIGHT_BOTTOM' | 'LEFT_MIDDLE' | 'LEFT_BOTTOM' |'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'CUSTOM';
export const POS_RIGHT_MIDDLE: IWidgetPosition = 'RIGHT_MIDDLE';
export const POS_RIGHT_BOTTOM: IWidgetPosition = 'RIGHT_BOTTOM';
export const POS_LEFT_MIDDLE: IWidgetPosition = 'LEFT_MIDDLE';
export const POS_LEFT_BOTTOM: IWidgetPosition = 'LEFT_BOTTOM';
export const POS_BOTTOM_RIGHT: IWidgetPosition = 'BOTTOM_RIGHT';
export const POS_BOTTOM_LEFT: IWidgetPosition = 'BOTTOM_LEFT';
export const POS_CUSTOM: IWidgetPosition = 'CUSTOM';
