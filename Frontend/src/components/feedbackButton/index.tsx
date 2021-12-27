import React, {useState, createRef, useEffect, useRef} from 'react';
import { Button, Container, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, Link, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import CanvasDraw from "react-canvas-draw";
import './styles.css';
import { v1 as uuidv1 } from 'uuid';
import BugReportIcon from '@material-ui/icons/BugReport';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { Http } from '../../utils';
interface IButtonProps {
  label: string;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
}));

const FeedbackButtonComponent = (props: IButtonProps) => {
  let saveCanvas: any;
  let temp: any;
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const userStatus = useSelector((state: IRootState) => {
    return state.user;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedbackPage, setFeedbackPage] = useState(false);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState('');
  const [dialogHidden, setDialogHidden] = useState(false);
  const [fileContentType, setFileContentType] = useState('');
  const [fileSelected, setFileSelected] = useState<any>('');
  const [fileName, setFileName] = useState('');
  const [uploadScreenshot, setUploadScreenshot] = useState('');
  const [saveableCanvas, setSaveableCanvas] = useState<any>('');
  const [feedbackComments, setFeedbackComments] = useState('');
  const [imgMedia, setImgMedia] = useState('');
  const [videoMedia, setVideoMedia] = useState('');
  const [fileMedia, setFileMedia] = useState('');
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const[bugReportPage, setBugReportPage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); 
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true,blobPropertyBag:{ type: "video/mp4" }});
  const closeDialog = () => {
    setDialogOpen(false);
    setFeedbackPage(false);
    setBugReportPage(false);
    setRating(0);
    setImage('');
    setFileName('');
  }
  const handleUploadButton = () => {
    setDialogOpen(true);
  };
  const takeScreenshot = () => {
    let node: any = document.body;
    console.log(document.body, 'ref')
    if (!node) {
        throw new Error('You should provide correct html node.')
      }
      return html2canvas(node)
        .then((canvas) => {
          const croppedCanvas = document.createElement('canvas')
          const croppedCanvasContext = croppedCanvas.getContext('2d')
          console.log(croppedCanvasContext);
          // init data
          const cropPositionTop = 0
          const cropPositionLeft = 0
          const cropWidth = canvas.width
          const cropHeight = canvas.height
  
          croppedCanvas.width = cropWidth
          croppedCanvas.height = cropHeight
          if(croppedCanvasContext){
          croppedCanvasContext.drawImage(
            canvas,
            cropPositionLeft,
            cropPositionTop,
          )
          }
          const base64Image = croppedCanvas.toDataURL()
          setImage(base64Image)
          setImages(true)
          return base64Image
        })
  }

  const uploadFile = () => {
    setLoading(true);
    let formUpload = new FormData();
    formUpload.append('file', fileSelected);
    formUpload.append('fileName', fileSelected.name);
    console.log(fileSelected, 'file');
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = String(reader.result).split('base64,')[1];
      const dataInfo = {
        file: base64String,
        fileName: fileSelected.name,
      };
      console.log(JSON.stringify(dataInfo),'datainfo');
      fileSelected &&
      fetch('http://localhost:3000/feedbackMedia/', {
        method: 'POST',
        body:  JSON.stringify(dataInfo),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          console.log('Success:', data);
          if(data.Key.slice(0,6) === 'gt_img'){
            console.log(data.Key, "img");
            setImgMedia( data.Location)
          }
          else if(data.Key.slice(0,8) === 'gt_video'){
            console.log(data.Key, "vid");
            setVideoMedia(data.Location)
          }
          else{
            console.log(data.Key, "file");
            setFileMedia(data.Location)
          }
        })
        // Http.post({
        //   url: `/api/v2/file/small`,
        //   body: dataInfo,
        //   state: stateVariable,
        // })
        //   .then((response: any) => {
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    };
    reader.readAsDataURL(fileSelected);
  }
  const finalScreenshot = () => {
    let node: any = document.getElementById('canvasScreenshot');
    console.log(document.getElementById('canvasScreenshot'), 'ref')
    if (!node) {
        throw new Error('You should provide correct html node.')
      }
      return html2canvas(node)
        .then((canvas) => {
          const croppedCanvas = document.createElement('canvas')
          const croppedCanvasContext = croppedCanvas.getContext('2d')
          console.log(croppedCanvasContext);
          // init data
          const cropPositionTop = 0
          const cropPositionLeft = 0
          const cropWidth = canvas.width
          const cropHeight = canvas.height
  
          croppedCanvas.width = cropWidth
          croppedCanvas.height = cropHeight
          if(croppedCanvasContext){
          croppedCanvasContext.drawImage(
            canvas,
            cropPositionLeft,
            cropPositionTop,
          )
          }
          const base64Image = croppedCanvas.toDataURL()
          setImage(base64Image)
          setUploadScreenshot(base64Image)
          return base64Image
        })
  }
