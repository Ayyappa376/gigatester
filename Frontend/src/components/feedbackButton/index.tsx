import React, {useState, createRef, useEffect, useRef} from 'react';
import { Button, Container, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, Link, TextField, Tooltip, Typography } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from 'html2canvas';
import CanvasDraw from "react-canvas-draw";
import './styles.css';
import { v1 as uuidv1 } from 'uuid';
import BugReportIcon from '@material-ui/icons/BugReport';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

interface IButtonProps {
  label: string;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    "&:hover": {background: "#366afb"},
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
  const [fileSubmitted, setFileSubmitted] = useState(false)
  const [feedbackComments, setFeedbackComments] = useState('');
  const [imgMedia, setImgMedia] = useState('');
  const [videoMedia, setVideoMedia] = useState('');
  const [fileMedia, setFileMedia] = useState('');
  const [images, setImages] = useState(false);
  const [video, setVideo] = useState<any>('');
  const [imageRecording, setImageRecording] = useState(false)
  const [loading, setLoading] = useState(false);
  const [finalRating, setFinalRating] = useState(0);
  const[bugReportPage, setBugReportPage] = useState(false);
  const[dataSubmitted, setDataSubmitted] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ screen: true,blobPropertyBag:{ type: "video/mp4" }});

  const closeDialog = () => {
    setVideo('');
    setDialogOpen(false);
    setFeedbackPage(false);
    setBugReportPage(false);
    setRating(0);
    setImage('');
    setFileName('');
    setFileSelected('');
    setDataSubmitted(false);
    setFeedbackComments('');
    setFinalRating(0);
    setImgMedia('');
    setVideoMedia('');
    setFileMedia('');
  }

  const handleUploadButton = () => {
    setDialogOpen(true);
  };

  const uploadFile = () => {
    if(fileSelected){
      console.log('upload file triggered')
    setLoading(true);
    let formUpload = new FormData();
    formUpload.append('file', fileSelected);
    formUpload.append('fileName', fileSelected.name);
    // console.log(fileSelected, 'file');
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = String(reader.result).split('base64,')[1];
      const dataInfo = {
        file: base64String,
        fileName: fileSelected.name,
      };
      // console.log(JSON.stringify(dataInfo),'datainfo');
      fileSelected &&
      fetch('http://localhost:3000/feedbackMedia/', {
        method: 'POST',
        body:  JSON.stringify(dataInfo),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          // console.log('Success:', data);
          if(data.Key.slice(0,6) === 'gt_img'){
            // console.log(data.Key, "img");
            setImgMedia(data.Location)
          }
          else if(data.Key.slice(0,8) === 'gt_video'){
            // console.log(data.Key, "vid");
            setVideoMedia(data.Location)
          }
          else{
            // console.log(data.Key, "file");
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
    if(fileSelected){
    reader.readAsDataURL(fileSelected);
    }
    setFileSelected('');
  }
  }
  useEffect(() => {
    if(imgMedia || videoMedia || fileMedia){
    setFileSubmitted(true)
    }
  }, [imgMedia, videoMedia, fileMedia])

  useEffect(() => {
    if(mediaBlobUrl){
    setVideo(mediaBlobUrl);
    if(!imageRecording){
    setDialogHidden(false);
    }
    }
  }, [mediaBlobUrl])

  const finalScreenshot = () => {
    clearBlobUrl();
    setVideo('');
    let node: any = document.getElementById('canvasScreenshot');
    // console.log(document.getElementById('canvasScreenshot'), 'ref')
    if (!node) {
        throw new Error('You should provide correct html node.')
      }
      return html2canvas(node, {scrollX: 0,
        scrollY: 0})
        .then((canvas) => {
          const croppedCanvas = document.createElement('canvas')
          const croppedCanvasContext = croppedCanvas.getContext('2d')
          console.log(croppedCanvasContext, '2d');
          // init data
          const cropPositionTop = 0
          const cropPositionLeft = 0
          const cropWidth = window.innerWidth
          const cropHeight = window.innerHeight
  
          croppedCanvas.width = cropWidth
          croppedCanvas.height = cropHeight
          if(croppedCanvasContext){
          croppedCanvasContext.drawImage(
            canvas,
            cropPositionLeft,
            cropPositionTop,
          )
          }
          const base64Image = canvas.toDataURL()
          setImage(base64Image)
          setUploadScreenshot(base64Image)
          return base64Image
        })
  }

  // const submitFeedback = () => {
  //   if(mediaBlobUrl && !dataSubmitted){
  //         let myFile = await fetch(mediaBlobUrl)
  //         .then(r => r.blob()).then(blobFile => new File([blobFile], `gt_video_${uuidv1()}.mp4`, { type: 'video/mp4' }));
  //         console.log(myFile, 'videofile');
  //         // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
  //         setFileSelected(myFile);
  //         return myFile;
  //       }
  //    else if(uploadScreenshot  && !dataSubmitted){
  //             let myFile = await fetch(uploadScreenshot)
  //             .then(r => r.blob()).then(blobFile => new File([blobFile], `gt_img_${uuidv1()}.png`, { type: 'image/png' }));
  //             // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
  //             setFileSelected(myFile);
  //           return myFile;
  //       }
  // }


 useEffect(() => {
  // console.log(mediaBlobUrl, 'mediabloburl')
  const videoPlay = async () => {
  if(mediaBlobUrl){
    let myFile = await fetch(mediaBlobUrl)
    .then(r => r.blob()).then(blobFile => new File([blobFile], `gt_video_${uuidv1()}.mp4`, { type: 'video/mp4' }));
    // console.log(myFile, 'videofile');
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
      startRecording();
    }, 500)
    setImageRecording(true)
    console.log('recording started')
    console.log(status, 'started')
  }

  const captureScreenRecord = () => {
    setDialogHidden(true);
     setTimeout(()=> {
      startRecording();
    }, 500)
  }

useEffect(() => {
  if(status === 'recording' && imageRecording){
    setTimeout(()=> {
      stopRecording();    
      setTimeout(()=> {
        screenshotVideo();
      }, 1000)},500)
  }
}, [status])

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
  }
  // const renderHome = () => {
  //   return(<BugReportForm />)
  // }

    // const takeScreenshot = () => {
  //   let node: any = document.body;
  //   // console.log(document.body, 'ref')
  //   if (!node) {
  //       throw new Error('You should provide correct html node.')
  //     }
  //     return html2canvas(node)
  //       .then((canvas) => {
  //         const croppedCanvas = document.createElement('canvas')
  //         const croppedCanvasContext = croppedCanvas.getContext('2d')
  //         // console.log(croppedCanvasContext);
  //         const cropPositionTop = 0
  //         const cropPositionLeft = 0
  //         const cropWidth: number = canvas.width;
  //         const cropHeight: number = canvas.height;
  //         console.log(croppedCanvasContext, '2ds');
  //         console.log(cropWidth);
  //         console.log(cropHeight);
  //         croppedCanvas.width = cropWidth
  //         croppedCanvas.height = cropHeight
  //         if(croppedCanvasContext){
  //         croppedCanvasContext.drawImage(
  //           canvas,
  //           cropPositionLeft,
  //           cropPositionTop,
  //         )
  //         }
  //         const base64Image = croppedCanvas.toDataURL()
  //         setImage(base64Image)
  //         setImages(true)
  //         console.log(base64Image)
  //         return base64Image
  //       })
  // }

  const screenshotVideo = () => {
    const video: any = document.getElementById('videoRecord')
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width= window.screen.width;
    canvas.height = window.screen.height;
    if(video && context){
      context.drawImage(video, 0, 0);
      const frame = canvas.toDataURL("image/png");
      setImage(frame);
    }
    setImages(true)
  }

useEffect(() => {
    if(fileSubmitted){
      console.log('file Submitted')
    const postData = {
      productRating: finalRating,
      userId: "1",
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
      .then(data => {setDataSubmitted(true); setFinalRating(0); setLoading(false); console.log(data);setFileSubmitted(false);
          setTimeout(()=> {closeDialog();}, 3000) })
      }
}, [fileSubmitted])
  const SuccessPage = () => {
    // console.log(finalRating)
    if(finalRating > 0 && finalRating < 6){
      setFileSubmitted(true)
    }
    return(
      <>
      <div style={{justifyContent: 'center', display: 'flex', padding: '20px'}}>
      {dataSubmitted ?  <Typography>Thanks for Submitting Feedback</Typography> : '' }
      </div>
      </>
    )
  }
  const handleSendFeedback = () => {
    if(fileSelected || image || mediaBlobUrl){
      uploadFile();
    }
    else{
      setFileSubmitted(true);
    } 
  }
  const ScreenshotImage = () => {

    // console.log(saveCanvas,"saveCanvas")
    return(
      <div style={{display: 'flex', zIndex: 1,  position: 'fixed', height: '100vh', width: '100vw'}}>
      <Grid container>
      <Grid item xs={12} sm={12}>
      <div id="canvasScreenshot" >
      <CanvasDraw  ref={canvasDraw => (saveCanvas = (canvasDraw))} brushColor='red' brushRadius={3} hideGrid={true} imgSrc={image}  canvasHeight={window.screen.height} canvasWidth={window.screen.width} />
      </div>
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
  const textComment = () => {
    return(
    <TextField  style={{padding:'10px', width: '100%'}}   multiline 
    id="outlined-multiline-static"  value={feedbackComments || ''} onChange={(event) => {handleComments(event)}} rows={4} label="Provide your Comments" variant="outlined" />
    )
  }
  const bugReportForm = () => {
      return (
          <>
          <Grid container>
          <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
            {textComment()}
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={3} sm={3}>
           <Tooltip
            title={<Typography style={{fontSize: '12px',textAlign: 'center'}}>Capture Screenshot</Typography>}>
           <AspectRatioIcon onClick={() => {captureScreenshot()}} style={{pointerEvents: (video || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1'}}/>
           </Tooltip>
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={3} sm={3}>
           <Tooltip
            title={<Typography style={{fontSize: '12px',textAlign: 'center'}}>Start Screen Record</Typography>}>
           <VideocamIcon onClick={() => {captureScreenRecord()}}  style={{pointerEvents: (image!='' || fileName) ? 'none' : 'all', opacity: (image || fileName) ? '0.5' : '1'}} />
           </Tooltip>
           </Grid>
           <Grid item xs={1} sm={1} />
           <Grid item xs={2} sm={2} >
           <input
                style={{ display: 'none', pointerEvents: (image!='' || video) ? 'none' : 'all', opacity: (image || video) ? '0.5' : '1' }}
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
           <AttachFileIcon style={{ pointerEvents: (image!='' || video) ? 'none' : 'all', opacity: (image!='' || video) ? '0.5' : '1'}}/>
           </Tooltip>
           </label>
           </Grid>
           {/* <img style={{width: '100vw', height: '100vh', margin: '15px', borderStyle: 'solid', borderWidth: '5px', borderColor: 'black'}} src={image} alt={"ScreenShot"} /> */}

           {/* {fileMedia ? fileName : fileName ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''} */}
           {fileName ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : fileName : '' }
           <Grid item xs={12} sm={12} style={{width: '100%'}}>
           {/* { imgMedia? <img width={300} src={image} alt={"ScreenShot"} /> : image ? loading ?  (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''} */}
           {  image ?  loading ?  (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>)  :  video ? '' : <img width={300} src={image} alt={"ScreenShot"} />  : ''}
           {/*  */}
           </Grid>
           <Grid item xs={12} sm={12} >
           <video id='videoRecord' style={{maxHeight: '0px', maxWidth: '0px'}} src={mediaBlobUrl} controls autoPlay muted loop /> 
           {/* {videoMedia ? <video style={{maxHeight: '300px', maxWidth: '300px'}} src={mediaBlobUrl} controls autoPlay muted loop /> : mediaBlobUrl ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>) : '' : ''} */}
           {video  ? loading ? (<> <Container className='loaderStyle'><CircularProgress /> </Container> </>): image ? ''  : <video style={{maxHeight: '300px', maxWidth: '300px'}} src={mediaBlobUrl} controls autoPlay muted loop /> : ''}
           {/*  */}
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
           <Button disabled={loading} variant="outlined" onClick={handleSendFeedback}>Send Feedback</Button>
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
          setFinalRating(newValue)
          // console.log(newValue);
          }
        }}
      />
      </Grid>
      <Grid item xs={12} sm={12}>
      { (finalRating > 0 && finalRating < 3) ?  bugReportForm() : (finalRating> 2 && finalRating < 6) ? <SuccessPage /> : ''}
      </Grid>
      </div>
      </Grid>
        </>
    )
}
  const feedbackMenu = () => {
    return (
      <>
            <div style={{display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px'}}>
              <Button style={{ margin: '10px 0px 10px 0px'  }} onClick={() => {setBugReportPage(true)}} >
            <Grid container>
              <Grid item xs={3} sm={3}>
              <BugReportIcon style={{fontSize: '38px'}} />
              </Grid>
              <Grid item xs={8} sm={8} >
              <Grid container>
              <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'left'}}>
              <Typography style={{fontSize: '20px', fontStyle: 'bold'}}>
               Report a Bug 
              </Typography>
              </Grid>
              <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'left'}}>
              <Typography style={{fontSize: '14px', textTransform: 'none'}}>
               let us know what's broken
              </Typography>
              </Grid>
              </Grid>
              </Grid>
              </Grid>
            </Button>
              </div>
          <div style={{display: 'flex', justifyContent: 'center',  border: 'none', backgroundColor: 'white', padding: '0px', margin: '0px'}}>
              <Button onClick={(event) => { setFeedbackPage(true)}}>
            <Grid container>
              <Grid item xs={3} sm={3}>
              <FormatListBulletedIcon style={{fontSize: '38px'}}/>
              </Grid>
              <Grid item xs={8} sm={8} >
              <Grid container>
              <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'left'}}>
              <Typography style={{fontSize: '20px', fontStyle: 'bold'}}>
               Feedback 
              </Typography>
              </Grid>
              <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'left'}}>
              <Typography style={{fontSize: '14px', textTransform: 'none'}}>
               Give general feedback of the page 
              </Typography>
              </Grid>
              </Grid>
              </Grid>
              </Grid>
            </Button>
              </div>
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
          id='dialogfeedback'
          disableBackdropClick={true}
        //   maxWidth='xs'
        >
          <DialogTitle
            id='form-dialog-title'
            style={{ textAlign: 'center', padding: '20px 0px 0px 0px' }}
          >
            <Typography style={{ fontSize: '24px' }}>
              GigaTester
            </Typography>
          </DialogTitle>
          <DialogContent style={{ marginBottom: '20px', padding: '10px' }}>
            <CssBaseline />
            <CancelIcon  style={{position: 'absolute', top: '0px', right: '0px' }}onClick={() => {closeDialog()}}/>
            {dataSubmitted ?  <SuccessPage /> : feedbackPage ? feedbackRating() : bugReportPage ? bugReportForm() : feedbackMenu() }
            {/* {verifyEmail ? signUpAcknowledgement() : signUpForm()} */}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
  return (
      <>
          <StylesProvider injectFirst>
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
    </StylesProvider>
    </>
  );
};
export default FeedbackButtonComponent;
