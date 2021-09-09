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
    orgId: 'www', // default should be 'www'
    quesType: '1234',
    scoreCoeff: 10,
    subDomain: {
      development: 'dev',
      local: 'dev',
      production: 'beta', //change to 'beta' for beta-deploy, 'dish' for dish-deploy
      qa: 'qa',
    },
    teamName: 'Others',
  },
  metricsTables: {
    buildTable: 'build-data',
    qualityTable: 'quality-data',
    repoTable: 'repo-data',
    reqTable: 'req-data',
  },
  precedenceOrder: {
    Admin: 1,
    Manager: 2,
    Member: 3,
  },
  region: 'us-east-1',
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
    cognitoUsers: 'CognitoUsers',
    configs: 'Configs',
    questionnaires: 'Questionnaires',
    questions: 'Questions',
    team: 'Team',
  },
};
