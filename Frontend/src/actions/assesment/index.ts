import { ASSESMENT_SUMMARY_ACTIONS } from './summary-actions';
import { ASSESMENT_QUESTION_ACTIONS } from './question-actions';
import { POST_SELECTED_OPTION_ACTIONS } from './answer-actions';
import { ASSESMENT_HISTORY_ACTIONS } from './assessment-history-actions';
import { ASSESMENT_DETAIL_ACTIONS } from './assessment-detail-actions';
import { TEAM_ASSESMENT_ACTIONS } from './team-view-actions';
import { ASSESMENT_TYPES_ACTIONS } from './assessment-select-actions';
import { REMOVE_ASSESSMENT_ACTIONS } from './reset-assessments';
import { MISCELLANEOUS_ASSESSMENT_ACTIONS } from './miscellaneous';
import { ASSESSMENT_TIME_ACTIONS } from './assessment-time';

export interface AssesmentActions<T> {
    type: ASSESMENT_SUMMARY_ACTIONS |
    ASSESMENT_QUESTION_ACTIONS |
    POST_SELECTED_OPTION_ACTIONS |
    ASSESMENT_HISTORY_ACTIONS |
    ASSESMENT_DETAIL_ACTIONS |
    TEAM_ASSESMENT_ACTIONS |
    ASSESMENT_TYPES_ACTIONS |
    REMOVE_ASSESSMENT_ACTIONS |
    MISCELLANEOUS_ASSESSMENT_ACTIONS |
    ASSESSMENT_TIME_ACTIONS;
    payload: T;
}

export * from './summary-actions';
export * from './question-actions';
export * from './answer-actions';
export * from './assessment-history-actions';
export * from './assessment-detail-actions';
export * from './map-assessment-history';
export * from './map-team-view';
export * from './team-view-actions';
export * from './assessment-select-actions';
export * from './reset-assessments';
export * from './miscellaneous';