import { Application, Request, Response } from 'express';

// import { api as buildMetrics } from './metrics/builds/get';
// import { api as doraMetrics } from './metrics/dora/get';
// import { api as qualityMetrics } from './metrics/quality/get';
// import { api as reposMetrics } from './metrics/repos/get';
// import { api as reqsMetrics } from './metrics/reqs/get';
// import { api as getMetricsTools } from './metrics/teamMetricsTool/get';
// import { api as setMetricsTools } from './metrics/teamMetricsTool/post';
// import { api as testConnection } from './metrics/toolsConnect/post';

import { api as postAssessmentAnswerV2 } from './v2/answer/post';
import { api as getAppFeedbackV2 } from './v2/appFeedback/get';
import { api as postAppFeedbackV2 } from './v2/appFeedback/post';
import { api as getAssignmentV2 } from './v2/assignments/get';
import { api as postAssignmentV2 } from './v2/assignments/post';
import { api as deleteCampaignsV2 } from './v2/campaign/delete';
import { api as getCampaignsV2 } from './v2/campaign/get';
import { api as postCampaignsV2 } from './v2/campaign/post';
import { api as putCampaignsV2 } from './v2/campaign/put';
import { api as getQuestionV2 } from './v2/createQuestion/get';
import { api as createQuestionV2 } from './v2/createQuestion/post';
import { api as updateQuestionV2 } from './v2/createQuestion/put';
import { api as deactivateTeamsConfigV2 } from './v2/createTeam/delete';
import { api as getTeamsConfigV2 } from './v2/createTeam/get';
import { api as createTeamsConfigV2 } from './v2/createTeam/post';
import { api as updateTeamsConfigV2 } from './v2/createTeam/put';
import { api as getAssessmentDetailsV2 } from './v2/details/get';
import { api as deleteDevicesV2 } from './v2/device/delete';
import { api as getDevicesV2 } from './v2/device/get';
import { api as postDevicesV2 } from './v2/device/post';
import { api as putDevicesV2 } from './v2/device/put';
import { api as dowloadReportsV2 } from './v2/downloadReports/get';
import { api as getFeedbackV2 } from './v2/feedback/get';
import { api as postFeedbackV2 } from './v2/feedback/post';
//import { api as getFileV2 } from './v2/fileUpload/get';
//import { api as postFileV2 } from './v2/fileUpload/post';
import { api as deleteGroupsV2 } from './v2/group/delete';
import { api as getGroupsV2 } from './v2/group/get';
import { api as postGroupsV2 } from './v2/group/post';
import { api as putGroupsV2 } from './v2/group/put';
import { api as getAssessmentHistoryV2 } from './v2/history/get';
import { api as deleteOrganizationsV2 } from './v2/organization/delete';
import { api as getOrganizationsV2 } from './v2/organization/get';
import { api as postOrganizationsV2 } from './v2/organization/post';
import { api as putOrganizationsV2 } from './v2/organization/put';
import { api as deletePlatformsV2 } from './v2/platform/delete';
import { api as getPlatformsV2 } from './v2/platform/get';
import { api as postPlatformsV2 } from './v2/platform/post';
import { api as putPlatformsV2 } from './v2/platform/put';
import { api as deleteProductV2 } from './v2/product/delete';
import { api as getProductV2 } from './v2/product/get';
import { api as postProductV2 } from './v2/product/post';
import { api as putProductV2 } from './v2/product/put';
import { api as deleteProductApiKeyV2 } from './v2/productApiKey/delete';
import { api as postProductApiKeyV2 } from './v2/productApiKey/post';
import { api as getAssessmentQuestionV2 } from './v2/question/get';
import { api as getQuestionnaireV2 } from './v2/questionnaire/get';
import { api as postQuestionnaireV2 } from './v2/questionnaire/post';
import { api as putQuestionnaireV2 } from './v2/questionnaire/put';
import { api as reportsV2 } from './v2/reports/get';
import { api as getAssementResultV2 } from './v2/result/get';
import { api as getSystemSettingsV2 } from './v2/settings/get';
import { api as postSystemSettingsV2 } from './v2/settings/post';
import { api as getSignedUrlV2 } from './v2/signedUrl/get';
import { api as deleteSoftwareV2 } from './v2/software/delete';
import { api as getUploadSoftwareV2 } from './v2/software/get';
import { api as postUploadSoftwareV2 } from './v2/software/post';
import { api as getAssessmentSummaryV2 } from './v2/summary/get';
import { api as getAssessmentAndTeamDetailsV2 } from './v2/teamAndAssessmentList/get';
import { api as getTeamsV2 } from './v2/teams/get';
import { api as addTeamsV2 } from './v2/teams/post';
import { api as getTestSuiteV2 } from './v2/testSuite/get';
import { api as postTestSuiteV2 } from './v2/testSuite/post';
import { api as putTestSuiteV2 } from './v2/testSuite/put';
import { api as deleteUsers2V2 } from './v2/user/delete';
import { api as getUsers2V2 } from './v2/user/get';
import { api as postUsers2V2 } from './v2/user/post';
import { api as putUsers2V2 } from './v2/user/put';
import { api as getUserFeedbackV2 } from './v2/userFeedback/get';
import { api as deleteUsersV2 } from './v2/userManagement/delete';
import { api as getUserstV2 } from './v2/userManagement/get';
import { api as createUsersV2 } from './v2/userManagement/post';
import { api as updateUsersV2 } from './v2/userManagement/put';

