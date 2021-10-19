import React, { useEffect, useState, Fragment } from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import Container from '@material-ui/core/Container';
import {
  fetchAssesmentData,
  resetAssessmentDetail,
  unsetContinueAssessmentNotificationShown,
  fetchAssessmentQuestionInitialize,
} from '../../actions/assesment';
import {
  useActions,
  resetResultState,
  setAppBarLeftText,
  setAppBarCenterText,
} from '../../actions';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactGA from 'react-ga';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import './style.css';
import { buttonStyle } from '../../common/common';
import { setAssessmentStartTime } from '../../actions/assesment/assessment-time';
import * as constantValues from '../../common/constantValues';
import { Text } from '../../common/Language';

interface IAssesmentProps extends RouteComponentProps { }

const defaultAssesmentId: string | null = null;

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    textAlign: 'center',
    alignContent: 'center',
    height: '60vh',
    width: '100%',
    position: 'relative',
    top: '120px',
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: '80px 100px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'inherit',
  },
  info1: {
    textAlign: 'justify',
    fontSize: '16px',
    color: '#444',
    fontWeight: 300,
  },
  info2: {
    textAlign: 'justify',
    fontSize: '16px',
    color: '#444',
    fontWeight: 300,
    minWidth: '100%',
  },
  info3: {
    textAlign: 'left',
    fontSize: '16px',
    color: '#444',
    fontWeight: 300,
    minWidth: '100%',
  },
  progress: {
    margin: theme.spacing(4),
  },
  bottomButton: {
    margin: theme.spacing(6),
    marginBottom: '0px',
    ...buttonStyle,
  },
  textField: {
    borderBottom: 'none!important',
    boxShadow: 'none!important',
    width: '80%',
  },
}));

