import { Http } from '../../utils';
import { IAssesmentQuestionRequest, IAssesmentQuestionData } from '../../model';
import { AssesmentActions } from './';
import { getQuestionIdFromCompositeQuestionId, getVersionFromCompositeQuestionId } from '../../utils/data';

type FETCH_ASSESMENT_QUESTION_INITIALIZE = 'FETCH_ASSESMENT_QUESTION_INITIALIZE';
export const FETCH_ASSESMENT_QUESTION_INITIALIZE: FETCH_ASSESMENT_QUESTION_INITIALIZE =
    'FETCH_ASSESMENT_QUESTION_INITIALIZE';

type FETCH_ASSESMENT_QUESTION_START = 'FETCH_ASSESMENT_QUESTION_START';
export const FETCH_ASSESMENT_QUESTION_START: FETCH_ASSESMENT_QUESTION_START =
    'FETCH_ASSESMENT_QUESTION_START';

type FETCH_ASSESMENT_QUESTION_SUCCESS = 'FETCH_ASSESMENT_QUESTION_SUCCESS';
export const FETCH_ASSESMENT_QUESTION_SUCCESS: FETCH_ASSESMENT_QUESTION_SUCCESS =
    'FETCH_ASSESMENT_QUESTION_SUCCESS';

type FETCH_ASSESMENT_QUESTION_FAIL = 'FETCH_ASSESMENT_QUESTION_FAIL';
export const FETCH_ASSESMENT_QUESTION_FAIL: FETCH_ASSESMENT_QUESTION_FAIL =
    'FETCH_ASSESMENT_QUESTION_FAIL';

export type ASSESMENT_QUESTION_ACTIONS = FETCH_ASSESMENT_QUESTION_FAIL
    | FETCH_ASSESMENT_QUESTION_SUCCESS
    | FETCH_ASSESMENT_QUESTION_START
    | FETCH_ASSESMENT_QUESTION_INITIALIZE

export function fetchAssesMentQuestion(assesmentId: string, index: number, type: string, questionnaireVersion: string, team: string, mappedQuestionId?: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(fetchDataStart());
        let url: string = '';
        if (mappedQuestionId) {
            const questionId = getQuestionIdFromCompositeQuestionId(mappedQuestionId);
            const questionVersion = getVersionFromCompositeQuestionId(mappedQuestionId);
            url = `/api/v2/assessment/${assesmentId}/question/${index}/${team}/${type}/${questionnaireVersion}?questionId=${questionId}&questionVersion=${questionVersion}`
        } else {
            url = `/api/v2/assessment/${assesmentId}/question/${index}/${team}/${type}/${questionnaireVersion}`;
        }
        Http.get<IAssesmentQuestionData>({
            url,
            state: getState()
        }).then((response: IAssesmentQuestionData) => {
            response.index = index;
            dispatch(fetchDataSuccess(response));
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        })
    };
}

export function fetchAssessmentQuestionInitialize(): AssesmentActions<IAssesmentQuestionRequest> {
    return {
        type: FETCH_ASSESMENT_QUESTION_INITIALIZE,
        payload: {
            status: 'initial',
            data: null
        }
    };
}

function fetchDataStart(): AssesmentActions<IAssesmentQuestionRequest> {
    return {
        type: FETCH_ASSESMENT_QUESTION_START,
        payload: {
            status: 'start',
            data: null
        }
    };
}

function fetchDataSuccess(data: IAssesmentQuestionData):
    AssesmentActions<IAssesmentQuestionRequest> {
    return {
        type: FETCH_ASSESMENT_QUESTION_SUCCESS,
        payload: {
            data,
            status: 'success',
        }
    };
}

function fetchDataFail(message: object): AssesmentActions<IAssesmentQuestionRequest> {
    return {
        type: FETCH_ASSESMENT_QUESTION_FAIL,
        payload: {
            error: message,
            data: null,
            status: 'fail',
        }
    };
}