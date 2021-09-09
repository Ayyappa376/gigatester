import {
    FETCH_ASSESMENT_RESULT_START,
    FETCH_ASSESMENT_RESULT_FAIL,
    FETCH_ASSESMENT_RESULT_SUCCESS,
    AssessmentResultActions,
    RESET_ASSESMENT_RESULT
} from '../../actions';
import { ILoadAssessmentFinalResultRequest, IAssesment } from '../../model';

const assesmentResultReducer = {
    [FETCH_ASSESMENT_RESULT_START]
        (state: IAssesment,
            action: AssessmentResultActions<ILoadAssessmentFinalResultRequest>) {
        return {
            ...state,
            result: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_RESULT_FAIL]
        (state: IAssesment,
            action: AssessmentResultActions<ILoadAssessmentFinalResultRequest>) {
        return {
            ...state,
            result: {
                ...action.payload
            }
        }
    },
    [FETCH_ASSESMENT_RESULT_SUCCESS]
        (state: IAssesment,
            action: AssessmentResultActions<ILoadAssessmentFinalResultRequest>) {
        return {
            ...state,
            result: {
                ...action.payload
            }
        }
    },
    [RESET_ASSESMENT_RESULT]
        (state: IAssesment,
            action: AssessmentResultActions<ILoadAssessmentFinalResultRequest>) {
        return {
            ...state,
            result: {
                ...action.payload
            }
        }
    },
};
export { assesmentResultReducer };
