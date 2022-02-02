import React, { useEffect, useState, Fragment } from 'react';
import {
  Typography,
  makeStyles,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Backdrop,
  Grid,
  TableSortLabel,
  MuiThemeProvider,
  Snackbar,
  SnackbarContent,
  Tooltip,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  CssBaseline,
  ListItemIcon,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import Notification from '../../../common/notification';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { ModalComponent } from '../../modal';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import SearchControl from '../../common/searchControl';
import PageSizeDropDown from '../../common/page-size-dropdown';
import RenderPagination from '../../common/pagination';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import { IProductInfo, IProductParams, ICategory, IFeedbackSettings, 
  FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS, 
  SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_LOW,
  INVOKE_TYPE_MANUAL, INVOKE_TYPE_AFTER_DELAY, INVOKE_TYPE_CONTEXT_CHANGE, INVOKE_TYPE_IDLE,
  RATING_ICON_TYPE_STAR, RATING_ICON_TYPE_HEART, RATING_ICON_TYPE_EMOJI } from '../../../model';
import { MANAGE_PRODUCTS } from '../../../pages/admin';
import { LightTooltip } from '../../common/tooltip';
import Success from '../../success-page';
import { hostUrl } from '../../../utils/http/constants';

const widgetScript: string = `<script>\n\
window.GigaTester = window.GigaTester || {};\n\
GigaTester.productKey = \'YOUR_PRODUCT_API_KEY_GOES_HERE\';\n\
GigaTester.productVersion = \'YOUR_PRODUCT_VERSION_GOES_HERE\';\n\
GigaTester.endpoint = \'${hostUrl}\';\n\
(function(d) {\n\
    var s = d.createElement(\'script\'); s.async = true;\n\
    s.src = \'https://s3.amazonaws.com/dist.gigatester.io/feedback-agent/browser/gigatester_script.js\';\n\
    (d.head || d.body).appendChild(s);\n\
})(document);\n\
</script>`;

const useStyles = makeStyles((theme) => ({
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '20%',
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
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  button: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  sections: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
  },
  formControl: {
    minWidth: '100%',
  },
}));

const EditProductFeedbackSettings = (props: any) => {
  const classes = useStyles();
  const [feedbackSettingsPosted, setFeedbackSettingsPosted] = useState(false);
  const [feedbackSettingsFetched, setFeedbackSettingsFetched] = useState(false);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [productParams, setProductParams] = React.useState<
    IProductParams | undefined
  >();
//  const [prodId, setProdId] = React.useState<string>('');
//  const [prodVersion, setProdVersion] = React.useState<string>('');
//  const [fetchProducts, setFetchProducts] = React.useState(false);
//  const [allProducts, setAllProducts] = React.useState<IProductInfo[]>([]);
//  const [backdropOpen, setBackdropOpen] = React.useState(false);
//  const [openModal, setOpenModal] = useState(false);
  // const [searchString, setSearchString] = useState('');
  // const [products, setProducts] = useState<IProductInfo[]>([]);
  // const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
//  const [dialogOpen, setDialogOpen] = useState(false);
  // const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  // const [selectedProd, setSelectedProd] = useState<IProductInfo | undefined>(undefined);
  // const [userParamState, setUserParamState] = React.useState<any>('');
  // const [softwareOption, setSoftwareOption] = useState(false);
  // const [fileContentType, setFileContentType] = useState('');
  // const [fileSelected, setFileSelected] = useState('');
  // const [fileName, setFileName] = useState('');
  // const [numberOfProducts, setNumberOfProducts] = useState(0);
  // const [itemLimit, setItemLimit] = useState({
  //   lowerLimit: 0,
  //   upperLimit: 9,
  // });
  // const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  // const [orderBy, setOrderBy] = useState('name');
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState('Something went wrong');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Saved successfully');
  let msgSuccess = <Text tid='productDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/products/${props.productId}/${props.version}`,
      state: stateVariable,
    })
    .then((response: any) => {
//      fixMultiSelectValuesAndSave(response);
      if(!response.products[0].feedbackSettings) {
        response.products[0].feedbackSettings = {
          categories: [],
          feedbackTypes: [FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS],
          invokeDelay: 300,
          invokeOn: [INVOKE_TYPE_MANUAL],
          ratingIcon: RATING_ICON_TYPE_STAR,
          ratingLimit: 2,
          severities: [SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_LOW],
          title: 'GigaTester',
          uploadFileMaxSize: '3',
          videoAudioMaxDuration: '3',
          widgetLookAndFeel: {
            bgColor: '#2878f0',
            fgColor: '#ffffff',
            font: 'inherit',
            icon: '',
            position: 'center right',
            text: 'feedback',
          }
        };
      }
      setProductParams(response);
      setFeedbackSettingsFetched(true);
    })
    .catch((error: any) => {
      const perror = JSON.stringify(error);
      const object = JSON.parse(perror);
      if (object.code === 401) {
        props.history.push('/relogin');
      } else {
        props.history.push('/error');
      }
      setFailure(true);
    });
  }, []);

