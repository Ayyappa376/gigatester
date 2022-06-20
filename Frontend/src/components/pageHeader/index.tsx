import React, { useState, Fragment } from 'react';
import bigLogo from '../../logo/cuvo-logo.png';
import {
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  Typography,
  makeStyles,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  MenuList
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { IRootState } from '../../reducers';
import { ModalComponent } from '../modal';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  resetBothDisplayText,
  useActions,
  setAppBarRightText,
} from '../../actions';
import { QUESTION_PAGE_NOT_TIMED, QUESTION_PAGE_TIMED } from '../question';
import { buttonStyle } from '../../common/common';
import { Link } from 'react-scroll';
// import LanguageSelector from '../language-selection-dropdown/index';
import { Text } from '../../common/Language';
import SignInForm from '../signInForm';
import SignupForm from '../signUpForm';
import './style.css';

const timeoutLength = 50;

interface PageRedirectState {
  type: string;
}

const useStyles = makeStyles((theme) => ({
  headerItem: {
    color: '#666666',
    padding: theme.spacing(1),
    cursor: 'pointer',
    fontSize: '14px',
  },
  headerItemDisabled: {
    color: '#9E9E9E',
    // color: theme.palette.grey,
    padding: theme.spacing(1),
    cursor: 'default',
    fontSize: '16px',
  },
  headerButton: {
    ...buttonStyle,
  },
  menu: {
    top: '30px !important',
  },
  menuitem: {
    color: '#042E5B',
  },
  logo: {
    maxWidth: '48px',
    maxHeight: '48px',
  },
  bigLogo: {
    height: '50px',
    // padding: theme.spacing(1),
    padding: '4px',
  },
  appBar: {
    minWidth: '100%',
    backgroundColor: '#042E5B',
    boxShadow: 'none',
    height: '50px',
    position: 'fixed',
    top: 50,
  },
  appBarMini: {
    minWidth: '100%',
    backgroundColor: '#042E5B',
    boxShadow: 'none',
    height: '2px',
    position: 'fixed',
    top: 50,
  },
  topBar: {
    width: '100%',
    height: '50px',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    borderBottom: '2px solid #000000',
    background: '#ffffff'
  },
  appBarTextRight: {
    // width: "100%",
    textAlign: 'right',
    paddingTop: '4px',
  },
  appBarTextCenter: {
    // width: "100%",
    fontSize: '18px',
    textAlign: 'center',
    weight: '400',
  },
  appBarTextLeft: {
    // marginRight: "auto",
    fontSize: '18px',
    weight: '400',
  },
}));

// const metricsMenu = [
//   { link: 'doraMetrics', name: 'doraMetrics' },
//   { link: 'build', name: 'buildCICD' },
//   { link: 'repository', name: 'gitRepository' },
//   { link: 'requirements', name: 'requirements' },
//   { link: 'quality', name: 'quality' },
// ];

const dashboardMenu = [
  { link: 'testRatings', name: 'testRatings' },
  { link: 'screenWiseScore', name: 'screenWiseScore' },
  { link: 'performanceMetrics', name: 'performanceMetrics' },
  { link: 'testCaseWiseMetrics', name: 'testCaseWiseMetrics' },
];

const trendsMenu = [
  { link: 'testWise', name: 'testWise' },
  { link: 'platformWise', name: 'platformWise' },
];

