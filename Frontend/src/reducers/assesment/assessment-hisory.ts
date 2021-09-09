import {
    FETCH_ASSESMENT_HISTORY_START,
    FETCH_ASSESMENT_HISTORY_FAIL,
    FETCH_ASSESMENT_HISTORY_SUCCESS,
    AssesmentActions
} from '../../actions';

import { ILoadAssessmentHistoryRequest, IAssesment } from '../../model'

const assessmentHistory = {
    [FETCH_ASSESMENT_HISTORY_START]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentHistoryRequest>) {
        return {
            ...state,
            assessmentHistory: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_HISTORY_SUCCESS]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentHistoryRequest>) {
        return {
            ...state,
            assessmentHistory: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_HISTORY_FAIL]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentHistoryRequest>) {
        return {
            ...state,
            assessmentHistory: {
                ...action.payload
            }
        }
    },
}

export { assessmentHistory }
