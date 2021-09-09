import { Http } from '../../utils';
import {
  ILoadTeamAssessmentsRequest,
  ITeamsAssessmentResponse,
  ITeamsAssessmentStoreFormat,
} from '../../model';
import { AssesmentActions, mapTeamAssessmet } from './';

type FETCH_TEAM_ASSESMENTS_START = 'FETCH_TEAM_ASSESMENTS_START';
export const FETCH_TEAM_ASSESMENTS_START: FETCH_TEAM_ASSESMENTS_START =
  'FETCH_TEAM_ASSESMENTS_START';

type FETCH_TEAM_ASSESMENTS_SUCCESS = 'FETCH_TEAM_ASSESMENTS_SUCCESS';
export const FETCH_TEAM_ASSESMENTS_SUCCESS: FETCH_TEAM_ASSESMENTS_SUCCESS =
  'FETCH_TEAM_ASSESMENTS_SUCCESS';

type FETCH_TEAM_ASSESMENTS_FAIL = 'FETCH_TEAM_ASSESMENTS_FAIL';
export const FETCH_TEAM_ASSESMENTS_FAIL: FETCH_TEAM_ASSESMENTS_FAIL =
  'FETCH_TEAM_ASSESMENTS_FAIL';

export type TEAM_ASSESMENT_ACTIONS =
  | FETCH_TEAM_ASSESMENTS_START
  | FETCH_TEAM_ASSESMENTS_SUCCESS
  | FETCH_TEAM_ASSESMENTS_FAIL;

export function fetchTeamAssessments() {
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchDataStart());
    Http.get<ITeamsAssessmentResponse>({
      url: `/api/v2/assessment/history?type=team`,
      state: getState(),
    })
      .then((response: ITeamsAssessmentResponse) => {
        const result: ITeamsAssessmentStoreFormat = mapTeamAssessmet(response);
        dispatch(fetchDataSuccess(result));
      })
      .catch((error) => {
        dispatch(fetchDataFail(error));
      });
  };
}

function fetchDataStart(): AssesmentActions<ILoadTeamAssessmentsRequest> {
  return {
    type: FETCH_TEAM_ASSESMENTS_START,
    payload: {
      status: 'start',
      data: null,
    },
  };
}

function fetchDataSuccess(
  data: ITeamsAssessmentStoreFormat
): AssesmentActions<ILoadTeamAssessmentsRequest> {
  return {
    type: FETCH_TEAM_ASSESMENTS_SUCCESS,
    payload: {
      data,
      status: 'success',
    },
  };
}

function fetchDataFail(
  message: object
): AssesmentActions<ILoadTeamAssessmentsRequest> {
  return {
    type: FETCH_TEAM_ASSESMENTS_FAIL,
    payload: {
      error: message,
      data: null,
      status: 'fail',
    },
  };
}
