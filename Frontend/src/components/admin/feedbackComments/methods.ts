import { IRootState } from "../../../reducers";
import { Http } from "../../../utils";
import { CONST_BUG_REPORT, CONST_FEEDBACK, CONST_BUG_REPORT_CHART, CONST_FEEDBACK_CHART } from "./common";

export const getSignedUrl = async(url: string, stateVariable: IRootState) => {
    if(!url) {
      return;
    }
    return new Promise((resolve, reject) => {
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
  
export const getChartData = async({isBugReport, setFeedbackBarChartData, setFeedbackPieChartSeries, setBugBarChartSeries, setBugPieChartSeries}: any) => {
      let url = `/api/v2/userFeedback/${isBugReport? CONST_BUG_REPORT_CHART : CONST_FEEDBACK_CHART}`;
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
          setBugPieChartSeries(processedData.pieChartData)
        } else {
          setFeedbackBarChartData(processedData.barChartData);
          const feedbackPieChartSeriesCopy = [];
          const pieChartFeedbackBarChartData = processedData.pieChartData;
          feedbackPieChartSeriesCopy.push(pieChartFeedbackBarChartData['satisfied']);
          feedbackPieChartSeriesCopy.push(pieChartFeedbackBarChartData['somewhatSatisfied']);
          feedbackPieChartSeriesCopy.push(pieChartFeedbackBarChartData['dissatisfied']);
          setFeedbackPieChartSeries(feedbackPieChartSeriesCopy);
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }
  