import { Order } from "./RenderTable";
import { IProductInfo, ICategory, ISeverity, IFeedbackType} from "../../../model/admin/product";

// export const SEVERITY_CRITICAL = 'Critical';
// export const SEVERITY_HIGH = 'High';
// export const SEVERITY_MEDIUM = 'Medium';
// export const SEVERITY_LOW = 'Low';

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

export type BugSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export const CONST_FEEDBACK = 'FEEDBACK';
export const CONST_FEEDBACK_CHART = 'FEEDBACK-CHART';
export const CONST_BUG_REPORT = 'BUG_REPORT';
export const CONST_BUG_REPORT_CHART = 'BUG-REPORT-CHART';

export const NUMBER_OF_ITEMS_PER_FETCH = 20;

export interface IFeedbackComments {
  productId?: string,
  prodVersion?: string,
  goBack: Function
}

/*
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
*/
export interface ILimitedProductDetails {
    id: string;
    name: string;
}

// export interface ICategories {
//   name: string;
//   feedbacks: string[];
// }

export interface IProductNameIdMapping {
    [key : string] : {
        name: string;
        version: string[];
        categories: ICategory[];
    }
}

export interface IAppFeedback {
    createdOn: number;
    feedbackComments ? : string;
    id: string;
    productId ? : string;
    productRating: number;
    productVersion ? : string;
    userId ? : string;
    sourceIP?: string;
    feedbackCategory?: FeedbackCategory;
    bugPriority: BugSeverity;
    feedbackMedia: {
      image?: string,
      video?: string,
      file?: string,
      audio?: string
    },
    feedbackType: FeedbackType;
    platformName: string;
    platformVersion: string;
    platformOs: {
      family: string;
      version: string;
      architecture: string;
    };
  }

export interface ILastEvaluatedKey {
    id: string
}

export interface IRecusiveFeedbackItem {
    Items: IAppFeedback[],
    Count: number,
    ScannedCount: number,
    LastEvaluatedKey: ILastEvaluatedKey;
}

export interface IRecursiveFeedback {
    Items: IRecusiveFeedbackItem
}

export interface ICommentObject {
    [key: string]: any
}

export interface IFeedbackBarChartData {
    [key: string]: number
}

export interface IRatingMapData {
    userId: string,
    userIp: string,
    category?: FeedbackCategory;
    rating: number,
    date: number,
    comments: ICommentObject | undefined,
    productId?: string,
    productVersion?: string
}
  
export interface IBugMapData {
    userId: string,
    userIp: string,
    severity?: BugSeverity,
    category?: FeedbackCategory;
    date: number,
    comments: ICommentObject | undefined,
    productId?: string,
    productVersion?: string
}
  
export interface IRatingMapping {
    [key : string] : IRatingMapData;
};
  
export interface IBugDataMapping {
    [key : string] : IBugMapData;
};

export interface ILastEvalKey {
  [key: string]: string
}

export interface IFetchRecursiveData {
  lastEvalKey?: ILastEvalKey,
  fetchOrder?: Order,
  filterRating?: number[],
  filterSeverity?: string[], 
  filterCategory?: string[], 
  prodId?: string,
  prodVersion?: string,
  showNoEmptyError?: boolean,
  searchWord?: string;
  noRawDataUpdate?: boolean;
} 

export const feedbackPieChartOptions = {
    labels: [SATISFIED, SOMEWHAT_SATISFIED, DISSATISFIED],
    colors: [
      "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#04c2f3", "#648177", "#0d5ac1",
      "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
      "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
      "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
      "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
      "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
      "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
      "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
      "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
      "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
      "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
      "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
      "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
      "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
      "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
      "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
      "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
      "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
      "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
      "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
      "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
      "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
      "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
      "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
      "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
      "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
      "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
      "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
      "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
      "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
      "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
      "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
      "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
      "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
      "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
      "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
      "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
      "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4",
      "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
  ],
    chart: {
      width: 380,
      type: 'pie',
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          show: false
        }
      }
    }],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    }
  }

export const getFeedbackBarChartOptions = (feedbackBarChartSeries: any) => {
  return { 
    chart: {
      id: 'rating-chart'
    },
    xaxis: {
      categories: [RATING_ONE, RATING_TWO, RATING_THREE, RATING_FOUR, RATING_FIVE],
    },
    title: {
      text: 'Total - ' + Object.values(feedbackBarChartSeries).reduce((a : any, b: any) => a + b, 0),
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#263238'
      },
    },
  };
};

export const getBugBarChartOptions = (bugBarChartSeries: any, FeedbackBarChartData: any) => {
   return { 
    chart: {
      id: 'severity-chart'
    },
    xaxis: {
      categories: Object.keys(FeedbackBarChartData), //hard coded severity value
    },
    title: {
      text: 'Total - ' + bugBarChartSeries[0].data.reduce((a : any, b: any) => a + b, 0),
      align: 'center',
      margin: 0,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#263238'
      },
    },
  }
};

export const getPieChartOptions = (pieChartSeries: any) => {
  return {
    labels: Object.keys(pieChartSeries),
    colors: [
      "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#04c2f3", "#648177", "#0d5ac1",
      "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
      "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
      "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
      "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
      "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
      "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
      "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
      "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
      "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
      "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
      "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
      "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
      "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
      "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
      "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
      "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
      "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
      "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
      "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
      "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
      "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
      "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
      "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
      "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
      "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
      "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
      "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
      "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
      "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
      "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
      "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
      "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
      "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
      "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
      "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
      "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
      "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4",
      "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
  ],
    chart: {
      width: 380,
      type: 'pie',
    },
    dataLabels: {
      enabled: true,
    },
    // gives total value for pie chart
    // title: {
    //   text: 'Total - ' + Object.values(pieChartSeries).reduce((a : any, b: any) => a + b, 0),
    //   align: 'center',
    //   margin: 0,
    //   offsetX: -90,
    //   offsetY: 0,
    //   floating: false,
    //   style: {
    //     fontSize:  '14px',
    //     fontWeight:  'bold',
    //     color:  '#263238'
    //   },
    // },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          show: true
        }
      }
    }],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    }
  }
}