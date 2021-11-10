import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useActions, setSystemDetails, setCurrentPage } from '../../actions';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { PlatformsView, RocordsCount, TestersView, UsersFeedback } from '../../components/home/leftPane'
import TopPane from '../../components/home/topPane'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: '4%',
    padding: 0,
  },
  button: {
    borderRadius: "5em",
    marginBottom: '5px',
    float: 'right',
    lineHeight: 1.2
  },
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
      <Grid container spacing={1} >
        <TopPane />
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} style={{ marginTop: '10px' }}>
            <RocordsCount />
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '20px' }}>
            <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>BUZZ</Typography>
            <UsersFeedback />
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '20px' }}>
            <Grid container spacing={1} >
              <Grid item xs={12} sm={6}>
                <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Testers</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" color="primary" size='small' className={classes.button}>
                  View All
                </Button>
              </Grid>
            </Grid>
            <TestersView />
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '20px' }}>
            <Grid container spacing={1} >
              <Grid item xs={12} sm={6}>
                <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Platforms</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" color="primary" size='small' className={classes.button}>
                  View All
                </Button>
              </Grid>
            </Grid>
            <PlatformsView />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Latest News</Typography>
        </Grid>
      </Grid>
    </Container >
  );
};

export default Home;
