import { CorsOptions } from 'cors';

export interface Config {
  cognito: {
    appClientId: string;
    appClientURL: string;
    systemPassword: string;
    systemUser: string;
    userPoolId: string;
    userPoolRegion: string;
  };
  cors: CorsOptions;
  defaults: {
    groups: string[];
    orgId: string;
    quesType: string;
    restApiId: {
      [key: string]: string;
    };
    scoreCoeff: number;
    subDomain: {
      [key: string]: string;
    };
    teamName: string;
    usagePlanId: {
      [key: string]: string;
    };
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
  s3Bucket: {
    [key: string]: string;
  };
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
    systemPassword: '',
    systemUser: '',
    userPoolId: '',
    userPoolRegion: '',
  },
  cors: {
    origin: true,
  },
  defaults: {
    groups: ['Member'],
    orgId: 'www', // default should be 'www' //nomiso - dev env
    quesType: '1234',
    restApiId: {
      development: 'qe1lgcnkwh',
      local: 'qe1lgcnkwh',
      production: 'gm97bmv2v7',
    },
    scoreCoeff: 10,
    subDomain: {
      development: 'dev',
      local: 'dev',
      production: 'beta', //change to 'beta' for beta-deploy, change based on where to deploy
    },
    teamName: 'Others',
    usagePlanId: {
      development: 'v7z5d7',
      local: 'v7z5d7',
      production: 'v7z5d7',
    },
  },
  elasticsearch: {
    password: 'gigatester', //change based on where to deploy
    url: 'http://18.206.35.232:9200', //nomiso - dev env //change based on where to deploy
    username: 'gigatester-user', //change based on where to deploy
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
  s3Bucket: {
    feedbackFiles: 'gigatester-manage-feedback',
    productPhotos: 'gigatester-product-photos',
    profilePhotos: 'gigatester-profile-photos',
    softwares: 'gigatester-manage-software',
  },
  statusCodes: {
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500,
    notFound: 404,
    ok: 200,
    unauthorized: 401,
  },
  tables: {
    appFeedback: 'GT_feedback',
    assessments: 'GT_UserAssessments',
    campaigns: 'GT_Campaigns',
    cognitoUsers: 'GT_CognitoUsers',
    configs: 'GT_Configs',
    devices: 'GT_Devices',
    groups: 'GT_Groups',
    organizations: 'GT_Organizations',
    platforms: 'GT_Platforms',
    products: 'GT_Products',
    questionnaires: 'GT_Questionnaires',
    questions: 'GT_Questions',
    team: 'GT_Team',
    testSuites: 'GT_TestSuites',
    users: 'GT_Users',
  },
};
