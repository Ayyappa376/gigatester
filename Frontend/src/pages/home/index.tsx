import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, makeStyles, colors } from '@material-ui/core';
//import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useActions, setSystemDetails, setCurrentPage } from '../../actions';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { Auth } from 'aws-amplify';
import jwtDecode from 'jwt-decode';
// import {
//   PlatformsView,
//   RecordsCount,
//   TestersView,
//   UsersFeedback,
// } from '../../components/home/leftPane';
// import TopPane from '../../components/home/topPane';
// import { LatestNews } from '../../components/home/rightPane';
import SignupForm from '../../components/signUpForm';
// import { CreateOrganization } from '../../components';
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

// const usersFeedback = [
//   {
//     label:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum  been the industry standard dummy text',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has the industry standard dummy text',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been  industry standard dummy text',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//   },
//   {
//     label:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text',
//     imgPath:
//       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the standard dummy text',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

// const latestNews = [
//   {
//     label: 'Latest News : Live Blog about Testing',
//     imgPath:
//       'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
//   },
//   {
//     label: 'Latest News : Live Blog about Testing',
//     imgPath:
//       'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
//   },
//   {
//     label: 'Latest News : Live Blog about Testing',
//     imgPath:
//       'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
//   },
// ];

const Home = (props: any) => {
  const classes = useStyles();
  const setSysDetails = useActions(setSystemDetails);
  // const systemDetails = useSelector((state: IRootState) => state.systemDetails);
  const stateVariable = useSelector((state: IRootState) => state);
  const setCurrentPageValue = useActions(setCurrentPage);
  const [openSignup, setOpenSignup] = useState(false);
  // const [openOrgCreation, setOpenOrgSelection] = useState(false);
  // const [platformList, setPlatformList] = useState([]);
  // const [testerList, setTesterList] = useState([]);
  // const [testerCount, setTesterCount] = useState(0);
  // const superUserStateVariable = stateVariable;
  const [superUserStateVariable, setSuperUserStateVariable] = useState(stateVariable);
  const [isFetching, setIsFetching] = useState(true);

  // const records = [
  //   { name: 'Testers', value: testerCount },
  //   { name: 'Products', value: 20 },
  //   { name: 'Ongoing Testing', value: 35 },
  // ];

  // const getPlatformList = () => {
  //   Http.get({
  //     url: '/api/v2/platforms/',
  //     state: superUserStateVariable,
  //   })
  //     .then((response: any) => {
  //       // console.log(response.platforms);
  //       setPlatformList(response.platforms);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  // const getUserList = () => {
  //   Http.get({
  //     url: '/api/v2/users',
  //     state: superUserStateVariable,
  //   })
  //     .then((response: any) => {
  //       setTesterCount(response.userCount);
  //       setTesterList(response.users);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    setCurrentPageValue('');
      Http.get({
        url: '/api/v2/settings/cognito',
        state: { stateVariable },
        customHeaders: { noauthvalidate: 'true' },
      })
        .then((response: any) => {
          //console.log(response, 'response');
          const user = response.systemUser;
          const pwd = response.systemPassword;
          setSysDetails({ ...response, systemUser: '', systemPassword: '' });
            Auth.signIn(user, pwd)
            .then((user: any) => {
              //console.log(user, 'user');
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
            // getUserList();
            // getPlatformList();
            //      getTestSuites();
            //      getAssignments();
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

  // const getOrganizationSelectionDialog = (state: boolean) => {
  //   setOpenOrgSelection(state);
  // };

  // const handleCloseOrganizationCreation = (state: boolean) => {
  //   setOpenOrgSelection(state);
  // };

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
        {/* <TopPane
          getSignupDialog={getSignupDialog}
          getOrganizationSelectionDialog={getOrganizationSelectionDialog}
        />
        <Grid item xs={12} sm={7}>
          <Grid item xs={12} sm={12} className={classes.marginTopTen}>
            <RecordsCount records={records} />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <UsersFeedback usersFeedback={usersFeedback} />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <TestersView testerList={testerList} />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginTopTwenty}>
            <PlatformsView platformList={platformList} />
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={3} className={classes.marginTopTen}>
          <LatestNews latestNews={latestNews} />
        </Grid> */}
        <Grid container className={classes.sectionTop}>
          <Grid item xs={12} sm={7} style={{ padding: '50px', paddingTop: "170px" }}>
            <Typography variant='h4'>
              <strong>GigaTester Feedback</strong>
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
                // className="button buttonMarginTopPane"
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
              Allows users to capture feedback or bugs instantly while simultaneously not interrupting their experience on your site or application. Because some ideas can be hard to communicate, we simplified the process by allowing users to submit a screenshot, an audio recording, a video recording, or add an attachment - all to give the most precise feedback possible.
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
                Get a consolidated report and listing of all the feedback and bugs submitted by your users. Reports include bar and piecharts of feedback by category and a detailed list of individual-user submissions, which can be filtered for a more percise look.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.pageSection}>
            <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
              <Typography variant="h5" className={classes.sectionTitle}>Easy configuration</Typography>
              <Typography className={classes.sectionText}>
                We recognize that one size does not fit all. So for the best reporting possible, you can customize the agent to behave according to your app, customize how it looks, where it is placed, and what users can submit as reviews. Additionally, you can also customize what information it collects and how it integrates with your tracking systems.
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
      {/* {openOrgCreation && (
        <CreateOrganization
          openOrgCreation={openOrgCreation}
          handleCloseOrganizationCreation={handleCloseOrganizationCreation}
          superUserStateVariable={superUserStateVariable}
        />
      )} */}
    </Container>
  );
};

export default Home;
