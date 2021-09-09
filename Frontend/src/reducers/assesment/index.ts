import createReducer from '../createReducer';
import { initialState, IAssesment } from '../../model';
import { assesmentQuestionReducers } from './question';
import { assesmentSummaryReducers } from './summary';
import { assesmentAnswersReducer } from './answers';
import { assesmentResultReducer } from './assessment-result-reducer';
import { assessmentHistory } from './assessment-hisory';
import { assessmentDetail } from './assessment-detail';
import { teamAssessments } from './team-assessments';
import { assessmentTypes } from './assessment-select';
import { resetAssessmentReducer } from './reset-assessments';
import { assessmentsMiscellaneousReducer } from './assessments-miscellaneous';
import { assessmentTimeReducer } from './assessment-time';

const defaultState = initialState.assesment;
const assesmentReducers = {
    ...assesmentQuestionReducers,
    ...assesmentSummaryReducers,
    ...assesmentAnswersReducer,
    ...assesmentResultReducer,
    ...assessmentHistory,
    ...assessmentDetail,
    ...teamAssessments,
    ...assessmentTypes,
    ...resetAssessmentReducer,
    ...assessmentsMiscellaneousReducer,
    ...assessmentTimeReducer
}

export const assesment = createReducer<IAssesment>(defaultState, assesmentReducers);
