import React, { useEffect, useState, Fragment } from 'react';
import {
  Typography,
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
  Grid,
  TableSortLabel,
  MuiThemeProvider,
  Snackbar,
  SnackbarContent,
  Tooltip,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
import { IGroupInfo, IPlatformInfo } from '../../../model';
import { TreeItem, TreeView } from '@material-ui/lab';

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
}));

const ManageGroups = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [fetchGroups, setfetchGroups] = React.useState(false);
  const [allPlatforms, setAllPlatforms] = React.useState<Object[]>([]);
  const [groups, setGroups] = useState<{[key: string]: IGroupInfo}>({});
  const [fetchedGroups, setFetchedGroups] = React.useState(false);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deletePlatformId, setDeletePlatformId] = useState('');
  const [searchString, setSearchString] = useState('');
  const [platforms, setPlatforms] = useState<IPlatformInfo[]>([]);
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPlatforms, setNumberOfPlatforms] = useState(0);
  const [itemLimit, setItemLimit] = useState({
    lowerLimit: 0,
    upperLimit: 9,
  });
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('name');
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  let msgFailure = failureMessage;

  const fetchPlatformList = () => {
    setBackdropOpen(true);
    Http.get({
      url: `/api/v2/platforms/`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.platforms.sort((a: IPlatformInfo, b: IPlatformInfo) => {
          return a.name.localeCompare(b.name);
        });
        setfetchGroups(true);
        setAllPlatforms(response.platforms);
        setPlatforms(response.platforms);
        setBackdropOpen(false);
        if(typeof window.GigaTester !== 'undefined'){
          window.GigaTester.setDefaultCategory("Platform-Bug", "BUGS");
          window.GigaTester.setDefaultCategory("Platform", "FEEDBACK");
        }
      })
      .catch((error: any) => {
        setfetchGroups(true);
        setBackdropOpen(false);
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

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
      console.log(response);
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

  useEffect(() => {
    setNumberOfPlatforms(platforms.length);
  }, [platforms]);

  useEffect(() => {
    fetchPlatformList();
    setSearchString('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (searchButtonPressed) {
      setSearchButtonPressed(false);
      const searchedItems: any = [];
      if (searchString === '') {
        setPlatforms([]);
      }
      allPlatforms.forEach((el: any) => {
        if (el.name.toLowerCase().includes(searchString.toLowerCase())) {
          searchedItems.push(el);
        }
      });
      setPlatforms(searchedItems);
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
    if (platforms !== []) {
      const tempSortedPlatforms = [...platforms];
      if (order === 'asc') {
        if (orderBy === 'platform') {
          setPlatforms(tempSortedPlatforms.sort(comparePlatform));
        }
      }
      if (order === 'desc') {
        if (orderBy === 'platform') {
          setPlatforms(tempSortedPlatforms.sort(comparePlatformD));
        }
      }
    }
  }, [order, orderBy]);

  function comparePlatform(a: IPlatformInfo, b: IPlatformInfo) {
    return a.name.localeCompare(b.name);
  }

  function comparePlatformD(a: IPlatformInfo, b: IPlatformInfo) {
    return b.name.localeCompare(a.name);
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

  const deleteClicked = (platformId: string) => {
    setDeletePlatformId(platformId);
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    if (deletePlatformId !== '') {
      deletePlatform(deletePlatformId);
      setOpenModal(false);
    }
  };

  

  const deletePlatform = (platformId: string) => {
    setBackdropOpen(true);
    Http.deleteReq({
      url: `/api/v2/platforms/${platformId}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setBackdropOpen(false);
        setDeletePlatformId('');
        fetchPlatformList();
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
        fetchPlatformList();
      });
  };

  const renderTreeAction = (group: IGroupInfo) => {
    return(
      <TreeItem key={group.id} nodeId={group.id} expandIcon={false} label={
        <Fragment>
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end' }}>
          <MuiThemeProvider theme={tooltipTheme}>
                            <Tooltip
                              title={
                                <Typography
                                  style={{
                                    fontSize: '12px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Text tid='edit' />
                                </Typography>
                              }
                            >
                              <Typography style={{ padding: '0 6px' }}>
                                <EditIcon
                                  onClick={() => {
                                    props.editClicked(group.id);
                                  }}
                                />
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
            {/* {hasChanges[group.id] ? (
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
            )} */}
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
          console.log(group, 'before render tree call');
          console.log(groups[childId], childId)
          return renderTreeAction(groups[childId])
        })}
      </TreeItem>
    )
  };
  const renderTree = (group: IGroupInfo) => {
    return(
      <TreeItem key={group.id} nodeId={group.id} label={
        <Fragment>
          <Typography>
          {group.name ? group.name : ''}
          </Typography>
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end' }}>
          {/* <MuiThemeProvider theme={tooltipTheme}>
              <Tooltip
                title={
                  <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                    <Text tid='addChildGroup' />
                  </Typography>
                }
              >
                <Typography style={{position: 'relative', top: '-21px', right: '-82px'}}>
                  <AddIcon onClick={() => { addChildGroup(group.id); }} />{' '}
                  <Text tid='addChildGroup' />
                </Typography>
              </Tooltip>
            </MuiThemeProvider> */}
            {/* {hasChanges[group.id] ? (
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
            )} */}
          </div>
        </Fragment>
      }>
        {group.children && group.children.map((childId: string) => {
          console.log(group, 'before render tree call');
          console.log(groups[childId], childId)
          return renderTree(groups[childId])
        })}
      </TreeItem>
    )
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderPlatformsTable = () => {
    return (
      <Fragment>
        <Container maxWidth='md' component='div' className='containerRoot'>
          <Backdrop className={classes.backdrop} open={backdropOpen}>
            <CircularProgress color='inherit' />
          </Backdrop>
          <div style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item sm={5}>
                <Button
                  className={classes.backButton}
                  variant='outlined'
                  onClick={() => {
                    props.editClicked(0);
                  }}
                >
                  <AddIcon fontSize='large' /> <Text tid='createGroup' />
                </Button>
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
          <TreeView
              className='treeRoot'
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
            >
            <Table className='table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'platform'}
                      direction={orderBy === 'platform' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('platform');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='manageGroups' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='actions' />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(groups).map((row: any, index: number) => {
                  return (
                    !groups[row].parent ? 
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
                        {renderTree(groups[row])}
                      </TableCell>
                      <TableCell align='center' className='tableCell'>
                        <div
                          className={classes.actionsBlock}
                          style={{ cursor: 'pointer' }}
                        >
                          {renderTreeAction(groups[row])}
                        </div>
                      </TableCell>
                    </TableRow>
                                        :  ''
                  );

                })}
              </TableBody>
            </Table>
            </TreeView>
          </Paper>
          <Fragment>
            <RenderPagination
              pageRangeDisplayed={10}
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={numberOfPlatforms}
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
          <ModalComponent
            message={'deletePlatformConfirmMessage'}
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
      {fetchGroups ? (
        renderPlatformsTable()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageGroups);
