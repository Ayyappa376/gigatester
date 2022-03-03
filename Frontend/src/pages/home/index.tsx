import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useActions, setSystemDetails, setCurrentPage } from '../../actions';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { Auth } from 'aws-amplify';
import jwtDecode from 'jwt-decode';
import SignupForm from '../../components/signUpForm';
import feedback_img from './feedback_bg.jpg';
import feedbackagent_img from './feedback_agent.png';
import feedbackdashboard_img from './feedback_dashboard.png';
import feedbackconfigure_img from './feedback_configure.png';
import { Loader } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1.2em',
    padding: 0,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  sectionTop: {
    background: '#618abb',
  },
  pageSection: {
    margin: '50px',
  },
  pageBlurbSection: {
    margin: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
  },
  headerText: {
    fontWeight: 'normal',
    fontSize: '20px',
  },
  ImgContainer: {
    borderRadius: '2px',
    padding: 0,
    textAlign: 'right',
    height: '100%',
    marginBottom: '-4px',
    boxShadow: '0px 1px 6px 0px rgba(0,0,0,1)',
  },
  ImgHeader: {
    borderRadius: 0,
    padding: 0,
    textAlign: 'right',
    height: '100%',
    marginBottom: '-4px',
  },
  homeImg: {
    width: '100%',
    objectFit: 'contain',
    height: '100%',
  },
  loader: {
    paddingTop: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    padding: "10px 15px",
    fontWeight: 'bold',
  },
  sectionText: {
    padding: "5px 15px",
    fontSize: "18px",
    lineHeight: "22px",
    colour: '#999999',
  },
  trialBtn: {
    marginLeft: '0px',
    backgroundColor: '#00235e',
    '&:hover, &:focus, &:active': {
      backgroundColor: '#00235e',
    },
    color: 'white',
    boxShadow: '0px 2px 5px 0px rgba(0,0,0,1)',
  },
}));

const Home = (props: any) => {
  const classes = useStyles();
  const setSysDetails = useActions(setSystemDetails);
  const stateVariable = useSelector((state: IRootState) => state);
  const setCurrentPageValue = useActions(setCurrentPage);
  const [openSignup, setOpenSignup] = useState(false);
  const [superUserStateVariable, setSuperUserStateVariable] = useState(stateVariable);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setCurrentPageValue('');
      Http.get({
        url: '/api/v2/settings/cognito',
        state: { stateVariable },
        customHeaders: { noauthvalidate: 'true' },
      })
        .then((response: any) => {
          const user = response.systemUser;
          const pwd = response.systemPassword;
          setSysDetails({ ...response, systemUser: '', systemPassword: '' });
            Auth.signIn(user, pwd)
            .then((user: any) => {
              if (
                user &&
                user.signInUserSession.idToken &&
                user.signInUserSession.accessToken
              ) {
                const tokenInfo: any = jwtDecode(
                  user.signInUserSession.idToken.jwtToken
                );
              superUserStateVariable['user'] = {
                idToken: user.signInUserSession.idToken.jwtToken,
                accessToken: user.signInUserSession.accessToken,
                userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
                team:
                  tokenInfo['custom:teamName'] && tokenInfo['custom:teamName'] !== ''
                    ? tokenInfo['custom:teamName']
                    : 'Others',
                teams: [],
                roles: ['Admin'],
              };
              setSuperUserStateVariable(superUserStateVariable);
            }
            setIsFetching(false);
          })
          .catch((error) => {
            console.log(error);
            setIsFetching(false);
          })
        })
        .catch((error: any) => {
          setIsFetching(false);
          props.history.push('/error');
        });
  }, []);

  const getSignupDialog = (state: boolean) => {
    setOpenSignup(state);
  };

  const handleCloseSignup = (state: boolean) => {
    setOpenSignup(state);
  };

  if (isFetching) {
    return (
      <Container
        maxWidth='xl'
        classes={{
          root: classes.root,
        }}
      >
        <Container className={classes.loader}>
          <Loader />
        </Container>
      </Container>
    );
  }

  return (
    <Container
      maxWidth='xl'
      classes={{
        root: classes.root,
      }}
    >
      <Grid container>
        <Grid container className={classes.sectionTop}>
          <Grid item xs={12} sm={7} style={{ padding: '50px', paddingTop: "170px" }}>
            <Typography variant='h4'>
              <strong>GigaTester Feedbacks</strong>
            </Typography>
            <Typography variant='h5'>
              Customers give unbiased opinions. Get the feedback from them and build the product they love.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Container component='div' className={classes.ImgHeader}>
              <img
                className={classes.homeImg}
                src={feedback_img}
                alt='Seemlessly receive feedback from users'
              />
            </Container>
          </Grid>
        </Grid>
        <Container className={classes.pageBlurbSection}>
          <Grid container className={classes.pageSection}>
            <Grid item xs={12}>
              <Typography className={classes.headerText}>
                GigaTester enables Product teams to capture feedback and bugs reported by customers
                directly without going through middle layer.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => getSignupDialog(true)}
                color="primary"
                size="large"
                data-testid="signUp"
                className={classes.trialBtn}
              >
                Let's try out
              </Button>
            </Grid>
          </Grid>
          <Grid container className={classes.pageSection}>
            <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
              <Typography variant="h5" className={classes.sectionTitle}>Feedback agent</Typography>
              <Typography className={classes.sectionText}>
                Capture feedback or bugs with screenshots, marks and comments on particular sections of
                the app visually. Do a screen recording if user wants to explain different actions in the
                application. No time to type the feedback, no problem. Just leave your voice feedback.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Container component='div' className={classes.ImgContainer}>
                <img
                  className={classes.homeImg}
                  src={feedbackagent_img}
                  alt='GigaTester Feedback Agent'
                />
              </Container>
            </Grid>
          </Grid>
          <Grid container className={classes.pageSection}>
            <Grid item xs={12} sm={5}>
              <Container component='div' className={classes.ImgContainer}>
                <img
                  className={classes.homeImg}
                  src={feedbackdashboard_img}
                  alt='GigaTester Feedback Dashboard'
                />
              </Container>
            </Grid>
            <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
              <Typography variant="h5" className={classes.sectionTitle}>Dashboard</Typography>
              <Typography className={classes.sectionText}>
                Get consolidated report and listing of all the feedbacks and bugs submitted by your users. Reports include bar and piecharts of feedback by category and a detailed list of individual-user submissions, which can be filtered for a more percise look.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.pageSection}>
            <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
              <Typography variant="h5" className={classes.sectionTitle}>Easy configuration</Typography>
              <Typography className={classes.sectionText}>
                Customise the agent to behave according to your app. Customise how it looks, where it is
                placed, what and how you wish your user to submit as reviews, what information it collects
                and how it integrates with your tracking systems.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Container component='div' className={classes.ImgContainer}>
                <img
                  className={classes.homeImg}
                  src={feedbackconfigure_img}
                  alt='GigaTester Feedback configuration'
                />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {openSignup && (
      <SignupForm
        openSignup={openSignup}
        handleCloseSignup={handleCloseSignup}
        superUserStateVariable={superUserStateVariable}
      />
      )}
    </Container>
  );
};

export default Home;
