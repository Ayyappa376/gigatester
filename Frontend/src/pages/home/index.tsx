import React, { useEffect, useState } from 'react';
// import { useActions, setSystemDetails, setCurrentPage } from '../../actions';
// import { Http } from '../../utils';
import { Container, Grid, Typography } from '@material-ui/core';
// import GigatesterBg from './gigatester_bg.jpeg';
import { makeStyles } from '@material-ui/styles';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../reducers';
import { LatestNews } from '../../components/home/rightPane';
import  PageFooter  from '../../components/pageFooter';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: '7%',
    padding: 0,
  },
  img: {
    width: '100%',
    // objectFit: 'contain',
    height: '84vh',
  },
  textAlign: {
    position: 'absolute',
    top: '30%',
    left: '5%',
    color: '#042E5B',
    fontSize: '18px'
    // transform: 'translate(-50%, -100%)'
  }
});

const Home = (props: any) => {
  const classes = useStyles();
  // const setSysDetails = useActions(setSystemDetails);
  // const userStatus = useSelector((state: IRootState) => state.user.idToken);
  // const systemDetails = useSelector((state: IRootState) => state.systemDetails);
  // const stateVariable = useSelector((state: IRootState) => state);
  // const setCurrentPageValue = useActions(setCurrentPage);

  // console.log(userStatus);

  // useEffect(() => {
  //   setCurrentPageValue('');
  //   if (
  //     !systemDetails ||
  //     systemDetails.appClientId === '' ||
  //     systemDetails.appClientURL === ''
  //   ) {
  //     Http.get({
  //       url: '/api/v2/settings/cognito',
  //       state: { stateVariable },
  //       customHeaders: { noauthvalidate: 'true' },
  //     })
  //       .then((response: any) => {
  //         setSysDetails(response);
  //       })
  //       .catch((error: any) => {
  //         props.history.push('/error');
  //       });
  //   }
  // }, []);

  // let redirectUrl: string;
  // if (userStatus) {
  //   redirectUrl = '/auth';
  // } else {
  //   redirectUrl = `https://${systemDetails.appClientURL}/login?response_type=token&client_id=${systemDetails.appClientId}&redirect_uri=https://${window.location.host}/auth`;
  // }

  return (
    // tslint:disable-next-line: jsx-wrap-multiline
    <Container
      maxWidth='xl'
      classes={{
        root: classes.root,
      }}
    >
       <Grid container spacing={1} >
        {/* <TopPane /> */}
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} style={{ marginTop: '10px' }}>
            {/* <RocordsCount /> */}
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '15px' }}>
            {/* <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>BUZZ</Typography>
            <UsersFeedback /> */}
          </Grid>
          </Grid>
          <Grid item xs={12} sm={4} style={{ marginTop: '10px' }}>
          <Typography style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Latest News </Typography>
          <LatestNews />
          <LatestNews />
          <LatestNews />
          </Grid>
          <PageFooter />
          </Grid>
          

      {/* <img
        className={classes.img}
        src={GigatesterBg}
        alt='Are you doing it right?'
      />
      <div className={classes.textAlign}>GigaTester is a product to test applications by <br /> <span style={{ paddingLeft: '80px' }}> External/Freelance testers </span> </div> */}
    </Container>
  );
};

export default Home;
