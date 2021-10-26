import React, { useEffect, useState } from 'react';
import { AssessmentView, Loader } from '../../components';
import { Redirect } from 'react-router';
import { fetchAssessmentDetail, useActions } from '../../actions';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
// import { savePDF } from '@progress/kendo-react-pdf';
import ErrorPage from '../error_page';
// interface IAssessmentDetailRouteParams {
//     assessmentId: string;
// }
const useStyles = makeStyles((theme) => ({
  containerSecondary: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: '120px',
  },
}));

function AssessmentDetails(props: any) {
  const classes = useStyles();
  const fetchUserAssessmentDetail = useActions(fetchAssessmentDetail);
  const assessmentDetail = useSelector(
    (state: IRootState) => state.assesment.assessmentDetail
  );
  const assessmentId = props.match
    ? props.match.params.assessmentId
      ? props.match.params.assessmentId
      : ''
    : '';

  const prevPath: string = props.location
    ? props.location.state
      ? props.location.state.prevPath
        ? props.location.state.prevPath
        : ''
      : ''
    : '';

  useEffect(() => {
    let isResult: boolean = false;
    if (prevPath !== '') {
      if (prevPath.includes('result')) {
        isResult = true;
      }
    }
    if (assessmentId !== '') {
      fetchUserAssessmentDetail(assessmentId, isResult);
    } else {
      fetchUserAssessmentDetail(props.assessmentId, false);
    }
  }, []);


  const handleBackButtonClick = () => {
    props.history.push(prevPath);
  };

  /* const download = () => {
        const input = document.getElementById('divToPrint') as HTMLElement;
        savePDF(input, { paperSize: 'auto' });
    } */

  if (
    assessmentDetail.status === 'success' &&
    assessmentDetail.data !== null
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
          result={assessmentDetail.data!.result}
          assessmentData={assessmentDetail.data.assessmentSummary}
          recommendations={assessmentDetail.data.result.recommendations}
          showRecommendations={
            assessmentDetail.data.showRecommendations
              ? assessmentDetail.data.showRecommendations
              : false
          }
          backButtonAction={handleBackButtonClick}
          boolRenderBackButton={prevPath !== ''}
          userLevels={assessmentDetail.data.userLevels}
          bestScoringAssessment={assessmentDetail.data.bestScoringAssessment}
          benchmarkScore={assessmentDetail.data.benchmarkScore}
        />
      </Container>
    );
  }

  if (assessmentDetail.status === 'fail') {
    const error = JSON.stringify(assessmentDetail!.error);
    const object = JSON.parse(error);
    if (object.code) {
      if (object.code === 401) {
        return <Redirect to='/relogin' />;
      }
    }
    if (props.assessmentId) {
      return <ErrorPage />;
    }
    return <Redirect to='/error' />;
  }

  return (
    <Container
      maxWidth='md'
      component='div'
      classes={{
        root: classes.containerSecondary,
      }}
    >
      <Loader />
    </Container>
  );
}

export default AssessmentDetails;
