import { SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN, AssesmentActions } from '../../actions';
import { IAssesment } from '../../model';
import { IAssessmentMiscellaneous } from '../../model/assesment/miscellaneous';

export const assessmentsMiscellaneousReducer = {
    [SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN]
    (state: IAssesment, action: AssesmentActions<IAssessmentMiscellaneous>) {
        {
            return {
                ...state,
                misc: { ...action.payload }
            };
        }
    }
};