useEffect(() => {
  if(fileSelected){
  uploadFile();
  }
}, [fileSelected])
 useEffect(() => {
  console.log(mediaBlobUrl, 'mediabloburl')
  const videoPlay = async () => {
  if(mediaBlobUrl){
    let myFile = await fetch(mediaBlobUrl)
    .then(r => r.blob()).then(blobFile => new File([blobFile], `gt_video_${uuidv1()}.mp4`, { type: 'video/mp4' }));
    console.log(myFile, 'videofile');
    // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
    setFileSelected(myFile);
  }
  }
  videoPlay();
 }, [mediaBlobUrl])
 useEffect(() => {

  const uploadScreenshotImg = async () => {
  if(uploadScreenshot){
    let myFile = await fetch(uploadScreenshot)
    .then(r => r.blob()).then(blobFile => new File([blobFile], `gt_img_${uuidv1()}.png`, { type: 'image/png' }));
    // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
    setFileSelected(myFile);
  }
  }
  uploadScreenshotImg();
 }, [uploadScreenshot])


  const captureScreenshot = () => {
    setDialogHidden(true);
    setTimeout(()=> {
      takeScreenshot();
    }, 1000)
  }

  const fileUpload = (event: any) => {
    event.preventDefault();
    setFileSelected(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileContentType(event.target.files[0].type);
  }

  const handleComments = (event: any) => {
      let temp: any = feedbackComments;
      temp = event.target.value;
      setFeedbackComments( event.target.value);
      console.log(event.target.value, 'val')
      console.log(event.target.name, 'name')
      console.log(temp,'temp');
      console.log(feedbackComments, 'feedbackCOmments')
      // setFeedbackComments(event.target.value)
  }
  const renderHome = () => {
    return(<BugReportForm />)
  }

  const submitFeedback = () => {
    const postData = {
      productRating: 1,
      userId: "108",
      productVersion: "2",
      feedbackMedia: {
        image: imgMedia,
        video: videoMedia,
        file: fileMedia,
        audio: ""
      },
        feedbackComments: [feedbackComments],
        productId: "prod_002530f0-4da6-11ec-bda2-8186c737d04e",
    }
    fetch('http://localhost:3000/feedback/', {
      method: 'POST',
      body:  JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }
  const ScreenshotImage = () => {

    console.log(saveCanvas,"saveCanvas")
    return(
      <div style={{display: 'flex', zIndex: 1,  position: 'fixed', height: '80vh', width: '100vw'}}>
      <Grid container>
      <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
      <div id="canvasScreenshot">
      <CanvasDraw  ref={canvasDraw => (saveCanvas = (canvasDraw))}  brushColor='red' enablePanAndZoom={true} brushRadius={3} hideGrid={true} imgSrc={image} style={{display: 'flex', width: '65rem', height: '35rem', margin: '15px', borderStyle: 'solid', borderWidth: '5px', borderColor: 'black'}}/>
      </div>
      {/* <img style={{width: '90vw', height: '80vh', margin: '15px', borderStyle: 'solid', borderWidth: '5px', borderColor: 'black'}} src={image} alt={"ScreenShot"} /> */}
      <div style={{position: 'fixed', borderStyle: 'solid', borderWidth: '2px',borderColor: 'red', backgroundColor: 'white', bottom: '20px', left: '40vw'}}>
      <Button variant='outlined'  style={{margin: '10px', backgroundColor: 'white'}} onClick={() => {
              saveCanvas.undo();
            }}>Undo</Button>
      <Button variant='outlined' style={{margin: '10px', backgroundColor: 'white'}}  onClick={() => {
              saveCanvas.clear();
            }} >Clear</Button>
      <Button variant='outlined' style={{margin: '10px', backgroundColor: 'white'}}   onClick={() => {
              finalScreenshot();
              setImages(false);
              setDialogHidden(false);             
            }} >Next</Button>
      <Button variant='outlined' style={{margin: '10px', backgroundColor: 'white'}}   onClick={() => {
              setImage('');
              setImages(false);
              setDialogHidden(false);             
            }} >Close</Button>
      </div>
      </Grid>
      </Grid>
      </div>
    )
  }
  const BugReportForm = () => {
   
      return (
          <>
          <Grid container>
          <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>

          <TextField  style={{padding:'10px', width: '100%'}}   multiline ref={inputRef} autoFocus={inputRef.current === document.activeElement}
           id="outlined-multiline-static" key="1"  rows={4} label="Provide your Comments" variant="outlined" />
           <br />
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={3} sm={3}>
           <Tooltip
            title={<Typography style={{fontSize: '12px',textAlign: 'center'}}>Capture Screenshot</Typography>}>
           <AspectRatioIcon onClick={() => {captureScreenshot()}}/>
           </Tooltip>
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={3} sm={3}>
           <Tooltip
            title={<Typography style={{fontSize: '12px',textAlign: 'center'}}>Start Screen Record</Typography>}>
           <VideocamIcon onClick={startRecording}/>
           </Tooltip>
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={2} sm={2} >
           <input
                style={{ display: 'none' }}
                id='upload-file'
                multiple
                type='file'
                onChange={(event) => fileUpload(event)}
              />
            <label
              htmlFor='upload-file'
              style={{ fontSize: '14px', color: 'black' }}
            >
           <Tooltip
            title={<Typography style={{fontSize: '12px',textAlign: 'center'}}>Attach File</Typography>}>
           <AttachFileIcon/>
           </Tooltip>
           </label>
           </Grid>
           {fileMedia ? fileName : fileName ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''}
           <Grid item xs={12} sm={12} style={{width: '100%'}}>
           { imgMedia? <img width={300} src={image} alt={"ScreenShot"} /> : image ? loading ?  (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''}
           </Grid>
           <Grid item xs={12} sm={12} >
           {videoMedia ? <video style={{maxHeight: '300px', maxWidth: '300px'}} src={mediaBlobUrl} controls autoPlay muted loop /> : mediaBlobUrl ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''}
           </Grid>
           {/* <ReactMediaRecorder
            screen
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                <div style={{maxWidth: '300px'}}>
                <p>{status}</p>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
                <video style={{maxHeight: '300px', maxWidth: '300px'}} src={mediaBlobUrl} controls autoPlay loop />
                </div>
            )} /> */}
            <Grid item xs={12} sm={12} >
           <Button disabled={loading} variant="outlined" onClick={submitFeedback}>Send Feedback</Button>
           </Grid>
           </Grid>
          </>
      )
  }
  const bugReportHandler = () => {
    setBugReportPage(true);
  }
  const feedbackRating = () => {
    return (
        <>
        <Grid container>
        <div style={{minHeight: '100px', minWidth: '200px', fontSize: '30px', paddingTop: '20px', justifyContent: 'center'}}>
        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center'}}>
            <Typography>Tell us about your experience</Typography>
         </Grid>
         <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center'}}>
        <Rating
        name='size-large'
        value={rating}
        style={{marginLeft: '2px'}}
        onChange={(event, newValue) => {
          if(newValue){ 
          setRating(newValue);
          console.log(rating)
          }
        }}
      />
      </Grid>
      <Grid item xs={12} sm={12}>
      { (rating > 0 && rating < 3) ? <BugReportForm /> :(rating> 2 && rating < 5) ? '' : ''}
      </Grid>
      </div>
      </Grid>
        </>
    )
}
  const feedbackMenu = () => {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} style={{padding: '0px', marginBottom: '20px', justifyContent: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px'}}>
              <button style={{height: '90px', width: '300px'}} onClick={() => {setBugReportPage(true)}} >
            <Grid container>
              <Grid item xs={3} sm={3}>
              <BugReportIcon style={{fontSize: '38px'}} />
              </Grid>
              <Grid item xs={8} sm={8}>
              <Typography style={{fontSize: '25px'}}>
              Report a Bug 
              </Typography>
              </Grid>
              </Grid>
            </button>
              </div>
          </Grid>
          <Grid item xs={12} sm={12}>
          <div style={{display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px'}}>
              <button style={{height: '90px', width: '300px'}} onClick={(event) => { setFeedbackPage(true)}}>
            <Grid container>
              <Grid item xs={3} sm={3}>
              <FormatListBulletedIcon style={{fontSize: '38px'}}/>
              </Grid>
              <Grid item xs={8} sm={8}>
              <Typography style={{fontSize: '25px'}}>
               Feedback 
              </Typography>
              </Grid>
              </Grid>
            </button>
              </div>
          </Grid>
          </Grid>
          </>
    )}
  const handleDialogUpload = () => {
    return (
      <React.Fragment>
        <Dialog
          className={classes.dialogPaper}
          open={dialogOpen}
          hidden={dialogHidden}
          aria-labelledby='form-dialog-title'
          onClose={closeDialog}
        //   maxWidth='xs'
        >
          {/* <DialogTitle
            id='form-dialog-title'
            style={{ textAlign: 'center', padding: '30px 0px' }}
          >
            <Typography style={{ fontSize: '14px' }}>
              GigaTester
            </Typography>
          </DialogTitle> */}
          <DialogContent style={{ marginBottom: '20px' }}>
            <CssBaseline />
            <CancelIcon  style={{position: 'absolute', top: '0px', right: '0px' }}onClick={() => {closeDialog()}}/>
            {feedbackPage ? feedbackRating() : bugReportPage ? <BugReportForm /> : feedbackMenu() }
            {/* {verifyEmail ? signUpAcknowledgement() : signUpForm()} */}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
  return (
      <>
    { images ? <ScreenshotImage /> : dialogOpen ? (
        handleDialogUpload()
      ) : (
      <div style={{ display: 'flex', zIndex: 1, transform: 'rotate(270deg)',  position: 'fixed', bottom: '50vh', right: '-50px'}}>
    <Button
      onClick={handleUploadButton}
      variant='contained'
      size='large'
      color='primary'
      className={classes.button}
    >
      {props.label}
    </Button>
    </div>)}
    </>
  );
};
export default FeedbackButtonComponent;
