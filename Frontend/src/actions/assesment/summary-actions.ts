import { Http } from '../../utils';
import { IAssesmentSummaryRequest } from '../../model';
import { IAssesmentSummaryData } from '../../model/assesment';
import { AssesmentActions } from './';
import { mapSummaryAnswersToQuestions } from './answer-actions'
import { ISelectedAssessmentType } from '../../model/assesment/selected-assessment-type';

type FETCH_ASSESMENT_SUMMARY_START = 'FETCH_ASSESMENT_SUMMARY_START';
export const FETCH_ASSESMENT_SUMMARY_START: FETCH_ASSESMENT_SUMMARY_START =
    'FETCH_ASSESMENT_SUMMARY_START';

type FETCH_ASSESMENT_SUMMARY_SUCCESS = 'FETCH_ASSESMENT_SUMMARY_SUCCESS';
export const FETCH_ASSESMENT_SUMMARY_SUCCESS: FETCH_ASSESMENT_SUMMARY_SUCCESS =
    'FETCH_ASSESMENT_SUMMARY_SUCCESS';

type FETCH_ASSESMENT_SUMMARY_FAIL = 'FETCH_ASSESMENT_SUMMARY_FAIL';
export const FETCH_ASSESMENT_SUMMARY_FAIL: FETCH_ASSESMENT_SUMMARY_FAIL =
    'FETCH_ASSESMENT_SUMMARY_FAIL';

export type ASSESMENT_SUMMARY_ACTIONS = FETCH_ASSESMENT_SUMMARY_FAIL
    | FETCH_ASSESMENT_SUMMARY_SUCCESS
    | FETCH_ASSESMENT_SUMMARY_START

const apiPath = '/api/v2/assessment/summary';

export function fetchAssesmentData(assessmentSelectData: ISelectedAssessmentType, team: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(fetchDataStart());
        Http.get<IAssesmentSummaryData>({
            url: `${apiPath}/${team}/${assessmentSelectData.questionnaireId}?version=${assessmentSelectData.version}`,
            state: getState()
        }).then((response: IAssesmentSummaryData) => {
            dispatch(fetchDataSuccess(response));
            dispatch(mapSummaryAnswersToQuestions(response))
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        })
    };
}

function fetchDataStart(): AssesmentActions<IAssesmentSummaryRequest> {
    return {
        type: FETCH_ASSESMENT_SUMMARY_START,
        payload: {
            status: 'start',
            data: null
        }
    };
}

function fetchDataSuccess(data: IAssesmentSummaryData):
    AssesmentActions<IAssesmentSummaryRequest> {
    if (!data.markedAnswers) {
        data.markedAnswers = {}
    }
    return {
        type: FETCH_ASSESMENT_SUMMARY_SUCCESS,
        payload: {
            data,
            status: 'success',
        }
    };
}

function fetchDataFail(message: object): AssesmentActions<IAssesmentSummaryRequest> {
    return {
        type: FETCH_ASSESMENT_SUMMARY_FAIL,
        payload: {
            error: message,
            data: null,
            status: 'fail',
        }
    };
}