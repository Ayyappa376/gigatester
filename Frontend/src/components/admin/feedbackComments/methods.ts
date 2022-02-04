import { IRootState } from "../../../reducers";
import { Http } from "../../../utils";
import { CONST_BUG_REPORT, CONST_FEEDBACK, CONST_BUG_REPORT_CHART, CONST_FEEDBACK_CHART } from "./common";

export const getSignedUrl = async(url: string, stateVariable: IRootState) => {
    return new Promise((resolve, reject) => {
      if(!url || typeof url !== 'string') {
        return reject(new Error("url not valid"));
      }
      const urlSplit = url.split('/')
      let name = urlSplit[urlSplit.length - 1]
  
      Http.get({
        url: `/api/v2/signedurl/${name}`,
      }).then((response: any) => {
        if(response.filePath) {
          return resolve(response.filePath);
        }
      }).catch((error : any) => {
          console.error(error);
          return reject(error)
      })
    })
  }
  
export const getFeedbackData = ({isBugReport, urlAppend}: any) => {
    return new Promise((resolve, reject) => {
      let url = `/api/v2/userFeedback/${isBugReport? CONST_BUG_REPORT : CONST_FEEDBACK}`+ urlAppend;
      Http.get({
        url,
      }).then((response: any) => {
        return resolve(response);      
      })
      .catch((error) => {
        return reject(error);
      });
    })
  }
interface IGetChartData {
  isBugReport: boolean,
  setFeedbackBarChartData: Function,
  setBugBarChartSeries: Function,
  setPieChartSeries: Function,
  prodId: string,
  prodVersion: string
}
  
export const getChartData = async({isBugReport, setFeedbackBarChartData, setBugBarChartSeries, setPieChartSeries, prodId, prodVersion}: IGetChartData) => {
      let url = `/api/v2/userFeedback/${isBugReport? CONST_BUG_REPORT_CHART : CONST_FEEDBACK_CHART}?prodId=${prodId}&prodVersion=${prodVersion}`;
      Http.get({
        url,
      }).then((response: any) => {
        const processedData = response.Items;
        console.log(response)
        if(isBugReport) {
          setBugBarChartSeries([{
            name: 'Severity',
            data: Object.values(processedData.barChartData)
          }])
          setPieChartSeries(processedData.pieChartData)
        } else {
          setFeedbackBarChartData(processedData.barChartData);
          setPieChartSeries(processedData.pieChartData);
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }
  