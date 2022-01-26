import { Backdrop, Button, CircularProgress, Container, Grid, makeStyles, Modal, Typography } from '@material-ui/core';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import { buttonStyle } from '../../../common/common';
import { Http } from '../../../utils';
import ReactApexChart from 'react-apexcharts'
import RenderTable, { Order } from './RenderTable';
import Close from '@material-ui/icons/Close';
import Image from 'material-ui-image'
import { getDate } from '../../../utils/data';
import ProductFilter, { VersionFilter } from './ProductFilter';
import { ILimitedProductDetails,
  IProductNameIdMapping, ProductInfo, IAppFeedback, NUMBER_OF_ITEMS_PER_FETCH,
  IBugDataMapping, IFeedbackBarChartData, IRatingMapping, feedbackPieChartOptions, getBugPieChartOptions, bugBarChartOtions, feedbackBarChartOptions, ILastEvalKey } from './common';
import { withRouter } from 'react-router-dom';
import RenderStars from './RenderStarts';
import { getChartData, getFeedbackData } from './methods';
import Failure from '../../failure-page';
import { sortTableByDate } from './tableMethods';
import Draggable from 'react-draggable';
import RenderComments from './RenderComments';

const FeedbackComments = (props: any) => {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [error, setError] = useState(false)
    const [noDataError, setNoDataError] = useState(false)
    const [data, setData] = useState<IAppFeedback[]>([]);
    const [rawData, setRawData] = useState([]);
    const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([])
    const [prodNameIdMapping, setProdNameIdMapping] = useState<IProductNameIdMapping>({})
    const [isBugReport, setIsBugReport] = useState(false);
    const classes = useStyles();
    const [feedbackBarChartData, setFeedbackBarChartData] = useState < IFeedbackBarChartData > ({});
    const [feedbackPieChartSeries, setFeedbackPieChartSeries] = useState<number[]>([])
    const [bugPieChartSeries, setBugPieChartSeries] = useState({})
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
      if(props.productId) {
        return props.productId;
      }
      return ''
    })
    const [productVersion, setProductVersion] = useState(() => {
      if(props.productVersion) {
        return props.productVersion;
      }
      return ''
    });
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<ILastEvalKey>({});
    const [order, setOrder] = useState<Order>('desc')
    const [keyword, setKeyword] = useState('')
    const [searchInitiated, setSearchInitiated] = useState(false)
    const [focusRating, setFocusRating] = useState([]);
    const [focusSeverity, setFocusSeverity] = useState([]);
    const [slideShowImageUrl, setSlideShowImageUrl] = useState('')

    useEffect(() => {
      if(feedbackBarChartData) {
        const series = [{
          name: 'Ratings',
          data: Object.values(feedbackBarChartData)
        }];
        setBarChartSeries(series);
      }
    }, [feedbackBarChartData])

    const bugPieChartOptions = getBugPieChartOptions(bugPieChartSeries)

    useEffect(() => {
      const rateMap: IRatingMapping = {};
      const bugMap: IBugDataMapping = {};
      const urls: string[] = [];

      if(isBugReport) {
        data.forEach((item: IAppFeedback) => {
          bugMap[item.id] = {
            userId: item.userId ? item.userId : 'Anonymous',
            userIp: item.sourceIP? item.sourceIP : '',
            severity : item.bugPriority,
            category: item.feedbackCategory,
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
        });
        setBugDataMapping(bugMap);
      } else {
        data.forEach((item: IAppFeedback) => {
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
        });
        setRatingMapping(rateMap);
      }
      
      const urlArrayCopy = [...urlArray];
      urlArrayCopy.push(...urls);
      setUrlArray(urlArrayCopy)
    }, [data])

    useEffect(() => {
      if(selectedProdId && productVersion) {
        fetchRecursiveData({prodId: selectedProdId, prodVersion: productVersion});
        getChartData({isBugReport, setFeedbackBarChartData, setFeedbackPieChartSeries, setBugBarChartSeries, setBugPieChartSeries});
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
        fetchRecursiveData({fetchOrder: order})
      } else {
        setData(sortTableByDate(data, order))
      }
    }, [order])

    useEffect(() => {
      if(rawData.length === 0) {
        return;
      }
      console.log(focusRating)
      if(focusRating.length <= 0) return;
      // fetch the results from backend
      setData([]);
      setRawData([])
      fetchRecursiveData({filterRating: focusRating})
    }, [focusRating])

    useEffect(() => {
      if(rawData.length === 0) {
        return;
      }
      console.log(focusSeverity)
      if(focusSeverity.length <= 0) return;
      // fetch the results from backend
      setData([]);
      setRawData([])
      fetchRecursiveData({filterSeverity: focusSeverity})
    }, [focusSeverity])

    const fetchRecursiveData = async({lastEvalKey, fetchOrder, filterRating, filterSeverity, prodId, prodVersion, emptyErrorValid}: 
        {lastEvalKey?: ILastEvalKey, fetchOrder?: Order, filterRating?: number[], filterSeverity?: string[], prodId?: string, prodVersion?: string, emptyErrorValid?: boolean}) => {
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

      if(lastEvalKey && Object.keys(lastEvalKey).length > 0) {
        urlAppend += urlAppend ? `&lastEvalKey=${JSON.stringify(lastEvalKey)}` : `?lastEvalKey=${JSON.stringify(lastEvalKey)}`
      }

      if(fetchOrder) {
        urlAppend += urlAppend ? `&order=${fetchOrder}` : `?order=${fetchOrder}`
      }

      urlAppend += urlAppend ? `&item=${numItems}` : `?item=${numItems}`

      const response: any = await getFeedbackData({isBugReport, props, urlAppend}).catch((error) => {
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
      console.log("hello:",response)
      if(response && response.Items && response.Items.Items && Array.isArray(response.Items.Items) && response.Items.Items.length > 0) {
        setData((dataObj) => {
          const dataCopy = new Set([...dataObj].concat(response.Items.Items));
          return Array.from(dataCopy)
        });
        setRawData((rawDataObj) => {
          const rawDataCopy = new Set([...rawDataObj].concat(response.Items.Items));
          return Array.from(rawDataCopy)
        });
        if(response.Items.LastEvaluatedKey && Object.keys(response.Items.LastEvaluatedKey).length > 0) {
          setLastEvaluatedKey(response.Items.LastEvaluatedKey);
        }
        if(Object.keys(lastEvaluatedKey).length > 0 && !response.Items.LastEvaluatedKey) {
          setLastEvaluatedKey({})
        }
      } else {
        setNoDataError(true)
      }
    }

    const fetchMore = () => {
      if(Object.keys(lastEvaluatedKey).length > 0) {
        fetchRecursiveData({lastEvalKey: lastEvaluatedKey});
      }
    }

    useEffect(() => {
      if(data.length > 0) {
        setData([]);
        setRawData([]);
      }
      setBackdropOpen(true);
      getProductDetails();
      
    }, [isBugReport])

    useEffect(() => {
      console.log("In the primary: ",{rawData})
      if(error || noDataError) {
        console.log("hello")
        setBackdropOpen(false);
      }
      if(rawData.length > 0 && selectedProdId) {
        // console.log(feedbackBarChartData, feedbackPieChartSeries.length)
        if(isBugReport) {
          if(Object.keys(bugPieChartSeries).length > 0) {
            setBackdropOpen(false);
          }
        } else {
          if(Object.keys(feedbackBarChartData).length > 0 && feedbackPieChartSeries.length > 0) {
            setBackdropOpen(false);
          }
        }
      }
    }, [selectedProdId, rawData, feedbackBarChartData, feedbackPieChartSeries, bugPieChartSeries, error, noDataError])


    const getProductDetails = () => {
        Http.get({
          url: `/api/v2/products`,
        }).then((response: any) => {
          console.log(response);
          if(response && response.products && Array.isArray(response.products) && response.products.length > 0) {
              const productInfoCopy = [...productInfo]
              const prodNameIdMappingCopy: any = {...prodNameIdMapping};
              response.products.forEach((el: ProductInfo) => {
                  const prodInfo = {id: "", name: ""};
                  prodInfo.id = el.id;
                  prodInfo.name = el.name;
                  productInfoCopy.push(prodInfo);
                  if(prodNameIdMappingCopy[prodInfo.id]) {
                    prodNameIdMappingCopy[prodInfo.id].version.push(el.version);
                  } else {
                    prodNameIdMappingCopy[prodInfo.id] = {
                      name: prodInfo.name,
                      version: [el.version],
                      categories: el.feedbackSettings ? el.feedbackSettings.categories ? el.feedbackSettings.categories : [] : []
                    }
                  }
                  
              })
              setProductInfo(productInfoCopy);
              setProdNameIdMapping(prodNameIdMappingCopy);
              const defaultProductId = Object.keys(prodNameIdMappingCopy)[0];
              setSelectedProdId(defaultProductId);
              setProductVersion(prodNameIdMappingCopy[defaultProductId].version[0]);
          }
        }).catch((error : any) => {
            console.error(error);
        })
    }

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
      if(isBugReport && bugDataMapping[id]) {
        return getDate(bugDataMapping[id].date)
      }
      if(ratingMapping[id]) {
        return getDate(ratingMapping[id].date)
      }
      return ""
    }

    const getComments = (id: string) => {
      if(isBugReport && bugDataMapping[id]) {
        return bugDataMapping[id].comments
      }
      if(ratingMapping[id]) {
        return ratingMapping[id].comments
      }
      return {}
    }

    const getUserId = (id: string) => {
      if(isBugReport && bugDataMapping[id]) {
        return bugDataMapping[id].userId
      }
      if(ratingMapping[id]) {
        return ratingMapping[id].userId
      }
      return undefined
    }

    const getUserIp = (id: string) => {
      if(isBugReport && bugDataMapping[id]) {
        return bugDataMapping[id].userIp
      }
      if(ratingMapping[id]) {
        return ratingMapping[id].userIp
      }
      return undefined
    }

    const getProductVersion = (id: string) => {
      if(isBugReport && bugDataMapping[id]) {
        return bugDataMapping[id].productVersion
      }
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
      if(isBugReport && bugDataMapping[id]) {
        return bugDataMapping[id].category
      }
      if(ratingMapping[id]) {
        return ratingMapping[id].category
      }
      return ""
    }

    const filterByProduct = (val: string) => {
      if(val) {
        setSelectedProdId(val);
        setProductVersion(prodNameIdMapping[val].version[0])
        setNoDataError(false);
        setBackdropOpen(true);
        setRawData([])
        setData([])
        setFeedbackBarChartData({})
        setFeedbackPieChartSeries([])
        setBugPieChartSeries({})
      }
    }

    const handleRequestSort = () => {
      setOrder((odr) => {
        return odr === 'desc' ? 'asc' : 'desc';
      })
    }

    const handleFilterSeverity = () => {

    }
    /* const handleFilterRating = () => {
      if(rawData.length === 0) {
        return;
      }
      if(Object.keys(lastEvaluatedKey).length > 0) {
        // fetch the results from backend
        setData([]);
        setRawData([])
        fetchRecursiveData({fetchOrder: order})
      } else {
        setData(sortTableByDate(data, order))
      }
      
    } */
    const handleFilterCategory = () => {
      
    }

    const clearSearch = () => {
      setKeyword('')
    }

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

    const ImageModal = () => {
      return (
        <Draggable handle="#handle">
        <Modal aria-describedby='simple-modal-description' hideBackdrop={true} open={showImageModal}>
          <div style={{resize: 'both', overflow: 'auto'}} className={classes.modalContainer}>
            <div id="handle" style={{backgroundColor: 'rgb(40 120 240)', minWidth: '100%', height: 37, position: 'relative', cursor: 'move'}}>
              <Close  style={{position: 'absolute', cursor: 'pointer',
                top: 7, right: 7
              }} onClick={handleCloseModal}/>
            </div>
            <div style={{padding: 30}}>
              <Grid container>
                <Grid item sm={8}>
                  {attachmentType == 'image' ?
                    <Image aspectRatio={4/3} onClick={handleImageClicked} width='90%' style={{display: 'block',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  marginTop: 20,
                                  cursor: 'pointer',
                                  /* objectFit: 'cover',
                                  objectPosition: 'center top' */
                                  }} src={signedImageUrl} /> :
                    <video width="90%" controls style={{display: 'block',
                                  marginTop: 20,
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  }}>
                      <source src={signedImageUrl} type="video/mp4" />
                    </video>
                  }
                </Grid>
                <Grid style={{padding: 15, paddingTop: 0}} item sm={4}>
                  <Grid container style={{marginTop: '20px'}}>
                    <Grid item sm={12} >
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Username: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getUserId(focusAttachmentUid)}</Typography>
                      </div>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Source Ip: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getUserIp(focusAttachmentUid)}</Typography>
                      </div>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Date: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getDateString(focusAttachmentUid)}</Typography>
                      </div>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Product Version: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getProductVersion(focusAttachmentUid)}</Typography>
                      </div>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Category: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getBugCategory(focusAttachmentUid)}</Typography>
                      </div>
                      {isBugReport ? <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Bug Severity: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getBugSeverity(focusAttachmentUid)}</Typography>
                      </div> :
                      <RenderStars rating={getRating(focusAttachmentUid)}/>}
                    </Grid>
                    </Grid>
                    <div style={{fontWeight: 500, maxHeight: 500, overflow: 'auto'}}>
                      <RenderComments comments={getComments(focusAttachmentUid)} old={false}/></div>
                  </Grid>
              </Grid>
              </div>
          </div>
        </Modal>
        </Draggable>
      )
    }

    const RenderData = () => {
      return (
        <Container>
          <div className={slideShowImageUrl ? classes.imageSlideShowVisible : classes.imageSlideShowHidden}>
          <Close htmlColor='#fff' style={{position: 'absolute', cursor: 'pointer',
                    top: 10, right: 10, fontSize: '2.5rem'
                  }} onClick={() => {setSlideShowImageUrl('')}}/>
            <div style={{ width: '80vw', marginLeft: '10vw',  marginTop: '2vh'}}>
              <Image aspectRatio={16/9} width='90%' height='90%'   src={slideShowImageUrl} />
            </div>
          
          </div>
          <Grid container>
            <Grid item xl={6}>
              <div style={{display:'flex', justifyContent: 'left'}}>
                <Typography variant='h6' style={{padding: 10}}>Choose what do you want to see:</Typography>
                <Button style={{padding: 10}} variant={isBugReport ? "outlined" : "contained"} color='primary' onClick={() => {setIsBugReport(false)}}>Feedback</Button>
                <Button style={{padding: 10, marginLeft: 10}}variant={isBugReport ? "contained" : "outlined"} color='primary' onClick={() => {setIsBugReport(true)}}>Bugs</Button>
              </div>
            </Grid>
            <Grid item xl={4} style={{position: 'relative'}}>
            <div >
              <ProductFilter selectedProdId={selectedProdId}
                setSelectedProdId={filterByProduct}
                productNameIdMapping={prodNameIdMapping} 
                productInfo={productInfo}
              />
            </div>
            </Grid>
            <Grid item xl={2} style={{position: 'relative'}}>
              <VersionFilter productVersion={productVersion}
                setProductVersion={setProductVersion}
                versionList={selectedProdId ? prodNameIdMapping[selectedProdId].version : []}
              />
            </Grid>
          </Grid>
          {noDataError ? <div style={{marginTop: '3rem'}}><Failure message={"There is no data to show."}/></div>:
          <div>
            <ImageModal/>
            <div style={{marginTop: 50}}>
              <Grid container style={{marginTop: '5rem'}}>
                <Grid item lg={5}>
                  <ReactApexChart options={isBugReport ? bugBarChartOtions : feedbackBarChartOptions} series={isBugReport? bugBarChartSeries : barChartSeries} type="bar" width={500} height={320} />
                </Grid>
                <Grid item lg={2}></Grid>
                <Grid item lg={5}>
                  <ReactApexChart options={isBugReport ? bugPieChartOptions : feedbackPieChartOptions} series={isBugReport? Object.values(bugPieChartSeries) : feedbackPieChartSeries} type="pie" width={500} height={320} />
                </Grid>
              </Grid>
            </div>
            <RenderTable tableData={data} urls={urlArray} isBugReport={isBugReport} viewAttachmentClicked={handleViewAttachmentClicked} fetchMore={fetchMore}
            filterSeverity={handleFilterSeverity} order={order} handleRequestSort={handleRequestSort} keyword={keyword} setKeyword={setKeyword}
            searchInitiated={searchInitiated} setSearchInitiated={setSearchInitiated} clearSearch={clearSearch} filterCategory={handleFilterCategory}
            focusRating={focusRating} setFocusRating={setFocusRating} focusSeverity={focusSeverity} setFocusSeverity={setFocusSeverity}
            />
          </div>}
        </Container>
      )
    }

    return (
        <Container maxWidth='lg' component='div' className='containerRoot'>
          {
            !error ? backdropOpen ?
              <Backdrop className={classes.backdrop} open={backdropOpen}>
                  <CircularProgress color='inherit' />
              </Backdrop> : <RenderData/> :
              <Failure message={"Oops! Something went wrong."}/>
          }
        </Container>
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
      marginTop: '5%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
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

export default withRouter(FeedbackComments);
