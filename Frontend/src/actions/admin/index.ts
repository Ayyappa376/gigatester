import { CREATE_TEAM_ACTIONS } from './create-team-action';
import { FEEDBACK_COMMENTS_ACTIONS } from './feedback-comments-actions';

export interface AdminActions<T> {
    type: CREATE_TEAM_ACTIONS | FEEDBACK_COMMENTS_ACTIONS;
    payload: T;
}

export * from './create-team-action';
export * from './feedback-comments-actions';