function Assesment(props: IAssesmentProps) {
  const classes = useStyles();
  const fetchAssesmentSummary = useActions(fetchAssesmentData);
  const info1 =
    'This assessment focuses on measuring your maturity in following categories XXYYZZ.  In order to get accurate picture, we recommend you to take this assessment without peer help and in one go. We also recommend not to overthink while answering the questions.';
  const info2 =
    ' This is a multiple choice assessment and should take approximately 20-30 min.';
  // const assesmentQuestion = useSelector((state: IRootState) =>
  // state.assesment.assesmentQuestion);
  const assesmentSummary = useSelector(
    (state: IRootState) => state.assesment.assesmentSummary
  );
  const assesmentMarkedAnswers = useSelector(
    (state: IRootState) => state.assesment.markedAnswers
  );
  const selectedAssessmentType = useSelector(
    (state: IRootState) => state.assesment.selectedAssessmentType
  );
  const assessmentTypeData = useSelector(
    (state: IRootState) => state.assesment.assessmentType
  );
  const userTeam = useSelector((state: IRootState) => state.user.team);
  const userAllTeams = useSelector((state: IRootState) => state.user.teams);
  const [assesmentId, setAssesmentId] = useState(defaultAssesmentId);
  const [startAssessment, setStartAssessment] = useState(false);
  const resetResult = useActions(resetResultState);
  const resetAssessmentDetailState = useActions(resetAssessmentDetail);
  const resetAssessmentQuestion = useActions(fetchAssessmentQuestionInitialize);
  const [categoryString, setCategoryString] = useState('');
  const [fetchStatus, setFetchStatus] = useState(false);
  const setLeftDisplayText = useActions(setAppBarLeftText);
  const setCenterDisplayText = useActions(setAppBarCenterText);
  const unsetContinueAssessmentModalDisplayed = useActions(
    unsetContinueAssessmentNotificationShown
  );
  const startTimers = useActions(setAssessmentStartTime);
  const systemDetails = useSelector((state: IRootState) => state.systemDetails);
  const [trialUserEmail, setTrialUserEmail] = useState<string>('');
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  let msgFailure = failureMessage;

  useEffect(() => {
    unsetContinueAssessmentModalDisplayed();
    resetAssessmentQuestion();
    fetchAssesmentSummary(selectedAssessmentType, userTeam);
    if (assessmentTypeData.status === 'success') {
      assessmentTypeData.data.questionnaires.forEach((el: any) => {
        if (el.questionnaireId === selectedAssessmentType.questionnaireId) {
          setLeftDisplayText(el.displayName);
          setCenterDisplayText(`Platform: ${userTeam}`);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (assesmentSummary.status === 'success' && startAssessment) {
      const assesmentId = assesmentSummary.data!.assessmentId;
      resetResult();
      resetAssessmentDetailState();
      setAssesmentId(assesmentId);
      startTimers();
    }
  }, [startAssessment, assesmentSummary.status]);

  useEffect(() => {
    if (
      assesmentSummary.status === 'success' &&
      Object.keys(assesmentSummary.data!.categoryList).length > 0
    ) {
      let categories = '';
      Object.keys(assesmentSummary.data!.categoryList).forEach((el, i) => {
        if (i === 0) {
          categories = el + ', ';
        } else if (
          i ===
          Object.keys(assesmentSummary.data!.categoryList).length - 1
        ) {
          categories = categories + el;
        } else {
          categories = categories + el + ', ';
        }
      });
      setCategoryString(categories);
    }
  }, [assesmentSummary.status]);

  useEffect(() => {
    if (assesmentId !== null) {
      props.history.push(`${props.match.url}/${assesmentId}/question/1`);
    }
  }, [assesmentId]);

  useEffect(() => {
    if (
      assesmentSummary.status === 'success' ||
      assesmentSummary.status === 'fail'
    ) {
      setFetchStatus(true);
    }
  }, [assesmentSummary.status]);

  const handleClose = () => {
    setFailure(false);
  };

  const handleEmailChange = (event: any) => {
    setTrialUserEmail(event.target.value);
  };

  const getAssessmentDataAndRedirect = () => {
    ReactGA.event({
      category: 'Assessment',
      action: 'Assessment started',
      label: assesmentId ? assesmentId : '',
    });
    if (systemDetails.mode === constantValues.TRIAL_MODE) {
      if (trialUserEmail === '') {
        setFailureMessage(<Text tid='enterValidEmailToStartTrial' />);
        setFailure(true);
      } else {
        //TODO: overwrite the email in user state object to this email
        setStartAssessment(true);
      }
    } else {
      setStartAssessment(true);
    }
  };

  const renderStartAssessmentComponent = () => {
    let tempo: any[] = [];
    if (
      assesmentSummary!.data!.description &&
      assesmentSummary!.data!.description !== 'false'
    ) {
      tempo = assesmentSummary!.data!.description.split('\n');
    }
    return (
      <Fragment>
        <div className='start-assessment'>
          <Paper className={classes.paper}>
            {tempo.length > 0 ? (
              <div>
                {tempo.map((el, i) => {
                  return (
                    <div key={i}>
                      <Typography className={classes.info1} variant='body1'>
                        {el}
                      </Typography>
                      <br />
                    </div>
                  );
                })}
                <Typography className={classes.info3} variant='body1'>
                  <Text tid='numberOfQuestions' />
                  {assesmentSummary!.data!.numberOfQuestions}
                </Typography>
                {assesmentSummary!.data!.timeOut && (
                  <Typography className={classes.info3} variant='body1'>
                    <Text tid='time' />
                    {assesmentSummary!.data!.timeOutTime} minutes
                  </Typography>
                )}
              </div>
            ) : (
              <div>
                <Typography className={classes.info1} variant='body1'>
                  {info1.replace('XXYYZZ', categoryString)}
                </Typography>
                <br />
                <Typography className={classes.info2} variant='body1'>
                  {info2}
                </Typography>
                <br />
                <Typography className={classes.info3} variant='body1'>
                  <Text tid='numberOfQuestions' />
                  {assesmentSummary!.data!.numberOfQuestions}
                </Typography>
                {assesmentSummary!.data!.timeOut && (
                  <Typography className={classes.info3} variant='body1'>
                    <Text tid='time' />
                    {assesmentSummary!.data!.timeOutTime} minutes
                  </Typography>
                )}
              </div>
            )}
            {systemDetails.mode === constantValues.TRIAL_MODE ? (
              <div>
                <Typography className={classes.info3} variant='body1'>
                  <Text tid='enterEmailAndClickStartButton' />
                </Typography>
                <TextField
                  required={true}
                  type='string'
                  id='email'
                  name='email'
                  value={trialUserEmail}
                  label='Your Email'
                  onChange={handleEmailChange}
                  autoComplete='off'
                  className={classes.textField}
                />
              </div>
            ) : (
              <div />
            )}
            <Button
              onClick={getAssessmentDataAndRedirect}
              variant='outlined'
              size='large'
              className={classes.bottomButton}
            >
              {Object.keys(assesmentMarkedAnswers).length === 0 ? (
                <Text tid='startAssessment' />
              ) : (
                <Text tid='continueTesting' />
              )}
            </Button>
          </Paper>
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
        </div>
      </Fragment>
    );
  };

  const summaryApiWaitLoading = () => {
    return (
      <Fragment>
        <CircularProgress className={classes.progress} />
        <Typography>
          <Text tid='loadingAssessment' />
        </Typography>
      </Fragment>
    );
  };

  const renderAssessmentSummary = (match: any) => {
    // console.log(
    //   assesmentSummary.status,
    //   'userAllTeams.length',
    //   userAllTeams.length
    // );
    return (
      <Fragment>
        {assesmentSummary.status === 'success' && userAllTeams.length > 0
          ? renderStartAssessmentComponent()
          : summaryApiWaitLoading()}
      </Fragment>
    );
  };

  const redirectToLogin = () => {
    const error = JSON.stringify(assesmentSummary!.error);
    const object = JSON.parse(error);
    if (object.code) {
      if (object.code === 401) {
        return <Redirect to='/relogin' />;
      }
    }
    return <Redirect to='/error' />;
  };

  return (
    <Container className={classes.containerRoot}>
      {assesmentSummary.status === 'fail' && fetchStatus
        ? redirectToLogin()
        : renderAssessmentSummary(props.match)}
    </Container>
  );
}

export default withRouter(Assesment);
