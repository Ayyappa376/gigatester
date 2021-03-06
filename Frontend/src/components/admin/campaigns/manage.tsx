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
  Tooltip
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StopIcon from '@material-ui/icons/Stop';
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
import { ICampaignInfo, STATUS_CAMPAIGN_DRAFT, STATUS_CAMPAIGN_ACTIVE, STATUS_CAMPAIGN_ENDED, ICampaignParams, IProductInfo } from '../../../model';
import { numberOfOptionsArray } from '../create-question';

const DELETE_ACTION: string = 'DELETE';
const PUBLISH_ACTION: string = 'PUBLISH';
const END_ACTION: string = 'END';
const CLONE_ACTION: string = 'CLONE';

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

const ManageCampaigns = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [fetchCampaigns, setFetchCampaigns] = React.useState(false);
  const [allCampaigns, setAllCampaigns] = React.useState<ICampaignInfo[]>([]);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaignInfo | undefined>(undefined);
  const [action, setAction] = useState<string>('');
  const [searchString, setSearchString] = useState('');
  const [campaigns, setCampaigns] = useState<ICampaignInfo[]>([]);
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCampaigns, setNumberOfCampaigns] = useState(0);
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

  const fetchCampaignList = () => {
    setBackdropOpen(true);
    Http.get({
      url: `/api/v2/campaigns`,
      state: stateVariable,
    })
    .then((response: any) => {
      response.campaigns.sort((a: ICampaignInfo, b: ICampaignInfo) => {
        return a.name.localeCompare(b.name)
      });
      setFetchCampaigns(true);
      setAllCampaigns(response.campaigns);
      setCampaigns(response.campaigns);
      setBackdropOpen(false);
    })
    .catch((error: any) => {
      setFetchCampaigns(true);
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
    setNumberOfCampaigns(campaigns.length);
  }, [campaigns]);

  useEffect(() => {
    fetchCampaignList();
    setSearchString('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (searchButtonPressed) {
      setSearchButtonPressed(false);
      const searchedItems: any = [];
      if (searchString === '') {
        setCampaigns([]);
      }
      allCampaigns.forEach((el: any) => {
        if (el.name.toLowerCase().includes(searchString.toLowerCase())) {
          searchedItems.push(el);
        }
      });
      setCampaigns(searchedItems);
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
    if (campaigns !== []) {
      const tempSortedCampaigns = [...campaigns];
      if (order === 'asc') {
        if (orderBy === 'status') {
          setCampaigns(tempSortedCampaigns.sort(compareStatus));
        }
        if (orderBy === 'campaign') {
          setCampaigns(tempSortedCampaigns.sort(compareCampaign));
        }
      }
      if (order === 'desc') {
        if (orderBy === 'status') {
          setCampaigns(tempSortedCampaigns.sort(compareStatusD));
        }
        if (orderBy === 'campaign') {
          setCampaigns(tempSortedCampaigns.sort(compareCampaignD));
        }
      }
    }
  }, [order, orderBy]);

  function compareStatus(a: ICampaignInfo, b: ICampaignInfo) {
    return a.status.localeCompare(b.status);
  }

  function compareCampaign(a: ICampaignInfo, b: ICampaignInfo) {
    return a.name.localeCompare(b.name);
  }

  function compareStatusD(a: ICampaignInfo, b: ICampaignInfo) {
    return b.status.localeCompare(a.status);
  }

  function compareCampaignD(a: ICampaignInfo, b: ICampaignInfo) {
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

  const performAction = (campaign: ICampaignInfo, message: string, actionType: string) => {
    setSelectedCampaign(campaign);
    setAction(actionType);
    setModalMessage(message);
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setModalMessage('');
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    if (selectedCampaign) {
      if(action === DELETE_ACTION) {
        deleteCampaign(selectedCampaign);
      }
      if(action === PUBLISH_ACTION) {
        publishCampaign(selectedCampaign);
      }
      if(action === END_ACTION) {
        endCampaign(selectedCampaign);
      }
      if(action === CLONE_ACTION) {
        cloneCampaign(selectedCampaign);
      }
      setModalMessage('');
      setOpenModal(false);
    }
  };

  const deleteCampaign = (row: ICampaignInfo) => {
    setBackdropOpen(true);
    Http.deleteReq({
      url: `/api/v2/campaigns/${row.id}`,
      state: stateVariable,
    })
    .then((response: any) => {
      setBackdropOpen(false);
      setSelectedCampaign(undefined);
      setAction('');
      fetchCampaignList();
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
      fetchCampaignList();
    });
  };

  const publishCampaign = (row: ICampaignInfo) => {
    setBackdropOpen(true);
    const newData = { ...row, status: STATUS_CAMPAIGN_ACTIVE, startDate: Date.now() };
    const postData: ICampaignParams = { 
      campaignConfig: {},
      campaigns: [newData],
    }
    Http.put({
      url: `/api/v2/campaigns`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
    .then((response: any) => {
      setBackdropOpen(false);
      setSelectedCampaign(undefined);
      setAction('');
      fetchCampaignList();
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
      fetchCampaignList();
    });
  };

  const endCampaign = (row: ICampaignInfo) => {
    setBackdropOpen(true);
    const newData = { ...row, status: STATUS_CAMPAIGN_ENDED, endDate: Date.now() };
    const postData: ICampaignParams = { 
      campaignConfig: {},
      campaigns: [newData],
    }
    Http.put({
      url: `/api/v2/campaigns`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
    .then((response: any) => {
      setBackdropOpen(false);
      setSelectedCampaign(undefined);
      setAction('');
      fetchCampaignList();
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
      fetchCampaignList();
    });
  };

  const cloneCampaign = (row: ICampaignInfo) => {
    setBackdropOpen(true);
    const clone = getCampaignClone(row);
    const postData: ICampaignParams = { 
      campaignConfig: {},
      campaigns: [clone],
    }
    Http.post({
      url: `/api/v2/campaigns`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
    .then((response: any) => {
      setBackdropOpen(false);
      setSelectedCampaign(undefined);
      setAction('');
      fetchCampaignList();
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
      fetchCampaignList();
    });
  };

  const handleClose = () => {
    setFailure(false);
  };

  const getCampaignClone = (campaign: ICampaignInfo): ICampaignInfo => {
    const newCampaign = { ...campaign };
    newCampaign.id = '';
    newCampaign.status = STATUS_CAMPAIGN_DRAFT;
    newCampaign.startDate = 0;
    newCampaign.endDate = 0;
    newCampaign.products.forEach((product: IProductInfo) => {
      product.id = '';
      product.testers = [];
    });

    return newCampaign;
  };

  const renderCampaignsTable = () => {
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
                    onClick={() => { props.editClicked(0); }}
                  >
                  <AddIcon
                    fontSize='large'
                  />{' '}
                  <Text tid='addCampaign' />
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
            <Table className='table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'campaign'}
                      direction={orderBy === 'campaign' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('campaign');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='manageCampaigns2' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('status');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='status' />
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
                {campaigns.map((row: ICampaignInfo, index: number) => {
                  if (index < itemLimit.lowerLimit) {
                    return;
                  }
                  if (index > itemLimit.upperLimit) {
                    return;
                  }
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
                      <TableCell
                        component='th'
                        scope='row'
                        align='center'
                        className='tableCell'
                      >
                        <Typography className='tableBodyText'>
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' className='tableCell'>
                        <div className={classes.actionsBlock}>
                          {row.status === STATUS_CAMPAIGN_DRAFT ? (
                            <Fragment>
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
                                    <ClearIcon onClick={() => { performAction(row, 'deleteCampaignMsg', DELETE_ACTION); }}/>
                                  </Typography>
                                </Tooltip>
                              </MuiThemeProvider>
                              <MuiThemeProvider theme={tooltipTheme}>
                                <Tooltip
                                  title={
                                    <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                                      <Text tid='publish' />
                                    </Typography>
                                  }
                                >
                                  <Typography style={{ padding: '0 6px' }}>
                                    <PublishIcon onClick={() => { performAction(row, 'publishCampaignMsg', PUBLISH_ACTION); }}/>
                                  </Typography>
                                </Tooltip>
                              </MuiThemeProvider>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <MuiThemeProvider theme={tooltipTheme}>
                                <Tooltip
                                  title={
                                    <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                                      <Text tid='clone' />
                                    </Typography>
                                  }
                                >
                                  <Typography style={{ padding: '0 6px' }}>
                                    <FileCopyIcon onClick={() => { performAction(row, 'cloneCampaignMsg', CLONE_ACTION); }}/>
                                  </Typography>
                                </Tooltip>
                              </MuiThemeProvider>
                              {row.status === STATUS_CAMPAIGN_ACTIVE ? (
                              <MuiThemeProvider theme={tooltipTheme}>
                                <Tooltip
                                  title={
                                    <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                                      <Text tid='end' />
                                    </Typography>
                                  }
                                >
                                  <Typography style={{ padding: '0 6px' }}>
                                    <StopIcon onClick={() => { performAction(row, 'endCampaignMsg', END_ACTION); }}/>
                                  </Typography>
                                </Tooltip>
                              </MuiThemeProvider>
                              ) : ( '' )}
                            </Fragment>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <Fragment>
            <RenderPagination
              pageRangeDisplayed={10}
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={numberOfCampaigns}
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
            message={modalMessage}
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
      {fetchCampaigns ? (
//        allCampaigns.length === 0 ? (
//          renderEmptyCampaignMessage()
//        ) : (
          renderCampaignsTable()
//        )
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageCampaigns);
