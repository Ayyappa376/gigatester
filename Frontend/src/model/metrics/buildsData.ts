export interface IBuildsDataItem {
    buildNum: number;
    teamId: string;
    projectName: string;
    duration: number;
    status: string;
    timestamp: number;
    url: string;
}

export const STATUS_PASS = 'SUCCESS';
export const STATUS_FAIL = 'FAILURE';
export const STATUS_OTHER = 'OTHER'; //Like Aborted or Error etc.
