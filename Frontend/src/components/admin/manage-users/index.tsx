import React, { useState, useEffect, Fragment } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  makeStyles,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  MuiThemeProvider,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import './style.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import SearchControl from '../../common/searchControl';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { IUserParams } from '../../../model';
import PageSizeDropDown from '../../common/page-size-dropdown';
import RenderPagination from '../../common/pagination';
import { default as MaterialLink } from '@material-ui/core/Link';
import { getDate } from '../../../utils/data';
import { Text } from '../../../common/Language';
import Notification from '../../../common/notification';
import '../../../css/assessments/style.css';
import { ITeamInfo } from '../../../model';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '36px',
    position: 'relative',
    left: '45%',
    minWidth: '10%',
    ...buttonStyle,
  },
  formControl: {
    minWidth: '100%',
  },
  backButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  firstColumn: {
    maxWidth: '150px',
    overflow: 'hidden',
  },
  rolesColumn: {
    maxWidth: '100px',
    overflow: 'hidden',
  },
  teamsColumn: {
    maxWidth: '150px',
    overflow: 'hidden',
  },
  buttons: {
    ...buttonStyle,
  },
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '20%',
  },
}));

const ManageUsers = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [responseReceived, setResponseReceived] = useState(false);
  const [allUsers, setAllUsers] = useState<Object[]>([]);
  const [users, setUsers] = useState<Object[]>([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [teams, setTeams] = useState<ITeamInfo[]>([]);
  const [focusTeamId, setFocusTeamId] = useState('0');
  const [itemLimit, setItemLimit] = useState({
    lowerLimit: 0,
    upperLimit: 9,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userData, setUserData] = React.useState<IUserParams | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('name');

  const fetchTeamList = () => {
    Http.get({
      url: `/api/v2/teamlist`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.sort((a: any, b: any) => {
          if (a.active === 'true' && b.active === 'true') {
            return a.teamName <= b.teamName ? -1 : 1;
          }
          if (a.active === 'false' && b.active === 'false') {
            return a.teamName <= b.teamName ? -1 : 1;
          }
          return a.active === 'true' ? -1 : 1;
        });
        setTeams(response);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

  const fetchUserList = () => {
    setBackdropOpen(true);
    let url: string = `/api/v2/admin/users/${focusTeamId}`;
    if (focusTeamId === '0') {
      url = '/api/v2/admin/users/allUsers';
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        response.users.sort((a: any, b: any) => {
          return a.emailId <= b.emailId ? -1 : 1;
        });
        setResponseReceived(true);
        setUsers(response.users);
        setAllUsers(response.users);
        setBackdropOpen(false);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
        setBackdropOpen(false);
      });
  };

  const onConfirmResetPassword = (emailId: any) => {
    setNotify({
      isOpen: true,
      message: "Loading...",
      type: 'info',
    });
    Http.get({
      url: `/api/v2/admin/users/getusers?email=${emailId}`,
      state: stateVariable,
    })
      .then((response: any) => {
        let selectedUserData = response.values;
        selectedUserData['resetPassword'] = true;
        setUserData(selectedUserData)
        setDialogOpen(true)
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setNotify({
            isOpen: true,
            message: object.apiError.msg,
            type: 'error',
          });
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  }

  const handleResetPassword = () => {
    handleDialogClose();
    setNotify({
      isOpen: true,
      message: "Loading...",
      type: 'info',
    });
    let postData = userData;
    postData &&
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
            message: 'Reset Password has been successful. A temporary password is sent to the user email address.',
            type: 'success',
          });
        })
        .catch((error) => {
          const perror = JSON.stringify(error);
          const object = JSON.parse(perror);
          if (object.code === 400) {
            setNotify({
              isOpen: true,
              message: object.apiError.msg,
              type: 'error',
            });
          } else if (object.code === 401) {
            props.history.push('/relogin');
          } else {
            setNotify({
              isOpen: true,
              message: "Something went wrong",
              type: 'error',
            });
          }
        });
  }

  useEffect(() => {
    fetchTeamList();
    fetchUserList();
    setSearchString('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchUserList();
    setSearchString('');
    setCurrentPage(1);
  }, [focusTeamId]);

  useEffect(() => {
    setNumberOfUsers(users.length);
  }, [users]);

  useEffect(() => {
    if (searchButtonPressed) {
      setSearchButtonPressed(false);
      const searchedItems: any = [];
      if (searchString === '') {
        setUsers([]);
      }
      allUsers.forEach((el: any) => {
        if (el.emailId.toLowerCase().includes(searchString.toLowerCase())) {
          searchedItems.push(el);
        }
      });
      setUsers(searchedItems);
      setCurrentPage(1);
    }
  }, [searchButtonPressed]);

  useEffect(() => {
    calculateLimits();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    calculateLimits();
  }, [itemsPerPage]);

  useEffect(() => {
    if (users !== []) {
      const tempSortedUsers = [...users];
      if (order === 'asc') {
        if (orderBy === 'name') {
          setUsers(tempSortedUsers.sort(compareName));
        }
        if (orderBy === 'date') {
          setUsers(tempSortedUsers.sort(compareDate));
        }
        if (orderBy === 'team') {
          setUsers(tempSortedUsers.sort(compareTeam));
        }
        if (orderBy === 'roles') {
          setUsers(tempSortedUsers.sort(compareRoles));
        }
      }
      if (order === 'desc') {
        if (orderBy === 'name') {
          setUsers(tempSortedUsers.sort(compareNameD));
        }
        if (orderBy === 'date') {
          setUsers(tempSortedUsers.sort(compareDateD));
        }
        if (orderBy === 'team') {
          setUsers(tempSortedUsers.sort(compareTeamD));
        }
        if (orderBy === 'roles') {
          setUsers(tempSortedUsers.sort(compareRolesD));
        }
      }
    }
  }, [order, orderBy]);

  function compareName(a: any, b: any) {
    if (a.emailId < b.emailId) {
      return -1;
    }
    if (a.emailId > b.emailId) {
      return 1;
    }
    return 0;
  }

  function compareDate(a: any, b: any) {
    if (!a.createdOn) {
      if (!b.createdOn) {
        return -1;
      }
      return -1;
    }
    if (!b.createdOn) {
      if (!a.createdOn) {
        return -1;
      }
      return 1;
    }
    if (a.createdOn < b.createdOn) {
      return -1;
    }
    if (a.createdOn > b.createdOn) {
      return 1;
    }
    return 0;
  }

  function compareTeam(a: any, b: any) {
//    const teamsA = commaSeparators(a.teams);
//    const teamsB = commaSeparators(b.teams);
    const teamsA = a.teams.map((teamId: string) => {
      const team = teams.find((t: ITeamInfo) => t.teamId === teamId);
      return team ? team.teamName : teamId;
    }).join(', ');

    const teamsB = b.teams.map((teamId: string) => {
      const team = teams.find((t: ITeamInfo) => t.teamId === teamId);
      return team ? team.teamName : teamId;
    }).join(', ');

    if (teamsA.toLowerCase() < teamsB.toLowerCase()) {
      return -1;
    }
    if (teamsA.toLowerCase() > teamsB.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function compareRoles(a: any, b: any) {
//    const rolesA = a.roles ? commaSeparators(a.roles) : 'Member';
//    const rolesB = b.roles ? commaSeparators(b.roles) : 'Member';
    const rolesA = a.roles ? a.roles.join(', ') : 'Member';
    const rolesB = b.roles ? b.roles.join(', ') : 'Member';
    
    if (rolesA.toLowerCase() < rolesB.toLowerCase()) {
      return -1;
    }
    if (rolesA.toLowerCase() > rolesB.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function compareNameD(a: any, b: any) {
    if (a.emailId < b.emailId) {
      return 1;
    }
    if (a.emailId > b.emailId) {
      return -1;
    }
    return 0;
  }

  function compareDateD(a: any, b: any) {
    if (!a.createdOn) {
      if (!b.createdOn) {
        return -1;
      }
      return 1;
    }
    if (!b.createdOn) {
      if (!a.createdOn) {
        return -1;
      }
      return -1;
    }
    if (a.createdOn < b.createdOn) {
      return 1;
    }
    if (a.createdOn > b.createdOn) {
      return -1;
    }
    return 0;
  }

  function compareTeamD(a: any, b: any) {
//    const teamsA = commaSeparators(a.teams);
//    const teamsB = commaSeparators(b.teams);
    const teamsA = a.teams.map((teamId: string) => {
      const team = teams.find((t: ITeamInfo) => t.teamId === teamId);
      return team ? team.teamName : teamId;
    }).join(', ');

    const teamsB = b.teams.map((teamId: string) => {
      const team = teams.find((t: ITeamInfo) => t.teamId === teamId);
      return team ? team.teamName : teamId;
    }).join(', ');

    if (teamsA.toLowerCase() < teamsB.toLowerCase()) {
      return 1;
    }
    if (teamsA.toLowerCase() > teamsB.toLowerCase()) {
      return -1;
    }
    return 0;
  }

  function compareRolesD(a: any, b: any) {
//    const rolesA = a.roles ? commaSeparators(a.roles) : 'Member';
//    const rolesB = b.roles ? commaSeparators(b.roles) : 'Member';
    const rolesA = a.roles ? a.roles.join(', ') : 'Member';
    const rolesB = b.roles ? b.roles.join(', ') : 'Member';

    if (rolesA.toLowerCase() < rolesB.toLowerCase()) {
      return 1;
    }
    if (rolesA.toLowerCase() > rolesB.toLowerCase()) {
      return -1;
    }
    return 0;
  }

  const handleRequestSort = (property: string) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrder('asc');
      setOrderBy(property);
    }
  };

  const calculateLimits = () => {
    const lowerLimit = (currentPage - 1) * itemsPerPage;
    const upperLimit = lowerLimit + itemsPerPage - 1;
    setItemLimit({ lowerLimit, upperLimit });
  };

  const handleSearch = (str?: string) => {
    if (typeof str !== 'undefined') {
      setSearchString(str);
    }
    setSearchButtonPressed(true);
  };

  const handleChangeItemsPerPage = (event: any) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
  };

  const handlePaginationClick = (event: number) => {
    setCurrentPage(event);
  };

  const handleChangeTeam = (event: any) => {
    setFocusTeamId(event.target.value);
  };

/*
  const commaSeparators = (strArray: string[]) => {
    let rolesStr = '';
    if (Array.isArray(strArray)) {
      strArray.map((el: string, index: number) => {
        if (index === 0) {
          rolesStr = el;
        } else {
          rolesStr = `${rolesStr}, ${el}`;
        }
      });
    } else {
      return strArray;
    }
    return rolesStr;
  };
*/

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const renderUsersTable = () => {
    return (
      <Fragment>
        <Container maxWidth='lg' component='div' className='containerRoot'>
          <Backdrop className={classes.backdrop} open={backdropOpen}>
            <CircularProgress color='inherit' />
          </Backdrop>
          <div style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item sm={5}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-label'>
                    <Text tid='choosePlatform' />
                  </InputLabel>
                  <Select
                    name={'selectTeam'}
                    value={focusTeamId}
                    onChange={handleChangeTeam}
                  >
                    <MenuItem key={'allUsers'} value={'0'}>
                      <Text tid='allUsers' />
                    </MenuItem>
                    {teams && teams.length !== 0 ? (
                      teams.map((el: any) => (
                        <MenuItem key={el.teamId} value={el.teamId}>
                          {el.teamName}
                        </MenuItem>
                      ))
                    ) : (
                      <div />
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={5}>
                <SearchControl
                  searchString={searchString}
                  handleSearch={handleSearch}
                />
              </Grid>
              <Grid item sm={2}>
                <PageSizeDropDown
                  handleChange={handleChangeItemsPerPage}
                  itemCount={itemsPerPage}
                />
              </Grid>
            </Grid>
          </div>
          <Paper className='tableArea'>
            <Table className='table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('name');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='tester' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('date');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='createdOn' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'roles'}
                      direction={orderBy === 'roles' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('roles');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='roles' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'team'}
                      direction={orderBy === 'team' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('team');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='platform' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell' >
                    <Typography className='tableHeadText'>
                      <Text tid='actions' />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row: any, index: number) => {
                  if (index < itemLimit.lowerLimit) {
                    return;
                  }
                  if (index > itemLimit.upperLimit) {
                    return;
                  }
                  if (row.emailId) {
                    return (
                      <TableRow
                        key={row.emailId}
                      /*style={index % 2 ? { background : '#EFEFEF' } : { background : 'white' }} */
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          className={classes.firstColumn}
                        >
                          <MuiThemeProvider theme={tooltipTheme}>
                            <Tooltip
                              title={
                                <Typography className='tooltipTitleStyle'>
                                  {row.emailId}
                                </Typography>
                              }
                            >
                              <Typography className='tableBodyText'>
                                {row.emailId}
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
                        </TableCell>
                        <TableCell component='th' scope='row' align='center'>
                          <Typography className='tableBodyText'>
                            {row.createdOn ? getDate(row.createdOn) : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                          align='center'
                          className={classes.rolesColumn}
                        >
                          <Typography className='tableBodyText'>
                            {row.roles ? row.roles.join(', ')/*commaSeparators(row.roles)*/ : 'Member'}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                          align='center'
                          className={classes.teamsColumn}
                        >
                          <Typography className='tableBodyText'>
                            {/*commaSeparators(row.teams)*/
                              row.teams.map((teamId: string) => {
                                const team = teams.find((t: ITeamInfo) => t.teamId === teamId);
                                return team ? team.teamName : teamId;
                              }).join(', ')
                            }
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <div className={classes.actionsBlock}>
                            <MaterialLink
                              href='#'
                              onClick={() => {
                                onConfirmResetPassword(row.emailId);
                              }}
                            >
                              <Typography>
                                <Text tid='resetPassword' />
                              </Typography>
                            </MaterialLink>
                            <Typography>&nbsp;&nbsp;|&nbsp;&nbsp;</Typography>
                            <MaterialLink
                              href='#'
                              onClick={() => {
                                props.editUserClicked(row.emailId);
                              }}
                            >
                              <Typography>
                                <Text tid='editProfile' />
                              </Typography>
                            </MaterialLink>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </Paper>
          <Fragment>
            <RenderPagination
              pageRangeDisplayed={10}
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={numberOfUsers}
              handleChange={handlePaginationClick}
            />
          </Fragment>
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={props.goBack}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Container>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"><Text tid='resetConfirmation' /></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Text tid='areYouSureYouWantToResetTheUserPassword' />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              <Text tid='cancel' />
            </Button>
            <Button onClick={handleResetPassword} color="primary">
              <Text tid='reset' />
            </Button>
          </DialogActions>
        </Dialog>
        <Notification notify={notify} setNotify={setNotify} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      {responseReceived ? (
        renderUsersTable()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageUsers);
