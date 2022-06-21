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
  FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS, FEEDBACK_TYPE_FEATURE_REQ,
  INVOKE_TYPE_MANUAL, INVOKE_TYPE_AFTER_DELAY,
  INVOKE_TYPE_CONTEXT_CHANGE, INVOKE_TYPE_IDLE,
  RATING_ICON_TYPE_STAR, RATING_ICON_TYPE_HEART, RATING_ICON_TYPE_EMOJI,
  PLATFORM_TYPE_BROWSER,
  PLATFORM_TYPE_NATIVE_REACT,//, EMAIL_MANDATORY, EMAIL_OPTIONAL
  POS_RIGHT_MIDDLE,
  ICustomProperties,
  FEEDBACK_OPT, BUGS_OPT, FEATURE_OPT,
  MAIN_BUTTON,
  TRACKING_SYSTEM_SELF,
  FEEDBACK_FLOW_STATIC
} from '../../../model';
import { MANAGE_PRODUCTS } from '../../../pages/admin';
import { LightTooltip } from '../../common/tooltip';
import Success from '../../success-page';
import { hostUrl } from '../../../utils/http/constants';
import { ReposTimeline } from '../../metrics/repository';

const widgetScript: string = `<script>
window.GigaTester = window.GigaTester || {};
GigaTester.ready = false;
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

const reactCode: string = `import Cuvo from '@cuvo/cuvo-react-native';

