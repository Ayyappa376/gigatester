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
  IBugDataMapping, IFeedbackBarChartData, IRatingMapping, feedbackPieChartOptions, getBugPieChartOptions, bugBarChartOtions, feedbackBarChartOptions } from './common';
import { withRouter } from 'react-router-dom';
import renderComments from './RenderComments';
import RenderStars from './RenderStarts';
import { getChartData, getFeedbackData } from './methods';
import { IRootState } from '../../../reducers';
import { useSelector } from 'react-redux';

const FeedbackComments = (props: any) => {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([])
    const [prodNameIdMapping, setProdNameIdMapping] = useState<IProductNameIdMapping>({})
    const [productVersion, setProductVersion] = useState("");
    const [isBugReport, setIsBugReport] = useState(false);
    const classes = useStyles();
    const [feedbackBarChartData, setFeedbackBarChartData] = useState < IFeedbackBarChartData > ({});
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
    const [selectedProdId, setSelectedProdId] = useState<string[]>([])
    const [feedbackPieChartSeries, setFeedbackPieChartSeries] = useState<number[]>([])
    const [bugPieChartSeries, setBugPieChartSeries] = useState<{}>({})
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState("");
   /*  const signedUrlMapping = useSelector(
      (state: IRootState) => state.admin.signedUrls
    );
 */
    const [order, setOrder] = useState<Order>('desc')
    const [keyword, setKeyword] = useState('')
    const [searchInitiated, setSearchInitiated] = useState(false)

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
            severity : item.bugPriority,
            category: item.feedbackCategory,
            date : item.createdOn,
            comments: item.feedbackComments ? JSON.parse(item.feedbackComments) : {},
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
            rating : item.productRating,
            date : item.createdOn,
            comments: item.feedbackComments ? JSON.parse(item.feedbackComments) : {},
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
      if (selectedProdId.length > 1) {
        setProductVersion('all')
      }
      if(productVersion === 'all') {
        console.log({rawData})
        const dataCopy = rawData.filter((el: IAppFeedback) => el.productId && selectedProdId.indexOf(el.productId) >= 0);
        setData(dataCopy)
      } else if (selectedProdId.length === 1) {         // Length should be equal to 1 because we want to choose the version if only one product is there
        const dataCopy = rawData.filter((el: IAppFeedback) => el.productId && selectedProdId.indexOf(el.productId) >= 0 && productVersion === el.productVersion);
        setData(dataCopy)
      }
    }, [selectedProdId, productVersion])

    

    const fetchRecursiveData = async(lastEvalutedKey?: string) => {
      let urlAppend = `?items=${NUMBER_OF_ITEMS_PER_FETCH}`
      if(props.productId) {
        urlAppend += `?prodId=${props.productId}`;
        if(props.productVersion) {
          urlAppend += `&prodVersion=${props.productVersion}`;
        }
      }

      if(lastEvalutedKey) {
        urlAppend += urlAppend ? `&lastEvalKey=${lastEvalutedKey}` : `?lastEvalKey=${lastEvalutedKey}`
      }

      const response: any = await getFeedbackData({isBugReport, props, urlAppend}).catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        }
        return;
      })
      const dataCopy = [...data].concat(response.Items.Items);
      const rawDataCopy = [...rawData].concat(response.Items.Items)
      console.log("data:", dataCopy)
      console.log("rawData:", rawDataCopy)
      setData(dataCopy);
      setRawData(rawDataCopy);
      //setFeedbackBarChartData(processBarChartData(response.Items.Items));
      console.log(response.Items.LastEvaluatedKey)
      if(response.Items.LastEvaluatedKey && response.Items.LastEvaluatedKey.id) {
        setLastEvaluatedKey(response.Items.LastEvaluatedKey.id);
      }
      if(lastEvaluatedKey && !response.Items.LastEvaluatedKey) {
        setLastEvaluatedKey('')
      }
    }

    const fetchMore = () => {
      if(lastEvaluatedKey) {
        fetchRecursiveData(lastEvaluatedKey);
      }
    }

    useEffect(() => {
      setBackdropOpen(true);
      fetchRecursiveData();
      getProductDetails();
      getChartData({isBugReport, setFeedbackBarChartData, setFeedbackPieChartSeries, setBugBarChartSeries, setBugPieChartSeries});
    }, [isBugReport])

    useEffect(() => {
      if(rawData.length > 0 && productInfo.length > 0) {
        setBackdropOpen(false);
      }
    }, [productInfo, rawData, feedbackBarChartData, feedbackPieChartSeries, bugBarChartSeries, bugBarChartSeries])


    const getProductDetails = () => {
        Http.get({
          url: `/api/v2/products`,
        }).then((response: any) => {
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
                      version: [el.version]
                    }
                  }
                  
              })
              setProductInfo(productInfoCopy);
              setProdNameIdMapping(prodNameIdMappingCopy);
              setSelectedProdId(Object.keys(prodNameIdMappingCopy))
          }
        }).catch((error : any) => {
            console.error(error);
        })
    }

    const fetchSignedUrl = (imgUrl: string) => {
      const urlSplit = imgUrl.split('/')
      /* if(signedUrlMapping && signedUrlMapping[imgUrl]) {
        setSignedImageUrl(signedUrlMapping[imgUrl]);
        return;
      } */
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
      if(bugDataMapping[id]) {
        return bugDataMapping[id].category
      }
      return ""
    }

    const filterByProduct = (val: string[]) => {
      if(val.length > 0) {
        setSelectedProdId(val);
      }
    }

    const handleRequestSort = () => {
      setOrder((odr) => {
        return odr === 'desc' ? 'asc' : 'desc';
      })
    }

    const handleFilterSeverity = () => {

    }
    const handleFilterRating = () => {
      
    }
    const handleFilterCategory = () => {
      
    }

    const clearSearch = () => {
      setKeyword('')
    }

    const ImageModal = () => {
      return (
        <Modal aria-describedby='simple-modal-description' open={showImageModal}>
          <div className={classes.modalContainer}>
            <Close style={{display: 'block',
                marginLeft: 'auto',
              }} onClick={()=> {setShowImageModal(false); setFocusAttachmentUid('')}}/>
              <Grid container>
                <Grid item sm={7}>
                  {attachmentType == 'image' ?
                    <Image aspectRatio={4/3} width='90%' style={{display: 'block',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  marginTop: 20,
                                  objectFit: 'cover',
                                  objectPosition: 'center top'
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
                <Grid style={{padding: 15, paddingTop: 0}} item sm={5}>
                  <Grid container style={{marginTop: '20px'}}>
                    <Grid item sm={6}>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary" >Date: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500}}>{getDateString(focusAttachmentUid)}</Typography>
                      </div>
                      <div style={{display: 'flex'}}>
                      <Typography color="textSecondary">Product Version: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500}}>{getProductVersion(focusAttachmentUid)}</Typography>
                      </div>
                    </Grid>
                    <Grid item sm={7}>
                      {isBugReport ? <div style={{display: 'flex'}}>
                      <Typography color="textSecondary">Bug Severity: &nbsp;</Typography>
                      <Typography color="textPrimary" style={{fontWeight: 500}}>{getBugSeverity(focusAttachmentUid)}</Typography>
                      </div> :
                      <RenderStars rating={getRating(focusAttachmentUid)}/>}
                    </Grid>
                    </Grid>
                    <div style={{fontWeight: 500, maxHeight: 500, overflow: 'auto'}}>{renderComments(getComments(focusAttachmentUid))}</div>
                  </Grid>
              </Grid>
          </div>
        </Modal>
      )
    }

    const RenderData = () => {
      return (
        <Container>
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
                versionList={selectedProdId.length === 1 ? prodNameIdMapping[selectedProdId[0]].version : []}
              />
            </Grid>
          </Grid>
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
          filterRating={handleFilterRating}
          />
        </Container>
      )
    }

    return (
        <Container maxWidth='lg' component='div' className='containerRoot'>
          {
            backdropOpen ?
              <Backdrop className={classes.backdrop} open={backdropOpen}>
                  <CircularProgress color='inherit' />
              </Backdrop> : <RenderData/>
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
      minWidth: '50%',
      maxWidth: '50%',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: '#D5D9D9',
      boxShadow: '0 0 14px 0 rgb(15 17 17 / 50%)',
      padding: 30,
      paddingBottom: 30
    },
  }));

export default withRouter(FeedbackComments);
