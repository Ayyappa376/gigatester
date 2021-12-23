import React, {useState, createRef} from 'react';
import { Button, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, Link, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from 'html2canvas';
import CanvasDraw from "react-canvas-draw";
import './styles.css';
import BugReportIcon from '@material-ui/icons/BugReport';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { ReactMediaRecorder } from "react-media-recorder";
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
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedbackPage, setFeedbackPage] = useState(false);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState('');
  const [saveableCanvas, setSaveableCanvas] = useState<any>('');
  const [fileName, setFileName] = useState('');
  const[bugReportPage, setBugReportPage] = useState(false);
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
          return base64Image
        })
  }

  const captureScreenshot = () => {
    setTimeout(()=> {
      takeScreenshot();
    }, 1000)
  }

  const fileUpload = (event: any) => {
    setFileName(event.target.files[0].name);
    console.log(fileName);
  }
  const ScreenshotImage = () => {

    console.log(saveCanvas,"saveCanvas")
    return(
      <div style={{display: 'flex', zIndex: 1,  position: 'fixed', height: '80vh', width: '100vw'}}>
      <Grid container>
      <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
      <CanvasDraw  ref={canvasDraw => (saveCanvas = (canvasDraw))}  brushColor='red' enablePanAndZoom={true} brushRadius={3} hideGrid={true} imgSrc={image} style={{display: 'flex', width: '65rem', height: '35rem', margin: '15px', borderStyle: 'solid', borderWidth: '5px', borderColor: 'black'}}/>
      {/* <img style={{width: '90vw', height: '80vh', margin: '15px', borderStyle: 'solid', borderWidth: '5px', borderColor: 'black'}} src={image} alt={"ScreenShot"} /> */}
      
      <div style={{position: 'fixed', borderStyle: 'solid', borderWidth: '2px',borderColor: 'red', backgroundColor: 'white', bottom: '20px', left: '40vw'}}>
      <Button variant='outlined'  style={{margin: '10px', backgroundColor: 'white'}} onClick={() => {
              saveCanvas.undo();
            }}>Undo</Button>
      <Button variant='outlined' style={{margin: '10px', backgroundColor: 'white'}}  onClick={() => {
              saveCanvas.clear();
            }} >Clear</Button>
      <Button variant='outlined' style={{margin: '10px', backgroundColor: 'white'}}   onClick={() => {
              closeDialog();
            }} >Close</Button>
      </div>
      </Grid>
      </Grid>
      </div>
    )
  }
  const BugReportForm = () => {
    const {
      status,
      startRecording,
      stopRecording,
      mediaBlobUrl,
    } = useReactMediaRecorder({ screen: true });
      return (
          <>
          <Grid container>
          <Grid item xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
          <TextField style={{padding:'10px', width: '100%'}}   multiline
           id="outlined-multiline-static" rows={4} label="Provide your Comments" variant="outlined" />
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
           {fileName}
           <Grid item xs={12} sm={12} style={{width: '100%'}}>
           {image ? <img width={300} src={image} alt={"ScreenShot"} /> : ''}
           </Grid>
           <Grid item xs={12} sm={12} >
           {mediaBlobUrl ? <video style={{maxHeight: '300px', maxWidth: '300px'}} src={mediaBlobUrl} controls autoPlay loop /> : ''}
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
           <Button variant="outlined" >Send Feedback</Button>
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
      { (rating > 0 && rating < 3) ? <BugReportForm /> : ''}
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
    // image ? <ScreenshotImage /> :
    return (
      <React.Fragment>
        <Dialog
          className={classes.dialogPaper}
          open={dialogOpen}
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
    { dialogOpen ? (
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
