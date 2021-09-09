
import {
    FETCH_ASSESMENT_DETAIL_START,
    FETCH_ASSESMENT_DETAIL_FAIL,
    FETCH_ASSESMENT_DETAIL_SUCCESS,
    AssesmentActions,
    RESET_ASSESMENT_DETAIL
} from '../../actions';

import { ILoadAssessmentDetailRequest, IAssesment } from '../../model'

const assessmentDetail = {
    [FETCH_ASSESMENT_DETAIL_START]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentDetailRequest>) {
        return {
            ...state,
            assessmentDetail: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_DETAIL_SUCCESS]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentDetailRequest>) {
        return {
            ...state,
            assessmentDetail: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_DETAIL_FAIL]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentDetailRequest>) {
        return {
            ...state,
            assessmentDetail: {
                ...action.payload
            }
        }
    },
    [RESET_ASSESMENT_DETAIL]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentDetailRequest>) {
        return {
            ...state,
            assessmentDetail: {
                ...action.payload
            }
        }
    }
}

export { assessmentDetail }
