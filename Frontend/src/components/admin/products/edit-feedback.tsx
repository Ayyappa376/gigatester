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
import { IProductParams, ICategory, IFeedbackAgentSettings, 
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
GigaTester.apiKey = \'YOUR_PRODUCT_API_KEY_GOES_HERE\';\n\
GigaTester.productVersion = \'YOUR_PRODUCT_VERSION_GOES_HERE\';\n\
GigaTester.endpoint = \'${hostUrl}\';\n\
GigaTester.selectDefaultCategory( YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION );\n\
GigaTester.setUserDetails( YOUR_USER_DETAILS_CALLBACK_FUNCTION );\n\
(function(d) {\n\
    var s = d.createElement(\'script\'); s.async = true;\n\
    s.src = \'https://s3.amazonaws.com/dist.gigatester.io/feedback-agent/browser/gigatester_script.js\';\n\
    (d.head || d.body).appendChild(s);\n\
})(document);\n\
</script>

/****************************************/
// YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION is the callback function that GigaTester agent will call to get the 
// name of the category to display in the context of invocation.
// The callback function should be a global function.
// The signature of this callback is as follows:
//   function YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION (feedbackType) {
//     return categoryNameInThisContext;
//   }
// where feedbackType is a string with value "BUGS" or "FEEDBACK"
// and categoryNameInThisContext is a string that is the name of the category depending on the feedbackType parameter.
//
// Example:
//   function getCategoryContext(feedbackType) {
//     return feedbackType === "BUGS" ? "ScreenShare" : "Video";
//   }
// GigaTester.selectDefaultCategory( getCategoryContext );
//
//-------------------------------
//
// YOUR_USER_DETAILS_CALLBACK_FUNCTION is the callback function that GigaTester agent will call to get the 
// email and other details of the user that your app wish to store along with feedbacks.
// The callback function should be a global function.
// The signature of this callback is as follows:
//   function YOUR_USER_DETAILS_CALLBACK_FUNCTION () {
//     return {
//       email: userEmail, //the email of the logged in user
//       ... //other details of the user like id, guid etc.
//     };
//   }
// where email is a field our app expects in the object that is returned. If not present, will prompt 
//   the user to provide one. The remaining field in the returned object will be stored as it is.
//
// Example:
//   function getUserDetails() {
//     return {
//       email: 'somebody@somewhere.com',
//       id: 'user_1234567890',
//       guid: '36429hjhoruhf-rhu3uh-u3hfuhe-hefuw93',
//       name: 'Some Person'
//     };
//   }
// GigaTester.setUserDetails( getUserDetails );
//
//-------------------------------
// The following functions can be used to have a handle on the GigaTester feedback agent dialog and button.
//
// GigaTester.hide() => to hide the Feedback button for full screen video
// GigaTester.show() => to show Feedback button when user moves the mouse or action is detected.
// GigaTester.open() => to open GigaTester form dialog
// GigaTester.open("BUGS") => to show Bug report form dialog
// GigaTester.open("FEEDBACK") => to show Feedback form dialog
// GigaTester.close() => to close GigaTester dialog
// GigaTester.setEmail("xyz@abc.com") => to set default Email(should be string) in GigaTester form.
/****************************************/
`
;

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

const EditProductfeedbackAgentSettings = (props: any) => {
  const classes = useStyles();
  const [feedbackAgentSettingsPosted, setfeedbackAgentSettingsPosted] = useState(false);
  const [feedbackAgentSettingsFetched, setfeedbackAgentSettingsFetched] = useState(false);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [productParams, setProductParams] = React.useState<
    IProductParams | undefined
  >();
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
      if(!response.products[0].feedbackAgentSettings) {
        response.products[0].feedbackAgentSettings = {
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
      setfeedbackAgentSettingsFetched(true);
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
        setfeedbackAgentSettingsPosted(true);
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
        productParams.products[0].feedbackAgentSettings)) {
      setFailureMessage('No data found to save');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.feedbackTypes.length < 1) {
      setFailureMessage('You must choose at least one feedback type');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.feedbackTypes.includes(FEEDBACK_TYPE_FEEDBACK) &&
      !productParams.products[0].feedbackAgentSettings.feedbackSettings) {
      setFailureMessage('You must specify feedback settings');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.feedbackTypes.includes(FEEDBACK_TYPE_BUGS) &&
      !productParams.products[0].feedbackAgentSettings.bugSettings) {
      setFailureMessage('You must specify bug settings');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.feedbackSettings) {
      if(productParams.products[0].feedbackAgentSettings.feedbackSettings.categories.length < 1) {
        setFailureMessage('You must specify at least one category in feedback settings');
        setFailure(true);
        return false;
      }
    }

    if(productParams.products[0].feedbackAgentSettings.bugSettings){
      if(productParams.products[0].feedbackAgentSettings.bugSettings.categories.length < 1) {
        setFailureMessage('You must specify at least one category in bug settings');
        setFailure(true);
        return false;
      }
    }

    if(productParams.products[0].feedbackAgentSettings.title.length < 1) {
      setFailureMessage('You must specify a title or name to display on the widget dialog');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.uploadFileMaxSize.length < 1) {
      setFailureMessage('You must select the maximum allowed size of uploaded file');
      setFailure(true);
      return false;
    }

    if(productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration.length < 1) {
      setFailureMessage('You must select the maximum allowed duration of audio and video recordings');
      setFailure(true);
      return false;
    }

    return true;
  }

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

  const handleChangeFeedbackCategoryName = (event: any, catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if(temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings && event.target.value) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex].name = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const deleteFeedbackCategory = (catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories.splice(catIndex, 1);
        setProductParams(temp);
      }
    }
  };

  const addFeedbackCategory = () => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories.push({
          name: '',
          feedbacks: [],
        });
        setProductParams(temp);
      }
    }
  };

  const handleChangeFeedbackStdFeedbackText = (event: any, catIndex: number, index: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if(tempCat.feedbacks && event.target.value) {
          tempCat.feedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const deleteFeedbackStdFeedbackText = (catIndex: number, index: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if(tempCat.feedbacks) {
          tempCat.feedbacks.splice(index, 1);
          setProductParams(temp);
        }
      }
    }
  };

  const addFeedbackStdFeedbackText = (catIndex: number) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
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
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackTypesChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        let valueArray = temp.products[0].feedbackAgentSettings.feedbackTypes || [];
        valueArray = [...event.target.value];
        temp.products[0].feedbackAgentSettings.feedbackTypes = valueArray;
        setProductParams(temp);
      }
    }
  }

  const handleUploadFileMaxSizeChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.uploadFileMaxSize = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleVideoAudioMaxDurationChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.videoAudioMaxDuration = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleInvokeOnChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        let valueArray = temp.products[0].feedbackAgentSettings.invokeOn || [];
        valueArray = [...event.target.value];
        temp.products[0].feedbackAgentSettings.invokeOn = valueArray;
        setProductParams(temp);
      }
    }
  }

  const handleInvokeDelayChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.invokeDelay = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleRatingLimitChange = (event: any) => {
    if(productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit = event.target.value;
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
              onChange={(event) => handleChangeFeedbackCategoryName(event, catIndex)}
              autoComplete='off'
              className='textFieldStyle'
          />
          </Grid>
          <Grid item xs={2} sm={2}>
            <LightTooltip
              title={'Delete this Category'}
              aria-label='delete this category'
            >
              <IconButton size='small' onClick={() => deleteFeedbackCategory(catIndex)} >
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
              <Button size='small' variant="outlined" onClick={() => addFeedbackStdFeedbackText(catIndex)} >
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
                      onChange={(event) => handleChangeFeedbackStdFeedbackText(event, catIndex, index)}
                      autoComplete='off'
                      className='textFieldStyle'
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <LightTooltip
                      title={'Delete this standard Feedback'}
                      aria-label='Delete this standard Feedback'
                    >
                      <IconButton size='small' onClick={() => deleteFeedbackStdFeedbackText(catIndex, index)} >
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
            <Button size='small' variant="outlined" onClick={() => addFeedbackCategory()} >
              <AddIcon /> Category
            </Button>
          </LightTooltip>
        </Grid>
        { productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.feedbackSettings &&
          productParams.products[0].feedbackAgentSettings.feedbackSettings.categories.map((category: ICategory, index: number) => {
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
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.title)
            ? productParams.products[0].feedbackAgentSettings.title
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
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackTypes)
              ? productParams.products[0].feedbackAgentSettings.feedbackTypes
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
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.uploadFileMaxSize)
              ? productParams.products[0].feedbackAgentSettings.uploadFileMaxSize
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
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration)
              ? productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration
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
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.invokeOn)
              ? productParams.products[0].feedbackAgentSettings.invokeOn
              : []
            }
            onChange={(event) => handleInvokeOnChange(event)}
          >
            <MenuItem key={INVOKE_TYPE_MANUAL} value={INVOKE_TYPE_MANUAL}>{'User manually clicks button'}</MenuItem>
            {/*<MenuItem key={INVOKE_TYPE_AFTER_DELAY} value={INVOKE_TYPE_AFTER_DELAY}>{'Automatically display after sometime'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_CONTEXT_CHANGE} value={INVOKE_TYPE_CONTEXT_CHANGE}>{'Automatically display on context change'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_IDLE} value={INVOKE_TYPE_IDLE}>{'Automatically display when the is inactivity'}</MenuItem>*/}
          </Select>
        </FormControl>

        <TextField
          required={false}
          type='number'
          id={`invokeDelay`}
          name={`invokeDelay`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.invokeDelay)
            ? productParams.products[0].feedbackAgentSettings.invokeDelay
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
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit)
              ? productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit
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

  const renderfeedbackAgentSettingsPage = () => {
    if (feedbackAgentSettingsPosted) {
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
      {feedbackAgentSettingsFetched && productParams ? (
        renderfeedbackAgentSettingsPage()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};
export default withRouter(EditProductfeedbackAgentSettings);
