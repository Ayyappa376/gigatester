import * as HttpRequest from '@utils/httpRequest';
import { appLogger } from '@utils/index';

export async function getJIRADetails(
    auth: any,
    externalSystemURL: string
  ): Promise<any> {
    return new Promise((resolve: (item: any) => void, reject: (err: any) => any): any => {
      const authDetail = `${auth.email}:${auth.appToken}`;
      const severityList: string[] = [];
      const projsURL = `${externalSystemURL}/rest/api/latest/priority`;
      HttpRequest.httpRequest('GET', projsURL, undefined, authDetail, {Accept: 'application/json'})
      .then((resProj: any) => {
  //      appLogger.info({connectAndFetchFromJIRA: {projsURL, resProj}});
        if (resProj.statusCode < 200 || resProj.statusCode >= 300) {
          const err = new Error('Error connecting to JIRA');
          appLogger.error(err, 'Code: ' + resProj.statusCode);
          reject(err);
        } else {
          const projData = JSON.parse(resProj.body);
          appLogger.info({projData});
          console.log(projData, 'projeccct');
          projData.map((item: any) => {
             severityList.push(item.name);
          })
          resolve(severityList);
  //        tool.projectName.options = projData.map((elm: any) => elm.name);
        }
      })
      .catch((err) => {
        appLogger.error({ JIRAGetError: err });
        reject(err);
      });
    });
  }