import { Backdrop, Button, CircularProgress, Container, Grid, makeStyles, Modal } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { buttonStyle } from '../../../common/common';
import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';
import ReactApexChart from 'react-apexcharts'
import { processBarChartData } from './methods';
import RenderTable from './RenderTable';

const RATING_ONE = "1";
const RATING_TWO = "2";
const RATING_THREE = "3";
const RATING_FOUR = "4";
const RATING_FIVE = "5";

export interface IProcessedData {
  [key: string]: number
}

export interface IAppFeedback {
  createdOn: number;
  feedbackComments ? : string[];
  id: string;
  productId ? : string;
  productRating: number;
  productVersion ? : number;
  userId ? : string;
  feedbackMedia: {
    image?: string,
    video?: string,
    file?: string,
    audio?: string
  }
}

const FeedbackComments = (props: any) => {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [data, setData] = useState([]);
    const classes = useStyles();
    const [processedData, setProcessedData] = useState < IProcessedData > ({});
    const [showImageModal, setShowImageModal] = useState(false);
    const [signedImageUrl, setSignedImageUrl] = useState('');
    const [barChartSeries, setBarChartSeries] = useState([{
      name: 'rating',
      data: [0, 0, 0, 0, 0]
    }])
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
      setBackdropOpen(true);
      Http.get({
          url: '/api/v2/userFeedback',
          state: stateVariable,
        }).then((response: any) => {
          console.log(response);
          setData(response.Items);
          setProcessedData(processBarChartData(response.Items));
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

    const getRatingLabel = (rate: string) => {
      return "Rating - " + rate
    }

    const fetchSignedUrl = (imgUrl: string) => {
      console.log(imgUrl)
      const urlSplit = imgUrl.split('/')

      let name = urlSplit[urlSplit.length - 1]
      Http.get({
          url: `/api/v2/signedurl/${name}`,
          state: stateVariable
      }).then((response: any) => {
        
         if(response.filePath) {
           setSignedImageUrl(response.filePath);
           setShowImageModal(true);
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

    const ImageModal = () => {
      return (
        <Modal style={{minWidth: '100%'}} aria-describedby='simple-modal-description' open={showImageModal}>
          <div style={{alignItems: 'center', minWidth: '100%'}}>
            <img style={{display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '40%'}} src={signedImageUrl}/>
            <Button  style={{display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  }} onClick={() => {setShowImageModal(false)}}>
              Close
            </Button>
          </div>
        </Modal>
      )
    }

    const RenderData = () => {
      return (
        <Container>
          <ImageModal/>
          <Grid container>
            <Grid item md={5}>
              <ReactApexChart options={options} series={barChartSeries} type="bar" width={500} height={320} />
            </Grid>
            <Grid item md={2}></Grid>
            <Grid item md={5}>
              <ReactApexChart options={options2} series={pieChartSeries} type="pie" width={500} height={320} />
            </Grid>
          </Grid>
          <RenderTable tableData={data} viewAttachmentClicked={(imgUrl: string) => {
            console.log("calling fetchSignedUrl")
            fetchSignedUrl(imgUrl);
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
  }));

export default FeedbackComments;

function getState(): any {
  throw new Error('Function not implemented.');
}
