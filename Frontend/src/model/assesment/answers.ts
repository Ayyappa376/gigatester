import { FetchAction } from '../';

export interface IAssesmentAnswersMap {
    [questionId: string]: ISelectedOption
}

export interface IAssesmentSummaryAnswersMap {
    payload: any | {}
}

export interface ISelectedOption {
    answers: string[],
    comment: string | null,
    index?: number,
}

export interface IAnswerPayload {
    questionId: string;
    version: number;
    answers: string[];
    comment: string | null;
}

export interface IAssesmentPostRequest {
    status: FetchAction;
    data: IAssesmentPostResponse | null;
    error?: object | null;
}

export interface IAssesmentPostResponse {
    message: string;
}