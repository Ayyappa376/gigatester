import { Backdrop, Button, CircularProgress, Container, Grid, makeStyles, Modal, Typography } from '@material-ui/core';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import { buttonStyle } from '../../../common/common';
import { Http } from '../../../utils';
import ReactApexChart from 'react-apexcharts'
import RenderTable, { Order } from './RenderTable';
import Close from '@material-ui/icons/Close';
import Image from 'material-ui-image'
import ProductFilter, { VersionFilter } from './ProductFilter';
import { getDate } from '../../../utils/data';
import { ILimitedProductDetails,
  IProductNameIdMapping, ProductInfo, IAppFeedback, NUMBER_OF_ITEMS_PER_FETCH,
  IBugDataMapping, IFeedbackBarChartData, IRatingMapping, bugBarChartOtions, feedbackBarChartOptions, ILastEvalKey, IFetchRecursiveData, getPieChartOptions, IFeedbackComments } from './common';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getFeedbckChartData, getFeedbackData } from './methods';
import Failure from '../../failure-page';
import { sortTableByDate } from './tableMethods';
import RenderComments from './RenderComments';
import ImageModal from './ImageModal';

interface ChosenProps {
  productInfoProp: any,
}

const FeedbackTab = (props: RouteComponentProps & ChosenProps ) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [error, setError] = useState(false)
  const [isBugReport, setBugReport] = useState<boolean | undefined>();
  const [noDataError, setNoDataError] = useState(false)
  const [data, setData] = useState<IAppFeedback[]>([]);
  const [searchedData, setSearchedData] = useState<IAppFeedback[]>([]);
  const [rawData, setRawData] = useState([]);
  const classes = useStyles();
  const [feedbackBarChartData, setFeedbackBarChartData] = useState < IFeedbackBarChartData > ({});
  const [pieChartSeries, setPieChartSeries] = useState({})
  const [showImageModal, setShowImageModal] = useState(false);
  const [signedImageUrl, setSignedImageUrl] = useState('');
  const [attachmentType, setAttachmentType] = useState('')
  const [focusAttachmentUid, setFocusAttachmentUid] = useState("");
  const [ratingMapping, setRatingMapping] = useState<IRatingMapping>({})
  const [bugDataMapping, setBugDataMapping] = useState<IBugDataMapping>({})
  const [urlArray, setUrlArray] = useState<string[]>([]);
  const [barChartSeries, setBarChartSeries] = useState([{
    name: 'rating',
    data: [0, 0, 0, 0, 0]
  }])
  const [bugBarChartSeries, setBugBarChartSeries] = useState([{
    name: 'Severity',
    data: [0, 0, 0, 0, 0]
  }])
  const [selectedProdId, setSelectedProdId] = useState<string>(() => {
    if(props.productInfoProp.selectedProdId) {
      return props.productInfoProp.selectedProdId;
    }
    return ''
  })
  const [productVersion, setProductVersion] = useState(() => {
    if(props.productInfoProp.productVersion) {
      return props.productInfoProp.productVersion;
    }
    return ''
  });
  const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>(() => {
    if (props.productInfoProp.productInfo) {
      return props.productInfoProp.prodInfo
    }
    return ''
  })
  const [prodNameIdMapping, setProdNameIdMapping] = useState<IProductNameIdMapping>(() => {
    if (props.productInfoProp.prodNameIdMapping) {
      return props.productInfoProp.prodNameIdMapping
    }
    return ''
  })
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<ILastEvalKey>({});
  const [order, setOrder] = useState<Order>('desc')
  const [keyword, setKeyword] = useState('')
  const [searchInitiated, setSearchInitiated] = useState(false)
  const [focusRating, setFocusRating] = useState([]);
  const [focusSeverity, setFocusSeverity] = useState([]);
  const [focusCategory, setFocusCategory] = useState([]);
  const [slideShowImageUrl, setSlideShowImageUrl] = useState('')
  const [resultsFetched, setResultsFetched] = useState(false);

  console.log('rawData', rawData);
  console.log(data)

  useEffect(() => {
    if(feedbackBarChartData) {
      const series = [{
        name: 'Ratings',
        data: Object.values(feedbackBarChartData)
      }];
      setBarChartSeries(series);
    }
  }, [feedbackBarChartData])

  const pieChartOptions = getPieChartOptions(pieChartSeries)

  useEffect(() => {
    const rateMap: IRatingMapping = {};
    const bugMap: IBugDataMapping = {};
    const urls: string[] = [];

      data.forEach((item: IAppFeedback) => {
        if (item.feedbackType === "FEEDBACK") {
          rateMap[item.id] = {
            userId: item.userId ? item.userId : 'Anonymous',
            userIp: item.sourceIP? item.sourceIP : '',
            category: item.feedbackCategory,
            rating : item.productRating,
            date : item.createdOn,
            comments: item.feedbackComments && (typeof item.feedbackComments === 'string') ? JSON.parse(item.feedbackComments) : {},
            productId: item.productId,
            productVersion: item.productVersion
          }
          if(item.feedbackMedia ) {
            const links: any = Object.values(item.feedbackMedia);
            const linksFiltered = links.filter((key: string) => key !== '')
            urls.push(...linksFiltered);
          }
        }
        setRatingMapping(rateMap);
      });

    const urlArrayCopy = [...urlArray];
    urlArrayCopy.push(...urls);
    setUrlArray(urlArrayCopy)
  }, [data])

  useEffect(() => {
    if(selectedProdId && productVersion) {
      fetchRecursiveData({prodId: selectedProdId, prodVersion: productVersion});
      getFeedbckChartData({ setFeedbackBarChartData, setBugBarChartSeries, setPieChartSeries, prodId: selectedProdId, prodVersion: productVersion});
    }
  }, [selectedProdId, productVersion])

  useEffect(() => {
    if(rawData.length === 0) {
      return;
    }
    if(Object.keys(lastEvaluatedKey).length > 0) {
      // fetch the results from backend
      setData([]);
      setRawData([])
      fetchRecursiveData({fetchOrder: order, prodId: selectedProdId, prodVersion: productVersion})
    } else {
      setData(sortTableByDate(data, order))
    }
  }, [order])

  useEffect(() => {
    if(rawData.length === 0) {
      return;
    }
    console.log(focusRating)
    if(focusRating.length === 0) {
      setData(rawData);
      return;
    }
    // fetch the results from backend
    setResultsFetched(false)
    setData([]);
    //setRawData([])
    fetchRecursiveData({filterRating: focusRating, prodId: selectedProdId, prodVersion: productVersion, showNoEmptyError: true, noRawDataUpdate: true})
  }, [focusRating])

  useEffect(() => {
    if(rawData.length === 0) {
      return;
    }
    console.log(focusSeverity)
    if(focusSeverity.length <= 0) {
      setData(rawData);
      return;
    }
    // fetch the results from backend
    setResultsFetched(false)
    setData([]);
    //setRawData([])
    fetchRecursiveData({filterSeverity: focusSeverity, prodId: selectedProdId, prodVersion: productVersion, showNoEmptyError: true, noRawDataUpdate: true})
  }, [focusSeverity])

  useEffect(() => {
    if(rawData.length === 0) {
      return;
    }
    console.log(focusCategory)
    if(focusCategory.length <= 0) {
      setData(rawData);
      return;
    }
    // fetch the results from backend
    setResultsFetched(false)
    setData([]);
    //setRawData([])
    fetchRecursiveData({filterCategory: focusCategory, prodId: selectedProdId, prodVersion: productVersion, showNoEmptyError: true, noRawDataUpdate: true})
  }, [focusCategory])

  const fetchRecursiveData = async({lastEvalKey, fetchOrder, filterRating, filterSeverity, filterCategory,prodId, prodVersion, searchWord, showNoEmptyError, noRawDataUpdate}:
      IFetchRecursiveData) => {
    let urlAppend = ``;
    let numItems = NUMBER_OF_ITEMS_PER_FETCH;
    if(prodId) {
      urlAppend += `?prodId=${prodId}`;
      if(prodVersion) {
        urlAppend += `&prodVersion=${prodVersion}`;
      }
    }
    if(filterRating) {
      urlAppend += urlAppend ? `&filterRating=${filterRating.join(',')}` : `?filterRating=${filterRating.join(',')}`
      numItems = 500;
    }

    if(filterSeverity) {
      urlAppend += urlAppend ? `&filterSeverity=${filterSeverity.join(',')}` : `?filterSeverity=${filterSeverity.join(',')}`
      numItems = 500;
    }

    if(filterCategory) {
      urlAppend += urlAppend ? `&filterCategory=${filterCategory.join(',')}` : `?filterCategory=${filterCategory.join(',')}`
      numItems = 500;
    }

    if(lastEvalKey && Object.keys(lastEvalKey).length > 0) {
      urlAppend += urlAppend ? `&lastEvalKey=${JSON.stringify(lastEvalKey)}` : `?lastEvalKey=${JSON.stringify(lastEvalKey)}`
    }

    if(fetchOrder) {
      urlAppend += urlAppend ? `&order=${fetchOrder}` : `?order=${fetchOrder}`
    }

    if(searchWord) {
      urlAppend += urlAppend ? `&search=${searchWord}` : `?search=${searchWord}`
    }

    urlAppend += urlAppend ? `&item=${numItems}` : `?item=${numItems}`

    const response: any = await getFeedbackData({ props, urlAppend}).catch((error) => {
      const perror = JSON.stringify(error);
      const object = JSON.parse(perror);
      if (object.code === 401) {
        props.history.push('/relogin');
      } else {
        setError(true)
      }
      console.error('getFeedbackData failed to fetch data with Error code:', object.code)
      return;
    })
    setResultsFetched(true);
    if(response && response.Items && response.Items.Items && Array.isArray(response.Items.Items) && response.Items.Items.length > 0) {
      if(searchInitiated && searchWord) {
        setSearchedData((dataObj) => {
          const dataCopy = new Set([...dataObj].concat(response.Items.Items));
          return Array.from(dataCopy)
        });
        return;
      }
      setData((dataObj) => {
        const dataCopy = new Set([...dataObj].concat(response.Items.Items));
        return Array.from(dataCopy)
      });
      if(!noRawDataUpdate) {          // This if check is useful for the cases where filtering is done. If filtering returns 0 elements, the presence of the raw data,
        setRawData((rawDataObj) => {  // clear filter will get the idea that the data has already been fetched.
          const rawDataCopy = new Set([...rawDataObj].concat(response.Items.Items));
          return Array.from(rawDataCopy)
        });
      }

      if(response.Items.LastEvaluatedKey && Object.keys(response.Items.LastEvaluatedKey).length > 0) {
        setLastEvaluatedKey(response.Items.LastEvaluatedKey);
      }
      if(Object.keys(lastEvaluatedKey).length > 0 && !response.Items.LastEvaluatedKey) {
        setLastEvaluatedKey({})
      }
    } else {
      if(!showNoEmptyError) {
        setNoDataError(true);
      }
    }
  }

  const fetchMore = () => {
    if(Object.keys(lastEvaluatedKey).length > 0) {
      fetchRecursiveData({lastEvalKey: lastEvaluatedKey, prodId: selectedProdId, prodVersion: productVersion, showNoEmptyError: true});
    }
  }

  useEffect(() => {
    console.log("In the primary: ",{rawData})
    if(error || noDataError) {
      setBackdropOpen(false);
    }
    if(rawData.length > 0 && selectedProdId) {
        if(Object.keys(feedbackBarChartData).length > 0) {
          setBackdropOpen(false);
        }
    }
  }, [selectedProdId, rawData, feedbackBarChartData, pieChartSeries, error, noDataError])

  const fetchSignedUrl = (imgUrl: string) => {
    const urlSplit = imgUrl.split('/')
    let name = urlSplit[urlSplit.length - 1]
    Http.get({
        url: `/api/v2/signedurl/${name}`,
    }).then((response: any) => {
       if(response.filePath) {
         setSignedImageUrl(response.filePath);
       }
    }).catch((error : any) => {
        console.error(error);
    })
  }

  const handleViewAttachmentClicked = (url: string, id: string, type: string) => {
    setShowImageModal(true);
    setFocusAttachmentUid(id);
    fetchSignedUrl(url)
    setAttachmentType(type)
  }

  const getRating = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].rating
    }
    return 0
  }

  const getDateString = (id: string) => {
    if(ratingMapping[id]) {
      return getDate(ratingMapping[id].date)
    }
    return ""
  }

  const getComments = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].comments
    }
    return {}
  }

  const getUserId = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].userId
    }
    return undefined
  }

  const getUserIp = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].userIp
    }
    return undefined
  }

  const getProductVersion = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].productVersion
    }
    return ""
  }

  const getBugSeverity = (id: string) => {
    if(bugDataMapping[id]) {
      return bugDataMapping[id].severity
    }
    return ""
  }

  const getBugCategory = (id: string) => {
    if(ratingMapping[id]) {
      return ratingMapping[id].category
    }
    return ""
  }

  // useEffect(() => {
  //   filterByProduct(selectedProdId);
  // }, [selectedProdId, productVersion])

  const filterByProduct = (val: string) => {
    console.log(prodNameIdMapping);
    if(val) {
      setSelectedProdId(val);
      setProductVersion(prodNameIdMapping[val].version[0])
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
  }

  const handleRequestSort = () => {
    setOrder((odr) => {
      return odr === 'desc' ? 'asc' : 'desc';
    })
  }

  const clearSearch = () => {
    setKeyword('');
    setSearchedData([])
    setSearchInitiated(false);
  }

  useEffect(() => {
    if(keyword && searchInitiated) {
      setResultsFetched(false)
      setSearchedData([])
      fetchRecursiveData({prodId:  selectedProdId, prodVersion: productVersion, searchWord: keyword,  showNoEmptyError: true })
    }
  }, [searchInitiated, keyword])

  const handleCloseModal = (reason: any) => {
    console.log("calling handleCloseModal", reason)
    setShowImageModal(false);
    setFocusAttachmentUid('');
    setSignedImageUrl('')
  }

  const handleImageClicked = () => {
    if(signedImageUrl) {
      setSlideShowImageUrl(signedImageUrl)
    }
  }

  const getCategoryList = () => {
    const categoryList: string[] = []
    if(prodNameIdMapping && prodNameIdMapping[selectedProdId] && prodNameIdMapping[selectedProdId].categories && prodNameIdMapping[selectedProdId].categories.length > 0) {
      prodNameIdMapping[selectedProdId].categories.map((el) => {
        categoryList.push(el.name);
      });
    }

    return categoryList;
  }

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
    getRating: getRating,
    getComments: getComments,
    isBugReport: false,
  }

  return (
    <div>
        <Container>
          <div className={slideShowImageUrl ? classes.imageSlideShowVisible : classes.imageSlideShowHidden}>
          <Close htmlColor='#fff' style={{position: 'absolute', cursor: 'pointer',
                    top: 10, right: 10, fontSize: '2.5rem'
                  }} onClick={() => {setSlideShowImageUrl('')}}/>
            <div style={{ width: '80vw', marginLeft: '10vw',  marginTop: '2vh'}}>
              <Image aspectRatio={16/9} width='90%' height='90%'   src={slideShowImageUrl} />
            </div>

          </div>
          {searchInitiated ? <div>
            <RenderTable key="renderTable2" tableData={searchedData} isBugReport={undefined}  urls={urlArray} viewAttachmentClicked={handleViewAttachmentClicked} fetchMore={fetchMore}
            order={order} handleRequestSort={handleRequestSort} keyword={keyword} setKeyword={setKeyword}
            searchInitiated={searchInitiated} setSearchInitiated={setSearchInitiated} clearSearch={clearSearch}
            focusRating={focusRating} setFocusRating={setFocusRating} focusSeverity={focusSeverity} setFocusSeverity={setFocusSeverity}
            focusCategory={focusCategory} setFocusCategory={setFocusCategory} categoryList={getCategoryList()} resultsFetched={resultsFetched}
            />
          </div>
          :
          noDataError ? <div style={{marginTop: '3rem'}}><Failure message={`There is no feedback to show.`}/></div>:
          <div>
            <ImageModal {...imagePayload}/>
            <div style={{marginTop: 50}}>
              <Grid container style={{marginTop: '5rem'}}>
                <Grid item lg={5}>
                  <ReactApexChart options={feedbackBarChartOptions} series={barChartSeries} type="bar" width={500} height={320} />
                </Grid>
                <Grid item lg={2}></Grid>
                <Grid item lg={5}>
                  <ReactApexChart options={pieChartOptions} series={Object.values(pieChartSeries)} type="pie" width={500} height={320} />
                </Grid>
              </Grid>
            </div>
            <RenderTable key="renderTable1" tableData={data} isBugReport={undefined} urls={urlArray} viewAttachmentClicked={handleViewAttachmentClicked} fetchMore={fetchMore}
            order={order} handleRequestSort={handleRequestSort} keyword={keyword} setKeyword={setKeyword}
            searchInitiated={searchInitiated} setSearchInitiated={setSearchInitiated} clearSearch={clearSearch}
            focusRating={focusRating} setFocusRating={setFocusRating} focusSeverity={focusSeverity} setFocusSeverity={setFocusSeverity}
            focusCategory={focusCategory} setFocusCategory={setFocusCategory} categoryList={getCategoryList()} resultsFetched={resultsFetched}
            />
          </div>}
        </Container>
    </div>
  )
}


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
    /* minWidth: '50%',
    maxWidth: '50%', */
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    border: '1px solid',
    //borderColor: '#D5D9D9',
    boxShadow: '0 0 14px 0 rgb(15 17 17 / 50%)',
    padding: 0,
    paddingBottom: 30
  },
  imageSlideShowHidden: {
    display: 'none',
    width: '50px',
    height: '50px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    margin: '-25px 0 0 -25px',
    transition: 'width 0.5s ease, height 0.5s ease'
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
    transition: 'width 0.5s ease, height 0.5s ease'
  }
}));


export default FeedbackTab;