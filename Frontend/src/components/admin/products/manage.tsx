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
	Link,
	Dialog,
	DialogTitle,
	DialogContent,
	CssBaseline,
	ListItemIcon,
	IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import Notification from '../../../common/notification';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
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
import { IProductInfo, IProductParams, ICategory } from '../../../model';

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
	dialogPaper: {
		minHeight: '80vh',
		maxHeight: '80vh',
	},
	button: {
		marginTop: '36px',
		position: 'relative',
		minWidth: '10%',
		marginRight: '20px',
		...buttonStyle,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
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
	const [searchString, setSearchString] = useState('');
	const [products, setProducts] = useState<IProductInfo[]>([]);
	const [searchButtonPressed, setSearchButtonPressed] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProd, setSelectedProd] = useState<IProductInfo | undefined>(
		undefined,
	);
	const [userParamState, setUserParamState] = React.useState<any>('');
	const [softwareOption, setSoftwareOption] = useState(false);
	const [fileContentType, setFileContentType] = useState('');
	const [fileSelected, setFileSelected] = useState('');
	const [fileName, setFileName] = useState('');
	const [numberOfProducts, setNumberOfProducts] = useState(0);
	const [itemLimit, setItemLimit] = useState({
		lowerLimit: 0,
		upperLimit: 9,
	});
	const [order, setOrder] = useState<'asc' | 'desc'>('desc');
	const [orderBy, setOrderBy] = useState('name');
	const [notify, setNotify] = useState({
		isOpen: false,
		message: '',
		type: '',
	});
	const [failure, setFailure] = useState(false);
	const [failureMessage, setFailureMessage] = useState(
		<Text tid='somethingWentWrong' />,
	);
	let msgFailure = failureMessage;

	const fetchProductList = () => {
		setBackdropOpen(true);
		Http.get({
			url: `/api/v2/products?type=PRODUCT_CONFIG`,
			state: stateVariable,
		})
			.then((response: any) => {
				response.products.sort((a: IProductInfo, b: IProductInfo) => {
					return a.name.localeCompare(b.name);
				});
				setFetchProducts(true);
				setAllProducts(response.products);
				setProducts(response.products);
				setBackdropOpen(false);
			})
			.catch((error: any) => {
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

	const deleteClicked = (row: IProductInfo) => {
		setSelectedProd(row);
		setOpenModal(true);
	};

	const modalNoClicked = () => {
		setOpenModal(false);
	};

	const deleteProduct = (prod: IProductInfo) => {
		setBackdropOpen(true);
		Http.deleteReq({
			url: `/api/v2/products/${prod.id}/${prod.version}`,
			state: stateVariable,
		})
			.then((response: any) => {
				setBackdropOpen(false);
				setSelectedProd(undefined);
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

	const modalYesClicked = () => {
		if (selectedProd) {
			deleteProduct(selectedProd);
			setOpenModal(false);
		}
	};

	const closeDialog = () => {
		setDialogOpen(false);
		setSoftwareOption(false);
		setSelectedProd(undefined);
	};

	const deleteSoftware = (row: any) => {
		if (row) {
			if (row.softwareType === 'url') {
				row.software = '';
				row.softwareType = '';
				handleSave(row);
				setNotify({
					isOpen: false,
					message: 'Deleting... ',
					type: 'info',
				});
			} else {
				setNotify({
					isOpen: true,
					message: 'Deleting... ',
					type: 'info',
				});

				Http.deleteReq({
					url: `/api/v2/software/delete/${row.software}`,
					state: stateVariable,
				})
					.then((response: any) => {
						setFailureMessage(<Text tid='File Deleted Successfully' />);
						setFailure(true);
						if (row.software) {
							/* tslint:disable-next-line */
							row.software = '';
							row.softwareType = '';
							handleSave(row);
						}
					})
					.catch((error: any) => {
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
					});
			}
		}
	};

	const handleSave = (row: any) => {
		const postData = { products: [].concat({ ...row }) };
		if (postData) {
			if (postData.products[0]) {
				Http.put({
					url: `/api/v2/products`,
					body: {
						...postData,
					},
					state: stateVariable,
				})
					.then((response: any) => {
						setSearchString('');
						setSearchButtonPressed(true);
					})
					.catch((error: any) => {
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
			} else {
				setFailureMessage(<Text tid='Product details not available for saving.' />);
				setFailure(true);
			}
		}
	};

	const handleChangeProductSoftware = (row: IProductInfo | undefined) => {
		if (row) {
			if (userParamState) {
				row.software = userParamState;
				row.softwareType = 'url';
				handleSave(row);
			} else if (fileName) {
				row.software = fileName;
				row.softwareType = fileContentType;
				handleSave(row);
				setTimeout(() => {
					setUserParamState('');
					closeDialog();
				}, 2000);
			}
		}
		setTimeout(() => {
			setUserParamState('');
			closeDialog();
		}, 2000);
	};

	const getUploadPreSignedUrl = (event: any) => {
		event.preventDefault();
		setFileSelected(event.target.files[0]);
		setFileName(event.target.files[0].name);
		setFileContentType(event.target.files[0].type);
	};

	const uploadPreSignedUrlSoftware = () => {
		setNotify({
			isOpen: true,
			message: 'Uploading...',
			type: 'info',
		});
		Http.post({
			url: `/api/v2/softwares/medium`,
			state: stateVariable,
			body: {
				fileName: fileName,
				fileType: fileContentType,
			},
		})
			.then((response: any) => {
				fetch(response.filePath, {
					method: 'PUT',
					body: fileSelected,
				})
					.then((response) => {
						setNotify({
							isOpen: true,
							message: `The ${fileName} has been uploaded successfully.`,
							type: 'info',
						});
						setFileName('');
						handleChangeProductSoftware(selectedProd);
						// response.json();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const handleChangedValue = (event: any) => {
		if (event.target.value) {
			setUserParamState(event.target.value);

			setSoftwareOption(true);
		} else {
			setSoftwareOption(false);
		}
	};

	const handleClose = () => {
		setFailure(false);
	};

	const uploadForm = () => {
		return (
			<React.Fragment>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12}>
						<TextField
							id='uploadFile'
							name='uploadFile'
							label='External File URL'
							fullWidth
							onChange={(event) => handleChangedValue(event)}
						/>
					</Grid>
					<Grid item xs={12} sm={12} />
					<br />
					<Grid item xs={6} sm={6} />
					<Typography style={{ fontSize: '16px' }}> OR</Typography>
					<Grid item xs={12} sm={12} />
					<br />
					<Grid item xs={3} sm={3} />
					<input
						style={{ display: 'none' }}
						id='upload-software-file'
						multiple
						type='file'
						onChange={(e) => getUploadPreSignedUrl(e)}
					/>
					<Link style={{ fontSize: '14px' }}>
						<label
							htmlFor='upload-software-file'
							style={{ fontSize: '14px', color: '#0645AD' }}
						>
							{fileName ? fileName : 'Click here to upload local software'}
						</label>
					</Link>
					<Grid item xs={4} sm={4} />
					<Grid item xs={4} sm={4} />
					<Button
						component='span'
						variant='outlined'
						disabled={softwareOption}
						className={classes.button}
						onClick={() => {
							uploadPreSignedUrlSoftware();
						}}
					>
						Upload
					</Button>
					<Grid item xs={12} sm={12} />
					<br />
					<br />
					<Grid item xs={12} sm={12} />
					<Grid item xs={3} sm={3} />
					<Button
						component='span'
						variant='outlined'
						onClick={() => {
							handleChangeProductSoftware(selectedProd);
						}}
						disabled={!softwareOption}
					>
						ok
					</Button>
					<Grid item xs={2} sm={2} />
					<Button
						component='span'
						variant='outlined'
						onClick={() => {
							setDialogOpen(false);
						}}
					>
						Cancel
					</Button>
					<Grid item xs={4} sm={4} />
				</Grid>
			</React.Fragment>
		);
	};

	const renderSoftwareDialog = () => {
		return (
			<React.Fragment>
				<Dialog
					className={classes.dialogPaper}
					open={dialogOpen}
					aria-labelledby='form-dialog-title'
					onClose={closeDialog}
					fullWidth={true}
				>
					<DialogTitle
						id='form-dialog-title'
						style={{ textAlign: 'center', padding: '30px 0px' }}
					>
						<Typography style={{ fontSize: '14px' }}>
							<Text tid={'Upload Software'} />
						</Typography>
						<IconButton
							aria-label='close'
							className={classes.closeButton}
							onClick={closeDialog}
						>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent style={{ marginBottom: '20px' }}>
						<CssBaseline />
						{uploadForm()}
						{/* {verifyEmail ? signUpAcknowledgement() : signUpForm()} */}
					</DialogContent>
				</Dialog>
				<Notification notify={notify} setNotify={setNotify} />
			</React.Fragment>
		);
	};

	const handleUploadButton = (row: IProductInfo) => {
		setDialogOpen(true);
		setSelectedProd(row);
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
										props.editClicked(0, 0);
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
									{/* <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='software' />
                    </Typography>
                  </TableCell> */}
									<TableCell align='center' className='tableHeadCell'>
										<Typography className='tableHeadText'>Feedback Component</Typography>
									</TableCell>
									<TableCell align='center' className='tableHeadCell'>
										<Typography className='tableHeadText'>
											<Text tid='actions' />
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.map((product: IProductInfo, index: number) => {
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
												index % 2 ? { background: '#EFEFEF' } : { background: 'white' }
											}
										>
											<TableCell component='th' scope='row' className='tableCell'>
												<Typography className='tableBodyText'>{product.name}</Typography>
											</TableCell>
											<TableCell component='th' scope='row' className='tableCell'>
												<Typography className='tableBodyText'>{product.version}</Typography>
											</TableCell>
											{/* <TableCell
                        component='th'
                        scope='row'
                        align='center'
                        className='tableCell'
                      >
                        {product.software ? (
                          <>
                            <Link href={product.software}>
                              <TextField
                                required={true}
                                type='string'
                                id={`productSoftware_${index}`}
                                name={`productSoftware_${index}`}
                                value={product.software ? product.software : ''}
                                fullWidth
                                autoComplete='off'
                                className='textFieldStyle'
                              />
                            </Link>
                            <Typography style={{ padding: '0 6px' }}>
                              <ClearIcon
                                onClick={() => {
                                  deleteSoftware(product);
                                }}
                              />
                            </Typography>
                          </>
                        ) : (
                          <button
                            onClick={() => handleUploadButton(product)}
                          >
                            <Typography>Upload</Typography>
                          </button>
                        )}
                      </TableCell> */}
											<TableCell
												component='th'
												scope='row'
												align='center'
												className='tableCell'
											>
												<Button
													variant='outlined'
													style={{
														borderColor: 'rgb(10,34,90)',
														color: 'rgb(10,34,90)',
													}}
													onClick={() =>
														props.feedbackSettingsClicked(product.id, product.version)
													}
												>
													<Typography>Configure and Get</Typography>
												</Button>
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
																		props.editClicked(product.id, product.version);
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
																	Disable
																</Typography>
															}
														>
															<Typography style={{ padding: '0 6px' }}>
																<ClearIcon
																	onClick={() => {
																		deleteClicked(product);
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
																	<Text tid='viewFeedbackComments' />
																</Typography>
															}
														>
															<Typography style={{ padding: '0 6px' }}>
																<AssignmentLateIcon
																	onClick={() => {
																		props.feedbackClicked(product.id, product.version);
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
			{dialogOpen ? (
				renderSoftwareDialog()
			) : fetchProducts ? (
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
