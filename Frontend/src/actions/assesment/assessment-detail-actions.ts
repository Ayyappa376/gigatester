import { Http } from '../../utils';
import { ILoadAssessmentDetailRequest, IAssessmentDetailResponse } from '../../model';
import { AssesmentActions } from './';

type FETCH_ASSESMENT_DETAIL_START = 'FETCH_ASSESMENT_DETAIL_START';
export const FETCH_ASSESMENT_DETAIL_START: FETCH_ASSESMENT_DETAIL_START =
    'FETCH_ASSESMENT_DETAIL_START';

type FETCH_ASSESMENT_DETAIL_SUCCESS = 'FETCH_ASSESMENT_DETAIL_SUCCESS';
export const FETCH_ASSESMENT_DETAIL_SUCCESS: FETCH_ASSESMENT_DETAIL_SUCCESS =
    'FETCH_ASSESMENT_DETAIL_SUCCESS';

type FETCH_ASSESMENT_DETAIL_FAIL = 'FETCH_ASSESMENT_DETAIL_FAIL';
export const FETCH_ASSESMENT_DETAIL_FAIL: FETCH_ASSESMENT_DETAIL_FAIL =
    'FETCH_ASSESMENT_DETAIL_FAIL';

type RESET_ASSESMENT_DETAIL = 'RESET_ASSESMENT_DETAIL';
export const RESET_ASSESMENT_DETAIL: RESET_ASSESMENT_DETAIL =
        'RESET_ASSESMENT_DETAIL';

export type ASSESMENT_DETAIL_ACTIONS = FETCH_ASSESMENT_DETAIL_FAIL
    | FETCH_ASSESMENT_DETAIL_SUCCESS | FETCH_ASSESMENT_DETAIL_START
    | RESET_ASSESMENT_DETAIL

export function fetchAssessmentDetail(assessmentId: string, isResult: boolean) {
    return (dispatch: Function, getState: Function) => {
        dispatch(fetchDataStart());
        Http.get<IAssessmentDetailResponse>({
            url: isResult ? `/api/v2/assessment/${assessmentId}/details?isResult=true`:
                            `/api/v2/assessment/${assessmentId}/details`,
            state: getState()
        }).then((response: IAssessmentDetailResponse) => {
            dispatch(fetchDataSuccess(response));
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        })
    };
}

function fetchDataStart(): AssesmentActions<ILoadAssessmentDetailRequest> {
    return {
        type: FETCH_ASSESMENT_DETAIL_START,
        payload: {
            status: 'start',
            data: null
        }
    };
}

function fetchDataSuccess(data: IAssessmentDetailResponse):
    AssesmentActions<ILoadAssessmentDetailRequest> {
    return {
        type: FETCH_ASSESMENT_DETAIL_SUCCESS,
        payload: {
            data,
            status: 'success',
        }
    };
}

function fetchDataFail(message: object): AssesmentActions<ILoadAssessmentDetailRequest> {
    return {
        type: FETCH_ASSESMENT_DETAIL_FAIL,
        payload: {
            error: message,
            data: null,
            status: 'fail',
        }
    };
}

export function resetAssessmentDetail(){
    return (dispatch: Function, getState: Function) => {
        dispatch(resetDetail())
    }
}

function resetDetail():
    AssesmentActions<ILoadAssessmentDetailRequest> {
    return {
        type: RESET_ASSESMENT_DETAIL,
        payload: {
            data: null,
            status: 'initial',
        }
    };
}