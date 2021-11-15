import { config } from '@root/config';

export function getAssessmentsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.assessments}`;
}

export function getCampaignsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.campaigns}`;
}

export function getCognitoUsersTableName(): string {
  return `${config.defaults.orgId}_${config.tables.cognitoUsers}`;
}

export function getPlatformsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.platforms}`;
}

export function getQuestionnairesTableName(): string {
  return `${config.defaults.orgId}_${config.tables.questionnaires}`;
}

export function getQuestionsTableName(): string {
  return `${config.defaults.orgId}_${config.tables.questions}`;
}

export function getTeamTableName(): string {
  return `${config.defaults.orgId}_${config.tables.team}`;
}

export function getConfigsTableName(): string {
  //    return config.tables.configs;
  return `${config.defaults.orgId}_${config.tables.configs}`;
}
