import { CorsOptions } from 'cors';

export interface Config {
  cognito: {
    appClientId: string;
    appClientURL: string;
    userPoolId: string;
  };
  cors: CorsOptions;
  defaults: {
    groups: string[];
    orgId: string;
    quesType: string;
    scoreCoeff: number;
    subDomain: {
      [key: string]: string;
    };
    teamName: string;
  };
  elasticsearch: {
    password: string;
    url: string;
    username: string;
  };
  metricsTables: {
    [key: string]: string;
  };
  precedenceOrder: {
    [key: string]: number;
  };
  region: string;
  statusCodes: {
    [key: string]: number;
  };
  tables: {
    [key: string]: string;
  };
}

export const config: Config = {
  cognito: {
    appClientId: '',
    appClientURL: '',
    userPoolId: '',
  },
  cors: {
    origin: true,
  },
  defaults: {
    groups: ['Member'],
//    orgId: 'dish', // default should be 'dish' //dish env
    orgId: 'www', // default should be 'www' //pinimbus env
    quesType: '1234',
    scoreCoeff: 10,
    subDomain: {
      development: 'dev',
      local: 'dev',
      production: 'm1', //change to 'beta' for beta-deploy, 'dish' for dish-deploy, change based on where to deploy
      qa: 'qa',
    },
    teamName: 'Others',
  },
  elasticsearch: {
    password: 'pinimbus', //change based on where to deploy
//    url: 'http://10.155.223.144:9200', //dish env //change based on where to deploy
    url: 'http://34.234.42.134:9200', //pinimbus env //change based on where to deploy
//    url: 'http://18.206.35.232:9200', //nomiso - m1 env //change based on where to deploy
    username: 'doitright-user', //change based on where to deploy
  },
  metricsTables: {
    buildTable: 'build-data',
    gitlabCommitTable: 'gitlab-commit-data',
    incidentTable: 'incident-data',
    qualityTable: 'quality-data',
    repoTable: 'repo-data',
    reqTable: 'req-data',
  },
  precedenceOrder: {
    Admin: 1,
    Manager: 2,
    Member: 3,
  },
//  region: 'us-west-2', //dish env //change based on where to deploy
  region: 'us-east-1', //pinimbus env //change based on where to deploy
  statusCodes: {
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500,
    notFound: 404,
    ok: 200,
    unauthorized: 401,
  },
  tables: {
    assessments: 'UserAssessments',
    campaign: 'Campaigns',
    cognitoUsers: 'CognitoUsers',
    configs: 'Configs',
    questionnaires: 'Questionnaires',
    questions: 'Questions',
    team: 'Team',
  },
};
