import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Redirect } from 'react-router';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  Tooltip,
  Container,
  Grid,
} from '@material-ui/core';
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
//import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import GroupIcon from '@material-ui/icons/Group';
//import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import PhonelinkIcon from '@material-ui/icons/Phonelink';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import BallotIcon from '@material-ui/icons/Ballot';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  useActions,
  setAppBarCenterText,
  setAppBarLeftText,
} from '../../actions';
import Dashboard from '../../components/admin/dashboard';
import CreateUser from '../../components/admin/create-user';
import ManageUsers from '../../components/admin/manage-users';
import EditUser from '../../components/admin/manage-users/edit-user';
//import CreateTeam from "../../components/admin/create-team";
import ManageGroups from '../../components/admin/groups/manage';
import EditGroup from '../../components/admin/groups/edit';
//import AssignAssessment from "../../components/admin/assign-assessment";
//import MapMetricsTools from "../../components/admin/map-metrics-tools";
import ManageCampaigns from '../../components/admin/campaigns/manage';
import EditCampaign from '../../components/admin/campaigns/edit';
import EditPlatform from '../../components/admin/platforms/edit';
import ManagePlatforms from '../../components/admin/platforms/manage';
import EditDevice from '../../components/admin/devices/edit';
import ManageDevices from '../../components/admin/devices/manage';
import EditProduct from '../../components/admin/products/edit';
import EditProductFeedbackSettings from '../../components/admin/products/edit-feedback';
import ManageProducts from '../../components/admin/products/manage';
import CreateQuestionnaire from '../../components/admin/questionnaire/create-questionnaire';
import ManageAssessments from '../../components/admin/questionnaire/manage-questionnaire';
import EditAssessment from '../../components/admin/questionnaire/manage-questionnaire/editQuestionnaire';
import CreateQuestion, {
  IQuestionDetails,
} from '../../components/admin/create-question';
import ManageQuestion from '../../components/admin/manage-question';
import EditQuestion from '../../components/admin/manage-question/edit-question';
//import AdminFeedback from '../../components/admin/feedback';
import ManageSettings from '../../components/admin/manage-settings';
import EditSettingsObjectConfig from '../../components/admin/manage-settings/configure-objects';
import EditSettingsGeneralConfig from '../../components/admin/manage-settings/configure-general';
import EditSettingsCollectorConfig from '../../components/admin/manage-settings/configure-collector';
import { Text } from '../../common/Language';
import './style.css';
import FeedbackComments from "../../components/admin/feedbackComments";


export const ADMIN_HOME = 'admin-home';
export const DASHBOARD = 'dashboard';
export const CREATE_USER = 'create-user';
export const MANAGE_USERS = 'manageTesters';
export const EDIT_USER = 'edit-user';
//export const CREATE_TEAM = "create-team";
export const MANAGE_GROUPS = 'manageGroups';
export const EDIT_GROUP = 'edit-group';
//export const ASSIGN_ASSESSMENT = "assign-assessment";
//export const MAP_METRICS_TOOLS = "map-metrics-tools";
export const MANAGE_CAMPAIGNS = 'manageCampaigns';
export const EDIT_CAMPAIGN = 'edit-campaign';
export const MANAGE_PLATFORMS = 'managePlatforms';
export const EDIT_PLATFORM = 'edit-platform';
export const MANAGE_DEVICES = 'manageDevices';
export const EDIT_DEVICE = 'edit-device';
export const MANAGE_PRODUCTS = 'manageProducts';
export const EDIT_PRODUCT = 'edit-product';
export const EDIT_PRODUCT_FEEDBACK_SETTINGS = 'edit-product-feedback-settings';
export const EDIT_EXTERNAL_SYSTEM_SETTINGS = 'edit-external-system-settings';
export const CREATE_QUESTIONNAIRE = 'create-questionnaire';
export const MANAGE_QUESTIONNAIRES = 'manageTestSuits';
export const EDIT_QUESTIONNAIRE = 'edit-assessment';
export const CREATE_QUESTION = 'create-question';
export const MANAGE_QUESTION = 'manageQuestions';
export const EDIT_QUESTION = 'edit-question';
//export const FEEDBACK = 'feedback';
export const MANAGE_SETTINGS = 'manage-settings';
export const EDIT_SETTINGS_USER_CONFIG = 'UserConfig';
export const EDIT_SETTINGS_TEAM_CONFIG = 'TeamConfig';
export const EDIT_SETTINGS_SERVICE_CONFIG = 'ServiceConfig';
export const EDIT_SETTINGS_GENERAL_CONFIG = 'GeneralConfig';
export const EDIT_SETTINGS_COLLECTOR_CONFIG = 'CollectorConfig';
export const FEEDBACK_COMMENTS = "FeedbackComments";
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    // ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: '16px',
  },
  drawerPaper: {
    position: 'fixed',
    paddingBottom: '50px',
    top: 50,
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: {
    marginTop: '75px',
    // height: '78vh',
    // marginLeft: drawerWidth,
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 10,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  // content: {
  //   flexGrow: 1,
  //   height: '100vh',
  //   overflow: 'auto',
  // },
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  // fixedHeight: {
  //   marginTop: 50,
  //   height: 240,
  // },
  topMargin: {
    paddingTop: '5px',
  },
  iconWidth: {
    minWidth: '40px',
  },
  smallText: {
    fontSize: '20px',
    weight: '50',
    color: '#606060',
    paddingLeft: '5px',
  },
}));