<Cuvo
    isDarkTheme={false}
    isCustomButton={false}
    productVersion=\'YOUR_PRODUCT_VERSION_GOES_HERE\'
    endPoint={\'${hostUrl}\'}
    apiKey=\'YOUR_PRODUCT_API_KEY_GOES_HERE\'
/>
`;

const scriptHelpText: string = `Refer the Web Browser integration document for integration details.`;

const reactHelpText: string = `Refer the React Native integration document for integration details.`;

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
  const [feedbackAgentSettingsPosted, setFeedbackAgentSettingsPosted] = useState(false);
  const [feedbackAgentSettingsFetched, setFeedbackAgentSettingsFetched] = useState(false);
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
//  const [useTrackingSystemSeverity, setUseTrackingSystemSeverity] = useState<boolean>(false)
//  const [showScriptHelp, setShowScriptHelp] = useState(false);
//  const [showReactHelp, setShowReactHelp] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  let msgSuccess = <Text tid='productDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/products/${props.productId}/${props.version}`,
      state: stateVariable,
    })
      .then((response: any) => {

        if (!response.products[0].feedbackAgentSettings) {
          response.products[0].feedbackAgentSettings = {
            platform: PLATFORM_TYPE_BROWSER,
            feedbackTypes: [FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS/*, FEEDBACK_TYPE_FEATURE_REQ*/],
            orgUrl: window.location.hostname,
            bugSettings: {
              categories: [],
              severities: [],
              icon: '',
              dialogMsg: 'Tell us more about the issue you faced',
              thanksMsg: 'We will remove your concern soon',
              title: 'Report Bug',
              tooltip: 'Tell us your concern',
              reqComments: true,
              showSeverity: true,
            },
            feedbackSettings: {
              type: FEEDBACK_FLOW_STATIC,
              categories: [],
              ratingIcon: RATING_ICON_TYPE_STAR,
              ratingLimit: 2,
              icon: '',
              dialogMsg: 'Tell us how much you like our app',
              thanksMsg: 'We appriciate your feedback',
              title: 'Give Feedback',
              tooltip: 'Tell us your experience',
              reqComments: true,
            },
            featureReqSettings: {
              icon: '',
              dialogMsg: 'Are there any feature or enhacements that could make your experience better?',
              thanksMsg: 'We appreciate your thoughts and consideration',
              title: 'Feature Request',
              tooltip: 'How could this app be better?',
              reqComments: true,
            },
            invokeDelay: 5,
            invokeOn: [INVOKE_TYPE_MANUAL],
            thanksStr: 'Thank You',
            title: '',
            uploadFileMaxSize: '400',
            videoAudioMaxDuration: '1.5',
            requireEmail: true,
            captureSystemDetails: true,
            remoteBtns: [],
            widgetLookAndFeel: {
              bgColor: '#042e5b',
              fgColor: '#ffffff',
              font: 'inherit',
              fontWeight: 400,
              fontStyle: 'normal',
              text: 'Feedback',
              icon: '',
              position: POS_RIGHT_MIDDLE,
              custom: {
                top: '',
                bottom: '',
                right: '',
                left: '',
                borderRadius: '',
                rotation: '',
                margin: '',
                padding: '',
              },
              rotation: '0'
            }
          };
        }
        if (!response.products[0].emailConfig) {
          response.products[0].emailConfig = {
            feedbackTypes: [],
            emailText: {},
            ratingLimit: {},
            severityLimit: {},
          };
        }
        if (!response.products[0].trackingSystem) {
          response.products[0].trackingSystem = {
            type: TRACKING_SYSTEM_SELF,
          };
        }
        if (!response.products[0].feedbackAgentSettings.featureReqSettings) {
          response.products[0].feedbackAgentSettings.featureReqSettings = {
            icon: '',
            dialogMsg: 'Are there any feature or enhacements that could make your experience better?',
            thanksMsg: 'We appreciate your thoughts and consideration',
            title: 'Feature Request',
            tooltip: 'How could this app be better?',
            reqComments: true,
          }
        }
        console.log('response', response);
        setProductParams(response);
        setFeedbackAgentSettingsFetched(true);
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
          setFeedbackAgentSettingsPosted(true);
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
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
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
        if (tempCat.feedbacks) {
          tempCat.feedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const handleChangeFeedbackStdPositiveFeedbackText = (event: any, catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.positiveFeedbacks) {
          tempCat.positiveFeedbacks[index] = event.target.value;
          setProductParams(temp);
        }
      }
    }
  };

  const handleChangeFeedbackStdNegativeFeedbackText = (event: any, catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.negativeFeedbacks) {
          tempCat.negativeFeedbacks[index] = event.target.value;
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

  const deleteFeedbackStdPositiveFeedbackText = (catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.positiveFeedbacks) {
          tempCat.positiveFeedbacks.splice(index, 1);
          setProductParams(temp);
        }
      }
    }
  };


  const deleteFeedbackStdNegativeFeedbackText = (catIndex: number, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (tempCat.negativeFeedbacks) {
          tempCat.negativeFeedbacks.splice(index, 1);
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

  const addFeedbackStdPositiveFeedbackText = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (!tempCat.positiveFeedbacks) {
          tempCat.positiveFeedbacks = [];
        }
        tempCat.positiveFeedbacks.push('');
        setProductParams(temp);
      }
    }
  };

  const addFeedbackStdNegativeFeedbackText = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex]) {
        const tempCat = temp.products[0].feedbackAgentSettings.feedbackSettings.categories[catIndex];
        if (!tempCat.negativeFeedbacks) {
          tempCat.negativeFeedbacks = [];
        }
        tempCat.negativeFeedbacks.push('');
        setProductParams(temp);
      }
    }
  };

  const handleChangeBugCategoryName = (event: any, catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex].name = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const handleExtTrackingSystemSync = () => {
		if (productParams) {
			const temp: IProductParams | undefined = { ...productParams };
			if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
			  temp.products[0].trackingSystem) {
			  setProductParams(temp);
			}
	  }
	}

  const handleURLChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.url = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleAuthChange = (event: any, type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.auth[type] = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleTrackingSytemProjectDetails = (event: any, type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.project= event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleSystemTypeChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.type = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleChangeJiraFieldMapping = (event: any, feedbotField: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].trackingSystem) {
          if(! temp.products[0].trackingSystem.fieldMappings){
            temp.products[0].trackingSystem.fieldMappings = {};
          }
          temp.products[0].trackingSystem.fieldMappings[feedbotField] = event.target.value;
          setProductParams(temp);
      }
    }
  }

    const handleChangeExtCategoryFilter = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      let categoryValue  = event.target.value;
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings && temp.products[0].feedbackAgentSettings.bugSettings
        && temp.products[0].trackingSystem) {
          if(!temp.products[0].trackingSystem.filters){
            temp.products[0].trackingSystem.filters = {};
            temp.products[0].trackingSystem.filters.categories={};
          } else if (!temp.products[0].trackingSystem.filters.categories){
            temp.products[0].trackingSystem.filters.categories={};
          }
        // let categoryValue: any = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex]
        temp.products[0].trackingSystem.filters.categories[categoryValue] = event.target.checked;
        setProductParams(temp);
      }
    } 
  }


  const handleChangeExtSeverityFilter = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      let severityValue  = event.target.value;
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings && temp.products[0].feedbackAgentSettings.bugSettings
        && temp.products[0].trackingSystem) {
          if(!temp.products[0].trackingSystem.filters){
            temp.products[0].trackingSystem.filters = {};
            temp.products[0].trackingSystem.filters.severities={};
          }
          else if (!temp.products[0].trackingSystem.filters.severities){
            temp.products[0].trackingSystem.filters.severities={};
          }
        // let categoryValue: any = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex]
        temp.products[0].trackingSystem.filters.severities[severityValue] = event.target.checked;
        setProductParams(temp);
      }
    } 
  }

  const deleteBugCategory = (catIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings && temp.products[0].feedbackAgentSettings.bugSettings.categories) {
        let categoryValue: any = temp.products[0].feedbackAgentSettings.bugSettings.categories[catIndex];
        if(temp && temp.products && temp.products[0] && temp.products[0].trackingSystem &&
          temp.products[0].trackingSystem.filters && temp.products[0].trackingSystem.filters.categories
           && temp.products[0].trackingSystem.filters.categories[categoryValue.name]){
        delete temp.products[0].trackingSystem.filters.categories[categoryValue.name];
        }
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
        if (tempCat.feedbacks) {
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

  const handleChangeBugSeverityName = (event: any, sevIndex: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings.severities) {
        temp.products[0].feedbackAgentSettings.bugSettings.severities[sevIndex] = event.target.value;
        setProductParams(temp);
      }
    }
  };

  const addBugSeverity = () => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {

        if(!temp.products[0].feedbackAgentSettings.bugSettings.severities) {
          temp.products[0].feedbackAgentSettings.bugSettings.severities = [];
        }
        temp.products[0].feedbackAgentSettings.bugSettings.severities.push('');
        setProductParams(temp);
      }
    }
  };

  const deleteBugSeverity = (sevIndex: number) => {
//    if(!useTrackingSystemSeverity){
      if (productParams) {
        const temp: IProductParams | undefined = { ...productParams };
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.bugSettings &&
          temp.products[0].feedbackAgentSettings.bugSettings.severities
          ) {
          let severityValue = temp.products[0].feedbackAgentSettings.bugSettings.severities[sevIndex];
          if(temp && temp.products && temp.products[0]
            && temp.products[0].trackingSystem && temp.products[0].trackingSystem.filters
            && temp.products[0].trackingSystem.filters.severities 
            && temp.products[0].trackingSystem.filters.severities[severityValue]){
          delete temp.products[0].trackingSystem.filters.severities[severityValue]
            }
            if(temp && temp.products && temp.products[0]
              && temp.products[0].emailConfig &&
              temp.products[0].emailConfig.severityLimit){
            delete temp.products[0].emailConfig.severityLimit[severityValue]
              }
          temp.products[0].feedbackAgentSettings.bugSettings.severities.splice(sevIndex, 1);
          setProductParams(temp);
        }
      }
