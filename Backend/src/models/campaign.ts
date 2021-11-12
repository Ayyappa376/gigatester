export interface CampaignInfo {
    active: string;
    createdBy: string;
    createdOn: number;
    id: string;
    manager?: string;
    managerId?: string;
    modifiedBy?: string;
    modifiedOn?: number;
    name: string;
    type?: string;
    [keyName: string]: any;
}
