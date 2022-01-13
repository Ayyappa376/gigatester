"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Mic_1 = __importDefault(require("@material-ui/icons/Mic"));
var styles_2 = require("@material-ui/core/styles");
var AspectRatio_1 = __importDefault(require("@material-ui/icons/AspectRatio"));
var AttachFile_1 = __importDefault(require("@material-ui/icons/AttachFile"));
var Videocam_1 = __importDefault(require("@material-ui/icons/Videocam"));
var SettingsVoice_1 = __importDefault(require("@material-ui/icons/SettingsVoice"));
var react_media_recorder_1 = require("react-media-recorder");
var html2canvas_1 = __importDefault(require("html2canvas"));
var react_canvas_draw_1 = __importDefault(require("react-canvas-draw"));
require("./styles.css");
var uuid_1 = require("uuid");
var BugReport_1 = __importDefault(require("@material-ui/icons/BugReport"));
var Cancel_1 = __importDefault(require("@material-ui/icons/Cancel"));
var Rating_1 = __importDefault(require("@material-ui/lab/Rating"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var FormatListBulleted_1 = __importDefault(require("@material-ui/icons/FormatListBulleted"));
var useStyles = (0, styles_2.makeStyles)(function (theme) { return ({
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
    var _a = (0, react_1.useState)(false), dialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = (0, react_1.useState)(false), feedbackPage = _b[0], setFeedbackPage = _b[1];
    var _c = (0, react_1.useState)(0), rating = _c[0], setRating = _c[1];
    var _d = (0, react_1.useState)(''), image = _d[0], setImage = _d[1];
    var _e = (0, react_1.useState)(false), dialogHidden = _e[0], setDialogHidden = _e[1];
    var _f = (0, react_1.useState)(''), fileContentType = _f[0], setFileContentType = _f[1];
    var _g = (0, react_1.useState)(''), fileSelected = _g[0], setFileSelected = _g[1];
    var _h = (0, react_1.useState)(''), fileName = _h[0], setFileName = _h[1];
    var _j = (0, react_1.useState)(''), uploadScreenshot = _j[0], setUploadScreenshot = _j[1];
    // const [saveableCanvas, setSaveableCanvas] = useState<any>('');
    var _k = (0, react_1.useState)(false), fileSubmitted = _k[0], setFileSubmitted = _k[1];
    var _l = (0, react_1.useState)(''), feedbackComments = _l[0], setFeedbackComments = _l[1];
    var _m = (0, react_1.useState)(''), imgMedia = _m[0], setImgMedia = _m[1];
    var _o = (0, react_1.useState)(''), videoMedia = _o[0], setVideoMedia = _o[1];
    var _p = (0, react_1.useState)(''), fileMedia = _p[0], setFileMedia = _p[1];
    var _q = (0, react_1.useState)(''), audioMedia = _q[0], setAudioMedia = _q[1];
    var _r = (0, react_1.useState)(false), images = _r[0], setImages = _r[1];
    var _s = (0, react_1.useState)(''), video = _s[0], setVideo = _s[1];
    var _t = (0, react_1.useState)(''), audio = _t[0], setAudio = _t[1];
    var _u = (0, react_1.useState)({}), mediaRecordMode = _u[0], setMediaRecordMode = _u[1];
    var _v = (0, react_1.useState)(false), imageRecording = _v[0], setImageRecording = _v[1];
    var _w = (0, react_1.useState)(false), audioRecording = _w[0], setAudioRecording = _w[1];
    var _x = (0, react_1.useState)(false), loading = _x[0], setLoading = _x[1];
    var _y = (0, react_1.useState)(false), micAnimation = _y[0], setMicAnimation = _y[1];
    var _z = (0, react_1.useState)(0), finalRating = _z[0], setFinalRating = _z[1];
    var _0 = (0, react_1.useState)(false), bugReportPage = _0[0], setBugReportPage = _0[1];
    var _1 = (0, react_1.useState)(false), dataSubmitted = _1[0], setDataSubmitted = _1[1];
    var _2 = (0, react_1.useState)([]), feedbackCategories = _2[0], setFeedbackCategories = _2[1];
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
    // const categories = ['app got crashed', 'error in img loading', 'video error', 'audio error']
    var temp_categories = [];
    var _3 = (0, react_media_recorder_1.useReactMediaRecorder)(mediaRecordMode), status = _3.status, startRecording = _3.startRecording, stopRecording = _3.stopRecording, mediaBlobUrl = _3.mediaBlobUrl, clearBlobUrl = _3.clearBlobUrl;
    var closeDialog = function () {
        setDialogOpen(false);
        setFeedbackPage(false);
        setBugReportPage(false);
        setRating(0);
        setImage('');
        setVideo('');
        setAudio('');
        setFileName('');
        setFileSelected('');
        setDataSubmitted(false);
        setFeedbackComments('');
        setFinalRating(0);
        setImgMedia('');
        setVideoMedia('');
        setFileMedia('');
        setImageRecording(false);
        stopRecording();
        setFeedbackCategories('');
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
                        else if (data.Key.slice(0, 8) === 'gt_audio') {
                            // console.log(data.Key, "vid");
                            setAudioMedia(data.Location);
                        }
                        else {
                            // console.log(data.Key, "file");
                            setFileMedia(data.Location);
                        }
                    });
            };
            if (fileSelected) {
                reader_1.readAsDataURL(fileSelected);
            }
            setFileSelected('');
        }
    };
    (0, react_1.useEffect)(function () {
        if (imgMedia || videoMedia || audioMedia || fileMedia) {
            setFileSubmitted(true);
        }
    }, [imgMedia, videoMedia, fileMedia, audioMedia]);
    (0, react_1.useEffect)(function () {
        if (mediaBlobUrl) {
            if (audioRecording) {
                setAudioRecording(false);
                setAudio(mediaBlobUrl);
                console.log(mediaBlobUrl, 'audioblob');
            }
            else {
                setVideo(mediaBlobUrl);
            }
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
        return (0, html2canvas_1.default)(node, { scrollX: 0,
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
    (0, react_1.useEffect)(function () {
        // console.log(mediaBlobUrl, 'mediabloburl')
        var videoPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mediaBlobUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(mediaBlobUrl)
                                .then(function (r) { return r.blob(); }).then(function (blobFile) { return new File([blobFile], "gt_video_".concat((0, uuid_1.v1)(), ".mp4"), { type: 'video/mp4' }); })];
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
        var audioPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mediaBlobUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(mediaBlobUrl)
                                .then(function (r) { return r.blob(); }).then(function (blobFile) { return new File([blobFile], "gt_audio_".concat((0, uuid_1.v1)(), ".wav"), { type: 'audio/wav' }); })];
                    case 1:
                        myFile = _a.sent();
                        // console.log(myFile, 'videofile');
                        // const myFile = new File([mediaBlobUrl], "demo.mp4", { type: 'video/mp4' });
                        setFileSelected(myFile);
                        console.log('audio play');
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        if (audioRecording) {
            audioPlay();
        }
        else {
            videoPlay();
        }
    }, [mediaBlobUrl]);
    (0, react_1.useEffect)(function () {
        var uploadScreenshotImg = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uploadScreenshot) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(uploadScreenshot)
                                .then(function (r) { return r.blob(); }).then(function (blobFile) { return new File([blobFile], "gt_img_".concat((0, uuid_1.v1)(), ".png"), { type: 'image/png' }); })];
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
        setMediaRecordMode({ screen: true, blobPropertyBag: { type: "video/mp4" } });
        setDialogHidden(true);
        setTimeout(function () {
            startRecording();
        }, 500);
        setImageRecording(true);
    };
    var captureScreenRecord = function () {
        setMediaRecordMode({ screen: true, blobPropertyBag: { type: "video/mp4" } });
        setDialogHidden(true);
        setTimeout(function () {
            startRecording();
        }, 500);
    };
    var captureAudio = function () {
        setMediaRecordMode({ audio: true, blobPropertyBag: { type: "audio/wav" } });
        // setDialogHidden(true);
        setAudioRecording(true);
        setTimeout(function () {
            startRecording();
        }, 500);
    };
    (0, react_1.useEffect)(function () {
        if (status === 'recording' && imageRecording) {
            setTimeout(function () {
                stopRecording();
                setTimeout(function () {
                    screenshotVideo();
                }, 5000);
            }, 500);
        }
        // if(status === 'recording' && audioRecording){
        //   setTimeout(()=> {
        //     stopRecording();
        //   },5000)
        // }
        console.log(status);
    }, [status]);
    var fileUpload = function (event) {
        event.preventDefault();
        setFileSelected(event.target.files[0]);
        setFileName(event.target.files[0].name);
        setFileContentType(event.target.files[0].type);
        console.log(fileContentType);
    };
    var handleComments = function (event) {
        // let temp: any = feedbackComments;
        // temp = event.target.value;
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
    (0, react_1.useEffect)(function () {
        if (fileSubmitted) {
            console.log(temp_categories);
            console.log('file Submitted');
            var postData = {
                productRating: finalRating,
                userName: props.userName,
                productVersion: props.productVersion,
                feedbackMedia: {
                    image: imgMedia,
                    video: videoMedia,
                    file: fileMedia,
                    audio: audioMedia
                },
                feedbackComments: [__spreadArray([], feedbackCategories, true), feedbackComments],
                productKey: props.productKey,
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
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { justifyContent: 'center', display: 'flex', padding: '20px' } }, dataSubmitted ? react_1.default.createElement(core_1.Typography, null, "Thanks for Submitting Feedback") : (react_1.default.createElement(react_1.default.Fragment, null,
                " ",
                react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                    react_1.default.createElement(CircularProgress_1.default, null),
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
        return (react_1.default.createElement("div", { style: { display: 'flex', zIndex: 1, position: 'fixed', height: '100vh', width: '100vw' } },
            react_1.default.createElement(core_1.Grid, { container: true },
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 },
                    react_1.default.createElement("div", { id: "canvasScreenshot" },
                        react_1.default.createElement(react_canvas_draw_1.default, { ref: function (canvasDraw) { return (saveCanvas = (canvasDraw)); }, brushColor: 'red', brushRadius: 3, hideGrid: true, imgSrc: image, canvasHeight: window.screen.height, canvasWidth: window.screen.width })),
                    react_1.default.createElement("div", { style: { position: 'fixed', borderStyle: 'solid', borderWidth: '2px', borderColor: 'red', backgroundColor: 'white', bottom: '20px', left: '40vw' } },
                        react_1.default.createElement(core_1.Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                saveCanvas.undo();
                            } }, "Undo"),
                        react_1.default.createElement(core_1.Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                saveCanvas.clear();
                            } }, "Clear"),
                        react_1.default.createElement(core_1.Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                finalScreenshot();
                                setImages(false);
                                setDialogHidden(false);
                            } }, "Next"),
                        react_1.default.createElement(core_1.Button, { variant: 'outlined', style: { margin: '10px', backgroundColor: 'white' }, onClick: function () {
                                setImage('');
                                setImages(false);
                                setDialogHidden(false);
                            } }, "Close"))))));
    };
    var handleChecked = function (id, category) { return function (e) {
        var checked = e.target.checked;
        if (checked) {
            feedbackCategories[id] = category;
        }
        else {
            feedbackCategories[id] = '';
        }
        console.log(feedbackCategories, 'categories');
        // setFeedbackComments((values) => (feedbackComments[]));
    }; };
    var textComment = function () {
        return (react_1.default.createElement(core_1.TextField, { style: { padding: '10px', width: '100%' }, multiline: true, id: "outlined-multiline-static", value: feedbackComments || '', onChange: function (event) { handleComments(event); }, rows: 4, label: "Provide your Comments", variant: "outlined" }));
    };
    if (audioRecording) {
        setTimeout(function () {
            setMicAnimation(function (prevmicAnimation) { return (!prevmicAnimation); });
            console.log('anime');
        }, 200);
    }
    var bugReportForm = function () {
        return (audioRecording ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Grid, { container: true, style: { display: 'flex', justifyContent: 'center', padding: '10px' } },
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(core_1.Typography, { color: 'error', variant: 'h6' }, "Recording...")),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(core_1.Typography, null, "Click on Mic Icon to Stop Recording")),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(SettingsVoice_1.default, { onClick: stopRecording, style: { fontSize: '60px', margin: '20px', color: (micAnimation) ? 'red' : 'black' } }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Grid, { container: true },
                props.categories.map(function (category, id) {
                    return (react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left', marginLeft: '20px' } },
                        react_1.default.createElement("div", { key: id },
                            react_1.default.createElement(core_1.Typography, { variant: "body1" },
                                react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, { color: "primary", onClick: handleChecked(id, category) }), label: category })))));
                }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } }, textComment()),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Capture Screenshot") },
                        react_1.default.createElement(AspectRatio_1.default, { onClick: function () { captureScreenshot(); }, style: { pointerEvents: (audio || video || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Record voice input") },
                        react_1.default.createElement(Mic_1.default, { onClick: function () { captureAudio(); }, style: { pointerEvents: (video || image != '' || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Start Screen Record") },
                        react_1.default.createElement(Videocam_1.default, { onClick: function () { captureScreenRecord(); }, style: { pointerEvents: (audio || image != '' || fileName) ? 'none' : 'all', opacity: (image || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement("input", { style: { display: 'none', pointerEvents: (image != '' || video || audio) ? 'none' : 'all', opacity: (image || video) ? '0.5' : '1' }, id: 'upload-file', multiple: true, type: 'file', onChange: function (event) { return fileUpload(event); } }),
                    react_1.default.createElement("label", { htmlFor: 'upload-file', style: { fontSize: '14px', color: 'black' } },
                        react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Attach File") },
                            react_1.default.createElement(AttachFile_1.default, { style: { pointerEvents: (image != '' || video || audio) ? 'none' : 'all', opacity: (image != '' || video || audio) ? '0.5' : '1' } })))),
                fileName ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : fileName : '',
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { width: '100%' } }, image ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : video ? '' : react_1.default.createElement("img", { width: 300, src: image, alt: "ScreenShot" }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { width: '100%' } }, audio ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : fileName ? '' : react_1.default.createElement("audio", { src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 },
                    react_1.default.createElement("video", { id: 'videoRecord', style: { maxHeight: '0px', maxWidth: '0px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true }),
                    video ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                        " ",
                        react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                            react_1.default.createElement(CircularProgress_1.default, null),
                            " "),
                        " ")) : image ? '' : react_1.default.createElement("video", { style: { maxHeight: '300px', maxWidth: '300px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true, loop: true }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 },
                    react_1.default.createElement(core_1.Button, { disabled: loading, variant: "outlined", onClick: handleSendFeedback }, "Send Feedback"))))));
    };
    var commentsForm = function () {
        return (audioRecording ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Grid, { container: true, style: { display: 'flex', justifyContent: 'center', padding: '10px' } },
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(core_1.Typography, { color: 'error', variant: 'h6' }, "Recording...")),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(core_1.Typography, null, "Click on Mic Icon to Stop Recording")),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement(SettingsVoice_1.default, { onClick: stopRecording, style: { fontSize: '60px', margin: '20px', color: (micAnimation) ? 'red' : 'black' } }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Grid, { container: true },
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } }, textComment()),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Capture Screenshot") },
                        react_1.default.createElement(AspectRatio_1.default, { onClick: function () { captureScreenshot(); }, style: { pointerEvents: (video || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Record voice input") },
                        react_1.default.createElement(Mic_1.default, { onClick: function () { captureAudio(); }, style: { pointerEvents: (video || fileName) ? 'none' : 'all', opacity: (video || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Start Screen Record") },
                        react_1.default.createElement(Videocam_1.default, { onClick: function () { captureScreenRecord(); }, style: { pointerEvents: (image != '' || fileName) ? 'none' : 'all', opacity: (image || fileName) ? '0.5' : '1' } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 1, sm: 1 }),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 2, sm: 2 },
                    react_1.default.createElement("input", { style: { display: 'none', pointerEvents: (image != '' || video) ? 'none' : 'all', opacity: (image || video) ? '0.5' : '1' }, id: 'upload-file', multiple: true, type: 'file', onChange: function (event) { return fileUpload(event); } }),
                    react_1.default.createElement("label", { htmlFor: 'upload-file', style: { fontSize: '14px', color: 'black' } },
                        react_1.default.createElement(core_1.Tooltip, { title: react_1.default.createElement(core_1.Typography, { style: { fontSize: '12px', textAlign: 'center' } }, "Attach File") },
                            react_1.default.createElement(AttachFile_1.default, { style: { pointerEvents: (image != '' || video) ? 'none' : 'all', opacity: (image != '' || video) ? '0.5' : '1' } })))),
                fileName ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : fileName : '',
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { width: '100%' } }, image ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : video ? '' : react_1.default.createElement("img", { width: 300, src: image, alt: "ScreenShot" }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { width: '100%' } }, audio ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                    " ",
                    react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                        react_1.default.createElement(CircularProgress_1.default, null),
                        " "),
                    " ")) : fileName ? '' : react_1.default.createElement("audio", { src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 },
                    react_1.default.createElement("video", { id: 'videoRecord', style: { maxHeight: '0px', maxWidth: '0px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true }),
                    video ? loading ? (react_1.default.createElement(react_1.default.Fragment, null,
                        " ",
                        react_1.default.createElement(core_1.Container, { className: 'loaderStyle' },
                            react_1.default.createElement(CircularProgress_1.default, null),
                            " "),
                        " ")) : image ? '' : react_1.default.createElement("video", { style: { maxHeight: '300px', maxWidth: '300px' }, src: mediaBlobUrl ? mediaBlobUrl : undefined, controls: true, autoPlay: true, muted: true, loop: true }) : ''),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 },
                    react_1.default.createElement(core_1.Button, { disabled: loading, variant: "outlined", onClick: handleSendFeedback }, "Send Feedback"))))));
    };
    var feedbackRating = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Grid, { container: true },
                react_1.default.createElement("div", { style: { minHeight: '100px', minWidth: '200px', fontSize: '30px', paddingTop: '20px', justifyContent: 'center' } },
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                        react_1.default.createElement(core_1.Typography, null, "Tell us about your experience")),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'center' } },
                        react_1.default.createElement(Rating_1.default, { name: 'size-large', value: rating, style: { marginLeft: '2px', fontSize: '20px' }, onChange: function (event, newValue) {
                                if (newValue) {
                                    setRating(newValue);
                                    setFinalRating(newValue);
                                    console.log(event);
                                    // console.log(newValue);
                                }
                            } })),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12 }, (finalRating > 0 && finalRating < 3) ? commentsForm() : (finalRating > 2 && finalRating < 6) ? react_1.default.createElement(SuccessPage, null) : '')))));
    };
    var feedbackMenu = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px' } },
                react_1.default.createElement(core_1.Button, { style: { margin: '10px 0px 10px 0px' }, onClick: function () { setBugReportPage(true); } },
                    react_1.default.createElement(core_1.Grid, { container: true },
                        react_1.default.createElement(core_1.Grid, { item: true, xs: 3, sm: 3 },
                            react_1.default.createElement(BugReport_1.default, { style: { fontSize: '38px' } })),
                        react_1.default.createElement(core_1.Grid, { item: true, xs: 8, sm: 8 },
                            react_1.default.createElement(core_1.Grid, { container: true },
                                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    react_1.default.createElement(core_1.Typography, { style: { fontSize: '20px', fontStyle: 'bold' } }, "Report a Bug")),
                                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    react_1.default.createElement(core_1.Typography, { style: { fontSize: '14px', textTransform: 'none' } }, "let us know what's broken"))))))),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', border: 'none', backgroundColor: 'white', padding: '0px', margin: '0px' } },
                react_1.default.createElement(core_1.Button, { onClick: function () { setFeedbackPage(true); } },
                    react_1.default.createElement(core_1.Grid, { container: true },
                        react_1.default.createElement(core_1.Grid, { item: true, xs: 3, sm: 3 },
                            react_1.default.createElement(FormatListBulleted_1.default, { style: { fontSize: '38px' } })),
                        react_1.default.createElement(core_1.Grid, { item: true, xs: 8, sm: 8 },
                            react_1.default.createElement(core_1.Grid, { container: true },
                                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    react_1.default.createElement(core_1.Typography, { style: { fontSize: '20px', fontStyle: 'bold' } }, "Feedback")),
                                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 12, style: { display: 'flex', justifyContent: 'left' } },
                                    react_1.default.createElement(core_1.Typography, { style: { fontSize: '14px', textTransform: 'none' } }, "Give general feedback of the page")))))))));
    };
    var handleDialogUpload = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Dialog, { className: classes.dialogPaper, open: dialogOpen, hidden: dialogHidden, "aria-labelledby": 'form-dialog-title', onClose: closeDialog, id: 'dialogfeedback', disableBackdropClick: true },
                react_1.default.createElement(core_1.DialogTitle, { id: 'form-dialog-title', style: { textAlign: 'center', padding: '20px 0px 0px 0px' } },
                    react_1.default.createElement(core_1.Typography, { style: { fontSize: '24px' } }, "GigaTester")),
                react_1.default.createElement(core_1.DialogContent, { style: { marginBottom: '20px', padding: '10px' } },
                    react_1.default.createElement(core_1.CssBaseline, null),
                    react_1.default.createElement(Cancel_1.default, { style: { position: 'absolute', top: '0px', right: '0px' }, onClick: function () { closeDialog(); } }),
                    dataSubmitted ? react_1.default.createElement(SuccessPage, null) : feedbackPage ? feedbackRating() : bugReportPage ? bugReportForm() : feedbackMenu()))));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(styles_1.StylesProvider, { injectFirst: true }, images ? react_1.default.createElement(ScreenshotImage, null) : dialogOpen ? (handleDialogUpload()) : (react_1.default.createElement("div", { style: { display: 'flex', zIndex: 1, transform: 'rotate(270deg)', position: 'fixed', bottom: '50vh', right: '-50px' } },
            react_1.default.createElement(core_1.Button, { onClick: handleUploadButton, variant: 'contained', size: 'large', color: 'primary', className: classes.button }, props.label))))));
};
exports.default = FeedbackButtonComponent;