export type Handler = (request: Request, response: Response) => void;
export interface API {
  handler: Handler;
  method: string;
  route: string;
}

const apis: API[] = [
  deleteOrganizationsV2,
  getOrganizationsV2,
  postOrganizationsV2,
  putOrganizationsV2,
  getSystemSettingsV2,
  postSystemSettingsV2,
  createTeamsConfigV2,
  getAppFeedbackV2,
  postAppFeedbackV2,
  getAssessmentSummaryV2,
  getAssessmentQuestionV2,
  postAssessmentAnswerV2,
  getAssementResultV2,
  deleteCampaignsV2,
  getCampaignsV2,
  postCampaignsV2,
  putCampaignsV2,
  deletePlatformsV2,
  getPlatformsV2,
  postPlatformsV2,
  putPlatformsV2,
  deleteProductV2,
  getProductV2,
  postProductV2,
  putProductV2,
  deleteProductApiKeyV2,
  postProductApiKeyV2,
  deleteDevicesV2,
  getDevicesV2,
  postDevicesV2,
  putDevicesV2,
  deleteGroupsV2,
  getGroupsV2,
  postGroupsV2,
  putGroupsV2,
  postFeedbackV2,
  getFeedbackV2,
  getAssessmentAndTeamDetailsV2,
  getAssessmentHistoryV2,
  getAssessmentDetailsV2,
  getTeamsConfigV2,
  getTeamsV2,
  addTeamsV2,
  getQuestionnaireV2,
  getAssignmentV2,
  postAssignmentV2,
  updateTeamsConfigV2,
  deactivateTeamsConfigV2,
  createUsersV2,
  updateUsersV2,
  getUserstV2,
  deleteUsersV2,
  reportsV2,
  createQuestionV2,
  getQuestionV2,
  putQuestionnaireV2,
  postQuestionnaireV2,
  updateQuestionV2,
  dowloadReportsV2,
  getUploadSoftwareV2,
  postUploadSoftwareV2,
  deleteSoftwareV2,
  getTestSuiteV2,
  putTestSuiteV2,
  postTestSuiteV2,
  //getFileV2,
  //postFileV2,
  deleteUsers2V2,
  getUsers2V2,
  postUsers2V2,
  putUsers2V2,
  getSignedUrlV2,
  getUserFeedbackV2
];

// const metricsApis: API[] = [
//   getMetricsTools,
//   setMetricsTools,
//   buildMetrics,
//   reposMetrics,
//   reqsMetrics,
//   qualityMetrics,
//   doraMetrics,
//   testConnection,
// ];

export function registerApis(application: Application): void {
  apis.forEach((api: API) => {
    // tslint:disable-next-line: no-unsafe-any
    application[api.method](api.route, api.handler);
  });
}

// export function registerMetricsApis(application: Application): void {
//   metricsApis.forEach((api: API) => {
//     // tslint:disable-next-line: no-unsafe-any
//     application[api.method](api.route, api.handler);
//   });
// }
