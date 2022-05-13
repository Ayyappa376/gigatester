import React, { useEffect, useState, Fragment } from 'react';
import {
  Typography,
  makeStyles,
  Container,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
  Grid,
  TableSortLabel,
  MuiThemeProvider,
  Snackbar,
  SnackbarContent,
  Tooltip
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { ModalComponent } from '../../modal';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import SearchControl from '../../common/searchControl';
import PageSizeDropDown from '../../common/page-size-dropdown';
import RenderPagination from '../../common/pagination';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import { IGroupInfo } from '../../../model/admin/group';

const useStyles = makeStyles((theme) => ({
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '20%',
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
  treeRoot: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
}));

const ManageGroups = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [fetchedGroups, setFetchedGroups] = React.useState(false);
//  const [allGroups, setAllGroups] = React.useState<IGroupInfo[]>([]);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
//  const [searchString, setSearchString] = useState('');
  const [groups, setGroups] = useState<{[key: string]: IGroupInfo}>({});
  const [hasChanges, setHasChanges] = useState<{[key: string]: boolean}>({});
//  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
//  const [itemsPerPage, setItemsPerPage] = useState(10);
//  const [currentPage, setCurrentPage] = useState(1);
//  const [numberOfGroups, setNumberOfGroups] = useState(0);
//  const [itemLimit, setItemLimit] = useState({
//    lowerLimit: 0,
//    upperLimit: 9,
//  });
//  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
//  const [orderBy, setOrderBy] = useState('name');
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  let msgFailure = failureMessage;

  const fetchGroupList = () => {
    setBackdropOpen(true);
    Http.get({
      url: `/api/v2/groups`,
      state: stateVariable,
    })
    .then((response: any) => {
//      response.sort((a: IGroupInfo, b: IGroupInfo) => {
//        return a.name.localeCompare(b.name);
//      });
      setFetchedGroups(true);
//      setAllGroups(response);
      setGroups(response);
      initializeHasChanges(Object.keys(response));
      setBackdropOpen(false);
    })
    .catch((error: any) => {
      setFetchedGroups(true);
      setBackdropOpen(false);
      const perror = JSON.stringify(error);
      const object = JSON.parse(perror);
      if (object.code === 401) {
        props.history.push('/relogin');
      } else {
        props.history.push('/error');
      }
    })
  };

  useEffect(() => {
    fetchGroupList();
//    setSearchString('');
//    setCurrentPage(1);
  }, []);

  const initializeHasChanges = (groupIds: string[]) => {
    const tempHasChanges: {[key: string]: boolean} = {};
    groupIds.forEach((id: string) => tempHasChanges[id] = false);
    setHasChanges(tempHasChanges);
  }

  const mandatoryFieldCheck = (group: IGroupInfo): boolean => {
    return (group.name !== '');
  };

//  useEffect(() => {
//    setNumberOfGroups(groups.length);
//  }, [groups]);

  const handleSave = (groupId: string) => {
    const group: IGroupInfo = groups[groupId];
    if(mandatoryFieldCheck(group)) {
      setBackdropOpen(true);
      if(group.id === 'tempId') {
        console.log(group);
        Http.post({
          url: `/api/v2/groups`,
          body: {
            group: { ...group, id: '' }
          },
          state: stateVariable,
        })
        .then((response: any) => {
          setBackdropOpen(false);
          fetchGroupList();
        })
        .catch((error: any) => {
          setBackdropOpen(false);
          handleSaveError(error);
        });
      } else {
        Http.put({
          url: `/api/v2/groups`,
          body: {
            group: { ...group }
          },
          state: stateVariable,
        })
        .then((response: any) => {
          setBackdropOpen(false);
          fetchGroupList();
        })
        .catch((error: any) => {
          setBackdropOpen(false);
          handleSaveError(error);
        });
      }
    }
  };

  const handleSaveError = (error: any) => {
    const perror = JSON.stringify(error);
    const object = JSON.parse(perror);
    if (object.code === 400) {
      setFailureMessage(object.apiError.msg);
    } else if (object.code === 401) {
      props.history.push('/relogin');
    } else {
      setFailureMessage(<Text tid='somethingWentWrong' />);
      setFailure(true);
    }
  }

  // useEffect(() => {
  //   if (searchButtonPressed) {
  //     setSearchButtonPressed(false);
  //     const searchedItems: any = [];
  //     if (searchString === '') {
  //       setGroups([]);
  //     }
  //     allGroups.forEach((el: any) => {
  //       if (el.groupName.toLowerCase().includes(searchString.toLowerCase())) {
  //         searchedItems.push(el);
  //       }
  //     });
  //     setGroups(searchedItems);
  //     setCurrentPage(1);
  //   }
  // }, [searchButtonPressed]);

  // useEffect(() => {
  //   calculateLimits();
  // }, [currentPage]);

  // useEffect(() => {
  //   setCurrentPage(1);
  //   calculateLimits();
  // }, [itemsPerPage]);

  // useEffect(() => {
  //   if (groups !== []) {
  //     const tempSortedGroups = [...groups];
  //     if (order === 'asc') {
  //       if (orderBy === 'group') {
  //         setGroups(tempSortedGroups.sort(compareGroup));
  //       }
  //     }
  //     if (order === 'desc') {
  //       if (orderBy === 'group') {
  //         setGroups(tempSortedGroups.sort(compareGroupD));
  //       }
  //     }
  //   }
  // }, [order, orderBy]);

  // function compareGroup(a: IGroupInfo, b: IGroupInfo) {
  //   return a.name.localeCompare(b.name);
  // }

  // function compareGroupD(a: IGroupInfo, b: IGroupInfo) {
  //   return b.name.localeCompare(a.name);
  // }

  // const handleRequestSort = (property: string) => {
  //   if (orderBy === property) {
  //     setOrder(order === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setOrder('asc');
  //     setOrderBy(property);
  //   }
  // };

  // const calculateLimits = () => {
  //   const lowerLimit = (currentPage - 1) * itemsPerPage;
  //   const upperLimit = lowerLimit + itemsPerPage - 1;
  //   setItemLimit({ lowerLimit, upperLimit });
  // };

  // const handleSearch = (str?: string) => {
  //   if (typeof str !== 'undefined') {
  //     setSearchString(str);
  //   }
  //   setSearchButtonPressed(true);
  // };

  // const handleChangeItemsPerPage = (event: any) => {
  //   const value = parseInt(event.target.value, 10);
  //   setItemsPerPage(value);
  // };

  // const handlePaginationClick = (event: number) => {
  //   setCurrentPage(event);
  // };

  const deleteClicked = (groupId: string) => {
    setSelectedGroupId(groupId);
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    if (selectedGroupId.length > 0) {
      deleteGroup(selectedGroupId);
      setOpenModal(false);
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const deleteGroup = (groupId: string) => {
    setBackdropOpen(true);
    Http.deleteReq({
      url: `/api/v2/devices/${groupId}`,
      state: stateVariable,
    })
    .then((response: any) => {
      setBackdropOpen(false);
      setSelectedGroupId('');
      fetchGroupList();
    })
    .catch((error) => {
      const perror = JSON.stringify(error);
      const object = JSON.parse(perror);
      if (object.code === 400) {
        setFailureMessage(object.apiError.msg);
      } else if (object.code === 401) {
        props.history.push('/relogin');
      } else {
        setFailureMessage(<Text tid='somethingWentWrong' />);
        setFailure(true);
      }
      setBackdropOpen(false);
      setSelectedGroupId('');
      fetchGroupList();
    });
  };

  const handleChangeValue = (event: any, groupId: string) => {
    const temp: {[key: string]: IGroupInfo} = { ...groups };
    const group: IGroupInfo = temp[groupId];

    group.name = event.target.value;
    setGroups(temp);

    const tempHasChanges: {[key: string]: boolean} = { ...hasChanges };
    tempHasChanges[groupId] = true;
    setHasChanges(tempHasChanges);
  };

  const addChildGroup = (parentGroupId?: string) => {
    const temp: {[key: string]: IGroupInfo} = { ...groups };
    const newGroup: IGroupInfo = {
      id: 'tempId',
      name: '',
    };
    console.log(parentGroupId, 'parentGroupId')
    if(parentGroupId) {
      newGroup.parent = parentGroupId;
      const parentGroup: IGroupInfo = temp[parentGroupId];
      if(!parentGroup.children) {
        parentGroup.children = [];
      }
      parentGroup.children.push('tempId');
    }
    temp[newGroup.id] = newGroup;
    console.log(temp, 'temp group');
    setGroups(temp);

    const tempHasChanges: {[key: string]: boolean} = { ...hasChanges };
    tempHasChanges[newGroup.id] = true;
    setHasChanges(tempHasChanges);
  };

  const renderTree = (group: IGroupInfo) => {
    return(
      <TreeItem key={group.id} nodeId={group.id} label={
        <Fragment>
          <TextField
            required={true}
            type='string'
            id={group.id}
            name={group.id}
            value={group.name ? group.name : ''}
            label={'Group Name:'}
            onChange={(event) => handleChangeValue(event, group.id)}
            fullWidth
            autoComplete='off'
            className='textFieldStyle'
          />
          <div style={{ cursor: 'pointer' }}>
          <MuiThemeProvider theme={tooltipTheme}>
              <Tooltip
                title={
                  <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                    <Text tid='addChildGroup' />
                  </Typography>
                }
              >
                <Typography>
                  <AddIcon onClick={() => { addChildGroup(group.id); }} />{' '}
                  <Text tid='addChildGroup' />
                </Typography>
              </Tooltip>
            </MuiThemeProvider>
            {hasChanges[group.id] ? (
              <Button
                onClick={() => { handleSave(group.id) }}
                className={classes.backButton}
                variant='outlined'
              >
                <Text tid='save' />
              </Button>
            ) : (
              <Button className={classes.backButton} disabled variant='outlined'>
                <Text tid='save' />
              </Button>
            )}
            <MuiThemeProvider theme={tooltipTheme}>
              <Tooltip
                title={
                  <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                    <Text tid='delete' />
                  </Typography>
                }
              >
                <Typography style={{ padding: '0 6px' }}>
                  <ClearIcon onClick={() => { deleteClicked(group.id); }}/>
                </Typography>
              </Tooltip>
            </MuiThemeProvider>
          </div>
        </Fragment>
      }>
        {group.children && group.children.map((childId: string) => {
          console.log(group);
          return renderTree(groups[childId])
        })}
      </TreeItem>
    )
  };

  const renderGroupsTree = () => {
    return (
      <Fragment>
        <Container maxWidth='md' component='div' className='containerRoot'>
          <Backdrop className={classes.backdrop} open={backdropOpen}>
            <CircularProgress color='inherit' />
          </Backdrop>
          <div style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item sm={5}>
                <MuiThemeProvider theme={tooltipTheme}>
                  <Tooltip
                    title={
                      <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                        <Text tid='addGroup' />
                      </Typography>
                    }
                  >
                    <Typography>
                      <AddIcon onClick={() => { addChildGroup(); }} />{' '}
                      <Text tid='addGroup' />
                    </Typography>
                  </Tooltip>
                </MuiThemeProvider>
              </Grid>
              <Grid item sm={5}>
                {/* <SearchControl
                  searchString={searchString}
                  handleSearch={handleSearch}
                /> */}
              </Grid>
              <Grid item sm={2}>
                {/* <PageSizeDropDown
                  handleChange={handleChangeItemsPerPage}
                  itemCount={itemsPerPage}
                /> */}
              </Grid>
            </Grid>
          </div>
          <Paper className='tableArea'>
            <TreeView
              className='treeRoot'
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {groups && Object.keys(groups).map((groupId: string) => {
                return (!groups[groupId].parent) ? renderTree(groups[groupId]) : ''
              })}
            </TreeView>
            {/*<Table className='table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='manageGroups2' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='actions' />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((row: IGroupInfo, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      style={
                        index % 2
                          ? { background: '#EFEFEF' }
                          : { background: 'white' }
                      }
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        className='tableCell'
                      >
                        <Typography className='tableBodyText'>
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' className='tableCell'>
                        <div className={classes.actionsBlock}>
                          <MuiThemeProvider theme={tooltipTheme}>
                            <Tooltip
                              title={
                                <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                                  <Text tid='edit' />
                                </Typography>
                              }
                            >
                              <Typography style={{ padding: '0 6px' }}>
                                <EditIcon onClick={() => { props.editClicked(row.id); }}/>
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
                          <MuiThemeProvider theme={tooltipTheme}>
                            <Tooltip
                              title={
                                <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                                  <Text tid='delete' />
                                </Typography>
                              }
                            >
                              <Typography style={{ padding: '0 6px' }}>
                                <ClearIcon onClick={() => { deleteClicked(row.id); }}/>
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>*/}
          </Paper>
          <div className='bottomButtonsContainer'>
            {/*<Button
              className={classes.backButton}
              variant='outlined'
              onClick={props.goBack}
            >
              <Text tid='goBack' />
            </Button>*/}
            {/*hasChanges ? (
            <Button
              onClick={() => { handleSave() }}
              className={classes.backButton}
              variant='outlined'
            >
              <Text tid='save' />
            </Button>
          ) : (
            <Button className={classes.backButton} disabled variant='outlined'>
              <Text tid='save' />
            </Button>
          )*/}
          </div>
          <ModalComponent
            message={'deleteGroupConfirmMessage'}
            openModal={openModal}
            handleModalYesClicked={modalYesClicked}
            handleModalNoClicked={modalNoClicked}
          />
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={failure}
          onClose={handleClose}
          autoHideDuration={9000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#dd0000',
            }}
            message={msgFailure}
          />
        </Snackbar>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {fetchedGroups ? (
        renderGroupsTree()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageGroups);
