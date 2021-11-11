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
  s3: {
    [key: string]: string;
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
    orgId: 'www', // default should be 'www' //nomiso - dev env
    quesType: '1234',
    scoreCoeff: 10,
    subDomain: {
      development: 'dev',
      local: 'dev',
      production: 'beta', //change to 'beta' for beta-deploy, change based on where to deploy
    },
    teamName: 'Others',
  },
  elasticsearch: {
    password: 'pinimbus', //change based on where to deploy
    url: 'http://18.206.35.232:9200', //nomiso - dev env //change based on where to deploy
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
  region: 'us-east-1', //nomiso - dev env //change based on where to deploy
  statusCodes: {
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500,
    notFound: 404,
    ok: 200,
    unauthorized: 401,
  },
  s3: {
    gigaTesterSoftwareBucket: 'gigatester-manage-software'
  },
  tables: {
    assessments: 'GT_UserAssessments',
    campaign: 'GT_Campaigns',
    cognitoUsers: 'GT_CognitoUsers',
    configs: 'GT_Configs',
    questionnaires: 'GT_Questionnaires',
    questions: 'GT_Questions',
    team: 'GT_Team',
  },
};
