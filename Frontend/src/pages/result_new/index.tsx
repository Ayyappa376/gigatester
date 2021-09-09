import React, { useEffect, Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// tslint:disable: all
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useActions } from '../../actions';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Typography } from '@material-ui/core';
import { fetchAssesmentResultData } from '../../actions/result';
import Success from '../../components/success-page';
// import { IAssessmentFinalResult } from '../../model';
import 'react-circular-progressbar/dist/styles.css';
import ReactGA from 'react-ga';
import { AssessmentView, Feedback } from '../../components';
import { ModalComponentInfo } from '../../components/modal-info';
import { Text } from '../../common/Language';

// interface IResultRouteParams {
//   assesmentId: string;
// }

// type IResultProps = RouteComponentProps<IResultRouteParams>;

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: '120px',
  },
  progress: {
    margin: theme.spacing(4),
  },
  containerSecondary: {
    marginTop: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

function Result(props: any) {
  const classes = useStyles();
  const fetchAssessmentResult = useActions(fetchAssesmentResultData);
  const [fetchStatus, setFetchStatus] = useState(false);
  const assesmentResult = useSelector(
    (state: IRootState) => state.assesment.result
  );
  const hideResult = useSelector((state: IRootState) =>
    state.assesment.assesmentSummary.data
      ? state.assesment.assesmentSummary.data.hideResult
      : false
  );
  const assesmentId = props.match.params.assesmentId;
  const [openModal, setOpenModal] = useState(
    props.location
      ? props.location.state
        ? props.location.state.timerExpiry
          ? true
          : false
        : false
      : false
  );
  let msgSuccess = <Text tid='thanksForGivingThisAssessment' />;

  const renderLoadingIcon = () => {
    return (
      <Fragment>
        <CircularProgress className={classes.progress} />
        <Typography variant='h4'>
          <Text tid='loadingResult' />
        </Typography>
      </Fragment>
    );
  };

  useEffect(() => {
    ReactGA.event({
      category: 'Assessment',
      action: 'Fetching results',
    });
    fetchAssessmentResult(assesmentId);
  }, []);

  useEffect(() => {
    if (
      assesmentResult.status === 'success' ||
      assesmentResult.status === 'fail'
    ) {
      setFetchStatus(true);
    }
  }, [assesmentResult.status]);

  const modalButtonClicked = () => {
    setOpenModal(false);
  };

  if (hideResult) {
    return (
      <Container
        maxWidth='xl'
        component='div'
        classes={{
          root: classes.containerSecondary,
        }}
      >
        <Success message={msgSuccess} />
      </Container>
    );
  }

  if (
    assesmentResult.status === 'success' &&
    assesmentResult.data !== null &&
    fetchStatus
  ) {
    return (
      <Container
        maxWidth='xl'
        component='div'
        classes={{
          root: classes.containerSecondary,
        }}
      >
        <AssessmentView
          result={assesmentResult.data!.result}
          assessmentData={assesmentResult.data.assessmentSummary}
          recommendations={assesmentResult.data.result.recommendations}
          showRecommendations={
            assesmentResult.data.showRecommendations
              ? assesmentResult.data.showRecommendations
              : false
          }
          backButtonAction={null}
          boolRenderBackButton={false}
          userLevels={assesmentResult.data.userLevels}
          bestScoringAssessment={assesmentResult.data.bestScoringAssessment}
          benchmarkScore={assesmentResult.data.benchmarkScore}
        />
        {!openModal && <Feedback />}
        <ModalComponentInfo
          message='The assessment time is over.'
          openModal={openModal}
          handleModalButtonClicked={modalButtonClicked}
        />
      </Container>
    );
  }

  if (assesmentResult.status === 'fail' && fetchStatus) {
    const error = JSON.stringify(assesmentResult!.error);
    const object = JSON.parse(error);
    if (object.code) {
      if (object.code === 401) {
        return <Redirect to='/relogin' />;
      }
    }
    return <Redirect to='/error' />;
  }

  return (
    <Container
      maxWidth='md'
      component='div'
      classes={{
        root: classes.containerRoot,
      }}
    >
      {renderLoadingIcon()}
    </Container>
  );
}

export default Result;
