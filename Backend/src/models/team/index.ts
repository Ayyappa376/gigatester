export interface TeamInfo {
    active: string;
    createdBy?: string;
    createdOn?: number;
    manager?: string;
    managerId?: string;
    metrics: MetricsTool[];
    order: [string];
    teamId: string;
    teamName: string;
    [keyName: string]: any;
}

export interface TeamAttributes {
    displayName: string;
    Mandatory: boolean;
    options?: any;
    type: string;
    value?: any;
}

export interface CreateTeamConfig {
    config: {
       [keyName: string]: TeamAttributes;
    };
    orgId: string;
}

export interface MetricsTool {
    toolName: string;
    toolType: string;
    [keyName: string]: any;
}
