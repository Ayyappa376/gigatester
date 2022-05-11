import { config } from '@root/config';

export function getAssessmentsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.assessments}`;
}

export function getAppFeedbackTableName(): string {
  return `${config.defaults.orgId}_${config.tables.appFeedback}`;
}

export function getCampaignsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.campaigns}`;
}

export function getCognitoUsersTableName(): string {
  return `${config.defaults.orgId}_${config.tables.cognitoUsers}`;
}

export function getDevicesTableName(): string {
  return `${config.defaults.orgId}_${config.tables.devices}`;
}

export function getPlatformsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.platforms}`;
}

export function getProductsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.products}`;
}

export function getQuestionnairesTableName(): string {
  return `${config.defaults.orgId}_${config.tables.questionnaires}`;
}

export function getTestSuitesTableName(): string {
  return `${config.defaults.orgId}_${config.tables.testSuites}`;
}

export function getQuestionsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.questions}`;
}

export function getTeamTableName(): string {
  return `${config.defaults.orgId}_${config.tables.team}`;
}

export function getConfigsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.configs}`;
}

export function getGroupsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.groups}`;
}

export function getOrganizationsTableName(): string {
  if(process.env.DB_ENV === 'development' || process.env.DB_ENV === 'local') {
    return `dev_${config.tables.organizations}`;
  }
  else if(process.env.DB_ENV === 'beta') {
    return `beta_${config.tables.organizations}`;
  }
  else if(process.env.DB_ENV === 'production') {
    return `prod_${config.tables.organizations}`; //prod db name
  }
  else{
    return `${process.env.DB_ENV}_${config.defaults.orgId}_${config.tables.organizations}`;
  }
}

export function getUsersTableName(): string {
  return `${config.defaults.orgId}_${config.tables.users}`;
}
