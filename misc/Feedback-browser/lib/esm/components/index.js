var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from 'html2canvas';
import CanvasDraw from "react-canvas-draw";
import { v1 as uuidv1 } from 'uuid';
import BugReportIcon from '@material-ui/icons/BugReport';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
var useStyles = makeStyles(function (theme) { return ({
    button: {
        margin: theme.spacing(2),
        "&:hover": { background: "#366afb" },
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
}); });
var FeedbackButtonComponent = function (props) {
    var saveCanvas;
    var apiHostUrl;
    var classes = useStyles();
    var _a = useState(false), dialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = useState(false), feedbackPage = _b[0], setFeedbackPage = _b[1];
    var _c = useState(0), rating = _c[0], setRating = _c[1];
    var _d = useState(''), image = _d[0], setImage = _d[1];
    var _e = useState(false), dialogHidden = _e[0], setDialogHidden = _e[1];
    var _f = useState(''), fileSelected = _f[0], setFileSelected = _f[1];
    var _g = useState(''), fileName = _g[0], setFileName = _g[1];
    var _h = useState(''), uploadScreenshot = _h[0], setUploadScreenshot = _h[1];
    var _j = useState(false), fileSubmitted = _j[0], setFileSubmitted = _j[1];
    var _k = useState(''), feedbackComments = _k[0], setFeedbackComments = _k[1];
    var _l = useState(''), imgMedia = _l[0], setImgMedia = _l[1];
    var _m = useState(''), videoMedia = _m[0], setVideoMedia = _m[1];
    var _o = useState(''), fileMedia = _o[0], setFileMedia = _o[1];
    var _p = useState(false), images = _p[0], setImages = _p[1];
    var _q = useState(''), video = _q[0], setVideo = _q[1];
    var _r = useState(false), imageRecording = _r[0], setImageRecording = _r[1];
    var _s = useState(false), loading = _s[0], setLoading = _s[1];
    var _t = useState(0), finalRating = _t[0], setFinalRating = _t[1];
    var _u = useState(false), bugReportPage = _u[0], setBugReportPage = _u[1];
    var _v = useState(false), dataSubmitted = _v[0], setDataSubmitted = _v[1];
    var env = process.env.REACT_APP_STAGE;
    if (env === 'Dev') {
        apiHostUrl = 'https://qe1lgcnkwh.execute-api.us-east-1.amazonaws.com/development';
    }
    else if (env === 'Beta') {
        apiHostUrl = 'https://qe1lgcnkwh.execute-api.us-east-1.amazonaws.com/development';
    }
    else if (env === 'qa') {
        apiHostUrl = 'https://qe1lgcnkwh.execute-api.us-east-1.amazonaws.com/development';
    }
    else if (env === 'Prod') {
        apiHostUrl = 'https://qe1lgcnkwh.execute-api.us-east-1.amazonaws.com/development';
    }
    else {
        apiHostUrl = 'http://localhost:3000';
    }
    var _w = useReactMediaRecorder({ screen: true, blobPropertyBag: { type: "video/mp4" } }), status = _w.status, startRecording = _w.startRecording, stopRecording = _w.stopRecording, mediaBlobUrl = _w.mediaBlobUrl, clearBlobUrl = _w.clearBlobUrl;
    var closeDialog = function () {
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
        setImageRecording(false);
    };
    var handleUploadButton = function () {
        setDialogOpen(true);
    };
    var uploadFile = function () {
        if (fileSelected) {
            console.log('upload file triggered');
            setLoading(true);
            var formUpload = new FormData();
            formUpload.append('file', fileSelected);
            formUpload.append('fileName', fileSelected.name);
            // console.log(fileSelected, 'file');
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                var base64String = String(reader_1.result).split('base64,')[1];
                var dataInfo = {
                    file: base64String,
                    fileName: fileSelected.name,
                };
                // console.log(JSON.stringify(dataInfo),'datainfo');
                fileSelected &&
                    fetch("".concat(apiHostUrl, "/feedbackMedia/"), {
                        method: 'POST',
                        body: JSON.stringify(dataInfo),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                        setLoading(false);
                        // console.log('Success:', data);
                        if (data.Key.slice(0, 6) === 'gt_img') {
                            // console.log(data.Key, "img");
                            setImgMedia(data.Location);
                        }
                        else if (data.Key.slice(0, 8) === 'gt_video') {
                            // console.log(data.Key, "vid");
                            setVideoMedia(data.Location);
                        }
                        else {
                            // console.log(data.Key, "file");
                            setFileMedia(data.Location);
                        }
                    });
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
            if (fileSelected) {
                reader_1.readAsDataURL(fileSelected);
            }
            setFileSelected('');
        }
    };
    useEffect(function () {
        if (imgMedia || videoMedia || fileMedia) {
            setFileSubmitted(true);
        }
    }, [imgMedia, videoMedia, fileMedia]);
    useEffect(function () {
        if (mediaBlobUrl) {
            setVideo(mediaBlobUrl);
            if (!imageRecording) {
                setDialogHidden(false);
            }
        }
    }, [mediaBlobUrl]);
    var finalScreenshot = function () {
        clearBlobUrl();
        setVideo('');
        var node = document.getElementById('canvasScreenshot');
        // console.log(document.getElementById('canvasScreenshot'), 'ref')
        if (!node) {
            throw new Error('You should provide correct html node.');
        }
        return html2canvas(node, { scrollX: 0,
            scrollY: 0 })
            .then(function (canvas) {
            var croppedCanvas = document.createElement('canvas');
            var croppedCanvasContext = croppedCanvas.getContext('2d');
            console.log(croppedCanvasContext, '2d');
            // init data
            var cropPositionTop = 0;
            var cropPositionLeft = 0;
            var cropWidth = window.innerWidth;
            var cropHeight = window.innerHeight;
            croppedCanvas.width = cropWidth;
            croppedCanvas.height = cropHeight;
            if (croppedCanvasContext) {
                croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);
            }
            var base64Image = canvas.toDataURL();
            setImage(base64Image);
            setUploadScreenshot(base64Image);
            return base64Image;
        });
    };
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
    useEffect(function () {
        // console.log(mediaBlobUrl, 'mediabloburl')
        var videoPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mediaBlobUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(mediaBlobUrl)
                                .then(function (r) { return r.blob(); }).then(function (blobFile) { return new File([blobFile], "gt_video_".concat(uuidv1(), ".mp4"), { type: 'video/mp4' }); })];
                    case 1:
                        myFile = _a.sent();
                        // console.log(myFile, 'videofile');
                        // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
                        setFileSelected(myFile);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        videoPlay();
    }, [mediaBlobUrl]);
    useEffect(function () {
        var uploadScreenshotImg = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uploadScreenshot) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(uploadScreenshot)
                                .then(function (r) { return r.blob(); }).then(function (blobFile) { return new File([blobFile], "gt_img_".concat(uuidv1(), ".png"), { type: 'image/png' }); })];
                    case 1:
                        myFile = _a.sent();
                        // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
                        setFileSelected(myFile);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        uploadScreenshotImg();
    }, [uploadScreenshot]);
    var captureScreenshot = function () {
        setDialogHidden(true);
        setTimeout(function () {
            startRecording();
        }, 500);
        setImageRecording(true);
    };
    var captureScreenRecord = function () {
        setDialogHidden(true);
        setTimeout(function () {
            startRecording();
        }, 500);
    };
    useEffect(function () {
        if (status === 'recording' && imageRecording) {
            setTimeout(function () {
                stopRecording();
                setTimeout(function () {
                    screenshotVideo();
                }, 1000);
            }, 500);
        }
    }, [status]);
    var fileUpload = function (event) {
        event.preventDefault();
        setFileSelected(event.target.files[0]);
        setFileName(event.target.files[0].name);
        // setFileContentType(event.target.files[0].type);
    };
    var handleComments = function (event) {
        setFeedbackComments(event.target.value);
    };
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
    var screenshotVideo = function () {
        var video = document.getElementById('videoRecord');
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        if (video && context) {
            context.drawImage(video, 0, 0);
            var frame = canvas.toDataURL("image/png");
            setImage(frame);
        }
        setImages(true);
    };
    useEffect(function () {
        if (fileSubmitted) {
            console.log('file Submitted');
            var postData = {
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
            };
            fetch("".concat(apiHostUrl, "/feedback/"), {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                setDataSubmitted(true);
                setFinalRating(0);
                setLoading(false);
                console.log(data);
                setFileSubmitted(false);
                setTimeout(function () { closeDialog(); }, 3000);
            });
        }
    }, [fileSubmitted]);
    var SuccessPage = function () {
        // console.log(finalRating)
        if (finalRating > 0 && finalRating < 6) {
            setFileSubmitted(true);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { justifyContent: 'center', display: 'flex', padding: '20px' } }, dataSubmitted ? React.createElement(Typography, null, "Thanks for Submitting Feedback") : (React.createElement(React.Fragment, null,
                " ",
                React.createElement(Container, { className: 'loaderStyle' },
                    React.createElement(CircularProgress, null),
                    " "),
                " ")))));
    };
    var handleSendFeedback = function () {
        if (fileSelected || image || mediaBlobUrl) {
            uploadFile();
        }
        else {
            setFileSubmitted(true);
        }
    };
    var ScreenshotImage = function () {
        // console.log(saveCanvas,"saveCanvas")
        return (React.createElement("div", { style: { display: 'flex', zIndex: 1, position: 'fixed', height: '100vh', width: '100vw' } },
            React.createElement(Grid, { container: true },
                React.createElement(Grid, { item: true, xs: 12, sm: 12 },
                    React.createElement("div", { id: "canvasScreenshot" },
                        React.createElement(CanvasDraw, { ref: function (canvasDraw) { return (saveCanvas = (canvasDraw)); }, brushColor: 'red', brushRadius: 3, hideGrid: true, imgSrc: image, canvasHeight: window.screen.height, canvasWidth: window.screen.width })),
                    React.createElement("div", { style: { position: 'fixed', borderStyle: 'solid', borderWidth: '2px', borderColor: 'red', backgroundColor: 'white', bottom: '20px', left: '40vw' } },
                        React.createElement(Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                saveCanvas.undo();
                            } }, "Undo"),
                        React.createElement(Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                saveCanvas.clear();
                            } }, "Clear"),
                        React.createElement(Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                finalScreenshot();
                                setImages(false);
                                setDialogHidden(false);
                            } }, "Next"),
                        React.createElement(Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                setImage('');
                                setImages(false);
                                setDialogHidden(false);
                            } }, "Close"))))));
    };
    var textComment = function () {
        return (React.createElement(TextField, { style: { padding: '10px', width: '100%' }, multiline: true, id: "outlined-multiline-static", value: feedbackComments || '', onChange: function (event) { handleComments(event); }, rows: 4, label: "Provide your Comments", variant: "outlined" }));
    };
    var bugReportForm = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Grid, { container: true },
                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } }, textComment()),
                React.createElement(Grid, { item: true, xs: 1, sm: 1 }),
                React.createElement(Grid, { item: true, xs: 3, sm: 3 },
                    React.createElement(Tooltip, { title: React.createElement(Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Capture Screenshot") },
                        React.createElement(AspectRatioIcon, { onClick: function () { captureScreenshot(); }, style: { pointerEvents: (video || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1' } }))),
                React.createElement(Grid, { item: true, xs: 1, sm: 1 }),
                React.createElement(Grid, { item: true, xs: 3, sm: 3 },
                    React.createElement(Tooltip, { title: React.createElement(Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Start Screen Record") },
                        React.createElement(VideocamIcon, { onClick: function () { captureScreenRecord(); }, style: { pointerEvents: (image != '' || fileName) ? 'none' : 'all', opacity: (image || fileName) ? '0.5' : '1' } }))),
                React.createElement(Grid, { item: true, xs: 1, sm: 1 }),
                React.createElement(Grid, { item: true, xs: 2, sm: 2 },
                    React.createElement("input", { style: { display: 'none', pointerEvents: (image != '' || video) ? 'none' : 'all', opacity: (image || video) ? '0.5' : '1' }, id: 'upload-file', multiple: true, type: 'file', onChange: function (event) { return fileUpload(event); } }),
                    React.createElement("label", { htmlFor: 'upload-file', style: { fontSize: '14px', color: 'black' } },
                        React.createElement(Tooltip, { title: React.createElement(Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Attach File") },
                            React.createElement(AttachFileIcon, { style: { pointerEvents: (image != '' || video) ? 'none' : 'all', opacity: (image != '' || video) ? '0.5' : '1' } })))),
                fileName ? loading ? (React.createElement(React.Fragment, null,
                    " ",
                    React.createElement(Container, { className: 'loaderStyle' },
                        React.createElement(CircularProgress, null),
                        " "),
                    " ")) : fileName : '',
                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { width: '100%' } }, image ? loading ? (React.createElement(React.Fragment, null,
                    " ",
                    React.createElement(Container, { className: 'loaderStyle' },
                        React.createElement(CircularProgress, null),
                        " "),
                    " ")) : video ? '' : React.createElement("img", { width: 300, src: image, alt: "ScreenShot" }) : ''),
                React.createElement(Grid, { item: true, xs: 12, sm: 12 },
                    React.createElement("video", { id: 'videoRecord', style: { maxHeight: '0px', maxWidth: '0px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true, loop: true }),
                    video ? loading ? (React.createElement(React.Fragment, null,
                        " ",
                        React.createElement(Container, { className: 'loaderStyle' },
                            React.createElement(CircularProgress, null),
                            " "),
                        " ")) : image ? '' : React.createElement("video", { style: { maxHeight: '300px', maxWidth: '300px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true, loop: true }) : ''),
                React.createElement(Grid, { item: true, xs: 12, sm: 12 },
                    React.createElement(Button, { disabled: loading, variant: "outlined", onClick: handleSendFeedback }, "Send Feedback")))));
    };
    var feedbackRating = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Grid, { container: true },
                React.createElement("div", { style: { minHeight: '100px', minWidth: '200px', fontSize: '30px', paddingTop: '20px', justifyContent: 'center' } },
                    React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                        React.createElement(Typography, null, "Tell us about your experience")),
                    React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                        React.createElement(Rating, { name: 'size-large', value: rating, style: { marginLeft: '2px' }, onChange: function (event, newValue) {
                                if (newValue) {
                                    setRating(newValue);
                                    setFinalRating(newValue);
                                    console.log(event);
                                    // console.log(newValue);
                                }
                            } })),
                    React.createElement(Grid, { item: true, xs: 12, sm: 12 }, (finalRating > 0 && finalRating < 3) ? bugReportForm() : (finalRating > 2 && finalRating < 6) ? React.createElement(SuccessPage, null) : '')))));
    };
    var feedbackMenu = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px' } },
                React.createElement(Button, { style: { margin: '10px 0px 10px 0px' }, onClick: function () { setBugReportPage(true); } },
                    React.createElement(Grid, { container: true },
                        React.createElement(Grid, { item: true, xs: 3, sm: 3 },
                            React.createElement(BugReportIcon, { style: { fontSize: '38px' } })),
                        React.createElement(Grid, { item: true, xs: 8, sm: 8 },
                            React.createElement(Grid, { container: true },
                                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    React.createElement(Typography, { style: { fontSize: '20px', fontStyle: 'bold' } }, "Report a Bug")),
                                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    React.createElement(Typography, { style: { fontSize: '14px', textTransform: 'none' } }, "let us know what's broken"))))))),
            React.createElement("div", { style: { display: 'flex', justifyContent: 'center', border: 'none', backgroundColor: 'white', padding: '0px', margin: '0px' } },
                React.createElement(Button, { onClick: function () { setFeedbackPage(true); } },
                    React.createElement(Grid, { container: true },
                        React.createElement(Grid, { item: true, xs: 3, sm: 3 },
                            React.createElement(FormatListBulletedIcon, { style: { fontSize: '38px' } })),
                        React.createElement(Grid, { item: true, xs: 8, sm: 8 },
                            React.createElement(Grid, { container: true },
                                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    React.createElement(Typography, { style: { fontSize: '20px', fontStyle: 'bold' } }, "Feedback")),
                                React.createElement(Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    React.createElement(Typography, { style: { fontSize: '14px', textTransform: 'none' } }, "Give general feedback of the page")))))))));
    };
    var handleDialogUpload = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Dialog, { className: classes.dialogPaper, open: dialogOpen, hidden: dialogHidden, "aria-labelledby": 'form-dialog-title', onClose: closeDialog, id: 'dialogfeedback', disableBackdropClick: true },
                React.createElement(DialogTitle, { id: 'form-dialog-title', style: { textAlign: 'center', padding: '20px 0px 0px 0px' } },
                    React.createElement(Typography, { style: { fontSize: '24px' } }, "GigaTester")),
                React.createElement(DialogContent, { style: { marginBottom: '20px', padding: '10px' } },
                    React.createElement(CssBaseline, null),
                    React.createElement(CancelIcon, { style: { position: 'absolute', top: '0px', right: '0px' }, onClick: function () { closeDialog(); } }),
                    dataSubmitted ? React.createElement(SuccessPage, null) : feedbackPage ? feedbackRating() : bugReportPage ? bugReportForm() : feedbackMenu()))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(StylesProvider, { injectFirst: true }, images ? React.createElement(ScreenshotImage, null) : dialogOpen ? (handleDialogUpload()) : (React.createElement("div", { style: { display: 'flex', zIndex: 1, transform: 'rotate(270deg)', position: 'fixed', bottom: '50vh', right: '-50px' } },
            React.createElement(Button, { onClick: handleUploadButton, variant: 'contained', size: 'large', color: 'primary', className: classes.button }, props.label))))));
};
export default FeedbackButtonComponent;
