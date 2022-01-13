import { IAdmin, ISignedUrls } from "../../model";
import { UPDATE_SIGNED_URLS, AdminActions } from "../../actions";

export const adminUpdateSignedUrlsReducer = {
    [UPDATE_SIGNED_URLS]
    (state: IAdmin, action: AdminActions<ISignedUrls>) {
        return {
            ...state,
            signedUrls: {
                ...action.payload
            }
        };
    },
}