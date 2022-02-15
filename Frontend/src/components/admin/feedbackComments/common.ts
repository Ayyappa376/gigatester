import { Order } from "./RenderTable";
import { IProductInfo, ICategory, ISeverityType, IFeedbackType,
  SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_LOW } from "../../../model/admin/product";

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

//export type BudPriority = 'Low' | 'Medium' | 'High' | 'Critical';

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
    bugPriority: ISeverityType;
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
    severity?: ISeverityType,
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
    colors: ["#008FFB", "#FACB23", "#FA6123"],
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

export const feedbackBarChartOptions: any = {
    chart: {
      id: 'rating-chart'
    },
    xaxis: {
      categories: [RATING_ONE, RATING_TWO, RATING_THREE, RATING_FOUR, RATING_FIVE],
    }
  };

export const bugBarChartOtions: any = {
    chart: {
      id: 'severity-chart'
    },
    xaxis: {
      categories: [SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_LOW],
    }
  };

export const getPieChartOptions = (pieChartSeries: any) => {
  return {
    labels: Object.keys(pieChartSeries),
    colors: ["#008FFB", "#58FFC5", "#FEB018", "#FF455F", "#775DD0"],
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
}