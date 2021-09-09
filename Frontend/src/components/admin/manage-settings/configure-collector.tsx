import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  TextField,
  Container,
  Backdrop,
  CircularProgress,
  Button,
  makeStyles,
  Snackbar,
  SnackbarContent,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { MANAGE_SETTINGS } from '../../../pages/admin';
import Success from '../../success-page';
import { buttonStyle } from '../../../common/common';
import {
  IFieldConfigAttributes,
  ICollectorConfigDetails,
  ICollectorConfig,
} from '../../../model/system';
import { Text } from '../../../common/Language';
import './style.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  button: {
    marginTop: '28px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  textField: {
    borderBottom: 'none!important',
    boxShadow: 'none!important',
  },
  bottomButtonsContainer: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    marginTop: '28px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  loader: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  containerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  circularProgress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    float: 'right',
    ...buttonStyle,
  },
  root: {
    maxWidth: 800,
    margin: '15px 0',
    cursor: 'pointer',
  },
}));

const EditSettingsCollectorConfig = (props: any) => {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState(false);
  const [collectors, setCollectors] = useState<ICollectorConfigDetails>({});
  const [immediateRun, setImmediateRun] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [collectorsPosted, setCollectorsPosted] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='collectorsUpdatedSuccessfully' />;

  const fetchCollectorAttributes = () => {
    setBackdropOpen(true);
    Http.get({
      url: `/api/v2/settings/${props.objType}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setCollectors(response.config);
        initializeImmediateRun(response.config);
        setFetchedData(true);
        setBackdropOpen(false);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
          setFailure(true);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
        setBackdropOpen(false);
      });
  };

  useEffect(() => {
    fetchCollectorAttributes();
  }, []);

  const initializeImmediateRun = (config: ICollectorConfigDetails) => {
    let temp = { ...immediateRun };
    Object.keys(config).map((colKey: string) =>
      config[colKey].map((collector: ICollectorConfig) => {
        temp[collector.name] = false;
      })
    );
    setImmediateRun(temp);
  };

  const handleSubmit = () => {
    if (validatePostData()) {
      setImmediateRunTimestamps();
      Http.post({
        url: `/api/v2/settings/${props.objType}`,
        body: {
          ...collectors,
        },
        state: stateVariable,
      })
        .then((response: any) => {
          setCollectorsPosted(true);
          setBackdropOpen(false);
        })
        .catch((error) => {
          const perror = JSON.stringify(error);
          const object = JSON.parse(perror);
          if (object.code === 400) {
            setFailureMessage(object.apiError.msg);
            setFailure(true);
          } else if (object.code === 401) {
            props.history.push('/relogin');
          } else {
            setFailureMessage(<Text tid='somethingWentWrong' />);
            setFailure(true);
          }
          setBackdropOpen(false);
        });
    }
  };

  const validatePostData = () => {
    let validState = true;

    Object.keys(collectors).map((colKey: string) =>
      collectors[colKey].map(
        (collector: ICollectorConfig, colIndex: number) => {
          if (
            collector.collectorSchedule < 1 ||
            collector.collectorSchedule > 24
          ) {
            setFailure(true);
            setFailureMessage(
              <Text tid='collector.schedule.should.be.between.1.and.24' />
            );
            /*
            setFailureMessage(
              `${(
                <Text tid='collectorScheduleBeyondLimit' />
              )}`
            );
*/
            validState = false;
          }
        }
      )
    );
    return validState;
  };

  const setImmediateRunTimestamps = () => {
    let temp: ICollectorConfigDetails = { ...collectors };
    Object.keys(temp).map((colKey: string) =>
      temp[colKey].map((collector: ICollectorConfig, colIndex: number) => {
        if (immediateRun[collector.name]) {
          temp[colKey][colIndex].nextCollectorRunTimestamp = Date.now();
        }
      })
    );
    setCollectors(temp);
  };

  const handleClose = () => {
    setFailure(false);
  };

  const handleCollectorScheduleChange = (
    event: any,
    colKey: string,
    colIndex: number
  ) => {
    let temp: ICollectorConfigDetails = { ...collectors };
    temp[colKey][colIndex].collectorSchedule = event.target.value;
    setCollectors(temp);
  };

  const handleToggleImmediateRun = (
    event: any,
    colKey: string,
    colIndex: number
  ) => {
    let tempRunList = { ...immediateRun };
    const colName = collectors[colKey][colIndex].name;
    tempRunList[colName] = !tempRunList[colName];
    setImmediateRun(tempRunList);
  };

  const renderCollectorsEditor = () => {
    if (collectorsPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className={classes.bottomButtonsContainer}>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_SETTINGS);
              }}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Fragment>
      );
    }
    return (
      <Container
        maxWidth='lg'
        component='div'
        classes={{ root: classes.containerRoot }}
      >
        <Backdrop className={classes.backdrop} open={backdropOpen}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <div style={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Typography variant='h6' gutterBottom className={classes.title}>
                Collector Schedules:
              </Typography>
              <Typography color='textSecondary'>
                (Note: give a number between 1 and 24)
              </Typography>
            </Grid>
            <Grid item sm={12}>
              {Object.keys(collectors).map((colKey: string) =>
                collectors[colKey].map(
                  (collector: ICollectorConfig, colIndex: number) => (
                    <div style={{ padding: '10px' }} key={colIndex}>
                      <InputLabel>{collector.name}:</InputLabel>
                      Run every
                      <TextField
                        required={true}
                        type='number'
                        id={`schedule_${collector.name}`}
                        name={`schedule_${collector.name}`}
                        value={collector.collectorSchedule}
                        label={''}
                        onChange={(event: any) =>
                          handleCollectorScheduleChange(event, colKey, colIndex)
                        }
                        autoComplete='off'
                        InputProps={{
                          inputProps: { min: 1, max: 24 },
                          disableUnderline: true,
                        }}
                        className={classes.textField}
                        style={{
                          paddingLeft: '8px',
                          paddingRight: '8px',
                        }}
                      />
                      hours
                      <FormControlLabel
                        style={{ paddingLeft: '36px' }}
                        control={
                          <Checkbox
                            checked={
                              immediateRun[collectors[colKey][colIndex].name]
                            }
                            onChange={(event: any) => {
                              handleToggleImmediateRun(event, colKey, colIndex);
                            }}
                            value='true'
                          />
                        }
                        label={'Schedule for Immediate Run'}
                      />
                    </div>
                  )
                )
              )}
            </Grid>
          </Grid>
        </div>
        {collectors && (
          <div className={classes.bottomButtonsContainer}>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_SETTINGS);
              }}
            >
              <Text tid='goBack' />
            </Button>
            <Button
              className={classes.button}
              onClick={handleSubmit}
              variant='outlined'
            >
              <Text tid='save' />
            </Button>
          </div>
        )}
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
            message={msgFailure}
          />
        </Snackbar>
      </Container>
    );
  };

  return (
    <Fragment>
      {fetchedData ? (
        renderCollectorsEditor()
      ) : (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditSettingsCollectorConfig);
