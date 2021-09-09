import {
    FETCH_ASSESMENT_QUESTION_START,
    FETCH_ASSESMENT_QUESTION_SUCCESS,
    FETCH_ASSESMENT_QUESTION_FAIL,
    AssesmentActions,
    FETCH_ASSESMENT_QUESTION_INITIALIZE
} from '../../actions';
import { IAssesment, IAssesmentSummaryRequest } from '../../model';

export const assesmentQuestionReducers = {
    [FETCH_ASSESMENT_QUESTION_INITIALIZE]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentQuestion: {
                ...action.payload
            }
        };
    },
    [FETCH_ASSESMENT_QUESTION_START]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentQuestion: {
                ...action.payload
            }
        };
    },
    [FETCH_ASSESMENT_QUESTION_SUCCESS]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentQuestion: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_QUESTION_FAIL]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentQuestion: {
                ...action.payload
            }
        };
    },

};
