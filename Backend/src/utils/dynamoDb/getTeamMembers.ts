import { UserDocument } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { scan } from './sdk';

export interface TeamMembers {
  createdOn?: number;
  emailId: string;
  orgId?: string;
  roles?: string[];
  teams: any;
}

export const getTeamMembers = (teamName: string): Promise<string[]> => {
  if (!teamName) {
    const err = new Error('Invalid user or User does not belong to a team');
    appLogger.error(err);
    throw err;
  }

  const params = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#teams': 'teams',
    },
    ExpressionAttributeValues: {
      ':teamName': {
        isLead: false,
        name: teamName,
      },
    },
    FilterExpression: 'contains (#teams, :teamName)',
    TableName: TableNames.getCognitoUsersTableName(),
  };

  appLogger.info({ getTeamMembers_scan_params: params });
  return scan<UserDocument[]>(params).then((userDocuments: UserDocument[]) =>
    userDocuments.map((userDocument) => {
      appLogger.info({ userDocument });
      return userDocument.emailId;
    })
  );
};

export const getTeamMembersDetails2 = (
  teamName: string
): Promise<UserDocument[]> => {
  if (!teamName) {
    const err = new Error('Invalid user or User does not belong to a team');
    appLogger.error(err);
    throw err;
  }

  const params = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#teams': 'teams',
    },
    ExpressionAttributeValues: {
      ':teamName': {
        isLead: false,
        name: teamName,
      },
    },
    FilterExpression: 'contains (#teams, :teamName)',
    TableName: TableNames.getCognitoUsersTableName(),
  };

  appLogger.info({ getTeamMembers_get_params: params });
  return scan<UserDocument[]>(params);
};

//Get NON Manager Team Members ONLY NOT TO BE USED
export const getTeamMembersDetails = (
  teamName: string
): Promise<TeamMembers[]> => {
  if (!teamName) {
    const err = new Error('Invalid user or User does not belong to a team');
    appLogger.error(err);
    throw err;
  }

  const params = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#active': 'active',
      '#teams': 'teams',
    },
    ExpressionAttributeValues: {
      ':active': false,
      ':teamName': {
        isLead: false,
        name: teamName,
      },
    },
    FilterExpression: 'contains (#teams, :teamName) AND #active <> :active',
    TableName: TableNames.getCognitoUsersTableName(),
  };

  appLogger.info({ getTeamMembersDetails_scan_params: params });
  return scan<UserDocument[]>(params).then((userDocuments: UserDocument[]) =>
    userDocuments.map((userDocument) => {
      const teamMembers: TeamMembers = {
        createdOn: userDocument.createdOn,
        emailId: userDocument.emailId,
        //manager: userDocument.manager,
        orgId: userDocument.orgId,
        roles: userDocument.roles,
        teams: userDocument.teams.map((teamNames: any) => teamNames.name),
      };
      return teamMembers;
    })
  );
};

//NOT IN USE
export const getTeamHier = (teamName: string): Promise<any> => {
  if (!teamName) {
    const err = new Error('Invalid user or User does not belong to a team');
    appLogger.error(err);
    throw err;
  }

  const params = <DynamoDB.ScanInput>{
    ExpressionAttributeNames: {
      '#teams': 'hierarchy',
    },
    ExpressionAttributeValues: {
      ':teamName': teamName,
    },
    FilterExpression: 'contains (#teams, :teamName)',
    TableName: TableNames.getCognitoUsersTableName(),
  };

  appLogger.info({ getTeamHier_scan_params: params });
  return scan<any>(params);
};
