import { CHANGE_ASSESSMENT_START_TIME, CHANGE_ASSESSMENT_CURRENT_TIME } from '../../actions/assesment/assessment-time';
import { AssesmentActions } from '../../actions';
import { IAssesment } from '../../model';

export const assessmentTimeReducer = {
    [CHANGE_ASSESSMENT_START_TIME](state: IAssesment, actions: AssesmentActions<number>) {
        return {
            ...state,
            assessmentTime: {
                ...state.assessmentTime,
                startTime: actions.payload,
            }
        }
    },
    [CHANGE_ASSESSMENT_CURRENT_TIME](state: IAssesment, actions: AssesmentActions<number>) {
        return {
            ...state,
            assessmentTime: {
                ...state.assessmentTime,
                currentTime: actions.payload,
            }
        }
    },
};