/*
  const deleteClicked = (row: IProductInfo) => {
    setSelectedProd(row);
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setOpenModal(false);
  };

  const deleteProduct = (prod: IProductInfo) => {
    setBackdropOpen(true);
    Http.deleteReq({
      url: `/api/v2/products/${prod.id}/${prod.version}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setBackdropOpen(false);
//        setDeleteProductId('');
//        setDeleteProductVersion('');
        setSelectedProd(undefined);
        fetchProductList();
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          setFailureMessage(<Text tid='somethingWentWrong' />);
          setFailure(true);
        }
        setBackdropOpen(false);
        fetchProductList();
      });
  };

  const modalYesClicked = () => {
    if(selectedProd) {
      deleteProduct(selectedProd);
      setOpenModal(false);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
//    setSoftwareOption(false);
//    setSelectedProd(undefined);
  };
*/

  const handleSave = () => {
    if(mandatoryFieldsCheck()) {
      const postData = productParams;
      Http.put({
        url: `/api/v2/products`,
        body: {
          ...postData,
        },
        state: stateVariable,
      })
      .then((response: any) => {
//          setProdId('');
//          setProdVersion('');
        setFeedbackSettingsPosted(true);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          setFailureMessage('Something went wrong');
          setFailure(true);
        }
      });
    }
  };

  function mandatoryFieldsCheck(): boolean {
    if(!(productParams && productParams.products && productParams.products[0] &&
        productParams.products[0].feedbackSettings)) {
      setFailureMessage('No data found to save');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.categories.length < 1) {
      setFailureMessage('You must specify at least one category');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.feedbackTypes.length < 1) {
      setFailureMessage('You must choose at least one feedback type');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.ratingIcon.length < 1) {
      setFailureMessage('You must select a rathing icon');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.title.length < 1) {
      setFailureMessage('You must specify a title or name to display on the widget dialog');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.uploadFileMaxSize.length < 1) {
      setFailureMessage('You must select the maximum allowed size of uploaded file');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackSettings.videoAudioMaxDuration.length < 1) {
      setFailureMessage('You must select the maximum allowed duration of audio and video recordings');
      setFailure(true);
      return false;
    }

    return true;
  }

/*
  const handleChangeProductSoftware = (row: IProductInfo | undefined) => {
    if (row) {
      if (userParamState) {
        row.software = userParamState;
        row.softwareType = 'url';
        handleSave(row);
      } else if (fileName) {
        row.software = fileName;
        row.softwareType = fileContentType;
        handleSave(row);
        setTimeout(() => {
          setUserParamState('');
          closeDialog();
        }, 2000);
      }
    }
    setTimeout(() => {
      setUserParamState('');
      closeDialog();
    }, 2000);
  };

  const getUploadPreSignedUrl = (event: any) => {
    event.preventDefault();
    setFileSelected(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileContentType(event.target.files[0].type);
  };

  const uploadPreSignedUrlSoftware = () => {
    setNotify({
      isOpen: true,
      message: 'Uploading...',
      type: 'info',
    });
    Http.post({
      url: `/api/v2/softwares/medium`,
      state: stateVariable,
      body: {
        fileName: fileName,
        fileType: fileContentType,
      },
    })
      .then((response: any) => {
        fetch(response.filePath, {
          method: 'PUT',
          body: fileSelected,
        })
          .then((response) => {
            setNotify({
              isOpen: true,
              message: `The ${fileName} has been uploaded successfully.`,
              type: 'info',
            });
            setFileName('');
            handleChangeProductSoftware(selectedProd);
            // response.json();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
*/
  const handleGenerateApiKey = () => {
    if (productParams && productParams.products && productParams.products[0]) {
      let productId: string = productParams.products[0].id;
      Http.post({
        url: `/api/v2/productApiKey`,
        state: stateVariable,
        body: {
          productId,
        },
      })
      .then((response: any) => {
        if(productParams) {
          const temp: IProductParams | undefined = { ...productParams };
            if (temp && temp.products && temp.products[0]) {
            temp.products[0].apiKey = response.apiKey;
            temp.products[0].apiKeyId = response.apiKeyId;
            setProductParams(temp);
          }
        }
        setSuccessMessage('Api Key Generated Successfully');
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setFailureMessage('API Key Generation Failed');
        setFailure(true);
      });
    }
  };

  const deleteApiKey = () => {
    if (productParams && productParams.products && productParams.products[0]) {
      Http.deleteReq({
        url: `/api/v2/productApiKey/${productParams.products[0].apiKeyId}`,
        state: stateVariable,
      })
      .then((response: any) => {
        if(productParams) {
          const temp: IProductParams | undefined = { ...productParams };
          if (temp && temp.products && temp.products[0]) {
            delete temp.products[0].apiKey;
            delete temp.products[0].apiKeyId;
            setProductParams(temp);
          }
        }
        setSuccessMessage('Api Key Deleted Successfully');
        setSuccess(true);
      })
      .catch((error: any) => {
        console.log(error);
        setFailureMessage('Api Key Deletion Failed');
        setFailure(true);
      });
    }
  };

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
  };

