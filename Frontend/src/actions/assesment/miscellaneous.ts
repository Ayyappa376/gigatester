import { AssesmentActions } from ".";
import { IAssessmentMiscellaneous } from "../../model/assesment/miscellaneous";

type SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN = 'SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN';
export const SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN: SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN = 'SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN'

export type MISCELLANEOUS_ASSESSMENT_ACTIONS = SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN;

export const setContinueAssessmentNotificationShown = ():AssesmentActions<IAssessmentMiscellaneous> => {
    return {
        type: SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN,
        payload: {
            continueAssessmentNotificationShown: true
        }
    };
};

export const unsetContinueAssessmentNotificationShown = ():AssesmentActions<IAssessmentMiscellaneous> => {
    return {
        type: SET_CONTINUE_ASSESSMENT_NOTIFICATION_SHOWN,
        payload: {
            continueAssessmentNotificationShown: false
        }
    };
};