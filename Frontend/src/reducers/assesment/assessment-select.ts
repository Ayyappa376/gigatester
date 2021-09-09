
import {
    FETCH_ASSESMENT_TYPES_START,
    FETCH_ASSESMENT_TYPES_FAIL,
    FETCH_ASSESMENT_TYPES_SUCCESS,
    AssesmentActions,
    SET_SELECTED_ASSESMENT_TYPE
} from '../../actions';

import { IAssesment } from '../../model'
import { ILoadAssessmentTypeRequest } from '../../model/assesment/assessment-select';

const assessmentTypes = {
    [FETCH_ASSESMENT_TYPES_START]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentTypeRequest>) {
        return {
            ...state,
            assessmentDetail: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_TYPES_SUCCESS]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentTypeRequest>) {
        return {
            ...state,
            assessmentType: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_TYPES_FAIL]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentTypeRequest>) {
        return {
            ...state,
            assessmentType: {
                ...action.payload
            }
        }
    },
    [SET_SELECTED_ASSESMENT_TYPE]
        (state: IAssesment,
            action: AssesmentActions<ILoadAssessmentTypeRequest>) {
        return {
            ...state,
            selectedAssessmentType: action.payload.data
        }
    },
}

export { assessmentTypes }
