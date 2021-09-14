import { Http } from '../../utils';
import {
  ILoadAssessmentHistoryRequest,
  IAssessmentHistoryResponse,
  IAssessmentHistoryStoreFormat
} from '../../model';
import { AssesmentActions, mapAssessmentHistory } from './';

type FETCH_ASSESMENT_HISTORY_START = 'FETCH_ASSESMENT_HISTORY_START';
export const FETCH_ASSESMENT_HISTORY_START: FETCH_ASSESMENT_HISTORY_START =
  'FETCH_ASSESMENT_HISTORY_START';

type FETCH_ASSESMENT_HISTORY_SUCCESS = 'FETCH_ASSESMENT_HISTORY_SUCCESS';
export const FETCH_ASSESMENT_HISTORY_SUCCESS: FETCH_ASSESMENT_HISTORY_SUCCESS =
  'FETCH_ASSESMENT_HISTORY_SUCCESS';

type FETCH_ASSESMENT_HISTORY_FAIL = 'FETCH_ASSESMENT_HISTORY_FAIL';
export const FETCH_ASSESMENT_HISTORY_FAIL: FETCH_ASSESMENT_HISTORY_FAIL =
  'FETCH_ASSESMENT_HISTORY_FAIL';

export type ASSESMENT_HISTORY_ACTIONS =
  | FETCH_ASSESMENT_HISTORY_FAIL
  | FETCH_ASSESMENT_HISTORY_SUCCESS
  | FETCH_ASSESMENT_HISTORY_START;

export function fetchAssessmentHistory() {
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchDataStart());
    Http.get<IAssessmentHistoryResponse>({
      url: `/api/v2/assessment/history?type=user&limit=25`,
      state: getState(),
    })
      .then((response: IAssessmentHistoryResponse) => {
        const result: IAssessmentHistoryStoreFormat = mapAssessmentHistory(
          response
        );
        dispatch(fetchDataSuccess(result));
      })
      .catch((error) => {
        dispatch(fetchDataFail(error));
      });
  };
}

function fetchDataStart(): AssesmentActions<ILoadAssessmentHistoryRequest> {
  return {
    type: FETCH_ASSESMENT_HISTORY_START,
    payload: {
      status: 'start',
      data: null,
    },
  };
}

function fetchDataSuccess(
  data: IAssessmentHistoryStoreFormat
): AssesmentActions<ILoadAssessmentHistoryRequest> {
  return {
    type: FETCH_ASSESMENT_HISTORY_SUCCESS,
    payload: {
      data,
      status: 'success',
    },
  };
}

function fetchDataFail(
  message: object
): AssesmentActions<ILoadAssessmentHistoryRequest> {
  return {
    type: FETCH_ASSESMENT_HISTORY_FAIL,
    payload: {
      error: message,
      data: null,
      status: 'fail',
    },
  };
}
