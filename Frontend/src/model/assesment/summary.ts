import { FetchAction } from '../';

export interface IAssesmentSummaryRequest {
    status: FetchAction;
    data: IAssesmentSummaryData | null;
    error?: object | null;
}

export interface IAssesmentSummaryData {
    numberOfQuestions: number;
    assessmentId: string;
    markedAnswers?: object;
    categoryList: any;
    type: string;
    description: string;
    version?: string;
    timeOut: boolean;
    timeOutTime: number;
    warningTimePercentage: number;
    hideResult: boolean;
}