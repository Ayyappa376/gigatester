import { AssesmentActions, REMOVE_ASSESSMENT_DETAILS } from '../../actions'
import { initialState, IAssesment } from '../../model'

export const resetAssessmentReducer = {
    [REMOVE_ASSESSMENT_DETAILS]
        (state: IAssesment, action: AssesmentActions<{}>) {
        return {
            ...initialState.assesment
        }
    },
};
