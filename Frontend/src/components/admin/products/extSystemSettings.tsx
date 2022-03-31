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
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import {
  IProductParams, TRACKING_SYSTEM_SELF, TRACKING_SYSTEM_JIRA
} from '../../../model';
import { MANAGE_PRODUCTS } from '../../../pages/admin';
import { LightTooltip } from '../../common/tooltip';
import Success from '../../success-page';

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

const EditExternalSystemSettings = (props: any) => {
  const classes = useStyles();
  const [extSystemSettingsPosted, setExtSystemSettingsPosted] = useState(false);
  const [extSystemSettingsFetched, setExtSystemSettingsFetched] = useState(false);
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
        if (!response.products[0].trackingSystem) {
          response.products[0].trackingSystem = {
            auth: {},
            type: TRACKING_SYSTEM_SELF,
            url: '',
          }
        }
        console.log('resp', response);
        setProductParams(response);
        setExtSystemSettingsFetched(true);
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

  const handleSystemTypeChange = (event: any) => {
    if (productParams) {
      const temp: IProductParams | undefined = { ...productParams };
      if (temp && temp.products && temp.products[0] && temp.products[0].trackingSystem) {
        temp.products[0].trackingSystem.type = event.target.value;
        setProductParams(temp);
      }
    }
  }

  const renderExtSystemSettingsPage = () => {
    if (extSystemSettingsPosted) {
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
            &nbsp;{productParams && productParams.products && productParams.products[0] && productParams.products[0].name ? productParams.products[0].name : ''}
            &nbsp;, version:
            &nbsp;{productParams && productParams.products && productParams.products[0] && productParams.products[0].version ? productParams.products[0].version : ''}
          </Typography>
          <Paper className={classes.sections}>
            <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >
              <Grid item xs={12}>
                <Typography variant="h6">General Widget Settings:</Typography>
              </Grid>

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
                  productParams.products[0].trackingSystem &&
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
      {extSystemSettingsFetched && productParams ? (
        renderExtSystemSettingsPage()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};
export default withRouter(EditExternalSystemSettings);