const PageHeader = (props: any) => {
  const classes = useStyles();
  const userStatus = useSelector((state: IRootState) => {
    return state.user;
  });
  // const displayTextLeft = useSelector((state: IRootState) => {
  //   return state.display.topBarTextLeft;
  // });
  // const displayTextCenter = useSelector((state: IRootState) => {
  //   return state.display.topBarTextCenter;
  // });
  // const displayTextRight = useSelector((state: IRootState) => {
  //   return state.display.topBarTextRight;
  // });
  const currentPage = useSelector((state: IRootState) => {
    return state.display.currentPage;
  });
  const url = window.location.href;
  const currentUrl = url.substring(url.length - 6, url.length);
  // const resetBothTexts = useActions(resetBothDisplayText);
  // const setDisplayTextRight = useActions(setAppBarRightText);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [anchorMetricsEl, setAnchorMetricsEl] = useState(null);
  const [anchorDashboardEl, setAnchorDashboardEl] = useState(null);
  const [anchorTrendsEl, setAnchorTrendsEl] = useState(null);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [openModalLeavePage, setOpenModalLeavePage] = useState(false);
  const [focusURL, setFocusURL] = useState('');
  const [adminPageState, setAdminPageState] = useState(
    currentUrl.includes('admin') ? true : false
  );
  const [pageRedirectState, setPageRedirectState] = useState<PageRedirectState>(
    { type: '' }
  );
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openUserMenu, setOpenUserMenu] = React.useState(false);
  const stateVariable = useSelector((state: IRootState) => state);
  const [superUserStateVariable, setSuperUserStateVariable] = useState(stateVariable);
  const anchorRef: any = React.useRef(null);
  // let redirectUrl: string;
  const systemDetails = useSelector((state: IRootState) => state.systemDetails);

  // setDisplayTextRight(
  //   userStatus && userStatus.userDetails && userStatus.userDetails.email
  //     ? userStatus.userDetails.email
  //     : ''
  // );

  const onLogin = () => {
    setOpenSignin(true)
  };

  const onRegister = () => {
    setOpenSignup(true)
  }

  const handleProfileSetting = () => {
    setOpenUserMenu(false)
    props.history.push('/profile');
  }

  const logoutModalActivate = () => {
    setOpenModalLogout(true);
    setOpenUserMenu(false)
  };

  const modalNoClickedLogout = () => {
    setOpenModalLogout(false);
  };

  const modalYesClickedLogout = () => {
    setOpenModalLogout(false);
    props.history.push('/logout');
  };

  const renderUserStatus = () => {
    return (
        userStatus.idToken ? (
          <Button
            ref={anchorRef}
            aria-controls={openUserMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {userStatus.userDetails.email}
          </Button>
          // <Tooltip title={<Typography>User Name</Typography>}>
          //   <Typography
          //     onClick={logoutModalActivate}
          //     className={classes.headerItem}
          //   >
          //     <ExitToAppIcon />
          //   </Typography>
          // </Tooltip>
        ) : (
          <Fragment>
            <div className='header-item'>
              <Typography onClick={onLogin} className={classes.headerItem}>
                <Text tid='login' />
              </Typography>
            </div>
            <div className='header-item'>
              <Typography onClick={onRegister} className={classes.headerItem}>
                <Text tid='signUp' />
              </Typography>
            </div>
          </Fragment>
        )
    );
  };

  const handleChangePassword = () => {
    setChangePassword(true);
    setOpenSignin(true);
  }
  
  const handleAssessment = (event: any) => {
    setAdminPageState(false);
    const { getMetricsType } = props;
    setAnchorEl(event.currentTarget);
    getMetricsType('doraMetrics');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSoftwareMenuClick = (event: any) => {
    setAdminPageState(false);
    props.history.push('/manageSoftwareFiles');
  };

  // const handleMetricsMenuClick = (event: any) => {
  //   setAnchorMetricsEl(event.currentTarget);
  //   setAdminPageState(false);
  //   props.history.push('/metricSelect');
  // };

  // const handleMetricsMenuClose = () => {
  //   setAnchorMetricsEl(null);
  // };

  // const handleMetricsMenuOptionClick = (metricType: any) => {
  //   const { getMetricsType } = props;
  //   handleMetricsMenuClose();
  //   getMetricsType(metricType);
  // };

  function handleDashboardMenuClick(event: any) {
    const { getMetricsType } = props;
    setAnchorDashboardEl(event.currentTarget);
    setAdminPageState(false);
    props.history.push('/admin/dashboard');
    getMetricsType('doraMetrics');
  }

  function handleTrendsMenuClick(event: any) {
    const { getMetricsType } = props;
    setAnchorTrendsEl(event.currentTarget);
    setAdminPageState(false);
    props.history.push('/trends');
  }

  const handleDashboardMenuClose = () => {
    setAnchorDashboardEl(null);
  };

  const handleDashboardMenuOptionClick = () => {
    handleDashboardMenuClose();
  };

  const handleTrendsMenuClose = () => {
    setAnchorTrendsEl(null);
  };

  const handleTrendsMenuOptionClick = () => {
    handleTrendsMenuClose();
  };

  const handleAdminButtonClick = () => {
    const { getMetricsType } = props;
    getMetricsType('doraMetrics');
    setAdminPageState(true);
    if (currentPage === QUESTION_PAGE_NOT_TIMED) {
      setOpenModalLeavePage(true);
      setFocusURL('/admin');
    } else {
      props.history.push('/admin');
    }
  };

  // const leaveMetricMenu = () => {
  //   setTimeout(() => {
  //     setAnchorMetricsEl(null);
  //   }, timeoutLength);
  // };

  const leaveDashboardMenu = () => {
    setTimeout(() => {
      setAnchorDashboardEl(null);
    }, timeoutLength);
  };

  const leaveTrendsMenu = () => {
    setTimeout(() => {
      setAnchorTrendsEl(null);
    }, timeoutLength);
  };

  const handleToggle = () => {
    setOpenUserMenu((prevOpen) => !prevOpen);
  };

  const handleCloseUserMenu = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenUserMenu(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenUserMenu(false);
    }
  }

  // return focus to the button when we transitioned from !openUserMenu -> openUserMenu
  const prevOpen = React.useRef(openUserMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openUserMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openUserMenu;
  }, [openUserMenu]);


  const renderViewAssessment = () => {
    if (!userStatus.idToken) {
      return <div />;
    }
    if (currentPage === QUESTION_PAGE_TIMED) {
      return (
        <div className='header-item'>
          <Tooltip
            title={
              <Typography>
                <Text tid='notAvailableDuringThisTest' />
              </Typography>
            }
          >
            <Typography className={classes.headerItemDisabled}>
              <Text tid='testResults' />
            </Typography>
          </Tooltip>
        </div>
      );
    }

    return (
      <div className='header-item'>
        <Typography className={classes.headerItem} onClick={handleAssessment}>
          <Text tid='testResults' />
        </Typography>
      </div>
    );
  };

  // const handleTrialClose = () => {
  //   props.history.push('/trial/close');
  // };

  const renderManageSoftwareFiles = () => {
    if (!userStatus.idToken) {
      return <div />;
    }
    return (
      <div className='header-item'>
        <Typography
          className={classes.headerItem}
          onClick={handleSoftwareMenuClick}
        >
          <Text tid='software' />
        </Typography>
      </div>
    );
  };

  /*
    const renderViewMetrics = () => {
      if (!userStatus.idToken) {
        return <div />;
      }
      return (
        <div className='header-item'>
          <Typography
            className={classes.headerItem}
            onClick={handleMetricsMenuClick}
          >
            <Text tid='metrics' />
          </Typography>
        </div>
      );
    };
  
    const renderMetricsMenuItems = () => {
      if (!userStatus.roles) {
        return;
      }
      if (
        userStatus.roles!.indexOf('Admin') !== -1 ||
        userStatus.roles!.indexOf('Manager') !== -1
      ) {
        return (
          <Menu
            id='menu-list-grow'
            anchorEl={anchorMetricsEl}
            keepMounted
            open={Boolean(anchorMetricsEl)}
            onClose={handleMetricsMenuClose}
            MenuListProps={{
              onMouseLeave: leaveMetricMenu,
            }}
            className={classes.menu}
          >
            {metricsMenu.map((menuList: any, index: number) => {
              return (
                <MenuItem className={classes.menuitem} key={index} onClick={() => handleMetricsMenuOptionClick(menuList.link)}>
                  <Text tid={menuList.name} />
                </MenuItem>
              );
            })}
          </Menu>
        );
      }
      return;
    };
  */

  const renderAdminPage = () => {
    if (!userStatus.roles) {
      return;
    }
    if (
      userStatus.roles!.indexOf('Admin') === -1 &&
      userStatus.roles!.indexOf('Manager') !== -1 ||
      userStatus.roles!.indexOf('Executive') !== -1
    ) {
      if (currentPage === QUESTION_PAGE_TIMED) {
        return (
          <div className='header-item'>
            <Tooltip
              title={
                <Typography>
                  <Text tid='notAvailableDuringThisTest' />
                </Typography>
              }
            >
              <Typography className={classes.headerItemDisabled}>
                <Text tid='manage' />
              </Typography>
            </Tooltip>
          </div>
        );
      }
      return (
        <div className='header-item'>
          <Typography
            onClick={handleAdminButtonClick}
            className={classes.headerItem}
          >
            <Text tid='manage' />
          </Typography>
        </div>
      );
    }
    if (
      userStatus.roles!.indexOf('Member') !== -1 &&
      userStatus.roles!.indexOf('Manager') === -1 &&
      userStatus.roles!.indexOf('Executive') === -1 &&
      userStatus.roles!.indexOf('Admin') === -1
    ) {
      if (currentPage === QUESTION_PAGE_TIMED) {
        return (
          <div className='header-item'>
            <Tooltip
              title={
                <Typography>
                  <Text tid='notAvailableDuringThisTest' />
                </Typography>
              }
            >
              <Typography className={classes.headerItemDisabled}>
                <Text tid='member' />
              </Typography>
            </Tooltip>
          </div>
        );
      }
      return (
        <div className='header-item'>
          <Typography
            onClick={handleAdminButtonClick}
            className={classes.headerItem}
          >
            <Text tid='member' />
          </Typography>
        </div>
      );
    }
    if (userStatus.roles!.indexOf('Admin') !== -1) {
      if (currentPage === QUESTION_PAGE_TIMED) {
        return (
          <div className='header-item'>
            <Tooltip
              title={
                <Typography>
                  <Text tid='notAvailableDuringThisTest' />
                </Typography>
              }
            >
              <Typography className={classes.headerItemDisabled}>
                <Text tid='admin' />
              </Typography>
            </Tooltip>
          </div>
        );
      }
      return (
        <div className='header-item'>
          <Typography
            onClick={handleAdminButtonClick}
            className={classes.headerItem}
          >
            <Text tid='admin' />
          </Typography>
        </div>
      );
    }
    return;
  };

  const renderDashboardPage = () => {
    if (!userStatus.roles) {
      return;
    }
    if (
      userStatus.roles!.indexOf('Admin') !== -1 ||
      userStatus.roles!.indexOf('Manager') !== -1
    ) {
      if (currentPage === QUESTION_PAGE_TIMED) {
        return (
          <div className='header-item'>
            <Tooltip
              title={
                <Typography>
                  <Text tid='notAvailableDuringThisTest' />
                </Typography>
              }
            >
              <Typography className={classes.headerItemDisabled}>
                <Text tid='dashboards' />
              </Typography>
            </Tooltip>
          </div>
        );
      }
      return (
        <div className='header-item'>
          <Typography
            onClick={handleDashboardMenuClick}
            className={classes.headerItem}
          >
            <Text tid='dashboards' />
          </Typography>
        </div>
      );
    }
    return;
  };

  const renderDashboardMenuItems = () => {
    if (!userStatus.roles) {
      return;
    }
    if (
      userStatus.roles!.indexOf('Admin') !== -1 ||
      userStatus.roles!.indexOf('Manager') !== -1
    ) {
      return (
        <Menu
          id='menu-list-grow'
          anchorEl={anchorDashboardEl}
          keepMounted
          open={Boolean(anchorDashboardEl)}
          onClose={handleDashboardMenuClose}
          MenuListProps={{
            onMouseLeave: leaveDashboardMenu,
          }}
          className={classes.menu}
        >
          {dashboardMenu.map((menuList: any, index: number) => {
            return (
              <MenuItem className={classes.menuitem} key={index}>
                <Link
                  activeClass='active'
                  to={menuList.link}
                  spy={true}
                  smooth={true}
                  onClick={handleDashboardMenuOptionClick}
                >
                  {<Text tid={menuList.name} />}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      );
    }
    return;
  };

  const renderTrendsPage = () => {
    if (!userStatus.roles) {
      return;
    }
    if (
      userStatus.roles!.indexOf('Admin') !== -1 ||
      userStatus.roles!.indexOf('Manager') !== -1
    ) {
      if (currentPage === QUESTION_PAGE_TIMED) {
        return (
          <div className='header-item'>
            <Tooltip
              title={
                <Typography>
                  <Text tid='notAvailableDuringThisTest' />
                </Typography>
              }
            >
              <Typography className={classes.headerItemDisabled}>
                <Text tid='trends' />
              </Typography>
            </Tooltip>
          </div>
        );
      }
      return (
        <div className='header-item'>
          <Typography
            onClick={handleTrendsMenuClick}
            className={classes.headerItem}
          >
            <Text tid='trends' />
          </Typography>
        </div>
      );
    }
    return;
  };

  const renderTrendsMenuItems = () => {
    if (!userStatus.roles) {
      return;
    }
    if (
      userStatus.roles!.indexOf('Admin') !== -1 ||
      userStatus.roles!.indexOf('Manager') !== -1
    ) {
      return (
        <Menu
          id='menu-list-grow'
          anchorEl={anchorTrendsEl}
          keepMounted
          open={Boolean(anchorTrendsEl)}
          onClose={handleTrendsMenuClose}
          MenuListProps={{
            onMouseLeave: leaveTrendsMenu,
          }}
          className={classes.menu}
        >
          {trendsMenu.map((menuList: any, index: number) => {
            return (
              <MenuItem className={classes.menuitem} key={index}>
                <Link
                  activeClass='active'
                  to={menuList.link}
                  spy={true}
                  smooth={true}
                  onClick={handleTrendsMenuOptionClick}
                >
                  {<Text tid={menuList.name} />}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      );
    }
    return;
  };

  const handleMyAssessments = () => {
    setAdminPageState(false);
    if (currentPage === QUESTION_PAGE_NOT_TIMED) {
      handleClose();
      setOpenModalLeavePage(true);
      setFocusURL('/assessment/history');
    } else {
      handleClose();
      props.history.push('/assessment/history');
    }
  };

  const handleTeamAssessments = () => {
    setAdminPageState(false);
    if (currentPage === QUESTION_PAGE_NOT_TIMED) {
      handleClose();
      setOpenModalLeavePage(true);
      setFocusURL('/assessment/teams');
    } else {
      handleClose();
      props.history.push('/assessment/teams');
    }
  };

  const handleTakeAssessment = () => {
    setAdminPageState(false);
    if (currentPage === QUESTION_PAGE_NOT_TIMED) {
      handleClose();
      setOpenModalLeavePage(true);
      setFocusURL('/assessmentselect');
    } else {
      handleClose();
      props.history.push('/assessmentselect');
    }
  };

  const renderMenuItems = () => {
    if (userStatus && userStatus.roles) {
      if (
        userStatus.roles.includes('Admin') ||
        userStatus.roles.includes('Manager')
      ) {
        return (
          <Menu
            id='menu-list-grow'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            <MenuItem
              className={classes.menuitem}
              onClick={handleMyAssessments}
            >
              <Text tid='myTests' />
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              onClick={handleTeamAssessments}
            >
              <Text tid='platformTests' />
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              onClick={handleTakeAssessment}
            >
              <Text tid='doTesting' />
            </MenuItem>
          </Menu>
        );
      }
    }
    return (
      <Menu
        id='menu-list-grow'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleMyAssessments}>
          <Text tid='myTests' />
        </MenuItem>
        <MenuItem className={classes.menuitem} onClick={handleTakeAssessment}>
          <Text tid='doTesting' />
        </MenuItem>
      </Menu>
    );
  };

  // const handleHomeIconClick = () => {
  //   setFocusURL('/');
  //   setPageRedirectState({ type: '' });
  //   setOpenModalLeavePage(true);
  // };

  const modalYesClickedLeavePage = () => {
    setOpenModalLeavePage(false);
    if (focusURL) {
      if (pageRedirectState.type) {
        props.history.push({ pathname: focusURL, state: pageRedirectState });
        setPageRedirectState({ type: '' });
      } else {
        props.history.push(focusURL);
      }
      setFocusURL('');
    }
  };

  const modalNoClickedLeavePage = () => {
    setFocusURL('');
    setOpenModalLeavePage(false);
  };

  const setSignInState = (state: boolean) => {
    setOpenSignin(state);
    if(!state) {
      setChangePassword(false);
    }
  }

  const handleCloseSignup = (state: boolean) => {
    setOpenSignup(state);
  };

  const renderHomeButton = () => {
    return (
      <div className='header-item'>
        <NavLink to={/*userStatus.idToken ? '/selectProduct' : */'/'}>
          <Typography className={classes.headerItem}>
            <Text tid='home' />
          </Typography>
        </NavLink>
      </div>
    );
  };

  const renderAboutUsButton = () => {
    if (userStatus.idToken) {
      return;
    } else {
      return (
        <div className='header-item'>
          <NavLink to='/about'>
            <Typography className={classes.headerItem}>
              <Text tid='aboutUs' />
            </Typography>
          </NavLink>
        </div>
      );
    }
  };

  const renderFeedbackButton = () => {
    if (userStatus.idToken) {
      return;
    } else {
      return (
        <div className='header-item'>
          <NavLink to='/feedback'>
            <Typography className={classes.headerItem}>
              Feedback
            </Typography>
          </NavLink>
        </div>
      );
    }
  };

  const renderContactUsButton = () => {
    if (userStatus.idToken) {
      return;
    } else {
      return (
        <div className='header-item'>
          <NavLink to='/about'>
            <Typography className={classes.headerItem}>
              <Text tid='contactUs' />
            </Typography>
          </NavLink>
        </div>
      );
    }
  };

  const renderLogo = () => {
    return (
      <div className='topbar-header-logo'>
        <NavLink to='/'>
          <img className={classes.bigLogo} src={bigLogo} alt='logo' />
        </NavLink>
      </div>
    );
  };

  const openSignUpForm = () => {
    setSignInState(false);
    setOpenSignup(true);
  }

  return (
    <Fragment>
      <div className={classes.topBar}>
        {renderLogo()}
        <div className='topbar-header-links'>
          <div className='header-container'>
            {/* {<LanguageSelector />} */}
            {/* {renderHomeButton()} */}
            {/* renderAboutUsButton() */}
            {/* renderFeedbackButton() */}
            {/* {renderContactUsButton()} */}
            {renderAdminPage()}
            {/* renderManageSoftwareFiles() */}
            {/* {renderViewMetrics()} */}
            {/* {renderMetricsMenuItems()} */}
            {/* renderDashboardPage() */}
            {/* renderDashboardMenuItems() */}
            {/* renderTrendsPage() */}
            {/* renderTrendsMenuItems() */}
            {/* renderViewAssessment() */}
            {/* renderMenuItems() */}
            {renderUserStatus()}
          </div>
        </div>
        <Popper open={openUserMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseUserMenu}>
                  <MenuList autoFocusItem={openUserMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {/* <MenuItem onClick={handleProfileSetting}>Profile Settings</MenuItem> */}
                    <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                    <MenuItem onClick={logoutModalActivate}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <ModalComponent
        message={'wantToLogout'}
        openModal={openModalLogout}
        handleModalYesClicked={modalYesClickedLogout}
        handleModalNoClicked={modalNoClickedLogout}
      />
      <ModalComponent
        message={'wantToLeaveThisPage'}
        messageSecondary={'unsavedChangesWillBeLost'}
        openModal={openModalLeavePage}
        handleModalYesClicked={modalYesClickedLeavePage}
        handleModalNoClicked={modalNoClickedLeavePage}
      />
      {openSignin &&
        <SignInForm
          openSignin={openSignin}
          setSignInState={setSignInState}
          changePassword={changePassword}
          openSignUpForm={openSignUpForm}
        />
      }
      {openSignup && (
      <SignupForm
        openSignup={openSignup}
        handleCloseSignup={handleCloseSignup}
        superUserStateVariable={superUserStateVariable}
      />
      )}
    </Fragment>
  );
};

export default withRouter(PageHeader);
