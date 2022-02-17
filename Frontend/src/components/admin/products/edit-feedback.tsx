import React, { useEffect, useState, Fragment } from 'react';
import {
  Typography,
  makeStyles,
  Container,
  Paper,
  Button,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Box,
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import EditFeedbackTabs from './tabs';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import {
  IProductParams, ICategory,
  FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS,
  SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_LOW,
  INVOKE_TYPE_MANUAL, INVOKE_TYPE_AFTER_DELAY, INVOKE_TYPE_CONTEXT_CHANGE, INVOKE_TYPE_IDLE,
  RATING_ICON_TYPE_STAR, RATING_ICON_TYPE_HEART, RATING_ICON_TYPE_EMOJI
} from '../../../model';
import { MANAGE_PRODUCTS } from '../../../pages/admin';
import { LightTooltip } from '../../common/tooltip';
import Success from '../../success-page';
import { hostUrl } from '../../../utils/http/constants';

const widgetScript: string = `<script>
window.GigaTester = window.GigaTester || {};
GigaTester.apiKey = \'YOUR_PRODUCT_API_KEY_GOES_HERE\';
GigaTester.productVersion = \'YOUR_PRODUCT_VERSION_GOES_HERE\';
GigaTester.endpoint = \'${hostUrl}\';
(function(d) {
    var s = d.createElement(\'script\'); s.async = true;
    s.src = \'${window.location.origin}/dist/feedback-agent/browser/gigatester_script.js\';
    (d.head || d.body).appendChild(s);
})(document);
</script>
`;

// const scriptHelpText: string = `GigaTester.selectDefaultCategory( YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION );
// and
// GigaTester.appUserDetails( YOUR_USER_DETAILS_CALLBACK_FUNCTION )
// are optional parameters and can be removed if not used.

// Below you will find the explanation on how to use these callbacks and certain other functions provided by Gigatester feedback widget.

// --------------------------------------------------------------------

// YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION is the callback function that GigaTester agent will call to get the name of the category to display in the context of invocation.

// The callback function should be a global function.

// The signature of this callback is as follows:

//   function YOUR_CONTEXT_CATEGORY_CALLBACK_FUNCTION (feedbackType) {
//     return categoryNameInThisContext;
//   }

// where feedbackType is a string with value "BUGS" or "FEEDBACK"
// and categoryNameInThisContext is a string that is the name of the category depending on the feedbackType parameter.

// Example:
//   function getCategoryContext(feedbackType) {
//     return feedbackType === "BUGS" ? "ScreenShare" : "Video";
//   }
// GigaTester.selectDefaultCategory( getCategoryContext );

// ------------------------------------------------------------------------

// YOUR_USER_DETAILS_CALLBACK_FUNCTION is the callback function that GigaTester agent will call to get the email and other details of the user that your app wish to store along with feedbacks.

// The callback function should be a global function.

// The signature of this callback is as follows:

//   function YOUR_USER_DETAILS_CALLBACK_FUNCTION () {
//     return {
//       email: userEmail, //the email of the logged in user
//       ... //other details of the user like id, guid etc.
//     };
//   }

// where email is a field our app expects in the object that is returned. If not present, will prompt the user to provide one. The remaining field in the returned object will be stored as it is.

// Example:
//   function getUserDetails() {
//     return {
//       email: 'somebody@somewhere.com',
//       id: 'user_1234567890',
//       guid: '36429hjhoruhf-rhu3uh-u3hfuhe-hefuw93',
//       name: 'Some Person'
//     };
//   }
// GigaTester.appUserDetails( getUserDetails );

// ----------------------------------------------------------------------

// The following functions can be used to have a handle on the GigaTester feedback agent dialog and button.

// GigaTester.hide() => to hide the Feedback button for full screen video
// GigaTester.show() => to show Feedback button when user moves the mouse or action is detected.
// GigaTester.open() => to open GigaTester form dialog
// GigaTester.open("BUGS") => to show Bug report form dialog
// GigaTester.open("FEEDBACK") => to show Feedback form dialog
// GigaTester.close() => to close GigaTester dialog
// GigaTester.setEmail("xyz@abc.com") => to set default Email(should be string) in GigaTester form.
// `;

const scriptHelpText: string = `The following functions can be used to interact with the GigaTester feedback agent.

GigaTester.hide() => to hide the Feedback button for full screen video
GigaTester.show() => to show Feedback button when user moves the mouse or action is detected.
GigaTester.open() => to open GigaTester form dialog
GigaTester.open("BUGS") => to show Bug report form dialog
GigaTester.open("FEEDBACK") => to show Feedback form dialog
GigaTester.close() => to close GigaTester dialog
GigaTester.setUserDetails({
    email: 'somebody@somewhere.com',
    id: 'user_1234567890',
    guid: '36429hjhoruhf-rhu3uh-u3hfuhe-hefuw93',
    name: 'Some Person'
  }) => to set details of the user including the email in GigaTester.
GigaTester.setDefaultCategory("Category Name", "BUGS") => To set the default category to show in Bug report form depending on context.
GigaTester.setDefaultCategory("Category Name", "FEEDBACK") => To set the default category to show in Feedback form depending on context.
`;

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
  const [showHelp, setShowHelp] = useState(false);

  let msgSuccess = <Text tid='productDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/products/${props.productId}/${props.version}`,
      state: stateVariable,
    })
      .then((response: any) => {
        //      fixMultiSelectValuesAndSave(response);
        if (!response.products[0].feedbackAgentSettings) {
          response.products[0].feedbackAgentSettings = {
            categories: [],
            feedbackTypes: [FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS],
            invokeDelay: 5,
            invokeOn: [INVOKE_TYPE_MANUAL],
            ratingIcon: RATING_ICON_TYPE_STAR,
            ratingLimit: 2,
            severities: [SEVERITY_TYPE_CRITICAL, SEVERITY_TYPE_MEDIUM, SEVERITY_TYPE_HIGH, SEVERITY_TYPE_LOW],
            title: 'GigaTester',
            uploadFileMaxSize: '400',
            videoAudioMaxDuration: '1.5',
            widgetLookAndFeel: {
              bgColor: '#042e5b',
              fgColor: '#ffffff',
              font: 'inherit',
              icon: '',
              position: 'center right',
              text: 'Feedback',
            }
          };
        }
        console.log('resp', response);
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

  const handleSave = () => {
    if (mandatoryFieldsCheck()) {
      const postData = productParams;
      Http.put({
        url: `/api/v2/products`,
        body: {
          ...postData,
        },
        state: stateVariable,
      })
        .then((response: any) => {
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
    if (!(productParams && productParams.products && productParams.products[0] &&
      productParams.products[0].feedbackAgentSettings)) {
      setFailureMessage('No data found to save');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.feedbackTypes.length < 1) {
      setFailureMessage('You must choose at least one feedback type');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.feedbackTypes.includes(FEEDBACK_TYPE_FEEDBACK) &&
      !productParams.products[0].feedbackAgentSettings.feedbackSettings) {
      setFailureMessage('You must specify feedback settings');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.feedbackTypes.includes(FEEDBACK_TYPE_BUGS) &&
      !productParams.products[0].feedbackAgentSettings.bugSettings) {
      setFailureMessage('You must specify bug settings');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.feedbackSettings) {
      if (productParams.products[0].feedbackAgentSettings.feedbackSettings.categories.length < 1) {
        setFailureMessage('You must specify at least one category in feedback settings');
        setFailure(true);
        return false;
      }
    }

    if (productParams.products[0].feedbackAgentSettings.bugSettings) {
      if (productParams.products[0].feedbackAgentSettings.bugSettings.categories.length < 1) {
        setFailureMessage('You must specify at least one category in bug settings');
        setFailure(true);
        return false;
      }
    }

    if (productParams.products[0].feedbackAgentSettings.title.length < 1) {
      setFailureMessage('You must specify a title or name to display on the widget dialog');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.uploadFileMaxSize.length < 1) {
      setFailureMessage('You must select the maximum allowed size of uploaded file');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration.length < 1) {
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
          if (productParams) {
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
          if (productParams) {
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
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings && event.target.value) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex].name = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const deleteFeedbackCategory = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories.splice(catIndex, 1);
        setProductParams(temp);
      }
    }
  };

  const addFeedbackCategory = () => {
    if (productParams) {
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
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.feedbacks && event.target.value) {
          tempCat.feedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const deleteFeedbackStdFeedbackText = (catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.feedbacks) {
          tempCat.feedbacks.splice(index, 1);
          setProductParams(temp);
        }
      }
    }
  };

  const addFeedbackStdFeedbackText = (catIndex: number) => {
    if (productParams) {
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

  const handleChangeBugCategoryName = (event: any, catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings && event.target.value) {
        temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex].name = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const deleteBugCategory = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.categories.splice(catIndex, 1);
        setProductParams(temp);
      }
    }
  };

  const addBugCategory = () => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.categories.push({
          name: '',
          feedbacks: [],
        });
        setProductParams(temp);
      }
    }
  };

  const handleChangeBugStdFeedbackText = (event: any, catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex];
        if (tempCat.feedbacks && event.target.value) {
          tempCat.feedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const deleteBugStdFeedbackText = (catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex];
        if (tempCat.feedbacks) {
          tempCat.feedbacks.splice(index, 1);
          setProductParams(temp);
        }
      }
    }
  };

  const addBugStdFeedbackText = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex];
        if (!tempCat.feedbacks) {
          tempCat.feedbacks = [];
        }
        tempCat.feedbacks.push('');
        setProductParams(temp);
      }
    }
  };

  const handleTitleChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackTitleChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugTitleChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackTypesChange = (event: any) => {
    if (productParams) {
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
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.uploadFileMaxSize = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleVideoAudioMaxDurationChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.videoAudioMaxDuration = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleInvokeOnChange = (event: any) => {
    if (productParams) {
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
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.invokeDelay = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleRatingLimitChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const copyToClipboard = () => {
    const textArea = document.querySelector('#widgetScript');
    console.log(textArea);
    const textToCopy = (textArea && textArea.textContent) ? textArea.textContent : '';
    console.log(textToCopy);
    navigator.clipboard.writeText(textToCopy);
  }

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

    const payLoad = {
      productParams: productParams,
      handleInvokeDelayChange: handleInvokeDelayChange,
      handleTitleChange: handleTitleChange,
      handleVideoAudioMaxDurationChange: handleVideoAudioMaxDurationChange,
      handleInvokeOnChange: handleInvokeOnChange,
      handleFeedbackTypesChange: handleFeedbackTypesChange,
      handleUploadFileMaxSizeChange: handleUploadFileMaxSizeChange,
      addFeedbackCategory: addFeedbackCategory,
      handleChangeFeedbackCategoryName: handleChangeFeedbackCategoryName,
      deleteFeedbackCategory: deleteFeedbackCategory,
      addFeedbackStdFeedbackText: addFeedbackStdFeedbackText,
      handleChangeFeedbackStdFeedbackText: handleChangeFeedbackStdFeedbackText,
      deleteFeedbackStdFeedbackText: deleteFeedbackStdFeedbackText,
      handleFeedbackTitleChange: handleFeedbackTitleChange,
      handleRatingLimitChange: handleRatingLimitChange,
      addBugCategory: addBugCategory,
      handleChangeBugCategoryName: handleChangeBugCategoryName,
      deleteBugCategory: deleteBugCategory,
      addBugStdFeedbackText: addBugStdFeedbackText,
      handleChangeBugStdFeedbackText: handleChangeBugStdFeedbackText,
      deleteBugStdFeedbackText: deleteBugStdFeedbackText,
      handleBugTitleChange: handleBugTitleChange,
    }

    return (
      <Fragment>
        <Container maxWidth='md' component='div' className='containerRoot'>
          <Typography variant="h5">
            Product:
            &nbsp;{productParams && productParams.products && productParams.products[0] && productParams.products[0].name ? productParams.products[0].name : ''}
            &nbsp;, version:
            &nbsp;{productParams && productParams.products && productParams.products[0] && productParams.products[0].version ? productParams.products[0].version : ''}
          </Typography>
          <Paper className={classes.sections}>
          {/* { This is the settings tab component that contains: general/feedback/bug settings } */}
            <EditFeedbackTabs settingsProps={payLoad} />
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
                  rows={12}
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
                  helperText='Copy the above script and paste it in the head tag of your html page. Check detailed help on other intergration options.'
                />
              </Grid>
              <Button
                size='small' variant="outlined" style={{margin: '2px'}}
                onClick={(event: any) => copyToClipboard()}
              >
                Copy to clipboard
              </Button>
              <Button
                size='small' variant="outlined" style={{margin: '2px'}}
                onClick={(event: any) => setShowHelp(!showHelp)}
              >
                {showHelp ? 'Hide detailed help' : 'Show detailed help'}
              </Button>
              <TextField
                multiline
                variant="filled"
                type='string'
                id={`helpText`}
                name={`helpText`}
                value={scriptHelpText}
                fullWidth
                label=''
                InputProps={{ disableUnderline: true }}
                style={showHelp ? {display: 'block'} : { display: 'none'}}
              />
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
