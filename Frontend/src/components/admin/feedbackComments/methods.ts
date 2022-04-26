import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';
import {
	CONST_BUG_REPORT,
	CONST_FEEDBACK,
	CONST_BUG_REPORT_CHART,
	CONST_FEEDBACK_CHART,
	IDateRange,
} from './common';

export const getSignedUrl = async (url: string, stateVariable: IRootState) => {
	return new Promise((resolve, reject) => {
		if (!url || typeof url !== 'string') {
			return reject(new Error('url not valid'));
		}
		const urlSplit = url.split('/');
		let name = urlSplit[urlSplit.length - 1];
		Http.get({
			url: `/api/v2/signedurl/${name}`,
		})
			.then((response: any) => {
				if (response.filePath) {
					return resolve(response.filePath);
				}
			})
			.catch((error: any) => {
				console.error(error);
				return reject(error);
			});
	});
};

export const getFeedbackData = ({ urlAppend }: any) => {
	return new Promise((resolve, reject) => {
		let url = `/api/v2/userFeedback/${CONST_FEEDBACK}` + urlAppend; //hard coded for filterdate
		Http.get({
			url,
		})
			.then((response: any) => {
				return resolve(response);
			})
			.catch((error) => {
				return reject(error);
			});
	});
};

export const getBugData = ({ urlAppend }: any) => {
	return new Promise((resolve, reject) => {
		let url = `/api/v2/userFeedback/${CONST_BUG_REPORT}` + urlAppend; //hard coded for filterdate
		Http.get({
			url,
		})
			.then((response: any) => {
				// console.log(response, 'bug data');
				return resolve(response);
			})
			.catch((error) => {
				return reject(error);
			});
	});
};

interface IGetChartData {
	setFeedbackBarChartData: Function;
	// setBugBarChartData: Function,
	setBugBarChartSeries: Function;
	setDataFetchLoader: Function;
	setPieChartSeries: Function;
	filterRating?: string[];
	filterCategory?: string[];
	filterSeverity?: string[];
	searchWord?: string;
	prodId: string;
	prodVersion?: string;
	filterDate?: IDateRange;
}

export const getFeedbckChartData = async ({
	setDataFetchLoader,
	setFeedbackBarChartData,
	setBugBarChartSeries,
	setPieChartSeries,
	prodId,
	prodVersion,
	filterRating,
	searchWord,
	filterCategory,
	filterDate,
}: IGetChartData) => {
	// console.log('date',filterDate);
	setDataFetchLoader(true);
	let url = `/api/v2/userFeedback/${CONST_FEEDBACK_CHART}?prodId=${prodId}`;
	url += prodVersion ? `&prodVersion=${prodVersion}` : '';
	url += filterCategory ? `&filterCategory=${filterCategory.join(',')}` : '';
	url += filterRating ? `&filterRating=${filterRating.join(',')}` : '';
	url += searchWord ? `&search=${searchWord}` : '';
	url += filterDate
		? `&startDate=${filterDate.startDate}&endDate=${filterDate.endDate}`
		: '';
	Http.get({
		url,
	})
		.then((response: any) => {
			const processedData = response.Items;
			// console.log('feedback chart response', processedData)
			setFeedbackBarChartData(processedData.barChartData);
			setPieChartSeries(processedData.pieChartData);
			setDataFetchLoader(false);
		})
		.catch((error) => {
			console.error(error);
			setDataFetchLoader(false);
		});
};

export const getFeedbackLastEvalkeyData = (postData: any, stateVariable: IRootState) => {
	return new Promise((resolve, reject) => {
	Http.post({
		url: `/api/v2/userFeedback/`,
		body: {
		  ...postData,
		},
		state: stateVariable
	})
		.then((response: any) => {
			return resolve(response);
		})
		.catch((error) => {
			return reject(error);
		});
	});
}

