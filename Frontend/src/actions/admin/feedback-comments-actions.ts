import { ISignedUrls } from "../../model";

type UPDATE_SIGNED_URLS = 'UPDATE_SIGNED_URLS';
export const UPDATE_SIGNED_URLS: UPDATE_SIGNED_URLS =
    'UPDATE_SIGNED_URLS';

export type FEEDBACK_COMMENTS_ACTIONS = UPDATE_SIGNED_URLS;

export function updateSignedUrls(params: ISignedUrls) {
    return {
        type: UPDATE_SIGNED_URLS,
        payload: params
    };
}