//    }
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

  const handleThanksStrChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.thanksStr = event.target.value;
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

  const handleFeedbackTooltipChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.tooltip = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackDialogMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.dialogMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackThanksMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.thanksMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackCategoryHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.categoryHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackStdFeedbackHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.stdFeedbackHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeedbackGeneralCommentsHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.generalCommentsHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugCategoryHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.categoryHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugStdFeedbackHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.stdFeedbackHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugGeneralCommentsHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.generalCommentsHeading = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugSeverityHeadingChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.severityHeading = event.target.value;
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

  const handleBugTooltipChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.tooltip = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugDialogMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.dialogMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleBugThanksMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.thanksMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleReqComments = (type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (type === 'Bugs') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.bugSettings) {
          temp.products[0].feedbackAgentSettings.bugSettings.reqComments = !temp.products[0].feedbackAgentSettings.bugSettings.reqComments;
        }
      } else if (type === 'Feedback') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.feedbackSettings) {
          temp.products[0].feedbackAgentSettings.feedbackSettings.reqComments = !temp.products[0].feedbackAgentSettings.feedbackSettings.reqComments;
        }
      } else if (type === 'Feature_Request') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.featureReqSettings) {
          temp.products[0].feedbackAgentSettings.featureReqSettings.reqComments = !temp.products[0].feedbackAgentSettings.featureReqSettings.reqComments;
        }
      }
      setProductParams(temp);
    }
  }

  const handleReqDisplayEmail = (type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (type === 'Bugs') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.bugSettings) {
          temp.products[0].feedbackAgentSettings.bugSettings.reqDisplayEmail = !temp.products[0].feedbackAgentSettings.bugSettings.reqDisplayEmail;
        }
      } else if (type === 'Feedback') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.feedbackSettings) {
          temp.products[0].feedbackAgentSettings.feedbackSettings.reqDisplayEmail = !temp.products[0].feedbackAgentSettings.feedbackSettings.reqDisplayEmail;
        }
      } else if (type === 'Feature_Request') {
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.featureReqSettings) {
          temp.products[0].feedbackAgentSettings.featureReqSettings.reqDisplayEmail = !temp.products[0].feedbackAgentSettings.featureReqSettings.reqDisplayEmail;
        }
      }
      setProductParams(temp);
    }
  }

  const handleShowSeverityOption = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        temp.products[0].feedbackAgentSettings.bugSettings.showSeverity = !temp.products[0].feedbackAgentSettings.bugSettings.showSeverity;
        setProductParams(temp);
      }
    }
  };

  const handleExtSystemSeverity = (data: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
            temp.products[0].feedbackAgentSettings.bugSettings.severities = [];
      }
      data.map((item: any) => {
            if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
            temp.products[0].feedbackAgentSettings.bugSettings) {
            temp.products[0].feedbackAgentSettings.bugSettings.severities.push(item);
              }
          })
        setProductParams(temp);
      }
  };

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

  const handleEmailOption = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.requireEmail = !temp.products[0].feedbackAgentSettings.requireEmail;
        setProductParams(temp);
      }
    }
  };

  const handleCaptureSystemDetailsOption = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.captureSystemDetails = !temp.products[0].feedbackAgentSettings.captureSystemDetails;
        setProductParams(temp);
      }
    }
  };

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

  const handlePlatformTypeChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {
        temp.products[0].feedbackAgentSettings.platform = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnTitleChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel.text = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnColor = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        if (typeof(event) === 'string') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.bgColor = event;
          setProductParams(temp);
        } else {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.bgColor = event.target.value;
          setProductParams(temp);
        }
      }
    }
  }

  const handleMainBtnTextColor = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        if (typeof(event) === 'string') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.fgColor = event;
          setProductParams(temp);
        } else {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.fgColor = event.target.value;
          setProductParams(temp);
        }
      }
    }
  }

  const handleMainBtnFont = (event: any) => {
    if (typeof (event) === 'string') {
      if (productParams) {
        const temp: IProductParams | undefined = { ...productParams };
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.font = event;
          setProductParams(temp);
        }
      }
    } else {
      if (productParams) {
        const temp: IProductParams | undefined = { ...productParams };
        if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.font = event.target.value;
          setProductParams(temp);
        }
      }
    }
  }

  const handleMainBtnFontWeight = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel.fontWeight = event;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnFontStyle = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel.fontStyle = event;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnPosition = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel.position = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnRotation = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel.rotation = event;
        setProductParams(temp);
      }
    }
  }

  const handleMainBtnCustom = (event: any, key: ICustomProperties) => {
    const property = event.target.value;
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        if(!temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom) {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom = {};
        }
        if (key === 'top') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.top = property;
          setProductParams(temp);
        } else if (key === 'bottom') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.bottom = property;
          setProductParams(temp);
        } else if (key === 'right') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.right = property;
          setProductParams(temp);
        } else if (key === 'left') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.left = property;
          setProductParams(temp);
        } else if (key === 'borderRadius') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.borderRadius = property;
          setProductParams(temp);
        } else if (key === 'rotation') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.rotation = property;
          setProductParams(temp);
        }  else if (key === 'margin') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.margin = property;
          setProductParams(temp);
        } else if (key === 'padding') {
          temp.products[0].feedbackAgentSettings.widgetLookAndFeel.custom.padding = property;
          setProductParams(temp);
        }
      }
    }
  }

  const handleEnableEmail = (event: boolean, type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].emailConfig &&
        temp.products[0].emailConfig.feedbackTypes) {
        if (event && !temp.products[0].emailConfig.feedbackTypes.includes(type)) {
          temp.products[0].emailConfig.feedbackTypes.push(type)
        } else if (!event) {
          if (temp.products[0].emailConfig.feedbackTypes.includes(type)) {
            const oldEmail = temp.products[0].emailConfig.feedbackTypes;
            const index = oldEmail.indexOf(type);
            oldEmail.splice(index, 1);
            temp.products[0].emailConfig.feedbackTypes = oldEmail;
          }
        }
        setProductParams(temp);
      }
    }
  }

  const handleEmailText = (event: any, type: string) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].emailConfig &&
        temp.products[0].emailConfig.emailText) {
        const newMessages = temp.products[0].emailConfig.emailText;
        newMessages[type] = event.target.value;
        temp.products[0].emailConfig.emailText = newMessages;
        setProductParams(temp);
      }
    }
  }

  const handleEmailRating = (event: any) => {
    const { key, check } = event;
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].emailConfig &&
        temp.products[0].emailConfig.ratingLimit) {
        if (temp.products[0].emailConfig.ratingLimit[key]) {
          temp.products[0].emailConfig.ratingLimit[key] = check;
        } else if (!temp.products[0].emailConfig.ratingLimit[key]) {
          const prevRatingObj = temp.products[0].emailConfig.ratingLimit;
          prevRatingObj[key] = check;
          temp.products[0].emailConfig.ratingLimit = prevRatingObj;
        }
        setProductParams(temp);
      }
    }
  }

  const handleEmailSeverity = (event: any) => {
    const { key, check } = event;
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].emailConfig &&
        temp.products[0].emailConfig.severityLimit && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.bugSettings) {
        const severity = temp.products[0].emailConfig.severityLimit;
        // if emailConfig.severityLimit object is empty, we set it here for the first time
        if (Object.keys(severity).length < temp.products[0].feedbackAgentSettings?.bugSettings?.severities.length) {
          const severityArray = temp.products[0].feedbackAgentSettings?.bugSettings.severities;
          const setSeverity: any = {};
          severityArray.forEach((val) => { setSeverity[val] = false })
          setSeverity[key] = check;
          temp.products[0].emailConfig.severityLimit = setSeverity;
        } else {
          // else if the severity limit object is set, we can then set key value pairs regularly
          if (temp.products[0].emailConfig.severityLimit[key]) {
            temp.products[0].emailConfig.severityLimit[key] = check;
          } else if (!temp.products[0].emailConfig.severityLimit[key]) {
            const prevSeverityObj = temp.products[0].emailConfig.severityLimit;
            prevSeverityObj[key] = check;
            temp.products[0].emailConfig.severityLimit = prevSeverityObj;
          }
        }
        setProductParams(temp);
      }
    }
  }
 
  const handleFeedbackFlowChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings && temp.products[0].feedbackAgentSettings.feedbackSettings) {
        temp.products[0].feedbackAgentSettings.feedbackSettings.type = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleIconChange = (event: any) => {
    const { type, iconStr } = event;
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings) {
        switch (type) {
          case FEEDBACK_OPT: {
            if (temp.products[0].feedbackAgentSettings.feedbackSettings) {
              temp.products[0].feedbackAgentSettings.feedbackSettings.icon = iconStr;
            }
            break;
          }
          case BUGS_OPT: {
            if (temp.products[0].feedbackAgentSettings.bugSettings) {
              temp.products[0].feedbackAgentSettings.bugSettings.icon = iconStr;
            }
            break;
          }
          case FEATURE_OPT: {
            if (temp.products[0].feedbackAgentSettings.featureReqSettings) {
              temp.products[0].feedbackAgentSettings.featureReqSettings.icon = iconStr;
            }
            break;
          }
          case MAIN_BUTTON:
          default: {
            if (temp.products[0].feedbackAgentSettings.bugSettings) {
              temp.products[0].feedbackAgentSettings.widgetLookAndFeel.icon = iconStr;
            }
            break;
          }
        }
        setProductParams(temp);
      }
    }
  }

  
  const handleChangeRemoteBtnSettings = (fieldName: string, event: any, index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.remoteBtns) {
          if(fieldName === 'name') {
            temp.products[0].feedbackAgentSettings.remoteBtns[index].name = event.target.value;
          }
          if(fieldName === 'btnId') {
            temp.products[0].feedbackAgentSettings.remoteBtns[index].btnId = event.target.value;
          }
          if(fieldName === 'enabled') {
            temp.products[0].feedbackAgentSettings.remoteBtns[index].enabled = !temp.products[0].feedbackAgentSettings.remoteBtns[index].enabled;
          }
        setProductParams(temp);
      }
    }
  };

  const addRemoteBtnSettings = () => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings) {

        if(!temp.products[0].feedbackAgentSettings.remoteBtns) {
          temp.products[0].feedbackAgentSettings.remoteBtns = [];
        }
        temp.products[0].feedbackAgentSettings.remoteBtns.push({name: '', btnId: '', enabled: false});
        setProductParams(temp);
      }
    }
  };

  const deleteRemoteBtnSettings = (index: number) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.remoteBtns) {
        temp.products[0].feedbackAgentSettings.remoteBtns.splice(index, 1);
        setProductParams(temp);
      }
    }
  };

  const handleFeatureReqTitleChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.featureReqSettings) {
        temp.products[0].feedbackAgentSettings.featureReqSettings.title = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeatureReqTooltipChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.featureReqSettings) {
        temp.products[0].feedbackAgentSettings.featureReqSettings.tooltip = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handlFeatureReqDialogMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.featureReqSettings) {
        temp.products[0].feedbackAgentSettings.featureReqSettings.dialogMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const handleFeatureReqThanksMsgChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
        temp.products[0].feedbackAgentSettings.featureReqSettings) {
        temp.products[0].feedbackAgentSettings.featureReqSettings.thanksMsg = event.target.value;
        setProductParams(temp);
      }
    }
  }

