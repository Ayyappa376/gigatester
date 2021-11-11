import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useActions, setSystemDetails, setCurrentPage } from '../../actions';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { PlatformsView, RocordsCount, TestersView, UsersFeedback } from '../../components/home/leftPane'
import TopPane from '../../components/home/topPane'
import { LatestNews } from '../../components/home/rightPane';
import PageFooter from '../../components/pageFooter';

const useStyles = makeStyles({
  root: {
    paddingTop: '4%',
    padding: 0,
    overflow: 'hidden',
  },
  marginTopTen: {
    marginTop: '10px'
  },
  marginTopTwenty: {
    marginTop: '20px'
  }
});

const Home = (props: any) => {
  const classes = useStyles();
  const setSysDetails = useActions(setSystemDetails);
  const systemDetails = useSelector((state: IRootState) => state.systemDetails);
  const stateVariable = useSelector((state: IRootState) => state);
  const setCurrentPageValue = useActions(setCurrentPage);

  useEffect(() => {
    setCurrentPageValue('');
    if (
      !systemDetails ||
      systemDetails.appClientId === '' ||
      systemDetails.appClientURL === ''
    ) {
      Http.get({
        url: '/api/v2/settings/cognito',
        state: { stateVariable },
        customHeaders: { noauthvalidate: 'true' },
      })
        .then((response: any) => {
          setSysDetails(response);
        })
        .catch((error: any) => {
          props.history.push('/error');
        });
    }
  }, []);

  return (
    <Container
      maxWidth='xl'
      classes={{
        root: classes.root,
      }}
    >
      <Grid container spacing={2} >
        <TopPane />
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={7}>
          <Grid item xs={12} sm={12} className={classes.marginTopTen}>
            <RocordsCount />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <UsersFeedback />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <TestersView />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <PlatformsView />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.marginTopTen}>
          <LatestNews />
        </Grid>
        <PageFooter />
      </Grid>
    </Container >
  );
};

export default Home;
