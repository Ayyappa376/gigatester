//import { config } from '@root/config';
import {
  AllotedTeam,
  ConfigItem,
//  CreateTeamConfig,
  MetricsTool,
  ServiceInfo,
  TeamInfo,
} from '@models/index';
import { generate } from '@utils/common';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, fetchManagers, getServiceConfig, getTeamConfig } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import { addUserToTeam } from './addUserToTeam';
import { getUserDocumentFromEmail } from './getUserDocument';
import { get, put, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

export const getOrderFromTeams = async (
  teams: AllotedTeam[]
): Promise<string[]> => {
  let orderSet = new Set<string>();
  for (const team of teams) {
    const teamDetail = await getTeamDetails(team.name);
    orderSet = new Set(teamDetail.order.concat([...orderSet]));
  }
  const order = [...orderSet];
  return order;
};

// Creating Team and validating parameters
export const createTeam = async (teamData: TeamInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
  if (!teamData.manager) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  const managerId = await getUserDocumentFromEmail(teamData.manager).catch(
    (e) => {
      const err = new Error('Invalid. Manager does not exists');
      appLogger.error(err);
      throw err;
    }
  );
  if (!managerId[0]) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  if (
    managerId[0] &&
    managerId[0].roles &&
    !managerId[0].roles.includes('Manager') &&
    !managerId[0].roles.includes('Admin')
  ) {
    const err = new Error('Invalid. Manager, user is not a Manager');
    appLogger.error(err);
    throw err;
  }

  //add id to services
  if(teamData.services) {
    addIdToServices(teamData.services);
  }

  const item: any = {
    active: 'true',
    createdOn: new Date().getTime(),
    manager: teamData.manager,
    managerId: managerId[0].id,
    order: ['admin', teamData.manager],
    orgId: teamData.orgId,
    teamId: teamData.teamName,
    teamName: teamData.teamName,
  };

  Object.keys(teamData).forEach((val, i) => {
    if (
      !(
        val === 'teamId' ||
        val === 'active' ||
        val === 'createdBy' ||
        val === 'createdOn' ||
        val === 'order' ||
        val === 'orgId' ||
        val === 'teamName' ||
        val === 'manager' ||
        val === 'managerId'
      )
    ) {
      if (teamData[val].length > 0 && typeof teamData[val] === 'object') {
        item[val] = new Array();
        teamData[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
              item[val].push(ele.split('Other:')[1]);
            // updateTeamConfig(teamData.orgId, item[val][j]);
          } else {
            item[val].push(ele);
          }
        });
      } else {
        item[val] = teamData[val];
      }
    }
  });

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    TableName: TableNames.getTeamTableName(),
    // tslint:disable-next-line: object-literal-sort-keys
    Item: item,
    ConditionExpression:
      'attribute_not_exists(teamId) AND attribute_not_exists(manager)',
  });

  appLogger.info({ createTeam_put_params: params });
  put<DynamoDB.PutItemInput>(params).catch((e: any) => {
    appLogger.error({ createTeam_put_error: e });
  });

  await addUserToTeam(managerId[0].id, teamData.teamId, true).catch(
    (e: any) => {
      appLogger.error({ addUserToTeam_error: e });
    }
  );
};

//add id to each services if it doesn't already exist
const addIdToServices = (services: ServiceInfo[]) => {
  services.forEach((service: ServiceInfo) => {
    if(! service.id) {
      const partialName = service.name.replace(/\s/g, '').substring(0, 4);
      const rand = generate(10);
      service.id = `${partialName}_${rand}`;
    }
    if(service.services) {
      addIdToServices(service.services);
    }
  });
};

//fetch team Config from dynamoDb and fill in the options
export const getCreateTeamConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const teamConfig: ConfigItem = await getTeamConfig(orgId);
  appLogger.info({ getTeamConfig: teamConfig });

/*  const configDetails = {};
  Object.keys(teamConfig.config).forEach((val: any) => {
    configDetails[val] = {};
    configDetails[val].displayName = teamConfig.config[val].displayName;
    configDetails[val].Mandatory = teamConfig.config[val].mandatory;
    configDetails[val].type = teamConfig.config[val].type;
    if (teamConfig.config[val].options) {
      configDetails[val].options = [];
      if (
        teamConfig.config[val].options.custom &&
        teamConfig.config[val].options.custom !== ''
      ) {
        configDetails[val].options = teamConfig.config[val].options.custom
          .split(',')
          .map((item: string) => item.trim());
      } else if (
        teamConfig.config[val].options.customFixed &&
        teamConfig.config[val].options.customFixed !== ''
      ) {
        configDetails[val].options = teamConfig.config[val].options.customFixed
          .split(',')
          .map((item: string) => item.trim());
      }
    }
  });

  const createTeamConfig: ConfigItem = { config: configDetails, orgId };
*/
  const managers = await fetchManagers();
  const key = 'manager';
  teamConfig.config[key].options = { custom: managers.join(',') };
  return teamConfig;
};