//   //Temporarily commented
//   const handleExtSystemSeverity = (data: any) => {
//     if (productParams) {
//       const temp: IProductParams | undefined = { ...productParams };
//       if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
//         temp.products[0].feedbackAgentSettings.bugSettings) {
//             temp.products[0].feedbackAgentSettings.bugSettings.severities = [];
//       }
//       if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
//         temp.products[0].trackingSystem.severity = true;
// //        setUseTrackingSystemSeverity(true);
//       }
//       data.map((item: any) => {
//             if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
//             temp.products[0].feedbackAgentSettings.bugSettings) {
//             temp.products[0].feedbackAgentSettings.bugSettings.severities.push(item);
//               }
//           })
//         setProductParams(temp);
//       }
//   }

  // //Temporarily commented
  // const handleTrackingSystemDetails = (event: any, authUser: string, authToken: any, externalSystemUrl: string) => {
  //   const appendUrl = `?email=${authUser}&appToken=${authToken}&url=${externalSystemUrl}`
  //   console.log(productParams)
  //   console.log(event.target.checked, 'checked');
  //   console.log(appendUrl);
  //   if(event.target.checked){
  //   Http.get({
  //     url: `/api/v2/externalTrackingSystem/JIRA${appendUrl}`,
  //     state: stateVariable,
  //   })
  //     .then((response: any) => {
  //      console.log(response, 'jira severity')
  //      handleExtSystemSeverity(response.Severity);
  //     })
  //     .catch((error) => {
  //       const perror = JSON.stringify(error);
  //       const object = JSON.parse(perror);
  //       console.log(error)
  //     });
  //   }
  //   // else{
  //   //   setUseTrackingSystemSeverity(false);
  //   // }
  // }

  const copyToClipboard = (textAreaId: string) => {
    const textArea = document.querySelector(`#${textAreaId}`);
    const textToCopy = (textArea && textArea.textContent) ? textArea.textContent : '';
    navigator.clipboard.writeText(textToCopy);
  }

  const renderCodeSnippetArea = () => {
    let title = '';
    let codeSnippet = '';
    let instructions = '';
    let helpText = '';

    if (productParams && productParams.products && productParams.products[0] &&
      productParams.products[0].feedbackAgentSettings &&
      productParams.products[0].feedbackAgentSettings.platform &&
      productParams.products[0].feedbackAgentSettings.platform === PLATFORM_TYPE_NATIVE_REACT) {

      instructions = 'Copy the below code and paste it in the main App component file.' +
        'Check detailed help for package installation, configuration and other intergration options.';
        codeSnippet = reactCode;
        helpText = reactHelpText;
    } else {
      instructions = 'Copy the below script and paste it in the head tag of your html page.' +
        'Check detailed help on other intergration options.';
      codeSnippet = widgetScript;
      helpText = scriptHelpText;
    }

    return (
    <Paper className={classes.sections}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">{'Agent Integration Details'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <div>{instructions}</div><br/>
          <TextField
            multiline
            rows={12}
            disabled
            variant='outlined'
            type='string'
            id={'codeTextField'}
            name={'codeTextField'}
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].apiKey)
                ? (codeSnippet.replace(
                  'YOUR_PRODUCT_API_KEY_GOES_HERE',
                  productParams.products[0].apiKey
                ).replace(
                  'YOUR_PRODUCT_VERSION_GOES_HERE',
                  productParams.products[0].version
                ))
                : ''
            }
            fullWidth
            label='Code Snippet'
          />
        </Grid>
        <Button
          size='small' variant="outlined" style={{margin: '2px'}}
          onClick={(event: any) => copyToClipboard('codeTextField')}
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
          id={`helpTextField`}
          name={`helpTextField`}
          value={helpText}
          fullWidth
          label=''
          InputProps={{ disableUnderline: true }}
          style={showHelp ? {display: 'block'} : { display: 'none'}}
        />
      </Grid>
    </Paper>
    );
  }

  const renderFeedbackAgentSettingsPage = () => {
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
      handlePlatformTypeChange: handlePlatformTypeChange,
      handleInvokeDelayChange: handleInvokeDelayChange,
      handleTitleChange: handleTitleChange,
      handleThanksStrChange: handleThanksStrChange,
      handleVideoAudioMaxDurationChange: handleVideoAudioMaxDurationChange,
      handleInvokeOnChange: handleInvokeOnChange,
      handleFeedbackTypesChange: handleFeedbackTypesChange,
      handleUploadFileMaxSizeChange: handleUploadFileMaxSizeChange,
      handleEmailOption: handleEmailOption,
      handleReqComments: handleReqComments,
      handleReqDisplayEmail: handleReqDisplayEmail,
      handleCaptureSystemDetailsOption: handleCaptureSystemDetailsOption,
      addFeedbackCategory: addFeedbackCategory,
      handleChangeFeedbackCategoryName: handleChangeFeedbackCategoryName,
      deleteFeedbackCategory: deleteFeedbackCategory,
      addFeedbackStdFeedbackText: addFeedbackStdFeedbackText,
      addFeedbackStdPositiveFeedbackText: addFeedbackStdPositiveFeedbackText,
      addFeedbackStdNegativeFeedbackText: addFeedbackStdNegativeFeedbackText,
      handleChangeFeedbackStdFeedbackText: handleChangeFeedbackStdFeedbackText,
      handleChangeFeedbackStdPositiveFeedbackText: handleChangeFeedbackStdPositiveFeedbackText,
      handleChangeFeedbackStdNegativeFeedbackText: handleChangeFeedbackStdNegativeFeedbackText,
      deleteFeedbackStdFeedbackText: deleteFeedbackStdFeedbackText,
      deleteFeedbackStdPositiveFeedbackText: deleteFeedbackStdPositiveFeedbackText,
      deleteFeedbackStdNegativeFeedbackText: deleteFeedbackStdNegativeFeedbackText,
      handleFeedbackTitleChange: handleFeedbackTitleChange,
      handleURLChange: handleURLChange,
      handleAuthChange: handleAuthChange,
      handleTrackingSytemProjectDetails: handleTrackingSytemProjectDetails,
      handleSystemTypeChange: handleSystemTypeChange,
      handleFeedbackTooltipChange: handleFeedbackTooltipChange,
      handleFeedbackDialogMsgChange: handleFeedbackDialogMsgChange,
      handleFeedbackThanksMsgChange: handleFeedbackThanksMsgChange,
      handleFeedbackCategoryHeadingChange: handleFeedbackCategoryHeadingChange,
      handleFeedbackGeneralCommentsHeadingChange: handleFeedbackGeneralCommentsHeadingChange,
      handleFeedbackStdFeedbackHeadingChange: handleFeedbackStdFeedbackHeadingChange,
      handleBugCategoryHeadingChange: handleBugCategoryHeadingChange,
      handleBugGeneralCommentsHeadingChange: handleBugGeneralCommentsHeadingChange,
      handleBugStdFeedbackHeadingChange: handleBugStdFeedbackHeadingChange,
      handleBugSeverityHeadingChange: handleBugSeverityHeadingChange,
      handleRatingLimitChange: handleRatingLimitChange,
      addBugCategory: addBugCategory,
      handleChangeBugCategoryName: handleChangeBugCategoryName,
      handleChangeJiraFieldMapping: handleChangeJiraFieldMapping,
      handleExtTrackingSystemSync: handleExtTrackingSystemSync,
      handleChangeExtSeverityFilter: handleChangeExtSeverityFilter,
      handleChangeExtCategoryFilter: handleChangeExtCategoryFilter,
      deleteBugCategory: deleteBugCategory,
      addBugStdFeedbackText: addBugStdFeedbackText,
      handleChangeBugStdFeedbackText: handleChangeBugStdFeedbackText,
      deleteBugStdFeedbackText: deleteBugStdFeedbackText,
      addBugSeverity: addBugSeverity,
      handleExtSystemSeverity: handleExtSystemSeverity,
//      useTrackingSystemSeverity: useTrackingSystemSeverity,
      handleChangeBugSeverityName: handleChangeBugSeverityName,
      deleteBugSeverity: deleteBugSeverity,
//      useTrackingSystemSeverity: useTrackingSystemSeverity,
//      handleTrackingSystemDetails: handleTrackingSystemDetails,
      handleBugTitleChange: handleBugTitleChange,
      handleBugTooltipChange: handleBugTooltipChange,
      handleBugDialogMsgChange: handleBugDialogMsgChange,
      handleBugThanksMsgChange: handleBugThanksMsgChange,
      handleShowSeverityOption: handleShowSeverityOption,
      handleMainBtnTitleChange: handleMainBtnTitleChange,
      handleMainBtnColor: handleMainBtnColor,
      handleMainBtnTextColor: handleMainBtnTextColor,
      handleMainBtnFont: handleMainBtnFont,
      handleMainBtnFontWeight: handleMainBtnFontWeight,
      handleMainBtnFontStyle: handleMainBtnFontStyle,
      handleMainBtnPosition: handleMainBtnPosition,
      handleMainBtnRotation: handleMainBtnRotation,
      handleMainBtnCustom: handleMainBtnCustom,
      handleIconChange: handleIconChange,
      handleFeedbackFlowChange: handleFeedbackFlowChange,
      handleEmailText: handleEmailText,
      handleEnableEmail: handleEnableEmail,
      handleEmailRating: handleEmailRating,
      handleEmailSeverity: handleEmailSeverity,
      handleChangeRemoteBtnSettings: handleChangeRemoteBtnSettings,
      addRemoteBtnSettings: addRemoteBtnSettings,
      deleteRemoteBtnSettings: deleteRemoteBtnSettings,
      handleFeatureReqTitleChange: handleFeatureReqTitleChange,
      handleFeatureReqTooltipChange: handleFeatureReqTooltipChange,
      handlFeatureReqDialogMsgChange: handlFeatureReqDialogMsgChange,
      handleFeatureReqThanksMsgChange: handleFeatureReqThanksMsgChange,
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
          { renderCodeSnippetArea() }
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
        renderFeedbackAgentSettingsPage()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};
export default withRouter(EditProductfeedbackAgentSettings);
