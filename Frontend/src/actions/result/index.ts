import {
    ASSESMENT_RESULT_ACTIONS
} from './result-actions';

export interface AssessmentResultActions<T> {
    type: ASSESMENT_RESULT_ACTIONS;
    payload: T;
}

export * from './result-actions';