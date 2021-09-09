import {
    FETCH_ASSESMENT_SUMMARY_START,
    FETCH_ASSESMENT_SUMMARY_FAIL,
    FETCH_ASSESMENT_SUMMARY_SUCCESS,
    AssesmentActions
} from '../../actions';
import { IAssesment, IAssesmentSummaryRequest } from '../../model';

export const assesmentSummaryReducers = {
    [FETCH_ASSESMENT_SUMMARY_START]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentSummary: {
                ...action.payload
            }
        };
    },
    [FETCH_ASSESMENT_SUMMARY_FAIL]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentSummary: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_SUMMARY_SUCCESS]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryRequest>) {
        return {
            ...state,
            assesmentSummary: {
                ...action.payload
            }
        };
    },

};
