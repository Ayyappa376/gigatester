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
} from '@material-ui/core';
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
import { IProductInfo } from '../../../model';

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

const ManageProducts = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [fetchProducts, setFetchProducts] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState<IProductInfo[]>([]);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState('');
  const [searchString, setSearchString] = useState('');
  const [products, setProducts] = useState<IProductInfo[]>([]);
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
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

  const fetchProductList = () => {
    setBackdropOpen(true);
    Http.get({
      url: `/api/v2/products/prod_b888c0d1-4bd5-11ec-a922-276699a9200b/version/0`,
      state: stateVariable,
    })
      .then((response: any) => {
        console.log(response, 'product response');
        response.products.sort((a: IProductInfo, b: IProductInfo) => {
          return a.name.localeCompare(b.name);
        });
        setFetchProducts(true);
        setAllProducts(response.products);
        setProducts(response.products);
        setBackdropOpen(false);
      })
      .catch((error: any) => {
        console.log(error);
        setFetchProducts(true);
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

  useEffect(() => {
    setNumberOfProducts(products.length);
  }, [products]);

  useEffect(() => {
    fetchProductList();
    setSearchString('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (searchButtonPressed) {
      setSearchButtonPressed(false);
      const searchedItems: any = [];
      if (searchString === '') {
        setProducts([]);
      }
      allProducts.forEach((el: any) => {
        if (el.name.toLowerCase().includes(searchString.toLowerCase())) {
          searchedItems.push(el);
        }
      });
      setProducts(searchedItems);
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
    if (products !== []) {
      const tempSortedProducts = [...products];
      if (order === 'asc') {
        if (orderBy === 'product') {
          setProducts(tempSortedProducts.sort(compareProduct));
        }
      }
      if (order === 'desc') {
        if (orderBy === 'product') {
          setProducts(tempSortedProducts.sort(compareProductD));
        }
      }
    }
  }, [order, orderBy]);

  function compareProduct(a: IProductInfo, b: IProductInfo) {
    return a.name.localeCompare(b.name);
  }

  function compareProductD(a: IProductInfo, b: IProductInfo) {
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

  const deleteClicked = (productId: string) => {
    setDeleteProductId(productId);
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    if (deleteProductId !== '') {
      deleteProduct(deleteProductId);
      setOpenModal(false);
    }
  };

  const deleteProduct = (productId: string) => {
    setBackdropOpen(true);
    Http.deleteReq({
      url: `/api/v2/products/${productId}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setBackdropOpen(false);
        setDeleteProductId('');
        fetchProductList();
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
        fetchProductList();
      });
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderProductsTable = () => {
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
                  <AddIcon fontSize='large' /> <Text tid='addProduct' />
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
                      active={orderBy === 'product'}
                      direction={orderBy === 'product' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('product');
                      }}
                    >
                      <Typography className='tableHeadText'>
                        <Text tid='manageProducts2' />
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='version' />
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
                {products.map((row: any, index: number) => {
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
                        className='tableCell'
                      >
                        <Typography className='tableBodyText'>
                          {row.version}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' className='tableCell'>
                        <div className={classes.actionsBlock}>
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
                                    console.log(row.id, 'row.id');
                                    props.editClicked(row.id);
                                  }}
                                />
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
                          <MuiThemeProvider theme={tooltipTheme}>
                            <Tooltip
                              title={
                                <Typography
                                  style={{
                                    fontSize: '12px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Text tid='delete' />
                                </Typography>
                              }
                            >
                              <Typography style={{ padding: '0 6px' }}>
                                <ClearIcon
                                  onClick={() => {
                                    deleteClicked(row.id);
                                  }}
                                />
                              </Typography>
                            </Tooltip>
                          </MuiThemeProvider>
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
              totalItemsCount={numberOfProducts}
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
            message={'deleteProductConfirmMessage'}
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
      {fetchProducts ? (
        renderProductsTable()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageProducts);
