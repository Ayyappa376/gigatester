import { FetchAction } from '../';

export interface IAssesmentQuestionRequest {
    status: FetchAction;
    data: IAssesmentQuestionData | null;
    error?: object | null;
}

export interface IAssesmentQuestionData {
    numberOfAnswers: number;
    id: string;
    version: number;
    index: number;
    question: string;
    type: string;
    answers: IAnswer;
    category: string;
    randomize?: boolean;
    hint?: string;
    hintURL?: string;
    NA?: boolean;
    reason?: boolean;
}

export interface IAnswer {
    [id: string]: {
        answer: string;
        weightageFactor: number;
    }
}