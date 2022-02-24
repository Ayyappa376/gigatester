import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
import feedback_img from './feedback.jpg';
import feedbackagent_img from './feedback_agent.jpg';
import feedbackdashboard_img from './feedback_dashboard.jpg';
import feedbackconfigure_img from './feedback_configure.jpg';
import { Loader } from '../../components';
import { withTextFileResponse } from '../../utils/http';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1.2em',
    padding: 0,
    overflow: 'hidden',
  },
  sectionTop: {
    background: '#618abb',
  },
  section: {
    margin: '50px',
  },
  // marginTopTen: {
  //   marginTop: '10px',
  // },
  // marginTopTwenty: {
  //   marginTop: '20px',
  // },
  headerText: {
    fontWeight: 'normal',
    fontSize: '18px',
  },
  paper: {
    borderRadius: 0,
    padding: 0,
    textAlign: 'right',
    height: '100%',
    marginBottom: '-4px',
  },
  img: {
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
  title: {
    padding: "10px 15px",
  },
  text: {
    padding: "5px 15px",
    fontSize: "14px",
    lineHeight: "20px",
    colour: '#999999',
  },
  button: {
    marginLeft: '0px',
    backgroundColor: '#00235e',
    '&:hover, &:focus, &:active': {
      backgroundColor: '#00235e',
    },
    color: 'white',
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
        <Grid item xs={12} sm={3} className={classes.marginTopTen}>
          <LatestNews latestNews={latestNews} />
        </Grid> */}
        <Grid container className={classes.sectionTop}>
          <Grid item xs={12} sm={7} style={{ padding: '50px', paddingTop: "150px" }}>
            <Typography variant='h4'>
              <strong>GigaTester Feedbacks</strong>
            </Typography>
            <Typography variant='h5'>
              Customers give unbiased opinions. Get the feedback from them and build the product they love.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Container component='div' className={classes.paper}>
              <img
                className={classes.img}
                src={feedback_img}
                alt='Seemlessly receive feedback from users'
              />
            </Container>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
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
              className={classes.button}
                >
              Let's try it
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
          <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
            <Typography variant="h6" className={classes.title}>Feedback agent</Typography>
            <Typography className={classes.text}>
              Capture feedback or bugs with screenshots, marks and comments on particular sections of
              the app visually. Do a screen recording if user wants to explain different actions in the
              application. No time to type the feedback, no problem. Just leave your voice feedback.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Container component='div' className={classes.paper}>
              <img
                className={classes.img}
                src={feedbackagent_img}
                alt='GigaTester Feedback Agent'
              />
            </Container>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
          <Grid item xs={12} sm={5}>
            <Container component='div' className={classes.paper}>
              <img
                className={classes.img}
                src={feedbackdashboard_img}
                alt='GigaTester Feedback Dashboard'
              />
            </Container>
          </Grid>
          <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
            <Typography variant="h6" className={classes.title}>Feedback dashboard</Typography>
            <Typography className={classes.text}>
              Get consolidated report and listing of all the feedbacks and bugs submitted by your users.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
          <Grid item xs={12} sm={7} style={{ textAlign: "left" }}>
            <Typography variant="h6" className={classes.title}>Feedback agent configuration</Typography>
            <Typography className={classes.text}>
              Customise the agent to behave according to your app. Customise how it looks, where it is
              placed, what and how you wish your user to submit as reviews, what information it collects
              and how it integrates with your tracking systems.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Container component='div' className={classes.paper}>
              <img
                className={classes.img}
                src={feedbackconfigure_img}
                alt='GigaTester Feedback configuration'
              />
            </Container>
          </Grid>
        </Grid>
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
