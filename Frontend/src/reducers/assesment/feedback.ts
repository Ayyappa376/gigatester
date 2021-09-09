import {
    POST_FEEDBACK_START,
    POST_FEEDBACK_SUCCESS,
    POST_FEEDBACK_FAIL,
    FeedbackActions
} from '../../actions';
import {
    IAssesment,
    ILoadFeedbackRequest
} from '../../model';

export const feedbackReducer = {
    [POST_FEEDBACK_START]
        (state: IAssesment, action: FeedbackActions<ILoadFeedbackRequest>) {
        return {
            ...state,
            feedback: {
                ...action.payload
            }
        };
    },
    [POST_FEEDBACK_FAIL]
        (state: IAssesment, action: FeedbackActions<ILoadFeedbackRequest>) {
        return {
            ...state,
            feedback: {
                ...action.payload
            }
        }
    },
    [POST_FEEDBACK_SUCCESS]
        (state: IAssesment, action: FeedbackActions<ILoadFeedbackRequest>) {
        return {
            ...state,
            feedback: {
                ...action.payload
            },
        };
    }
}
