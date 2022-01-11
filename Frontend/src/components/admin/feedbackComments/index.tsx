import { Backdrop, Button, CircularProgress, Container, Divider, Grid, makeStyles, Modal, styled, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { buttonStyle } from '../../../common/common';
import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';
import ReactApexChart from 'react-apexcharts'
import { processBarChartData } from './methods';
import RenderTable, { renderComments, RenderStars } from './RenderTable';
import Close from '@material-ui/icons/Close';
import Image from 'material-ui-image'
import { getDate } from '../../../utils/data';
import ProductFilter, { ILimitedProductDetails, IProductNameIdMapping, ProductInfo } from './ProductFilter';

const RATING_ONE = "1";
const RATING_TWO = "2";
const RATING_THREE = "3";
const RATING_FOUR = "4";
const RATING_FIVE = "5";

export interface IProcessedData {
  [key: string]: number
}

type FeedbackType = 'FEEDBACK' | 'BUG_REPORT';

export interface IAppFeedback {
  createdOn: number;
  feedbackComments ? : string[];
  id: string;
  productId ? : string;
  productRating: number;
  productVersion ? : string;
  userId ? : string;
  sourceIP?: string;
  feedbackMedia: {
    image?: string,
    video?: string,
    file?: string,
    audio?: string
  },
  feedbackType: FeedbackType;

}

interface IRatingMapData {
  rating: number,
  date: number,
  comments: string[] | undefined,
  productId?: string,
  productVersion?: string
}

interface IRatingMapping {
  [key : string] : IRatingMapData;
};



export const getSignedUrl = async(url: string, stateVariable: IRootState) => {
  if(!url) {
    return;
  }
  return new Promise((resolve, reject) => {
    const urlSplit = url.split('/')
    let name = urlSplit[urlSplit.length - 1]

    Http.get({
      url: `/api/v2/signedurl/${name}`,
      state: stateVariable
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


const FeedbackComments = (props: any) => {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([])
    const [prodNameIdMapping, setProdNameIdMapping] = useState<IProductNameIdMapping>({})
    const [isBugReport, setIsBugReport] = useState(false);
    const classes = useStyles();
    const [processedData, setProcessedData] = useState < IProcessedData > ({});
    const [showImageModal, setShowImageModal] = useState(false);
    const [signedImageUrl, setSignedImageUrl] = useState('');
    const [attachmentType, setAttachmentType] = useState('')
    const [focusAttachmentUid, setFocusAttachmentUid] = useState("");
    const [ratingMapping, setRatingMapping] = useState<IRatingMapping>({})
    const [urlArray, setUrlArray] = useState<string[]>([]);
    const [barChartSeries, setBarChartSeries] = useState([{
      name: 'rating',
      data: [0, 0, 0, 0, 0]
    }])
    const [selectedProdId, setSelectedProdId] = useState<string[]>([])
    const [pieChartSeries, setPieChartSeries] = useState([1, 1, 1, 1, 1])

    const options: any = {
      chart: {
        id: 'rating-chart'
      },
      xaxis: {
        categories: [RATING_ONE, RATING_TWO, RATING_THREE, RATING_FOUR, RATING_FIVE],
      }
    };

    const stateVariable = useSelector((state: IRootState) => {
      return state;
    });

    useEffect(() => {
      const series = [{
        name: 'series-1',
        data: Object.values(processedData)
      }];
      setBarChartSeries(series);
      if (Object.values(processedData).length > 0) {
        setPieChartSeries(Object.values(processedData))
      }
    }, [processedData])

    useEffect(() => {
      const rateMap: IRatingMapping = {};
      const urls: string[] = [];
      
      data.forEach((item: IAppFeedback) => {
        rateMap[item.id] = {
          rating : item.productRating,
          date : item.createdOn,
          comments: item.feedbackComments,
          productId: item.productId,
          productVersion: item.productVersion
        }
        if(item.feedbackMedia ) {
          //const links = Object.values(item.feedbackMedia).filter((key: string) => key !== '');
          const links: any = Object.values(item.feedbackMedia);
          const linksFiltered = links.filter((key: string) => key !== '')
          urls.push(...linksFiltered);
        }
      });
      setRatingMapping(rateMap);
      const urlArrayCopy = [...urlArray];
      urlArrayCopy.push(...urls);
      setUrlArray(urlArrayCopy)
    }, [data])

    useEffect(() => {
      const dataCopy = rawData.filter((el: IAppFeedback) => el.productId && selectedProdId.indexOf(el.productId) >= 0);
      setData(dataCopy)
    }, [selectedProdId])

    useEffect(() => {
      setBackdropOpen(true);
      let url = '/api/v2/userFeedback';
      if(props.productId) {
        url += `?prodId=${props.productId}`;
        if(props.productVersion) {
          url += `&prodVersion=${props.productVersion}`;
        }
      }
      Http.get({
          url,
          state: stateVariable,
        }).then((response: any) => {
          console.log(response);
          setData(response.Items);
          setRawData(response.Items);
          setProcessedData(processBarChartData(response.Items));
          getProductDetails()
          setBackdropOpen(false);
        })
        .catch((error) => {
          const perror = JSON.stringify(error);
          const object = JSON.parse(perror);
          if (object.code === 401) {
            props.history.push('/relogin');
          }
        });
    }, [])

    const getProductDetails = () => {
        Http.get({
          url: `/api/v2/products`,
          state: stateVariable
        }).then((response: any) => {
          if(response && response.products && Array.isArray(response.products) && response.products.length > 0) {
              const productInfoCopy = [...productInfo]
              const prodNameIdMappingCopy: any = {...prodNameIdMapping};
              response.products.forEach((el: ProductInfo) => {
                  const prodInfo = {id: "", name: ""};
                  prodInfo.id = el.id;
                  prodInfo.name = el.name;
                  productInfoCopy.push(prodInfo);
                  prodNameIdMappingCopy[prodInfo.id] = prodInfo.name
              })
              setProductInfo(productInfoCopy);
              setProdNameIdMapping(prodNameIdMappingCopy);
              setSelectedProdId(Object.keys(prodNameIdMappingCopy))
          }
        }).catch((error : any) => {
            console.error(error);
        })
    }
    

    const getRatingLabel = (rate: string) => {
      return "Rating - " + rate
    }

    const fetchSignedUrl = (imgUrl: string) => {
      const urlSplit = imgUrl.split('/')

      let name = urlSplit[urlSplit.length - 1]
      Http.get({
          url: `/api/v2/signedurl/${name}`,
          state: stateVariable
      }).then((response: any) => {
         if(response.filePath) {
           setSignedImageUrl(response.filePath);
         }
      }).catch((error : any) => {
          console.error(error);
      })
    }

    const options2 = {
      labels: [getRatingLabel(RATING_ONE), getRatingLabel(RATING_TWO), getRatingLabel(RATING_THREE), getRatingLabel(RATING_FOUR), getRatingLabel(RATING_FIVE)],
      colors: ["#008FFB", "#58FFC5", "#FEB018", "#FF455F", "#775DD0"],
      chart: {
        width: 380,
        type: 'pie',
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
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
      return undefined
    }

    const getProductId = (id: string) => {
      if(ratingMapping[id]) {
        return ratingMapping[id].productId
      }
      return ""
    }

    const getProductVersion = (id: string) => {
      if(ratingMapping[id]) {
        return ratingMapping[id].productVersion
      }
      return ""
    }

    const filterByProduct = (val: string[]) => {
      if(val.length > 0) {
        setSelectedProdId(val);
      }
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
                    <Grid item sm={5}>
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
                      <RenderStars rating={getRating(focusAttachmentUid)}/>
                      
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
            <Grid item lg={6}>
              <div style={{display:'flex', justifyContent: 'left'}}>
                <Typography variant='h6' style={{padding: 10}}>Choose what do you want to see:</Typography>
                <Button style={{padding: 10}} variant={isBugReport ? "outlined" : "contained"} color='primary' onClick={() => {setIsBugReport(false)}}>Feedback</Button>
                <Button style={{padding: 10, marginLeft: 10}}variant={isBugReport ? "contained" : "outlined"} color='primary' onClick={() => {setIsBugReport(true)}}>Bugs</Button>
              </div>
            </Grid>
            <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
            <Grid item lg={5}>
            <div>
              <ProductFilter selectedProdId={selectedProdId}
                setSelectedProdId={filterByProduct}
                productNameIdMapping={prodNameIdMapping} 
                productInfo={productInfo}
              />
            </div>
            </Grid>
          </Grid>
          <ImageModal/>
          <div style={{marginTop: 50}}>
            {
              isBugReport ? <div/> :
                <Grid container style={{marginTop: '5rem'}}>
                  <Grid item lg={5}>
                    <ReactApexChart options={options} series={barChartSeries} type="bar" width={500} height={320} />
                  </Grid>
                  <Grid item lg={2}></Grid>
                  <Grid item lg={5}>
                    <ReactApexChart options={options2} series={pieChartSeries} type="pie" width={500} height={320} />
                  </Grid>
                </Grid>
            }
          </div>
          <RenderTable tableData={data} urls={urlArray} isBugReport={isBugReport} viewAttachmentClicked={(url: string, id: string, type: string) => {
            setShowImageModal(true);
            setFocusAttachmentUid(id);
            fetchSignedUrl(url)
            setAttachmentType(type)
          }} />
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

export default FeedbackComments;

function getState(): any {
  throw new Error('Function not implemented.');
}
