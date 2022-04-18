import { IRootState } from "../../../reducers";
import { Http } from "../../../utils";
import { CONST_BUG_REPORT, CONST_FEEDBACK, CONST_BUG_REPORT_CHART, CONST_FEEDBACK_CHART, IFetchRecursiveData, NUMBER_OF_ITEMS_PER_FETCH } from "./common";
import { RouteComponentProps, withRouter } from 'react-router-dom';

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

export const getFeedbackData = ({ urlAppend}: any) => {
    return new Promise((resolve, reject) => {
      let url = `/api/v2/userFeedback/${CONST_FEEDBACK}`+ urlAppend;
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

  export const getBugData = ({urlAppend}: any) => {
    return new Promise((resolve, reject) => {
      let url = `/api/v2/userFeedback/${CONST_BUG_REPORT}`+ urlAppend;
      Http.get({
        url,
      }).then((response: any) => {
        console.log(response, 'bug data')
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
    })
  }


interface IGetChartData {
  setFeedbackBarChartData: Function,
  // setBugBarChartData: Function,
  setBugBarChartSeries: Function,
  setPieChartSeries: Function,
  prodId: string,
  prodVersion: string
}

export const getFeedbckChartData = async({ setFeedbackBarChartData, setBugBarChartSeries, setPieChartSeries, prodId, prodVersion}: IGetChartData) => {
      let url = `/api/v2/userFeedback/${CONST_FEEDBACK_CHART}?prodId=${prodId}&prodVersion=${prodVersion}`;
      Http.get({
        url,
      }).then((response: any) => {
        const processedData = response.Items;
        setFeedbackBarChartData(processedData.barChartData);
        setPieChartSeries(processedData.pieChartData);
      })
      .catch((error) => {
        console.error(error)
      });
  }

  export const getBugChartData = async({ setBugBarChartSeries, setFeedbackBarChartData, setPieChartSeries, prodId, prodVersion}: IGetChartData) => {
    let url = `/api/v2/userFeedback/${CONST_BUG_REPORT_CHART}?prodId=${prodId}&prodVersion=${prodVersion}`;
    Http.get({
      url,
    }).then((response: any) => {
      const processedData = response.Items;
      console.log(processedData, 'processedData')
        setBugBarChartSeries([{
          name: 'Severity',
          data: Object.values(processedData.barChartData)
        }])
        setFeedbackBarChartData(processedData.barChartData)
        setPieChartSeries(processedData.pieChartData)
    })
    .catch((error) => {
      console.error(error)
    });
  }


interface productDetails {
  productInfo: any,
  prodNameIdMapping: any,
  prodNameIdMappingBugCopy: any,
  setProductInfo: Function,
  setFiltered: Function,
  setProdNameIdMapping: Function,
  setSelectedProdId: Function,
  setProdNameIdMappingBugs: Function,
  setProductVersion: Function,
  productId: any,
  prodVersion: any,
  }

export const getProductDetails = async ({ productInfo, prodNameIdMapping, prodNameIdMappingBugCopy, setFiltered, setProductInfo, setProdNameIdMapping, setSelectedProdId, setProdNameIdMappingBugs, setProductVersion, productId, prodVersion  }: productDetails) => {
  Http.get({
    url: `/api/v2/products/`,
  }).then((response: any) => {
    if (response && response.products && Array.isArray(response.products) && response.products.length > 0) {
      const productInfoCopy = [...productInfo]
      const prodNameIdMappingCopy: any = { ...prodNameIdMapping };
      response.products.forEach((el: any) => {
        const prodInfo = { id: "", name: "" };
        prodInfo.id = el.id;
        prodInfo.name = el.name;
        productInfoCopy.push(prodInfo);
        if (prodNameIdMappingCopy[prodInfo.id]) {
          prodNameIdMappingCopy[prodInfo.id].version.push(el.version);
        } else {
          prodNameIdMappingBugCopy[prodInfo.id] = {
            name: prodInfo.name,
            version: [el.version][0],
            categories: el.feedbackAgentSettings ? el.feedbackAgentSettings.bugSettings.categories ? el.feedbackAgentSettings.bugSettings.categories : [] : []
          }
          prodNameIdMappingCopy[prodInfo.id] = {
            name: prodInfo.name,
            version: [el.version],
            categories: el.feedbackAgentSettings ? el.feedbackAgentSettings.feedbackSettings.categories ? el.feedbackAgentSettings.feedbackSettings.categories : [] : []
          }
        }
      })
      setProductInfo(productInfoCopy);
      setProdNameIdMapping(prodNameIdMappingCopy);
      setProdNameIdMappingBugs(prodNameIdMappingBugCopy);
      if (productId && prodVersion) {
        return;
      }
      const defaultProductId = Object.keys(prodNameIdMappingCopy)[0];
      // setSelectedProdId(productId);
      // setProductVersion(prodVersion);
      // setFiltered({product: true, version: true});
      console.log(defaultProductId, prodNameIdMappingCopy[productId].version[prodVersion], productId, prodVersion)
    }
  }).catch((error: any) => {
    console.error(error);
  })
}


