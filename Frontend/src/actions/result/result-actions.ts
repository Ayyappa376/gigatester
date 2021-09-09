import { Http } from '../../utils';
import { ILoadAssessmentFinalResultRequest } from '../../model';
import { IAssessmentFinalResultResponse } from '../../model/result';
import { AssessmentResultActions } from './';

type FETCH_ASSESMENT_RESULT_START = 'FETCH_ASSESMENT_RESULT_START';
export const FETCH_ASSESMENT_RESULT_START: FETCH_ASSESMENT_RESULT_START =
    'FETCH_ASSESMENT_RESULT_START';

type FETCH_ASSESMENT_RESULT_SUCCESS = 'FETCH_ASSESMENT_RESULT_SUCCESS';
export const FETCH_ASSESMENT_RESULT_SUCCESS: FETCH_ASSESMENT_RESULT_SUCCESS =
    'FETCH_ASSESMENT_RESULT_SUCCESS';

type FETCH_ASSESMENT_RESULT_FAIL = 'FETCH_ASSESMENT_RESULT_FAIL';
export const FETCH_ASSESMENT_RESULT_FAIL: FETCH_ASSESMENT_RESULT_FAIL =
    'FETCH_ASSESMENT_RESULT_FAIL';

type RESET_ASSESMENT_RESULT = 'RESET_ASSESMENT_RESULT';
export const RESET_ASSESMENT_RESULT: RESET_ASSESMENT_RESULT =
    'RESET_ASSESMENT_RESULT';

export type ASSESMENT_RESULT_ACTIONS = FETCH_ASSESMENT_RESULT_FAIL
    | FETCH_ASSESMENT_RESULT_SUCCESS
    | FETCH_ASSESMENT_RESULT_START
    | RESET_ASSESMENT_RESULT
// hardcoded assessmentId here
// const apiPath = '/api/v1/assessment/1kaj1231jqp80rfv/result';

export function fetchAssesmentResultData(assessmentId: string) {
    return (dispatch: Function, getState: Function) => {

        dispatch(fetchDataStart());
        Http.get<IAssessmentFinalResultResponse>({
            url: `/api/v2/assessment/${assessmentId}/result`,
            state: getState()
        }).then((response: IAssessmentFinalResultResponse) => {
            dispatch(fetchDataSuccess(response));
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        })
    };
}

function fetchDataStart(): AssessmentResultActions<ILoadAssessmentFinalResultRequest> {
    return {
        type: FETCH_ASSESMENT_RESULT_START,
        payload: {
            status: 'start',
            data: null
        }
    };
}

function fetchDataSuccess(data: IAssessmentFinalResultResponse):
    AssessmentResultActions<ILoadAssessmentFinalResultRequest> {
    return {
        type: FETCH_ASSESMENT_RESULT_SUCCESS,
        payload: {
            data,
            status: 'success',
        }
    };
}

export function resetResultState(){
    return (dispatch: Function, getState: Function) => {
        dispatch(resetResult())
    }
}

function resetResult():
    AssessmentResultActions<ILoadAssessmentFinalResultRequest> {
    return {
        type: RESET_ASSESMENT_RESULT,
        payload: {
            data: null,
            status: 'initial',
        }
    };
}

function fetchDataFail(message: object):
    AssessmentResultActions<ILoadAssessmentFinalResultRequest> {
    return {
        type: FETCH_ASSESMENT_RESULT_FAIL,
        payload: {
            error: message,
            data: null,
            status: 'fail',
        }
    };
}