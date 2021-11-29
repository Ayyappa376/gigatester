import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Button,
  Grid,
  InputLabel,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { Http } from "../../utils";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers";
import { IUserParams } from "../../model";
import Profile from "./profile";
import Notification from "../../common/notification";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    width: "100%",
    height: "50px",
    boxShadow: "0px 2px 8px #00000033",
    opacity: 1,
    marginTop: "3.5em",
    background: "#F0F0F0 0% 0% no-repeat padding-box",
  },
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "1em",
    // width: '80%',
  },
}));

const UserProfile = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userState, setUserState] = useState<IUserParams | undefined>();
  const [userDataFetched, setUserDataFetched] = useState(false);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  // const [teams, setTeams] = useState<ITeamInfo[]>([]);
  const [userParamState, setUserParamState] = useState<any>({});
  // const [teamDataFetched, setTeamDataFetched] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    Http.get({
      url: `/api/v2/admin/users/getusers?email=${stateVariable.user.userDetails.email}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setUserState(response);
        setUserDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
        props.history.push("/relogin");
      });
  };

  const getUserParamState = (userParam: any) => {
    setUserParamState(userParam);
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleSave = () => {
    setNotify({
      isOpen: true,
      message: "loading",
      type: "info",
    });
    const postData = userParamState!.values;
    // console.log(postData);
    Http.put({
      url: `/api/v2/admin/users`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setNotify({
          isOpen: true,
          message: "userProfileUpdatedSuccessfully",
          type: "success",
        });
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setNotify({
            isOpen: true,
            message: "somethingWentWrong",
            type: "error",
          });
        } else if (object.code === 401) {
          props.history.push("/relogin");
        } else {
          setNotify({
            isOpen: true,
            message: "somethingWentWrong",
            type: "error",
          });
        }
      });
  };

  const handleProductSelectionPage = () => {
    props.history.push('/selectProduct');
  }

  return (
    <Fragment>
      <div className={classes.topBar}>
        <Grid container spacing={2} >
          <Grid item xs={2} sm={2} />
          <Grid item xs={6} sm={6} >
            <InputLabel style={{ paddingTop: '12px' }} > Home | Profile </InputLabel>
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" style={{ marginTop: '8px' }} onClick={handleProductSelectionPage}>
              Skip
            </Button>
          </Grid>
          <Grid item xs={1} sm={1}>
            <Button variant="outlined" color="primary" size='small' className='button' data-testid="save" style={{ marginTop: '8px' }} onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item xs={2} sm={2} />
        </Grid>
      </div>

      <Grid container>
        <Grid item xs={1} sm={1} md={1} />
        <Grid item xs={10} sm={10} md={10}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="My History" {...a11yProps(1)} />
                <Tab label="Other Details" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Profile
                userState={userState}
                userDataFetched={userDataFetched}
                getUserParamState={getUserParamState}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              My History
            </TabPanel>
            <TabPanel value={value} index={2}>
              Other Details
            </TabPanel>
          </div>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default UserProfile;
