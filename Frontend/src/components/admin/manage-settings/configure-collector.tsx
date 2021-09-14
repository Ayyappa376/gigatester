import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
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
  Paper,
} from '@material-ui/core';
import { IRootState } from '../../../reducers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { MANAGE_SETTINGS } from '../../../pages/admin';
import Success from '../../success-page';
import { buttonStyle } from '../../../common/common';
import {
  // IFieldConfigAttributes,
  ICollectorConfigDetails,
  ICollectorConfig,
} from '../../../model/system';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
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
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
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
  rootp: {
    width: '100%',
    padding: '10px 0px'
  },
  nonHighlighted: {
    color: 'inherit',
    backgroundColor: 'inherit',
  },
  smallColumn: {
    // flexBasis: '12.5%',
      flexBasis: '10%',
  },
  detailsNonHighlighted: {
    alignItems: 'center',
  },
  helpText: { fontSize: '12px', color: '#808080' },
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
  let msgSuccess = <Text tid={`${props.objType}.UpdatedSuccessfully`} />;

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

  const handleChangeValue = (
    event: any,
    colKey: string,
    colIndex: number,
    attrKey: string
  ) => {
    let temp: ICollectorConfigDetails = { ...collectors };
    temp[colKey][colIndex].attributes[attrKey].defaultValue = event.target.value;
    setCollectors(temp);
  };

  const renderAttribute = (collector: ICollectorConfig, colKey: string, colIndex: number, attrKey: string) => {
    const collectorAttr: any = collector.attributes[attrKey];
    return (
      <div className={classes.rootp}>
        <TextField
          required={collectorAttr.mandatory}
          type='string'
          id={`field_${colKey}_${colIndex}_${attrKey}`}
          name={`field_${colKey}_${colIndex}_${attrKey}`}
          value={collectorAttr.defaultValue}
          label={collectorAttr.displayName}
          onChange={(event: any) =>
            handleChangeValue(event, colKey, colIndex, attrKey)
          }
          fullWidth
          autoComplete='off'
          className='textFieldStyle'
        />
        <Typography
          key={`help_${colKey}_${colIndex}_${attrKey}`}
          className={classes.helpText}
        >
          {collectorAttr.helpText
            ? collectorAttr.helpText
            : ''}
        </Typography>
      </div>
    );
  };

  const renderCollectorsDetails = (colKey: string, colIndex: number, collector: ICollectorConfig) => {
    return (
      <ExpansionPanel className={classes.title}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1c-content'
          id='panel1c-header'
          className={classes.nonHighlighted}
        >
          <Typography variant='h6' gutterBottom>
            {collector.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detailsNonHighlighted}>
        <div style={{ display: 'block', width: '100%' }}>
          <Grid container alignItems='center'>
            <Grid item sm={1}>
              <InputLabel>
                Run every {/*<Text tid='runEvery' />*/}
              </InputLabel>
            </Grid>
            <Grid item sm={1}>
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
                className='textFieldStyle'
                style={{
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
              />
            </Grid>
            <Grid item sm={2}>
              <InputLabel>
                hours {/*<Text tid='hours' />*/}
              </InputLabel>
            </Grid>
            <Grid item sm={3} />
            <Grid item sm={5}>
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
            </Grid>
          </Grid>
          {Object.keys(collector.attributes).map((attrKey: string, i: number) =>
            (
              <Grid item sm={12} key={i}>
                {renderAttribute(collector, colKey, colIndex, attrKey)}
              </Grid>
            )
          )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  const renderCollectorsEditor = () => {
    if (collectorsPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
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
      <Container maxWidth='lg' component='div' className='containerRoot'>
        <Backdrop className={classes.backdrop} open={backdropOpen}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <div style={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Typography variant='h6' gutterBottom className={classes.title}>
                <Text tid={`admin.settings.${props.objType}.name`} />
              </Typography>
              <Typography color='textSecondary'>
                (Note: give a number between 1 and 24)
              </Typography>
            </Grid>
            <Grid item sm={12}>
              {Object.keys(collectors).map((colKey: string) =>
                collectors[colKey].map(
                  (collector: ICollectorConfig, colIndex: number) => {
                    return (
                      <div key={colIndex} className={classes.rootp}>
                        {renderCollectorsDetails(colKey, colIndex, collector)}
                      </div>
                    );
                  }                 
                )
              )}
            </Grid>
          </Grid>
        </div>
        {collectors && (
          <div className='bottomButtonsContainer'>
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
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditSettingsCollectorConfig);
