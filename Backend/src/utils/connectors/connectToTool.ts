import { MetricsTool } from '@models/index';
import * as HttpRequest from '@utils/httpRequest';
import { appLogger } from '@utils/index';
import AWS from 'aws-sdk';

export async function connectToTool(tool: MetricsTool): Promise<MetricsTool> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      switch (tool.toolName) {
        case 'Jenkins': {
          return connectAndFetchFromJenkins(tool);
        }
        case 'AWSCodeCommit': {
          return connectAndFetchFromCodeCommit(tool);
        }
        case 'JIRA': {
          return connectAndFetchFromJIRA(tool);
        }
        case 'SonarQube': {
          return connectAndFetchFromSonarQube(tool);
        }
        default: {
          resolve(tool);
        }
      }
    }
  );
}

export async function connectAndFetchFromJenkins(
  tool: MetricsTool
): Promise<MetricsTool> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      //    tool.job.options = ['DoItRight', 'DoItRightMetrics'];
      const getJobsURL = `${tool.url.value}/api/json?tree=jobs[name]`;
      const auth = `${tool.userName.value}:${tool.password.value}`;
      HttpRequest.httpRequest('GET', getJobsURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to Jenkins');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.job.options = data.jobs;
              resolve(tool);
            } catch (error) {
              appLogger.error({ JenkinsGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ JenkinsGetError: err });
          reject(err);
        });
    }
  );
}

export async function connectAndFetchFromCodeCommit(
  tool: MetricsTool
): Promise<MetricsTool> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      //    tool.repoName.options = ['opsai', 'opmetrics'];
      const options = {
        accessKeyId: tool.userName.value,
        apiVersion: '2015-04-13',
        endpoint: tool.url.value,
        region: tool.region.value,
        secretAccessKey: tool.password.value,
      };
      const codecommit: AWS.CodeCommit = new AWS.CodeCommit(options);

      const params = {
        order: 'ascending',
        sortBy: 'repositoryName',
      };
      codecommit.listRepositories(params, function (err: any, data: any) {
        if (err) {
          appLogger.error({ AWSCodeCommitGetError: err });
          reject(err);
        } else {
          tool.repoName.options = data.repositories;
          resolve(tool);
        }
      });
    }
  );
}

export async function connectAndFetchFromJIRA(
  tool: MetricsTool
): Promise<MetricsTool> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      //    tool.projectName.options = ['DoItRight'];
      //    tool.items.options = ['Epic', 'Story', 'Bug', 'Task', 'Subtask'];
      //    tool.endState.options = ['To Do', 'In Progress', 'Done'];
      //    tool.startState.options = ['To Do', 'In Progress', 'Done'];
      //    tool.initalState.options = ['To Do', 'In Progress', 'Done'];
      const auth = `${tool.email.value}:${tool.appToken.value}`;

      const projsURL = `${tool.url.value}/rest/api/3/project/search`;
      HttpRequest.httpRequest('GET', projsURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to JIRA');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.projectName.options = [];
              data.project.forEach((proj: any) => {
                tool.projectName.options.push(proj.name);
              });
            } catch (error) {
              appLogger.error({ JIRAGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ JIRAGetError: err });
          reject(err);
        });

      const issueTypesURL = `${tool.url.value}/rest/api/3/issuetype`;
      HttpRequest.httpRequest('GET', issueTypesURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to JIRA');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.items.options = [];
              data.issuetype.forEach((item: any) => {
                tool.items.options.push(item.name);
              });
            } catch (error) {
              appLogger.error({ JIRAGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ JIRAGetError: err });
          reject(err);
        });

      const statusesURL = `${tool.url.value}/rest/api/3/status`;
      HttpRequest.httpRequest('GET', statusesURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to JIRA');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.endState.options = [];
              tool.startState.options = [];
              tool.initalState.options = [];
              data.status.forEach((status: any) => {
                tool.endState.options.push(status.name);
                tool.startState.options.push(status.name);
                tool.initalState.options.push(status.name);
              });
            } catch (error) {
              appLogger.error({ JIRAGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ JIRAGetError: err });
          reject(err);
        });

      resolve(tool);
    }
  );
}

export async function connectAndFetchFromSonarQube(
  tool: MetricsTool
): Promise<MetricsTool> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      //    tool.projectName.options = ['DoItRight'];
      //    tool.metrics.options = ['uncovered_lines', 'ncloc', 'coverage', 'new_violations', 'complexity', 'reliability', 'security', 'maintainability', 'duplications'];
      const auth = tool.appToken.value;

      const projsURL = `${tool.url.value}/api/projects/search`;
      HttpRequest.httpRequest('GET', projsURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to SonarQube');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.projectName.options = [];
              data.project.forEach((proj: any) => {
                tool.projectName.options.push(proj.name);
              });
            } catch (error) {
              appLogger.error({ SonarQubeGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ SonarQubeGetError: err });
          reject(err);
        });

      const metricsURL = `${tool.url.value}/api/metrics/search`;
      HttpRequest.httpRequest('GET', metricsURL, undefined, auth)
        .then((res: any) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('Error connecting to SonarQube');
            appLogger.error(err, 'Code: ' + res.statusCode);
            reject(err);
          } else {
            try {
              const data = JSON.parse(res.body);
              tool.metrics.options = [];
              data.metrics.forEach((metric: any) => {
                tool.metrics.options.push(metric.name);
              });
            } catch (error) {
              appLogger.error({ SonarQubeGetDataParseError: error });
              reject(error);
            }
          }
        })
        .catch((err) => {
          appLogger.error({ SonarQubeGetError: err });
          reject(err);
        });

      resolve(tool);
    }
  );
}
