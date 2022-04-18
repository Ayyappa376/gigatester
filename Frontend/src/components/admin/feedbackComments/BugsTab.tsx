import {
	Backdrop,
	CircularProgress,
	Grid,
	makeStyles,
	Typography,
	Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { buttonStyle } from '../../../common/common';
import { Http } from '../../../utils';
import ReactApexChart from 'react-apexcharts';
import RenderTable, { Order } from './RenderTable';
import Close from '@material-ui/icons/Close';
import Image from 'material-ui-image';
import { getDate } from '../../../utils/data';
import {
	ILimitedProductDetails,
	IProductNameIdMapping,
	IAppFeedback,
	NUMBER_OF_ITEMS_PER_FETCH,
	IBugDataMapping,
	IFeedbackBarChartData,
	IRatingMapping,
	getBugBarChartOptions,
	ILastEvalKey,
	IFetchRecursiveData,
	getPieChartOptions,
} from './common';
import { RouteComponentProps } from 'react-router-dom';
import { getBugChartData, getBugData } from './methods';
import Failure from '../../failure-page';
import { sortTableByDate } from './tableMethods';
import ImageModal from './ImageModal';
import DateFilter from './DateFilter';
import FilterToolBar from './FilterBar/FilterToolBar';
import RenderKeywordFilter from './RenderKeywordFilter';
import RenderSeverityFilter from './RenderSeverityFilter';
import RenderRatingFilter from './RenderFilters';
import RenderCategoryFilter from './RenderCategoryFilter';

interface ChosenProps {
	productInfoProp: any;
}

const BugsTab = (props: RouteComponentProps & ChosenProps) => {
	const { filtered } = props.productInfoProp;
	const [backdropOpen, setBackdropOpen] = useState(false);
	const [error, setError] = useState(false);
	const [isBugReport, setBugReport] = useState<boolean | undefined>(true);
	const [noDataError, setNoDataError] = useState(false);
	const [data, setData] = useState<IAppFeedback[]>([]);
	const [searchedData, setSearchedData] = useState<IAppFeedback[]>([]);
	const [rawData, setRawData] = useState([]);
	const classes = useStyles();
	const [feedbackBarChartData, setFeedbackBarChartData] =
		useState<IFeedbackBarChartData>({});
	const [pieChartSeries, setPieChartSeries] = useState({});
	const [dateRange, setDateRange] = useState(() => {
		const today = new Date();
		const todaysDate = Date.parse(today.toString());
		return {
			startDate: todaysDate,
			endDate: today.setFullYear(today.getFullYear() - 1),
		};
	});
	const [showImageModal, setShowImageModal] = useState(false);
	const [signedImageUrl, setSignedImageUrl] = useState('');
	const [attachmentType, setAttachmentType] = useState('');
	const [focusAttachmentUid, setFocusAttachmentUid] = useState('');
	const [bugDataMapping, setBugDataMapping] = useState<IBugDataMapping>({});
	const [urlArray, setUrlArray] = useState<string[]>([]);
	const [barChartSeries, setBarChartSeries] = useState([
		{
			name: 'rating',
			data: [0, 0, 0, 0, 0],
		},
	]);
	const [bugBarChartSeries, setBugBarChartSeries] = useState([
		{
			name: 'Severity',
			data: [0, 0, 0, 0, 0],
		},
	]);
	const [selectedProdId, setSelectedProdId] = useState<string>(() => {
		if (props.productInfoProp.selectedProdId) {
			return props.productInfoProp.selectedProdId;
		}
		return '';
	});
	const [productVersion, setProductVersion] = useState(() => {
		if (props.productInfoProp.productVersion) {
			return props.productInfoProp.productVersion;
		}
		return '';
	});
	const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>(
		() => {
			if (props.productInfoProp.productInfo) {
				return props.productInfoProp.prodInfo;
			}
			return '';
		},
	);
	const [prodNameIdMapping, setProdNameIdMapping] =
		useState<IProductNameIdMapping>(() => {
			if (props.productInfoProp.prodNameIdMappingBugCopy) {
				return props.productInfoProp.prodNameIdMappingBugCopy;
			}
			return '';
		});
	const [lastEvaluatedKey, setLastEvaluatedKey] = useState<ILastEvalKey>({});
	const [order, setOrder] = useState<Order>('desc');
	const [keyword, setKeyword] = useState('');
	const [searchInitiated, setSearchInitiated] = useState(false);
	const [focusRating, setFocusRating] = useState([]);
	const [focusSeverity, setFocusSeverity] = useState([]);
	const [focusCategory, setFocusCategory] = useState([]);
	const [slideShowImageUrl, setSlideShowImageUrl] = useState('');
	const [resultsFetched, setResultsFetched] = useState(false);
	const [currentDisable, setCurrentDisable] = useState<string>('');
	const [category, setCat] = useState<boolean>(false);
	const [severity, setSeverity] = useState<boolean>(false);
	const [severityList, setSeverityList] = useState<any>([]);
	const [categoryList, setCategoryList] = useState<any>([]);
	const [keys, setKey] = useState<boolean>(false);
	const [rating, setRating] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<string>('1Y');
	const [sortDate, setSortDate] = useState<number | undefined>();

	useEffect(() => {
		if (feedbackBarChartData) {
			const series = [
				{
					name: 'Severity',
					data: Object.values(feedbackBarChartData),
				},
			];
			setBarChartSeries(series);
			console.log(feedbackBarChartData, 'fbcdd');
			setSeverityList(Object.keys(feedbackBarChartData));
		}
	}, [feedbackBarChartData]);

	useEffect(() => {
		const rateMap: IRatingMapping = {};
		const bugMap: IBugDataMapping = {};
		const urls: string[] = [];

		data.forEach((item: IAppFeedback) => {
			if (item.feedbackType === 'BUG_REPORT') {
				bugMap[item.id] = {
					userId: item.userId ? item.userId : 'Anonymous',
					userIp: item.sourceIP ? item.sourceIP : '',
					severity: item.bugPriority,
					category: item.feedbackCategory,
					date: item.createdOn,
					comments:
						item.feedbackComments && typeof item.feedbackComments === 'string'
							? JSON.parse(item.feedbackComments)
							: {},
					productId: item.productId,
					productVersion: item.productVersion,
				};
				if (item.feedbackMedia) {
					const links: any = Object.values(item.feedbackMedia);
					const linksFiltered = links.filter((key: string) => key !== '');
					urls.push(...linksFiltered);
				}
				setBugDataMapping(bugMap);
			}
		});

		const urlArrayCopy = [...urlArray];
		urlArrayCopy.push(...urls);
		setUrlArray(urlArrayCopy);
	}, [data]);
	const pieChartOptions = getPieChartOptions(pieChartSeries, 'BUGS');
	const bugBarChartOptions = getBugBarChartOptions(
		bugBarChartSeries,
		feedbackBarChartData,
	);

	const disbaleFilterButtons = (filter: string) => {
		if (filter === '') {
			setCat(false);
			setRating(false);
			setSeverity(false);
			setKey(false);
		} else if (filter === 'key') {
			setCat(true);
			setRating(true);
			setSeverity(true);
			setKey(false);
		} else if (filter === 'category') {
			setCat(false);
			setRating(true);
			setSeverity(true);
			setKey(true);
		} else if (filter === 'severity') {
			setCat(true);
			setRating(true);
			setSeverity(false);
			setKey(true);
		} else if (filter === 'rating') {
			setCat(true);
			setRating(false);
			setSeverity(true);
			setKey(true);
		}
	};

	useEffect(() => {
		disbaleFilterButtons(currentDisable);
	}, [currentDisable]);

	useEffect(() => {
		if (
			filtered.product &&
			filtered.version &&
			selectedProdId &&
			productVersion
		) {
			if (productVersion === 'all') {
				setBackdropOpen(true);
				fetchRecursiveData({
					prodId: selectedProdId,
					prodVersion: '',
					filterDate: dateRange,
				});
				getBugChartData({
					setBugBarChartSeries,
					setFeedbackBarChartData,
					setPieChartSeries,
					prodId: selectedProdId,
					prodVersion: '',
					filterDate: dateRange,
				});
			} else {
				setBackdropOpen(true);
				fetchRecursiveData({
					prodId: selectedProdId,
					prodVersion: productVersion,
					filterDate: dateRange,
				});
				getBugChartData({
					setBugBarChartSeries,
					setFeedbackBarChartData,
					setPieChartSeries,
					prodId: selectedProdId,
					prodVersion: productVersion,
					filterDate: dateRange,
				});
			}
		}
	}, [selectedProdId, productVersion]);

	useEffect(() => {
		if (rawData.length === 0) {
			return;
		}
		if (Object.keys(lastEvaluatedKey).length > 0) {
			// fetch the results from backend
			setData([]);
			setRawData([]);
			fetchRecursiveData({
				fetchOrder: order,
				prodId: selectedProdId,
				prodVersion: productVersion,
				filterCategory: focusCategory,
				filterSeverity: focusSeverity,
				searchWord: keyword,
				filterDate: dateRange,
			});
		} else {
			setData(sortTableByDate(data, order));
		}
	}, [order]);

	useEffect(() => {
		if (rawData.length === 0) {
			return;
		}
		if (focusRating.length === 0) {
			setCurrentDisable('');
			setData(rawData);
			return;
		}
		// fetch the results from backend
		setResultsFetched(false);
		setData([]);
		//setRawData([])
		fetchRecursiveData({
			filterRating: focusRating,
			prodId: selectedProdId,
			prodVersion: productVersion,
			showNoEmptyError: true,
			noRawDataUpdate: true,
			filterDate: dateRange,
		});
	}, [focusRating]);

	useEffect(() => {
		if (rawData.length === 0) {
			return;
		}
		if (focusSeverity.length <= 0) {
			setCurrentDisable('');
			setData(rawData);
			return;
		}
		// fetch the results from backend
		setResultsFetched(false);
		setData([]);
		//setRawData([])
		fetchRecursiveData({
			filterSeverity: focusSeverity,
			prodId: selectedProdId,
			prodVersion: productVersion,
			showNoEmptyError: true,
			noRawDataUpdate: true,
			filterDate: dateRange,
		});
	}, [focusSeverity]);

	useEffect(() => {
		const today = new Date();
		const todaysDate = Date.parse(today.toString());
		if (rawData.length === 0) {
			return;
		}
		if (dateRange) {
			setResultsFetched(false);
			setData([]);
			setRawData([]);
			// console.log('sorted', sortDate);
			fetchRecursiveData({
				prodId: selectedProdId,
				prodVersion: productVersion,
				showNoEmptyError: true,
				filterDate: dateRange,
				noRawDataUpdate: true,
			});
			getBugChartData({
				setBugBarChartSeries,
				setFeedbackBarChartData,
				setPieChartSeries,
				prodId: selectedProdId,
				prodVersion: productVersion,
				filterDate: dateRange,
			});
		}
	}, [dateRange]);

	useEffect(() => {
		if (rawData.length === 0) {
			return;
		}
		if (focusCategory.length <= 0) {
			setCurrentDisable('');
			setData(rawData);
			return;
		}
		// fetch the results from backend
		setResultsFetched(false);
		setData([]);
		//setRawData([])
		fetchRecursiveData({
			filterCategory: focusCategory,
			prodId: selectedProdId,
			prodVersion: productVersion,
			showNoEmptyError: true,
			noRawDataUpdate: true,
			filterDate: dateRange,
		});
	}, [focusCategory]);

	const fetchRecursiveData = async ({
		lastEvalKey,
		fetchOrder,
		filterRating,
		filterSeverity,
		filterCategory,
		filterDate,
		prodId,
		prodVersion,
		searchWord,
		showNoEmptyError,
		noRawDataUpdate,
	}: IFetchRecursiveData) => {
		setResultsFetched(false);
		let urlAppend = ``;
		let numItems = NUMBER_OF_ITEMS_PER_FETCH;
		if (prodId) {
			urlAppend += `?prodId=${prodId}`;
			if (prodVersion) {
				urlAppend += `&prodVersion=${prodVersion}`;
			}
		}
		if (filterRating) {
			urlAppend += urlAppend
				? `&filterRating=${filterRating.join(',')}`
				: `?filterRating=${filterRating.join(',')}`;
			numItems = 500;
		}

		if (filterSeverity) {
			urlAppend += urlAppend
				? `&filterSeverity=${filterSeverity.join(',')}`
				: `?filterSeverity=${filterSeverity.join(',')}`;
			numItems = 500;
		}

		if (filterCategory) {
			urlAppend += urlAppend
				? `&filterCategory=${filterCategory.join(',')}`
				: `?filterCategory=${filterCategory.join(',')}`;
			numItems = 500;
		}

		if (lastEvalKey && Object.keys(lastEvalKey).length > 0) {
			urlAppend += urlAppend
				? `&lastEvalKey=${JSON.stringify(lastEvalKey)}`
				: `?lastEvalKey=${JSON.stringify(lastEvalKey)}`;
		}

		if (fetchOrder) {
			urlAppend += urlAppend ? `&order=${fetchOrder}` : `?order=${fetchOrder}`;
		}

		if (searchWord) {
			urlAppend += urlAppend ? `&search=${searchWord}` : `?search=${searchWord}`;
		}

		if (filterDate) {
			urlAppend += urlAppend
				? `&startDate=${filterDate.startDate}&endDate=${filterDate.endDate}`
				: `?search=${filterDate.startDate}&endDate=${filterDate.endDate}`;
		}

		urlAppend += urlAppend ? `&item=${numItems}` : `?item=${numItems}`;

		const response: any = await getBugData({ props, urlAppend }).catch(
			(error) => {
				const perror = JSON.stringify(error);
				const object = JSON.parse(perror);
				if (object.code === 401) {
					props.history.push('/relogin');
				} else {
					setError(true);
				}
				console.error(
					'getBugData failed to fetch data with Error code:',
					object.code,
				);
				return;
			},
		);
		if (
			response &&
			response.Items &&
			response.Items.Items &&
			Array.isArray(response.Items.Items) &&
			response.Items.Items.length > 0
		) {
			console.log(resultsFetched, 'result fetch');
			setResultsFetched(true);
			setBackdropOpen(false);
			if (searchInitiated && searchWord) {
				setSearchedData((dataObj) => {
					const dataCopy = new Set([...dataObj].concat(response.Items.Items));
					return Array.from(dataCopy);
				});
				return;
			}
			setData((dataObj) => {
				const dataCopy = new Set([...dataObj].concat(response.Items.Items));
				return Array.from(dataCopy);
			});
			if (!noRawDataUpdate) {
				// This if check is useful for the cases where filtering is done. If filtering returns 0 elements, the presence of the raw data,
				setBackdropOpen(false);
				setRawData((rawDataObj) => {
					// clear filter will get the idea that the data has already been fetched.
					const rawDataCopy = new Set([...rawDataObj].concat(response.Items.Items));
					return Array.from(rawDataCopy);
				});
			}

			if (
				response.Items.LastEvaluatedKey &&
				Object.keys(response.Items.LastEvaluatedKey).length > 0
			) {
				setLastEvaluatedKey(response.Items.LastEvaluatedKey);
			}
			if (
				Object.keys(lastEvaluatedKey).length > 0 &&
				!response.Items.LastEvaluatedKey
			) {
				setLastEvaluatedKey({});
			}
		} else {
			if (!showNoEmptyError) {
				setBackdropOpen(false);
				setNoDataError(true);
			}
		}
	};

	const fetchMore = () => {
		if (Object.keys(lastEvaluatedKey).length > 0 && !searchInitiated) {
			setResultsFetched(false);
			console.log('loader open');
			fetchRecursiveData({
				lastEvalKey: lastEvaluatedKey,
				prodId: selectedProdId,
				prodVersion: productVersion,
				showNoEmptyError: true,
				filterCategory: focusCategory,
				filterSeverity: focusSeverity,
				filterDate: dateRange,
			});
		}
	};

	useEffect(() => {
		// if(error || noDataError) {
		//   setBackdropOpen(false);
		// }
		if (rawData.length > 0 && selectedProdId) {
			setNoDataError(false);
			if (Object.keys(feedbackBarChartData).length > 0) {
				console.log('backdrop closed');
				setBackdropOpen(false);
			}
			if (pieChartSeries) {
				let searchCategoryList = Object.keys(pieChartSeries);
				searchCategoryList = searchCategoryList.map((element) => {
					return element.toLowerCase();
				});
				console.log(searchCategoryList, 'category search list');
				setCategoryList(searchCategoryList);
			}
		}
	}, [
		selectedProdId,
		rawData,
		feedbackBarChartData,
		pieChartSeries,
		error,
		noDataError,
	]);

	const fetchSignedUrl = (imgUrl: string) => {
		const urlSplit = imgUrl.split('/');
		let name = urlSplit[urlSplit.length - 1];
		Http.get({
			url: `/api/v2/signedurl/${name}`,
		})
			.then((response: any) => {
				if (response.filePath) {
					setSignedImageUrl(response.filePath);
				}
			})
			.catch((error: any) => {
				console.error(error);
			});
	};

	const handleViewAttachmentClicked = (
		url: string,
		id: string,
		type: string,
	) => {
		setShowImageModal(true);
		setFocusAttachmentUid(id);
		fetchSignedUrl(url);
		setAttachmentType(type);
	};

	const getDateString = (id: string) => {
		if (bugDataMapping[id]) {
			return getDate(bugDataMapping[id].date);
		}
		return '';
	};

	const getComments = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].comments;
		}
		return {};
	};

	const getUserId = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].userId;
		}
		return undefined;
	};

	const getUserIp = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].userIp;
		}
		return undefined;
	};

	const getProductVersion = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].productVersion;
		}
		return '';
	};

	const getBugSeverity = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].severity;
		}
		return '';
	};

	const getBugCategory = (id: string) => {
		if (bugDataMapping[id]) {
			return bugDataMapping[id].category;
		}
		return '';
	};

	const filterByProduct = (val: string) => {
		console.log(prodNameIdMapping);
		if (val) {
			setSelectedProdId(val);
			setProductVersion(prodNameIdMapping[val].version[0]);
			setNoDataError(false);
			setBackdropOpen(true);
			setRawData([]);
			setData([]);
			setFeedbackBarChartData({});
			setPieChartSeries({});
			setResultsFetched(false);
			setSearchedData([]);
			setKeyword('');
			setOrder('desc');
			setFocusCategory([]);
			setFocusSeverity([]);
			setFocusRating([]);
		}
	};

	const handleRequestSort = () => {
		setOrder((odr) => {
			return odr === 'desc' ? 'asc' : 'desc';
		});
	};

	const clearSearch = () => {
		setKeyword('');
		setSearchedData([]);
		setSearchInitiated(false);
	};

	useEffect(() => {
		if (keyword && searchInitiated) {
			setResultsFetched(false);
			setSearchedData([]);
			fetchRecursiveData({
				prodId: selectedProdId,
				prodVersion: productVersion,
				searchWord: keyword,
				showNoEmptyError: true,
				filterDate: dateRange,
			});
		}
	}, [searchInitiated, keyword]);

	const handleCloseModal = (reason: any) => {
		console.log('calling handleCloseModal', reason);
		setShowImageModal(false);
		setFocusAttachmentUid('');
		setSignedImageUrl('');
	};

	const handleOnSearch = (search: any) => {
		setKeyword(search);
		setSearchInitiated(true);
	};

	const handleImageClicked = () => {
		if (signedImageUrl) {
			setSlideShowImageUrl(signedImageUrl);
		}
	};

	// const getCategoryList = () => {
	//   const categoryList: string[] = []
	//   if(prodNameIdMapping && prodNameIdMapping[selectedProdId] && prodNameIdMapping[selectedProdId].categories && prodNameIdMapping[selectedProdId].categories.length > 0) {
	//     prodNameIdMapping[selectedProdId].categories.map((el) => {
	//       categoryList.push(el.name);
	//     });
	//   }

	//   return categoryList;
	// }

	const imagePayload = {
		showImageModal: showImageModal,
		handleCloseModal: handleCloseModal,
		attachmentType: attachmentType,
		handleImageClicked: handleImageClicked,
		signedImageUrl: signedImageUrl,
		focusAttachmentUid: focusAttachmentUid,
		getUserId: getUserId,
		getUserIp: getUserIp,
		getDateString: getDateString,
		getProductVersion: getProductVersion,
		getBugCategory: getBugCategory,
		getBugSeverity: getBugSeverity,
		getRating: undefined,
		getComments: getComments,
		isBugReport: isBugReport,
	};

	return (
		<div>
			<div
				className={
					slideShowImageUrl
						? classes.imageSlideShowVisible
						: classes.imageSlideShowHidden
				}
			>
				<Close
					htmlColor='#fff'
					style={{
						position: 'absolute',
						cursor: 'pointer',
						top: 10,
						right: 10,
						fontSize: '2.5rem',
					}}
					onClick={() => {
						setSlideShowImageUrl('');
					}}
				/>
				<div style={{ width: '80vw', marginLeft: '10vw', marginTop: '2vh' }}>
					<Image
						aspectRatio={16 / 9}
						width='90%'
						height='90%'
						src={slideShowImageUrl}
					/>
				</div>
			</div>

			{backdropOpen ? (
				<Backdrop className={classes.backdrop} open={backdropOpen}>
					<CircularProgress color='inherit' />
				</Backdrop>
			) : (
				<div>
					{searchInitiated ? (
						<div>
							<RenderTable
								key='renderTable4'
								tableData={searchedData}
								urls={urlArray}
								viewAttachmentClicked={handleViewAttachmentClicked}
								fetchMore={fetchMore}
								currentType={'Bug'}
								keys={keys}
								category={category}
								severity={severity}
								rating={rating}
								disable={currentDisable}
								setDisable={setCurrentDisable}
								order={order}
								handleRequestSort={handleRequestSort}
								keyword={keyword}
								setKeyword={setKeyword}
								searchInitiated={searchInitiated}
								setSearchInitiated={setSearchInitiated}
								clearSearch={clearSearch}
								focusRating={focusRating}
								setFocusRating={setFocusRating}
								focusSeverity={focusSeverity}
								setFocusSeverity={setFocusSeverity}
								focusCategory={focusCategory}
								setFocusCategory={setFocusCategory}
								categoryList={categoryList}
								severityList={severityList}
								resultsFetched={resultsFetched}
							/>
						</div>
					) : noDataError ? (
						<div style={{ marginTop: '3rem' }}>
							<Failure message={`No bugs found`} />
						</div>
					) : (
						<div>
							<ImageModal {...imagePayload} />
							<div style={{ marginTop: 50 }}>
								<Grid container style={{ width: '100%', marginTop: '0.5rem' }}>
									{currentDisable.length > 0 ? (
										<Alert className={classes.info} severity='info'>
											Deselect button to reactivate filters
										</Alert>
									) : (
										<Alert className={classes.info} severity='info'>
											Please only select one filter at a time. Other options will be
											disabled automatically when selecting
										</Alert>
									)}
									<FilterToolBar
										currentDisable={currentDisable}
										keyword={keyword}
										searchInitiated={searchInitiated}
										handleOnSearch={handleOnSearch}
										clearSearch={clearSearch}
										children={[
											{
												child: (
													<DateFilter
														setSelectedDate={setSelectedDate}
														selectedDate={selectedDate}
														setDateRange={setDateRange}
													/>
												),
												name: 'Date',
											},
											{
												child: (
													<RenderKeywordFilter
														keys={keys}
														default={keyword}
														setDisable={setCurrentDisable}
														onSubmit={handleOnSearch}
														onClear={() => {
															clearSearch();
															console.log('clearsearch');
														}}
														disableButtons={
															!resultsFetched && (data.length === 0 || searchInitiated)
														}
													/>
												),
												name: 'Mentions',
											},
											{
												child: (
													<RenderSeverityFilter
														severity={severity}
														setDisable={setCurrentDisable}
														severityList={severityList}
														focusSeverity={focusSeverity}
														setFocusSeverity={setFocusSeverity}
														disableButtons={
															!resultsFetched && (data.length === 0 || searchInitiated)
														}
													/>
												),
												name: 'Severity',
											},
											{
												child: (
													<RenderCategoryFilter
														category={category}
														setDisable={setCurrentDisable}
														focusCategory={focusCategory}
														setFocusCategory={setFocusCategory}
														type={'Feedback'}
														disableButtons={
															!resultsFetched && (data.length === 0 || searchInitiated)
														}
														categoryList={categoryList}
													/>
												),
												name: 'Category',
											},
										]}
									/>
								</Grid>
								<Grid container style={{ marginTop: '3rem' }}>
									<Grid item lg={5}>
										<Paper
											elevation={3}
											style={{ minWidth: 515, height: 350, paddingTop: 10 }}
										>
											<ReactApexChart
												options={bugBarChartOptions}
												series={bugBarChartSeries}
												type='bar'
												width={500}
												height={320}
											/>
										</Paper>
									</Grid>
									<Grid item lg={2}></Grid>
									<Grid item lg={5}>
										<Paper
											elevation={3}
											style={{
												minWidth: 500,
												height: 350,
												paddingTop: 10,
												marginLeft: '-60px',
											}}
										>
											<ReactApexChart
												options={pieChartOptions}
												series={Object.values(pieChartSeries)}
												type='pie'
												width={500}
												height={320}
											/>
										</Paper>
									</Grid>
								</Grid>
							</div>
							<RenderTable
								key='renderTable3'
								tableData={data}
								urls={urlArray}
								viewAttachmentClicked={handleViewAttachmentClicked}
								fetchMore={fetchMore}
								currentType={'Bug'}
								keys={keys}
								category={category}
								severity={severity}
								rating={rating}
								disable={currentDisable}
								setDisable={setCurrentDisable}
								order={order}
								handleRequestSort={handleRequestSort}
								keyword={keyword}
								setKeyword={setKeyword}
								searchInitiated={searchInitiated}
								setSearchInitiated={setSearchInitiated}
								clearSearch={clearSearch}
								focusRating={focusRating}
								setFocusRating={setFocusRating}
								focusSeverity={focusSeverity}
								setFocusSeverity={setFocusSeverity}
								focusCategory={focusCategory}
								setFocusCategory={setFocusCategory}
								categoryList={categoryList}
								severityList={severityList}
								resultsFetched={resultsFetched}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: '36px',
		position: 'relative',
		left: '45%',
		minWidth: '10%',
		...buttonStyle,
	},
	grid: {
		marginTop: theme.spacing(2),
	},
	backButton: {
		marginTop: '36px',
		position: 'relative',
		minWidth: '10%',
		marginRight: '20px',
		...buttonStyle,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	firstColumn: {
		maxWidth: '150px',
		overflow: 'hidden',
	},
	commentsColumn: {
		maxWidth: '250px',
	},
	modalContainer: {
		alignItems: 'center',
		marginTop: '5vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '70vw',
		backgroundColor: '#f7f7f7',
		borderRadius: '8px',
		border: '1px solid',
		boxShadow: '0 0 14px 0 rgb(15 17 17 / 50%)',
		padding: 0,
		paddingBottom: 30,
	},
	imageSlideShowHidden: {
		display: 'none',
		width: '50px',
		height: '50px',
		position: 'fixed',
		top: '50%',
		left: '50%',
		margin: '-25px 0 0 -25px',
		transition: 'width 0.5s ease, height 0.5s ease',
	},
	imageSlideShowVisible: {
		display: 'relative',
		zIndex: 1500,
		width: '100vw',
		height: '100vh',
		position: 'fixed',
		top: '0',
		left: '0',
		backgroundColor: 'rgba(0,0,0,.7)',
		transition: 'width 0.5s ease, height 0.5s ease',
	},
	info: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 'auto',
		height: '20px',
		fontSize: '13px',
		padding: '5px',
		marginBottom: '10px',
		borderRadius: '10px',
	},
}));

export default BugsTab;