export default function Admin() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [buttonValue, setButtonValue] = useState('');
  const [focusGroupId, setFocusGroupId] = useState('');
  const [focusCampaignId, setFocusCampaignId] = useState('');
  const [focusPlatformId, setFocusPlatformId] = useState('');
  const [focusDeviceId, setFocusDeviceId] = useState('');
  const [focusProductId, setFocusProductId] = useState('');
  const [focusVersion, setFocusVersion] = useState('');
  const [focusQuestionData, setFocusQuestionData] =
    useState<IQuestionDetails>();
  const [focusUserName, setFocusUserName] = useState('');
  const [focusQuestionnaire, setFocusQuestionnaire] = useState<any>();
  const [mapQuestionStandalone, setMapQuestionStandalone] = useState(false);
  const [title, setTitle] = useState('');
  const userToken = useSelector((state: IRootState) => state.user.idToken);
  const user = useSelector((state: IRootState) => state.user);
  const setDisplayTextCenter = useActions(setAppBarCenterText);
  const setDisplayTextLeft = useActions(setAppBarLeftText);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    setDisplayTextCenter('');
    setDisplayTextLeft('');
  }, []);

  const switchToAdminHome = (event: any) => {
    setButtonValue(ADMIN_HOME);
    setTitle('');
  };

  const switchPage = (pageName: string) => {
    setButtonValue(pageName);
    setTitle(pageName);
  };

  const handleDashboard = () => {
    setButtonValue(DASHBOARD);
    setTitle('dashboard');
  };

  const handleCreateUser = () => {
    setButtonValue(CREATE_USER);
    setTitle('addTester');
  };

  const handleManageUsers = () => {
    setButtonValue(MANAGE_USERS);
    setTitle('manageTesters');
  };

  const editUserClickHandler = (userName: string) => {
    setButtonValue(EDIT_USER);
    setFocusUserName(userName);
    setTitle('editTester');
  };

  //  const handleCreateTeam = () => {
  //    setButtonValue(CREATE_TEAM);
  //    setTitle("createTeam");
  //  };

  const handleManageGroups = () => {
    setButtonValue(MANAGE_GROUPS);
    setTitle('manageGroups');
  };

  const editGroupClickHandler = (groupId: string) => {
    setButtonValue(EDIT_GROUP);
    setFocusGroupId(groupId);
    setTitle('editGroup');
  };

  //  const handleAssignClicked = (teamId: string) => {
  //    setButtonValue(ASSIGN_ASSESSMENT);
  //    setFocusTeamId(teamId);
  //    setTitle("assignTest");
  //  };

  //  const handleMapMetricsClicked = (teamId: string) => {
  //    setButtonValue(MAP_METRICS_TOOLS);
  //    setFocusTeamId(teamId);
  //    setTitle("mapMetricsTools");
  //  };

  const handleManageCampaigns = () => {
    setButtonValue(MANAGE_CAMPAIGNS);
    setTitle('manageCampaigns');
  };

  const editCampaignClickHandler = (campaignId: string) => {
    setButtonValue(EDIT_CAMPAIGN);
    setFocusCampaignId(campaignId);
    setTitle('editCampaign');
  };

  const handleManagePlatforms = () => {
    setButtonValue(MANAGE_PLATFORMS);
    setTitle('managePlatforms');
  };

  const editPlatformClickHandler = (platformId: string) => {
    setButtonValue(EDIT_PLATFORM);
    setFocusPlatformId(platformId);
    setTitle('editPlatform');
  };

  const handleManageDevices = () => {
    setButtonValue(MANAGE_DEVICES);
    setTitle('manageDevices');
  };

  const editDeviceClickHandler = (deviceId: string) => {
    setButtonValue(EDIT_DEVICE);
    setFocusDeviceId(deviceId);
    setTitle('editDevice');
  };

  const handleManageProducts = () => {
    setButtonValue(MANAGE_PRODUCTS);
    setTitle('manageProducts');
  };

  const editProductClickHandler = (productId: string, version: string) => {
    setButtonValue(EDIT_PRODUCT);
    setFocusProductId(productId);
    setFocusVersion(version);
    setTitle('editProduct');
  };

  const editProductFeedbackSettingsHandler = (productId: string, version: string) => {
    setButtonValue(EDIT_PRODUCT_FEEDBACK_SETTINGS);
    setFocusProductId(productId);
    setFocusVersion(version);
    setTitle('editProductFeedbackSettings');
  }

  const feedbackClickHandler = (productId: string, version: string) => {
    setButtonValue(FEEDBACK_COMMENTS);
    setFocusProductId(productId);
    setFocusVersion(version);
    setTitle("feedbackComments");
  }
  const handleCreateQuestionnaire = () => {
    setButtonValue(CREATE_QUESTIONNAIRE);
    setTitle('addTestSuit');
  };

  const handleManageQuestionnaires = () => {
    setButtonValue(MANAGE_QUESTIONNAIRES);
    setTitle('manageTestSuits');
  };

  const switchToEditQuestionnaire = (questionnaire: any) => {
    setButtonValue(EDIT_QUESTIONNAIRE);
    setFocusQuestionnaire(questionnaire);
    setMapQuestionStandalone(false);
    setTitle('editTestSuit');
  };

  const switchToMapQuestionsStandalone = (questionnaire: any) => {
    setButtonValue(EDIT_QUESTIONNAIRE);
    setFocusQuestionnaire(questionnaire);
    setMapQuestionStandalone(true);
    setTitle('manageTestSuits');
  };

  const handleCreateQuestion = () => {
    setButtonValue(CREATE_QUESTION);
    setTitle('addTestCase');
  };

  const handleManageQuestion = () => {
    setButtonValue(MANAGE_QUESTION);
    setTitle('manageTestCases');
  };

  const editQuestionClickHandler = (questionData: IQuestionDetails) => {
    setButtonValue(EDIT_QUESTION);
    setFocusQuestionData(questionData);
    setTitle('editTestCases');
  };

  // const handleFeedbackClick = () => {
  //   setButtonValue(FEEDBACK);
  //   setTitle('feedback');
  // };

  const handleManageSettings = () => {
    setButtonValue(MANAGE_SETTINGS);
    setTitle('manageSettings');
  };

  const editSettingsClickHandler = (settingsType: any) => {
    setButtonValue(settingsType);
    setTitle('editSettings');
  };

  const feedbackCommentsClickHandler = () => {
    setButtonValue(FEEDBACK_COMMENTS);
    setTitle("feedbackComments");
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const renderDefault = () => {
    if (
      user &&
      user.roles &&
      user.roles.includes('Manager') &&
      !user.roles.includes('Admin')
    ) {
      return (
        // tslint:disable-next-line: jsx-wrap-multiline
        <Grid container spacing={3} className={classes.topMargin}>
          <Grid item xs={12}>
            <Typography variant='h4'>
              <Text tid='manager-title' />
            </Typography>
            <br />
            <br />
            <Typography variant='h5' className={classes.smallText}>
              <Text tid='manager-description-line1' />
              <br /> <br />
              <Text tid='manager-description-line2' />
              <br />
              <Text tid='manager-description-line3' />
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      // tslint:disable-next-line: jsx-wrap-multiline
      <Grid container spacing={3} className={classes.topMargin}>
        <Grid item xs={12}>
          <Typography variant='h4'>
            <Text tid='admin-title' />
          </Typography>
          <br />
          <br />
          <Typography variant='h5' className={classes.smallText}>
            <Text tid='admin-description-line1' />
          </Typography>
          <Typography variant='h5' className={classes.smallText}>
            <ul>
              <li>
                <Text tid='admin-description-line2' />
              </li>
              <li>
                <Text tid='admin-description-line3' />
              </li>
              <li>
                <Text tid='admin-description-line4' />
              </li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    );
  };
  const renderComponent = () => {
    switch (buttonValue) {
      case ADMIN_HOME:
        return renderDefault();
      case DASHBOARD:
        return <Dashboard sideMenu={true} />;
      case CREATE_USER:
        return <CreateUser goBack={switchToAdminHome} />;
      case MANAGE_USERS:
        return (
          <ManageUsers
            team={focusGroupId}
            editUserClicked={editUserClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_USER:
        return <EditUser user={focusUserName} goBack={switchPage} />;
      //      case CREATE_TEAM:
      //        return <CreateTeam goBack={switchToAdminHome} />;
      case MANAGE_GROUPS:
        return (
          <ManageGroups
            editClicked={editGroupClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_GROUP:
        return <EditGroup groupId={focusGroupId} goBack={switchPage} />;
      //      case ASSIGN_ASSESSMENT:
      //        return <AssignAssessment teamId={focusTeamId} goBack={switchPage} />;
      //      case MAP_METRICS_TOOLS:
      //        return <MapMetricsTools teamId={focusTeamId} goBack={switchPage} />;
      case MANAGE_CAMPAIGNS:
        return (
          <ManageCampaigns
            editClicked={editCampaignClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_CAMPAIGN:
        return (
          <EditCampaign campaignId={focusCampaignId} goBack={switchPage} />
        );
      case MANAGE_PLATFORMS:
        return (
          <ManagePlatforms
            editClicked={editPlatformClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_PLATFORM:
        return (
          <EditPlatform platformId={focusPlatformId} goBack={switchPage} />
        );
      case MANAGE_DEVICES:
        return (
          <ManageDevices
            editClicked={editDeviceClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_DEVICE:
        return <EditDevice deviceId={focusDeviceId} goBack={switchPage} />;
      case MANAGE_PRODUCTS:
        return (
          <ManageProducts
            editClicked={editProductClickHandler}
            feedbackClicked={feedbackClickHandler}
            feedbackSettingsClicked={editProductFeedbackSettingsHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_PRODUCT:
        return (
          <EditProduct
            productId={focusProductId}
            version={focusVersion}
            goBack={switchPage}
          />
        );
      case EDIT_PRODUCT_FEEDBACK_SETTINGS:
        return (
          <EditProductFeedbackSettings
            productId={focusProductId}
            version={focusVersion}
            goBack={switchPage}
          />
        );
      case CREATE_QUESTIONNAIRE:
        return (
          <CreateQuestionnaire
            handleMapQuestionStandalone={switchToMapQuestionsStandalone}
            goBack={switchToAdminHome}
          />
        );
      case MANAGE_QUESTIONNAIRES:
        return (
          <ManageAssessments
            handleEditQuestionnaire={switchToEditQuestionnaire}
            handleCreateQuestionnaire={handleCreateQuestionnaire}
            handleMapQuestionStandalone={switchToMapQuestionsStandalone}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_QUESTIONNAIRE:
        return (
          <EditAssessment
            questionnaire={focusQuestionnaire}
            handleMapQuestionStandalone={switchToMapQuestionsStandalone}
            goBack={switchPage}
            isMapQuestions={mapQuestionStandalone}
          />
        );
      case CREATE_QUESTION:
        return <CreateQuestion goBack={switchToAdminHome} />;
      case MANAGE_QUESTION:
        return (
          <ManageQuestion
            handleCreateQuestion={handleCreateQuestion}
            editQuestionClicked={editQuestionClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_QUESTION:
        return (
          <EditQuestion question={focusQuestionData} goBack={switchPage} />
        );
//      case FEEDBACK:
//        return <AdminFeedback goBack={switchToAdminHome} />;
      case FEEDBACK_COMMENTS:
        return <FeedbackComments
          productId={focusProductId}
          prodVersion={focusVersion}
          goBack={switchToAdminHome}
        />;
      case MANAGE_SETTINGS:
        return (
          <ManageSettings
            editSettingsClicked={editSettingsClickHandler}
            goBack={switchToAdminHome}
          />
        );
      case EDIT_SETTINGS_USER_CONFIG:
      case EDIT_SETTINGS_TEAM_CONFIG:
      case EDIT_SETTINGS_SERVICE_CONFIG:
        return (
          <EditSettingsObjectConfig objType={buttonValue} goBack={switchPage} />
        );
      case EDIT_SETTINGS_GENERAL_CONFIG:
        return (
          <EditSettingsGeneralConfig
            objType={buttonValue}
            goBack={switchPage}
          />
        );
      case EDIT_SETTINGS_COLLECTOR_CONFIG:
        return (
          <EditSettingsCollectorConfig
            objType={buttonValue}
            goBack={switchPage}
          />
        );
      default:
        return renderDefault();
    }
  };

  if (userToken === null) {
    return <Redirect to='/relogin' />;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ marginTop: '50px', display: 'none' }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography color='inherit' noWrap className={classes.title}>
            <Text tid={title} />
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        {/* <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div> */}
        {(user && user.roles && user.roles.includes('Admin')) &&
        <Fragment>
          <Divider />
          <List disablePadding={true} style={{ padding: '-10px 0px' }}>
            <ListItem
              button
              onClick={handleDashboard}
            >
              <Tooltip
                title={<Typography>{<Text tid='dashboard2' />}</Typography>}
                disableHoverListener={open ? true : false}
                placement='right'
                arrow={true}
              >
                <ListItemIcon className={classes.iconWidth}>
                  <DashboardIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={<Text tid='dashboard2' />} />
            </ListItem>
          </List>
        </Fragment>
        }
        <Divider />
        <List disablePadding={true}>
          <ListItem button onClick={handleCreateUser}>
            <Tooltip
              title={<Typography>{<Text tid='addUsers2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <PersonAddIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='addUsers2' />} />
          </ListItem>
        </List>
        <List disablePadding={true}>
          <ListItem
            button
            onClick={handleManageUsers}
            style={{ paddingTop: '0px' }}
          >
            <Tooltip
              title={<Typography>{<Text tid='manageUsers2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <GroupIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='manageUsers2' />} />
          </ListItem>
        </List>
        <Divider />
        {/*<List disablePadding={true}>
          <ListItem button onClick={handleCreateTeam}>
            <Tooltip
              title={<Typography>{<Text tid="createTeam2" />}</Typography>}
              disableHoverListener={open ? true : false}
              placement="right"
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <GroupAddIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid="createTeam2" />} />
          </ListItem>
        </List>*/}
        {(user && user.roles && user.roles.includes('Admin')) &&
        <List disablePadding={true}>
          <ListItem
            button
            onClick={handleManageGroups}
            disabled={!(user && user.roles && user.roles.includes('Admin'))}
          >
            <Tooltip
              title={<Typography>{<Text tid='manageGroups2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <AccountTreeIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='manageGroups2' />} />
          </ListItem>
        </List>
        }
        {(user && user.roles && user.roles.includes('Admin')) &&
        <List disablePadding={true}>
          <ListItem
            button
            onClick={handleManagePlatforms}
            disabled={!(user && user.roles && user.roles.includes('Admin'))}
          >
            <Tooltip
              title={<Typography>{<Text tid='managePlatforms2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <DeveloperModeIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='managePlatforms2' />} />
          </ListItem>
        </List>
        }
        {(user && user.roles && user.roles.includes('Admin')) &&
        <List disablePadding={true}>
          <ListItem
            button
            onClick={handleManageDevices}
            disabled={!(user && user.roles && user.roles.includes('Admin'))}
          >
            <Tooltip
              title={<Typography>{<Text tid='manageDevices2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <DevicesOtherIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='manageDevices2' />} />
          </ListItem>
        </List>
        }
        {(user && user.roles && (user.roles.includes('Admin') || user.roles.includes('Manager'))) &&
        <Fragment>
          <List disablePadding={true}>
            <ListItem button onClick={handleManageProducts}>
              <Tooltip
                title={<Typography>{<Text tid='manageProducts2' />}</Typography>}
                disableHoverListener={open ? true : false}
                placement='right'
                arrow={true}
              >
                <ListItemIcon className={classes.iconWidth}>
                  <PhonelinkIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={<Text tid='manageProducts2' />} />
            </ListItem>
          </List>
          <Divider />
        </Fragment>
        }
        {(user && user.roles && user.roles.includes('Admin')) &&
        <Fragment>
          <List disablePadding={true}>
            <ListItem
              button
              onClick={handleManageCampaigns}
              disabled={!(user && user.roles && user.roles.includes('Admin'))}
            >
              <Tooltip
                title={<Typography>{<Text tid='manageCampaigns2' />}</Typography>}
                disableHoverListener={open ? true : false}
                placement='right'
                arrow={true}
              >
                <ListItemIcon className={classes.iconWidth}>
                  <AssessmentIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={<Text tid='manageCampaigns2' />} />
            </ListItem>
          </List>
          <Divider />
        </Fragment>
        }
        {/* <List disablePadding={true}>
          <ListItem
            button
            onClick={handleCreateQuestionnaire}
            disabled={!(user && user.roles && user.roles.includes("Admin"))}
          >
            <Tooltip
              title={<Typography>{<Text tid="addTestSuit2" />}</Typography>}
              disableHoverListener={open ? true : false}
              placement="right"
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <AssignmentIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid="addTestSuit2" />} />
          </ListItem>
        </List> */}
        {(user && user.roles && user.roles.includes('Admin')) &&
        <List disablePadding={true}>
          <ListItem
            button
            onClick={handleManageQuestionnaires}
            disabled={!(user && user.roles && user.roles.includes('Admin'))}
          >
            <Tooltip
              title={<Typography>{<Text tid='manageTestSuits2' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <BallotIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid='manageTestSuits2' />} />
          </ListItem>
        </List>
        }
        {/* <List disablePadding={true}>
          <ListItem
            button
            onClick={handleCreateQuestion}
            disabled={!(user && user.roles && user.roles.includes("Admin"))}
          >
            <Tooltip
              title={<Typography>{<Text tid="caddTestCase2" />}</Typography>}
              disableHoverListener={open ? true : false}
              placement="right"
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <AssignmentOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid="addTestCase2" />} />
          </ListItem>
        </List> */}
        {(user && user.roles && user.roles.includes('Admin')) &&
        <Fragment>
          <List disablePadding={true}>
            <ListItem
              button
              onClick={handleManageQuestion}
              disabled={!(user && user.roles && user.roles.includes('Admin'))}
            >
              <Tooltip
                title={<Typography>{<Text tid='manageTestCases2' />}</Typography>}
                disableHoverListener={open ? true : false}
                placement='right'
                arrow={true}
              >
                <ListItemIcon className={classes.iconWidth}>
                  <BallotOutlinedIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={<Text tid='manageTestCases2' />} />
            </ListItem>
          </List>
          <Divider />
        </Fragment>
        }
        {/*<List disablePadding={true}>
          <ListItem
            button
            onClick={handleFeedbackClick}
            disabled={!(user && user.roles && user.roles.includes('Admin'))}
          >
            <Tooltip
              title={<Typography>{<Text tid='viewFeedback' />}</Typography>}
              disableHoverListener={open ? true : false}
              placement='right'
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <FeedbackIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid="viewFeedback" />} />
          </ListItem>
        </List>
      <Divider />*/}
        <List disablePadding={true}>
          <ListItem
            button
            onClick={feedbackCommentsClickHandler}
          >
            <Tooltip
              title={<Typography>{<Text tid="viewFeedback" />}</Typography>}
              disableHoverListener={open ? true : false}
              placement="right"
              arrow={true}
            >
              <ListItemIcon className={classes.iconWidth}>
                <FeedbackIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Text tid="viewFeedback" />} />
          </ListItem>
        </List>
        {(user && user.roles && user.roles.includes('Admin')) &&
        <Fragment>
          <Divider />
          <List disablePadding={true}>
            <ListItem
              button
              onClick={handleManageSettings}
              disabled={!(user && user.roles && user.roles.includes('Admin'))}
            >
              <Tooltip
                title={<Typography>{<Text tid='settings' />}</Typography>}
                disableHoverListener={open ? true : false}
                placement='right'
                arrow={true}
              >
                <ListItemIcon className={classes.iconWidth}>
                  <SettingsIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={<Text tid='settings' />} />
            </ListItem>
          </List>
        </Fragment>
        }
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div
          className={classes.appBarSpacer}
          style={{ paddingLeft: open ? '220px' : '40px' }}
        >
          <Container className={classes.container} maxWidth='lg'>
            {renderComponent()}
          </Container>
        </div>
      </main>
      {/* <main style={{ position: 'absolute' }}>
        <div className={classes.appBarSpacer}>
          <Container maxWidth="lg" className={classes.container}>
            {renderComponent()}
          </Container>
        </div>
      </main> */}
    </div>
  );
}