/*
  const handleChangedValue = (event: any) => {
    if (event.target.value) {
      setUserParamState(event.target.value);

      setSoftwareOption(true);
    } else {
      setSoftwareOption(false);
    }
  };

  const uploadForm = () => {
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              id='uploadFile'
              name='uploadFile'
              label='External File URL'
              fullWidth
              onChange={(event) => handleChangedValue(event)}
            />
          </Grid>
          <Grid item xs={12} sm={12} />
          <br />
          <Grid item xs={6} sm={6} />
          <Typography style={{ fontSize: '16px' }}> OR</Typography>
          <Grid item xs={12} sm={12} />
          <br />
          <Grid item xs={3} sm={3} />
          <input
            style={{ display: 'none' }}
            id='upload-software-file'
            multiple
            type='file'
            onChange={(e) => getUploadPreSignedUrl(e)}
          />
          <Link style={{ fontSize: '14px' }}>
            <label
              htmlFor='upload-software-file'
              style={{ fontSize: '14px', color: '#0645AD' }}
            >
              {fileName ? fileName : 'Click here to upload local software'}
            </label>
          </Link>
          <Grid item xs={4} sm={4} />
          <Grid item xs={4} sm={4} />
          <Button
            component='span'
            variant='outlined'
            disabled={softwareOption}
            className={classes.button}
            onClick={() => {
              uploadPreSignedUrlSoftware();
            }}
          >
            Upload
          </Button>
          <Grid item xs={12} sm={12} />
          <br />
          <br />
          <Grid item xs={12} sm={12} />
          <Grid item xs={3} sm={3} />
          <Button
            component='span'
            variant='outlined'
            onClick={() => {
              handleChangeProductSoftware(selectedProd);
            }}
            disabled={!softwareOption}
          >
            ok
          </Button>
          <Grid item xs={2} sm={2} />
          <Button
            component='span'
            variant='outlined'
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Grid item xs={4} sm={4} />
        </Grid>
      </React.Fragment>
    );
  };

  const renderSoftwareDialog = () => {
    return (
      <React.Fragment>
        <Dialog
          className={classes.dialogPaper}
          open={dialogOpen}
          aria-labelledby='form-dialog-title'
          onClose={closeDialog}
          fullWidth={true}
        >
          <DialogTitle
            id='form-dialog-title'
            style={{ textAlign: 'center', padding: '30px 0px' }}
          >
            <Typography style={{ fontSize: '14px' }}>
              <Text tid={'Upload Software'} />
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ marginBottom: '20px' }}>
            <CssBaseline />
            {uploadForm()}
          </DialogContent>
        </Dialog>
        <Notification notify={notify} setNotify={setNotify} />
      </React.Fragment>
    );
  };

  const handleUploadButton = (row: IProductInfo) => {
    setDialogOpen(true);
    setSelectedProd(row);
  };
*/
  const handleChangeCategoryName = (event: any, catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if(temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings && event.target.value) {
        temp.products[0].feedbackSettings.categories[catIndex].name = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const deleteCategory = (catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.categories.splice(catIndex, 1);
        setProductParams(temp);
      }
    }
  };

  const addCategory = () => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.categories.push({
          name: '',
          feedbacks: [],
        });
        setProductParams(temp);
      }
    }
  };

  const handleChangeFeedback = (event: any, catIndex: number, index: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings
        && temp.products[0].feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackSettings.categories[catIndex];
        if(tempCat.feedbacks && event.target.value) {
          tempCat.feedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const deleteFeedback = (catIndex: number, index: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings
        && temp.products[0].feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackSettings.categories[catIndex];
        if(tempCat.feedbacks) {
          tempCat.feedbacks.splice(index, 1);
          setProductParams(temp);
        }
      }
    }
  };

  const addFeedback = (catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings
        && temp.products[0].feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackSettings.categories[catIndex];
        if (!tempCat.feedbacks) {
          tempCat.feedbacks = [];
        }
        tempCat.feedbacks.push('');
        setProductParams(temp);
      }
    }
  };

  const handleTitleChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackTypesChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        let valueArray = temp.products[0].feedbackSettings.feedbackTypes || [];
        valueArray = [...event.target.value];
        temp.products[0].feedbackSettings.feedbackTypes = valueArray;
        setProductParams(temp);
      }
    }
  }

  const handleUploadFileMaxSizeChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.uploadFileMaxSize = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleVideoAudioMaxDurationChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.videoAudioMaxDuration = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleInvokeOnChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        let valueArray = temp.products[0].feedbackSettings.invokeOn || [];
        valueArray = [...event.target.value];
        temp.products[0].feedbackSettings.invokeOn = valueArray;
        setProductParams(temp);
      }
    }
  }

  const handleInvokeDelayChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.invokeDelay = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleRatingLimitChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackSettings) {
        temp.products[0].feedbackSettings.ratingLimit = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const renderCategoryDetails = (category: ICategory, catIndex: number) => {
    return (
      <Fragment key={catIndex}>
        <Grid container spacing={1} style={{ border: 'solid 1px #aaaaaa', padding: '8px', margin: '4px'}}>
          <Grid item xs={10} sm={10}>
            <TextField
              required
              type='string'
              id={`category_${catIndex}`}
              name={`category_${catIndex}`}
              label='Category Name'
              value={category.name}
              fullWidth
              onChange={(event) => handleChangeCategoryName(event, catIndex)}
              autoComplete='off'
              className='textFieldStyle'
          />
          </Grid>
          <Grid item xs={2} sm={2}>
            <LightTooltip
              title={'Delete this Category'}
              aria-label='delete this category'
            >
              <IconButton size='small' onClick={() => deleteCategory(catIndex)} >
                <ClearIcon />
              </IconButton>
            </LightTooltip>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            <Typography>Standard Feedbacks:</Typography>
          </Grid>
          <Grid item xs={5} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a standard Feedback text'}
              aria-label='Add a standard Feedback text'
            >
              <Button size='small' variant="outlined" onClick={() => addFeedback(catIndex)} >
                <AddIcon /> Feedback Text
              </Button>
            </LightTooltip>
          </Grid>
          { category.feedbacks &&
            category.feedbacks.map((feedback: string, index: number) => {
              return (
                <Grid key={index} container spacing={1}>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={10} sm={10}>
                    <TextField
                      required
                      type='string'
                      id={`feedback_${catIndex}_${index}`}
                      name={`feedback_${catIndex}_${index}`}
                      label='Feedback text'
                      value={feedback ? feedback : ''}
                      fullWidth
                      onChange={(event) => handleChangeFeedback(event, catIndex, index)}
                      autoComplete='off'
                      className='textFieldStyle'
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <LightTooltip
                      title={'Delete this standard Feedback'}
                      aria-label='Delete this standard Feedback'
                    >
                      <IconButton size='small' onClick={() => deleteFeedback(catIndex, index)} >
                        <ClearIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                </Grid>
              );
            })
          }
        </Grid>
      </Fragment>
    );
  };

  const renderCategorySettings = () => {
    return (
      <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >
        <Grid item xs={6}>
          <Typography variant="h6">Categories:</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <LightTooltip
            title={'Add a category'}
            aria-label='Add a category'
          >
            <Button size='small' variant="outlined" onClick={() => addCategory()} >
              <AddIcon /> Category
            </Button>
          </LightTooltip>
        </Grid>
        { productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackSettings &&
          productParams.products[0].feedbackSettings.categories.map((category: ICategory, index: number) => {
            return renderCategoryDetails(category, index);
        })}
      </Grid>
    );
  };

  const renderStandardSettings = () => {
    return (
      <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >
        <Grid item xs={12}>
          <Typography variant="h6">General Widget Settings:</Typography>
        </Grid>
        <TextField
          required={true}
          type='string'
          id={`title`}
          name={`title`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackSettings &&
            productParams.products[0].feedbackSettings.title)
            ? productParams.products[0].feedbackSettings.title
            : ''
          }
          label={'Title to display on the dialog'}
          onChange={(event) => handleTitleChange(event)}
          fullWidth
          autoComplete='off'
          className='textFieldStyle'
        />

        <FormControl className={classes.formControl}>
          <InputLabel id={`feedbackTypes`} required={true}>
            {'What can users submit using this widget (select multiple):'}
          </InputLabel>
          <Select
            name={`select_feedbackTypes`}
            multiple
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackSettings &&
              productParams.products[0].feedbackSettings.feedbackTypes)
              ? productParams.products[0].feedbackSettings.feedbackTypes
              : []
            }
            onChange={(event) => handleFeedbackTypesChange(event)}
          >
            <MenuItem key={FEEDBACK_TYPE_FEEDBACK} value={FEEDBACK_TYPE_FEEDBACK}>{'Submit Feedback'}</MenuItem>
            <MenuItem key={FEEDBACK_TYPE_BUGS} value={FEEDBACK_TYPE_BUGS}>{'Submit Bugs'}</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id={`uploadFileMaxSize`} required={true}>
            {'Maximum size of the file that can be uploaded (In GB):'}
          </InputLabel>
          <Select
            name={`select_uploadFileMaxSize`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackSettings &&
              productParams.products[0].feedbackSettings.uploadFileMaxSize)
              ? productParams.products[0].feedbackSettings.uploadFileMaxSize
              : ''
            }
            onChange={(event) => handleUploadFileMaxSizeChange(event)}
          >
            <MenuItem key={1} value={1}>{'1 GB'}</MenuItem>
            <MenuItem key={2} value={2}>{'2 GB'}</MenuItem>
            <MenuItem key={3} value={3}>{'3 GB'}</MenuItem>
            <MenuItem key={4} value={4}>{'4 GB'}</MenuItem>
            <MenuItem key={5} value={5}>{'5 GB'}</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id={`videoAudioMaxDuration`} required={true}>
            {'Maximum duration of the Audio and Video recordings (In min):'}
          </InputLabel>
          <Select
            name={`select_videoAudioMaxDuration`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackSettings &&
              productParams.products[0].feedbackSettings.videoAudioMaxDuration)
              ? productParams.products[0].feedbackSettings.videoAudioMaxDuration
              : ''
            }
            onChange={(event) => handleVideoAudioMaxDurationChange(event)}
          >
            <MenuItem key={1} value={1}>{'1 min'}</MenuItem>
            <MenuItem key={2} value={2}>{'2 min'}</MenuItem>
            <MenuItem key={3} value={3}>{'3 min'}</MenuItem>
            <MenuItem key={4} value={4}>{'4 min'}</MenuItem>
            <MenuItem key={5} value={5}>{'5 min'}</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id={`invokeOn`} required={true}>
            {'How will the feedback dialog be invoked (can select multiple):'}
          </InputLabel>
          <Select
            name={`select_invokeOn`}
            multiple
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackSettings &&
              productParams.products[0].feedbackSettings.invokeOn)
              ? productParams.products[0].feedbackSettings.invokeOn
              : []
            }
            onChange={(event) => handleInvokeOnChange(event)}
          >
            <MenuItem key={INVOKE_TYPE_MANUAL} value={INVOKE_TYPE_MANUAL}>{'User manually clicks button'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_AFTER_DELAY} value={INVOKE_TYPE_AFTER_DELAY}>{'Automatically display after sometime'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_CONTEXT_CHANGE} value={INVOKE_TYPE_CONTEXT_CHANGE}>{'Automatically display on context change'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_IDLE} value={INVOKE_TYPE_IDLE}>{'Automatically display when the is inactivity'}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required={false}
          type='number'
          id={`invokeDelay`}
          name={`invokeDelay`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackSettings &&
            productParams.products[0].feedbackSettings.invokeDelay)
            ? productParams.products[0].feedbackSettings.invokeDelay
            : ''
          }
          label={'The delay (in minutes) after which feedback will be requested automatically'}
          onChange={(event) => handleInvokeDelayChange(event)}
          fullWidth
          autoComplete='off'
          InputProps={{ disableUnderline: true }}
          className='textFieldStyle'
        />

        <FormControl className={classes.formControl}>
          <InputLabel id={`ratingLimit`} required={true}>
            {'The star rating till which detailed feedback will requested:'}
          </InputLabel>
          <Select
            name={`select_ratingLimit`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackSettings &&
              productParams.products[0].feedbackSettings.ratingLimit)
              ? productParams.products[0].feedbackSettings.ratingLimit
              : ''
            }
            onChange={(event) => handleRatingLimitChange(event)}
          >
            <MenuItem key={1} value={1}>{'1 star rating'}</MenuItem>
            <MenuItem key={2} value={2}>{'2 star rating'}</MenuItem>
            <MenuItem key={3} value={3}>{'3 star rating'}</MenuItem>
            <MenuItem key={4} value={4}>{'4 star rating'}</MenuItem>
            <MenuItem key={5} value={5}>{'5 star rating'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const renderFeedbackSettingsPage = () => {
    if (feedbackSettingsPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_PRODUCTS);
              }}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Container maxWidth='md' component='div' className='containerRoot'>
          <Typography variant="h5">
            Product: 
            &nbsp;{ productParams && productParams.products && productParams.products[0] && productParams.products[0].name ? productParams.products[0].name : '' }
            &nbsp;, version:
            &nbsp;{ productParams && productParams.products && productParams.products[0] && productParams.products[0].version ? productParams.products[0].version : '' }
          </Typography>
          <Paper className={classes.sections}>
            {renderStandardSettings()}
            {renderCategorySettings()}
            <div className='bottomButtonsContainer'>
              <Button
                className={classes.button}
                variant='outlined'
                onClick={() => {
                  props.goBack(MANAGE_PRODUCTS);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSave();
                }}
                className={classes.button}
                variant='outlined'
              >
                <Text tid='save' />
              </Button>
            </div>
          </Paper>
          <Paper className={classes.sections}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">API Key:</Typography>
              </Grid>
                {(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].apiKey) ? (
                  <Fragment>
                    <Grid item xs={10}>
                      <TextField
                        required={true}
                        disabled
                        type='string'
                        id={`productApiKey`}
                        name={`productApiKey`}
                        value={(productParams.products[0].apiKey) ? productParams.products[0].apiKey : ''}
                        fullWidth
                        autoComplete='off'
                        className='textFieldStyle'
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <LightTooltip
                        title={'Delete API Key'}
                        aria-label='delete api key'
                      >
                        <Button size='small' variant="outlined" onClick={() => deleteApiKey()} >
                          <ClearIcon /> Delete
                        </Button>
                      </LightTooltip>
                    </Grid>
                  </Fragment>
                ) : (
                  <Grid item xs={12}>
                    <Button
                      size='small' variant="outlined"
                      onClick={(event: any) => handleGenerateApiKey()}
                    >
                      Generate API Key
                    </Button>
                  </Grid>
                )}
            </Grid>
          </Paper>
          <Paper className={classes.sections}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Widget Script:</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={8}
                  disabled
                  variant='outlined'
                  type='string'
                  id={`widgetScript`}
                  name={`widgetScript`}
                  value={
                    (productParams && productParams.products && productParams.products[0] &&
                      productParams.products[0].apiKey)
                    ? (widgetScript.replace(
                        'YOUR_PRODUCT_API_KEY_GOES_HERE',
                        productParams.products[0].apiKey
                      ).replace(
                        'YOUR_PRODUCT_VERSION_GOES_HERE',
                        productParams.products[0].version
                      ))
                    : ''
                  }
                  fullWidth
                  label='Widget Script'
                  helperText='Copy the above script and paste it close to your opening body tag of your page.'
                />
              </Grid>
            </Grid>
          </Paper>
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_PRODUCTS);
              }}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={failure}
          onClose={handleClose}
          autoHideDuration={9000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#dd0000',
            }}
            message={failureMessage}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={success}
          onClose={handleClose}
          autoHideDuration={9000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#00dd00',
            }}
            message={successMessage}
          />
        </Snackbar>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {feedbackSettingsFetched && productParams ? (
        renderFeedbackSettingsPage()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};
export default withRouter(EditProductFeedbackSettings);