export const getBugChartData = async ({
	setDataFetchLoader,
	setBugBarChartSeries,
	setFeedbackBarChartData,
	setPieChartSeries,
	searchWord,
	prodId,
	prodVersion,
	filterCategory,
	filterRating,
	filterSeverity,
	filterDate,
}: IGetChartData) => {
	setDataFetchLoader(true);
	let url = `/api/v2/userFeedback/${CONST_BUG_REPORT_CHART}?prodId=${prodId}`;
	url += prodVersion ? `&prodVersion=${prodVersion}` : '';
	url += filterCategory ? `&filterCategory=${filterCategory.join(',')}` : '';
	url += filterSeverity ? `&filterSeverity=${filterSeverity.join(',')}` : '';
	url += searchWord ? `&search=${searchWord}` : '';
	url += filterDate
		? `&startDate=${filterDate.startDate}&endDate=${filterDate.endDate}`
		: '';
	Http.get({
		url,
	})
		.then((response: any) => {
			const processedData = response.Items;
			setDataFetchLoader(false);
			// console.log(processedData, 'processedData')
			setBugBarChartSeries([
				{
					name: 'Severity',
					data: Object.values(processedData.barChartData),
				},
			]);
			setFeedbackBarChartData(processedData.barChartData);
			setPieChartSeries(processedData.pieChartData);
		})
		.catch((error) => {
			console.error(error);
			setDataFetchLoader(true);
		});
};

interface productDetails {
	productInfo: any;
	prodNameIdMapping: any;
	prodNameIdMappingBugCopy: any;
	setProductInfo: Function;
	setProdNameIdMapping: Function;
	setSelectedProdId: Function;
	setProdNameIdMappingBugs: Function;
	setProductVersion: Function;
  	setFiltered: Function;
	productId: any;
	productVersion: any;
}

export const getProductDetails = async ({
	productInfo,
	prodNameIdMapping,
	prodNameIdMappingBugCopy,
	setProductInfo,
	setProdNameIdMapping,
	setSelectedProdId,
	setProdNameIdMappingBugs,
	setProductVersion,
  setFiltered,
	productId,
	productVersion,
}: productDetails) => {
	Http.get({
		url: `/api/v2/products`,
	})
		.then((response: any) => {
			if (
				response &&
				response.products &&
				Array.isArray(response.products) &&
				response.products.length > 0
			) {
				const productInfoCopy = [...productInfo];
				const prodNameIdMappingCopy: any = { ...prodNameIdMapping };
				response.products.forEach((el: any) => {
					const prodInfo = { id: '', name: '' };
					prodInfo.id = el.id;
					prodInfo.name = el.name;
					productInfoCopy.push(prodInfo);
					if (prodNameIdMappingCopy[prodInfo.id]) {
						prodNameIdMappingCopy[prodInfo.id].version.push(el.version);
					} else {
						prodNameIdMappingBugCopy[prodInfo.id] = {
							name: prodInfo.name,
							version: [el.version][0],
							categories: el.feedbackAgentSettings
								? el.feedbackAgentSettings.bugSettings.categories
									? el.feedbackAgentSettings.bugSettings.categories
									: []
								: [],
						};
						prodNameIdMappingCopy[prodInfo.id] = {
							name: prodInfo.name,
							version: [el.version],
							categories: el.feedbackAgentSettings
								? el.feedbackAgentSettings.feedbackSettings.categories
									? el.feedbackAgentSettings.feedbackSettings.categories
									: []
								: [],
						};
					}
				});
				setProductInfo(productInfoCopy);
				setProdNameIdMapping(prodNameIdMappingCopy);
				setProdNameIdMappingBugs(prodNameIdMappingBugCopy);
				if (productId && productVersion) {
					setSelectedProdId(productId);
					setProductVersion(productVersion);
          setFiltered({ product: true, version: true })
					return;
				}
				// const defaultProductId = Object.keys(prodNameIdMappingCopy)[0];
				setSelectedProdId('');
				setProductVersion('');
			}
		})
		.catch((error: any) => {
			console.error(error);
		});
};

export const filterDate = (date: Date | Date[], sortDate: string) => {
	let newDate;
	let newTime;
	if (Array.isArray(date) && sortDate === '') {
		let startDate = new Date(date[0]);
		let endDate = new Date(date[1]);
		const newStartTime = Date.parse(startDate.toString());
		const newEndTime = Date.parse(endDate.toString());
		return { start: newStartTime, end: newEndTime };
	} else {
		newDate = new Date();
		if (sortDate === '1D') {
			newDate.setDate(newDate.getDate() - 1);
		} else if (sortDate === '1W') {
			newDate.setDate(new Date().getDate() - 7);
		} else if (sortDate === '1M') {
			newDate.setMonth(newDate.getMonth() - 1);
		} else if (sortDate === '6M') {
			newDate.setMonth(newDate.getMonth() - 6);
		} else if (sortDate === '1Y') {
			newDate.setFullYear(newDate.getFullYear() - 1);
		}

		newTime = Date.parse(newDate.toString());
		return { dateObj: newDate, epoch: newTime };
	}
};
