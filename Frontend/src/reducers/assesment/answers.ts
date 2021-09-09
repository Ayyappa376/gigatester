import {
    POST_SELECTED_OPTION_START,
    POST_SELECTED_OPTION_FAIL,
    POST_SELECTED_OPTION_SUCCESS,
    SAVE_SELECTED_RESPONSE,
    AssesmentActions,
    SAVE_SUMMARY_MARKED_ANSWERS
} from '../../actions';
import {
    IAssesment,
    IAssesmentPostRequest,
    IAssesmentAnswersMap,
    IAssesmentSummaryAnswersMap,
} from '../../model';

export const assesmentAnswersReducer = {
    [POST_SELECTED_OPTION_START]
        (state: IAssesment, action: AssesmentActions<IAssesmentPostRequest>) {
        return {
            ...state,
            assesmentAnswers: {
                ...action.payload
            }
        };
    },
    [POST_SELECTED_OPTION_FAIL]
        (state: IAssesment, action: AssesmentActions<IAssesmentPostRequest>) {
        return {
            ...state,
            assesmentAnswers: {
                ...action.payload
            }
        }
    },
    [POST_SELECTED_OPTION_SUCCESS]
        (state: IAssesment, action: AssesmentActions<IAssesmentPostRequest>) {
        return {
            ...state,
            assesmentAnswers: {
                ...action.payload
            },
        };
    },
    [SAVE_SELECTED_RESPONSE]
        (state: IAssesment, action: AssesmentActions<IAssesmentAnswersMap>) {
        return {
            ...state,
            markedAnswers: {
                ...state.markedAnswers,
                ...action.payload
            }
        };
    },
    [SAVE_SUMMARY_MARKED_ANSWERS]
        (state: IAssesment, action: AssesmentActions<IAssesmentSummaryAnswersMap>) {
        const payload = addCommentsField(action.payload)
        return {
            ...state,
            markedAnswers: payload
        };
    }
}

const addCommentsField = (data: any) => {
    for (let key in data){
        if(!data[key].comment){
            data[key].comment = null
        }
    }
    return data;

}
