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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../reducers';
import Loader from '../../../loader';
import { Http } from '../../../../utils';
import { buttonStyle, tooltipTheme } from '../../../../common/common';
import { Text } from '../../../../common/Language';
import {
  IProductParams, TRACKING_SYSTEM_SELF, TRACKING_SYSTEM_JIRA
} from '../../../../model';
import JiraFieldsMapping from './JiraFieldsMapping';
import { MANAGE_PRODUCTS } from '../../../../pages/admin';
import { LightTooltip } from '../../../common/tooltip';
import Success from '../../../success-page';
import JiraFieldFilters from './JiraFieldFilters';

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

interface SettingsProps {
	productParams: IProductParams;
	handleChangeJiraFieldMapping: Function;
	handleChangeExtSeverityFilter: Function;
	handleChangeExtCategoryFilter: Function;
  handleURLChange: Function,
	handleAuthChange: Function,
	handleTrackingSytemProjectDetails: Function,
	handleSystemTypeChange: Function,
  handleExtSystemSeverity: Function,
}

const ExtSystemConfig = (props: any) => {
 
  const classes = useStyles();
  const [extSystemSettingsPosted, setExtSystemSettingsPosted] = useState(false);
  const [extSystemSettingsFetched, setExtSystemSettingsFetched] = useState(false);
  const [extSystemSeverity, setExtSystemSeverity] = useState([])
  const [jiraFieldList, setJiraFieldList] = useState([]);
  const [selectedJiraField, setSelectedJiraField] = useState('');
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [productParams, setProductParams] = React.useState<
    IProductParams | undefined
  >(props.productParams);
  const {handleChangeExtCategoryFilter, handleExtSystemSeverity, handleSystemTypeChange, handleURLChange,handleAuthChange, handleTrackingSytemProjectDetails, handleChangeExtSeverityFilter, handleChangeJiraFieldMapping}: SettingsProps = props;
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState('Something went wrong');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Saved successfully');
  
  let msgSuccess = <Text tid='productDetailsSavedSuccessfully' />;
  const handleTrackingSystemDetails = ( authUser: string, authToken: any, externalSystemUrl: string, project: string) => {
    const appendUrl = `?email=${authUser}&appToken=${authToken}&url=${externalSystemUrl}&project=${project}`
    Http.get({
      url: `/api/v2/externalTrackingSystem/JIRA${appendUrl}`,
      state: stateVariable,
    })
      .then((response: any) => {
       handleJiraFields(response.Severity.projects[0].issuetypes);
    //    handleExtSystemSeverity(response.Severity);
    //    setExtSystemSeverity(response);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        console.log(error)
      });
  }

  useEffect(() => {
      if(productParams && productParams.products && productParams.products.length > 0){
        let trackingSystemDetails = productParams.products[0].trackingSystem
        if(trackingSystemDetails && trackingSystemDetails.url){
        handleTrackingSystemDetails(trackingSystemDetails.auth.authUser, trackingSystemDetails.auth.authKey,trackingSystemDetails.url, trackingSystemDetails.project )
      }
    }
  }, [])

  const handleJiraFields = (issueList: any) => {
      let fieldList: any = [];
      let severityList: any = [];
      issueList.map((issues: any) => {
          if(issues.name.toUpperCase() === 'BUG'){
            Object.keys(issues.fields).forEach(function(fieldTypes: any, idx) {
                if(fieldTypes === 'priority'){
                  issues.fields[fieldTypes].allowedValues.map((item: any) => {
                    severityList.push(item.name);
                 })
                 handleExtSystemSeverity(severityList)
                }
                Object.keys(issues.fields[fieldTypes]).forEach(function(fieldMetaData: any){
                    if(fieldMetaData === 'schema'){
                        if(issues.fields[fieldTypes][fieldMetaData].type === 'string' || issues.fields[fieldTypes][fieldMetaData].type === 'any' || issues.fields[fieldTypes][fieldMetaData].type === 'priority'){
                        fieldList.push(issues.fields[fieldTypes].name)
                        }
                    }

                })
             }); 
          }
      })
      setJiraFieldList(fieldList);
  }

  const handleUploadDataToTrackingSystem = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if(event.target.checked){
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.uploadToTrackingSystem = true;
        setProductParams(temp);
      }
    }
    else{
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.uploadToTrackingSystem = false;
        setProductParams(temp);
      }
    }
  }
  }


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
          setExtSystemSettingsPosted(true);
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
      productParams.products[0].trackingSystem)) {
      setFailureMessage('No data found to save');
      setFailure(true);
      return false;
    }

    if (productParams.products[0].trackingSystem.type != TRACKING_SYSTEM_SELF) {
      if (productParams.products[0].trackingSystem.url.length < 1) {
        setFailureMessage('You must specify an url for the tracking system');
        setFailure(true);
        return false;
      }

      if (Object.keys(productParams.products[0].trackingSystem.auth).length < 1) {
        setFailureMessage('You must specify an authentication mechanism for the tracking system');
        setFailure(true);
        return false;
      }
    }

    return true;
  }

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
  };

  const handleJiraFieldValue = (event: any) => {
    const value = event.target.value;
    setSelectedJiraField(value);
  }

  const renderExtSystemSettingsPage = () => {
    return (
      <Fragment>
        <Container maxWidth='md' component='div' className='containerRoot'>
            <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >
              <FormControl className={classes.formControl}>
                <InputLabel id={`systemType`} required={true}>
                  {'Choose the type of your tracking system:'}
                </InputLabel>
                <Select
                  name={`select_systemType`}
                  value={
                    (productParams && productParams.products && productParams.products[0] &&
                    productParams.products[0].trackingSystem &&
                    productParams.products[0].trackingSystem.type)
                    ? productParams.products[0].trackingSystem.type
                    : ''
                  }
                  onChange={(event) => handleSystemTypeChange(event)}
                >
                  <MenuItem key={TRACKING_SYSTEM_SELF} value={TRACKING_SYSTEM_SELF}>{TRACKING_SYSTEM_SELF}</MenuItem>
                  <MenuItem key={TRACKING_SYSTEM_JIRA} value={TRACKING_SYSTEM_JIRA}>{TRACKING_SYSTEM_JIRA}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required={true}
                type='string'
                id={`title`}
                name={`title`}
                value={
                  (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.url)
                  ? productParams.products[0].trackingSystem.url
                  : ''
                }
                label={'The URl for your tracking/incident management system'}
                onChange={(event) => handleURLChange(event)}
                disabled={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_SELF)}
                fullWidth
                autoComplete='off'
                className='textFieldStyle'
              />
              <TextField
                required={true}
                type='string'
                id={`title`}
                name={`title`}
                value={
                  (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.project)
                  ? productParams.products[0].trackingSystem.project
                  : ''
                }
                label={'Provide project key for your tracking/incident management system'}
                onChange={(event) => handleTrackingSytemProjectDetails(event, 'authUser')}
                disabled={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_SELF)}
                fullWidth
                autoComplete='off'
                className='textFieldStyle'
              />
                <TextField
                required={true}
                type='string'
                id={`title`}
                name={`title`}
                value={
                  (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem && productParams.products[0].trackingSystem.auth &&
                  productParams.products[0].trackingSystem.auth['authUser'])
                  ? productParams.products[0].trackingSystem.auth['authUser']
                  : ''
                }
                label={'Provide auth user email for your tracking/incident management system'}
                onChange={(event) => handleAuthChange(event, 'authUser')}
                disabled={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_SELF)}
                fullWidth
                autoComplete='off'
                className='textFieldStyle'
              />
                <TextField
                required={true}
                type='string'
                id={`title`}
                name={`title`}
                value={
                  (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem && productParams.products[0].trackingSystem.auth &&
                  productParams.products[0].trackingSystem.auth['authKey'])
                  ? productParams.products[0].trackingSystem.auth['authKey']
                  : ''
                }
                label={'Provide auth key for your tracking/incident management system'}
                onChange={(event) => handleAuthChange(event, 'authKey')}
                disabled={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_SELF)}
                fullWidth
                autoComplete='off'
                className='textFieldStyle'
              />
              {(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem &&
                  productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_JIRA) ?
              (<>
              <JiraFieldsMapping jiraFieldList={jiraFieldList} handleChangeJiraFieldMapping={handleChangeJiraFieldMapping} productParams={productParams}/>
              <JiraFieldFilters productParams={productParams} handleChangeExtSeverityFilter={handleChangeExtSeverityFilter} handleChangeExtCategoryFilter={handleChangeExtCategoryFilter}/>
              </>): '' }
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={(productParams && productParams.products && productParams.products[0] &&
                      productParams.products[0].trackingSystem)
                      ? productParams.products[0].trackingSystem.uploadToTrackingSystem
                      : false}
                    onChange={(event) => handleUploadDataToTrackingSystem(event)}
                    value="trackingSystemSeverityDetails"
                    disabled={(productParams && productParams.products && productParams.products[0] &&
                      productParams.products[0].trackingSystem &&
                      productParams.products[0].trackingSystem.auth &&
                      productParams.products[0].trackingSystem.url.length < 2 &&
                      productParams.products[0].trackingSystem.type === TRACKING_SYSTEM_SELF)}
                  />
                }
                label={
                  <Typography color="textSecondary">
                    {"Upload Bug feedback to tracking system"}
                  </Typography>
                }
                labelPlacement={'start'}
              /> */}
            </Grid>
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
      { renderExtSystemSettingsPage()}
    </Fragment>
  );
};
export default ExtSystemConfig;