//fetch team Config from dynamoDb and fill in the options
export const getCreateServiceConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const serviceConfig: ConfigItem = await getServiceConfig(orgId);
  appLogger.info({ getServiceConfig: serviceConfig });

  return serviceConfig;
};

// fetch team info
export const getTeamDetails = async (teamId: string): Promise<TeamInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      teamId,
    },
    TableName: TableNames.getTeamTableName(),
  });
  appLogger.info({ getTeamDetails_get_params: params });
  return get<TeamInfo>(params);
};

// soft delete a team
export const deactivateTeam = async (teamId: string): Promise<TeamInfo> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    //ConditionExpression: 'attribute_exists(emailId)',
    ExpressionAttributeNames: { '#active': 'active' },
    ExpressionAttributeValues: { ':val': 'false' },
    Key: {
      teamId,
    },
    TableName: TableNames.getTeamTableName(),
    UpdateExpression: 'SET #active = :val',
  });
  appLogger.info({ deactivateTeam_update_params: params });
  return update(params);
};

//Update team details -- used by update createTeam API
export const updateTeam = async (updateInfo: TeamInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
//  delete updateInfo.teamName;
  const EAN: any = {};
  const EAV: any = {};
  let SET = 'SET ';
  if (!updateInfo.manager) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  const managerId = await getUserDocumentFromEmail(updateInfo.manager).catch(
    (e) => {
      const err = new Error('Invalid Manager does not exists');
      appLogger.error(err);
      throw err;
    }
  );
  if (!managerId[0]) {
    const err = new Error('Invalid Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  if (
    managerId[0] &&
    managerId[0].roles &&
    !managerId[0].roles.includes('Manager') &&
    !managerId[0].roles.includes('Admin')
  ) {
    const err = new Error('Invalid Manager, user is not a Manager');
    appLogger.error(err);
    throw err;
  }

  //add id to services
  if(updateInfo.services) {
    addIdToServices(updateInfo.services);
  }

  EAN['#order'] = 'order';
  EAV[':order'] = ['admin', updateInfo.manager];
  SET += `#order = :order`;

  Object.keys(updateInfo).forEach((val, i) => {
    if (
      !(
        val === 'teamId' ||
        val === 'createdBy' ||
        val === 'createdOn' ||
        val === 'order' ||
        val === 'orgId' ||
        val === 'teamName'
      )
    ) {
      if (val === 'manager') {
        if (
          managerId[0] &&
          managerId[0].roles &&
          (managerId[0].roles.includes('Manager') ||
            managerId[0].roles.includes('Admin'))
        ) {
          EAN[`#${val}`] = val;
          EAV[`:${val}`] = updateInfo[val];
          SET = SET + `, #${val} = :${val}`;
        }
      } else if (
        updateInfo[val].length > 0 &&
        typeof updateInfo[val] === 'object'
      ) {
        const item = new Array();
        updateInfo[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
            item.push(ele.split('Other:')[1]);
            // updateTeamConfig(teamData.orgId, item[val][j]);
          } else {
            item.push(ele);
          }
        });
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = item;
        SET = SET + `, #${val} = :${val}`;
      } else {
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = updateInfo[val];
        SET = SET + `, #${val} = :${val}`;
      }
    }
  });

  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      teamId: updateInfo.teamId,
    },
    TableName: TableNames.getTeamTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateTeam_update_params: params });
  update<DynamoDB.UpdateItemInput>(params).catch((e: any) => {
    appLogger.error({ updateTeam_update_error: e });
  });

  await addUserToTeam(managerId[0].id, updateInfo.teamId, true).catch(
    (e: any) => {
      appLogger.error({ addUserToTeam_error: e });
    }
  );
};

//Update team metrics tools -- used by SetMetricsTools API
export const updateTeamMetrics = async (
  teamId: string,
  metricsTools: MetricsTool[],
  services: ServiceInfo[]
) => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: { '#metrics': 'metrics', '#services': 'services' },
    ExpressionAttributeValues: { ':metrics': metricsTools, ':services': services },
    Key: {
      teamId,
    },
    TableName: TableNames.getTeamTableName(),
    UpdateExpression: 'SET #metrics = :metrics, #services = :services',
  });

  appLogger.info({ updateTeam_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};
