import {
	Container,
	Paper,
	Table,
	TableRow,
	TableCell,
	Typography,
	TableBody,
	makeStyles,
	TableContainer,
	Toolbar,
	lighten,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { buttonStyle } from '../../../common/common';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import SearchField from './SearchField';
import EnhancedTableHead from './EnhancedTableHead';
import { updateSignedUrls, useActions } from '../../../actions';
import { IAppFeedback } from './common';
import { getSignedUrl } from './methods';
import { useInView } from 'react-intersection-observer';
import { TailSpin } from 'react-loader-spinner';
import RenderRow from './RenderRow';

interface IProps {
	tableData: IAppFeedback[];
	viewAttachmentClicked: Function;
	urls: string[];
	fetchMore: Function;
	focusRating: number[];
	setFocusRating: Function;
	focusSeverity: string[];
	setFocusSeverity: Function;
	focusCategory: string[];
	setFocusCategory: Function;
	categoryList: string[];
	severityList: string[];
	order: Order;
	keyword: string;
	setKeyword: Function;
	clearSearch: Function;
	searchInitiated: boolean;
	setSearchInitiated: Function;
	handleRequestSort: Function;
	resultsFetched: boolean;
	currentType: string;
	disable: string;
	setDisable: Function;
	keys: boolean;
	category: boolean;
	severity: boolean;
	rating: boolean;
}

export type Order = 'asc' | 'desc';

export type IAlign =
	| 'right'
	| 'left'
	| 'inherit'
	| 'center'
	| 'justify'
	| undefined;

export const BUG_REPORT = 'bug_report';

export const FEEDBACK = 'feedback';

export const ALROUND = 'alround';

const RenderTable = (props: IProps) => {
	const classes = useStyles();
	const {
		tableData,
		resultsFetched,
		category,
		severity,
		keys,
		rating,
		setKeyword,
		setDisable,
		disable,
		urls,
	} = props;
	const [fetchAllUrls, setFetchAllUrls] = useState(false);
	const [isBugReport, setBugReport] = useState<boolean>(false);
	const { ref, inView, entry } = useInView();
	const stateVariable = useSelector((state: IRootState) => {
		return state;
	});
	const [type, setType] = useState(() => {
		if (props.currentType) {
			return props.currentType;
		}
		return '';
	});
	const currentLength = tableData.length;

	useEffect(() => {
		if (inView && props.resultsFetched) {
			//constraint for infinite scroll (affects filter query) && tableData.length > 0
			props.fetchMore();
		}
		return () => {
			// can't do anything to cancel fetch more.
		};
	}, [inView]);

	useEffect(() => {
		if (type) {
			if (type === 'Feedback') {
				setBugReport(false);
			} else if (type === 'Bug') {
				setBugReport(true);
			}
		}
	}, [type]);

	useEffect(() => {
		if (!fetchAllUrls && tableData.length > 0) {
			fetchSignedUrls(props.urls);
		}
	}, [urls]);

	const updateSignedUrlData = useActions(updateSignedUrls);
	const signedUrlMapping = useSelector(
		(state: IRootState) => state.admin.signedUrls,
	);

	const fetchSignedUrls = (urls: string[]) => {
		// console.log(urls, 'inital url load')
		if (urls.length === 0) {
			return;
		}
		const signedUrlMappingCopy: any = {};
		let isUrlMissing = false;
		return Promise.all(
			urls.map((url: string) => {
				return new Promise(async (resolve, reject) => {
					let signedUrl: any;
					const time24HrsMilli = 24 * 60 * 60 * 1000;
					const timeNowMilli = new Date().getTime();
					if (
						signedUrlMapping &&
						signedUrlMapping[url] &&
						signedUrlMapping[url].signedUrl &&
						timeNowMilli - signedUrlMapping[url].date < time24HrsMilli
					) {
						signedUrl = signedUrlMapping[url].signedUrl;
						signedUrlMappingCopy[url] = {
							signedUrl,
							date: signedUrlMapping[url].date,
						};
						return resolve({});
					} else {
						isUrlMissing = true;
						signedUrl = await getSignedUrl(url, stateVariable).catch((e) => {
							return resolve({}); // we need to use resolve even in catch scenearios because the promise chain will get resolved only when every promise will resolve.
						});
						if (signedUrl) {
							const now = new Date();
							signedUrlMappingCopy[url] = { signedUrl, date: now.getTime() };
							return resolve({});
						} else {
							return resolve({});
						}
					}
				});
			}),
		)
			.then(() => {
				setFetchAllUrls(true);
				if (isUrlMissing) {
					updateSignedUrlData(signedUrlMappingCopy);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleOnSearch = (search: any) => {
		setKeyword(search);
		props.setSearchInitiated(true);
	};

	return (
		<Container style={{ marginTop: '1.5rem' }}>
			<div className={classes.paper}>
				<Toolbar className={classes.root}>
					<Typography
						className={classes.title}
						variant='h6'
						id='tableTitle'
						component='div'
					>
						{`${type}`}
					</Typography>
				</Toolbar>
				<Paper
					elevation={3}
					style={{
						paddingTop: 10,
					}}
				>
					<TableContainer className={classes.tableCont}>
						<Table
							className={classes.table}
							aria-labelledby='tableTitle'
							size={'medium'}
							aria-label='enhanced table'
						>
							<EnhancedTableHead
								classes={classes}
								order={props.order}
								onRequestSort={(property: string) => {
									props.handleRequestSort();
								}}
								rowCount={tableData.length}
								isBugReport={isBugReport}
								searchInitiated={props.searchInitiated}
							/>
							{tableData.length > 0 ? (
								<TableBody>
									{props.tableData.map((row: IAppFeedback, index: number) => {
										//              const labelId = `enhanced-table-checkbox-${index}`;
										const platformInfo = row.platformName
											? row.platformVersion
												? `${row.platformName} - ${row.platformVersion}`
												: row.platformName
											: '-';
										const osInfo = row.platformOs
											? Object.values(row.platformOs).join('  - ')
											: '-';
										return (
											<RenderRow
												key={index}
												index={index}
												tableData={tableData}
												innerRef={ref}
												row={row}
												fetchAllUrls={fetchAllUrls}
												platformInfo={platformInfo}
												osInfo={osInfo}
												isBugReport={isBugReport}
												signedUrlMapping={signedUrlMapping}
												props={props}
											/>
										);
									})}
									{props.resultsFetched ? (
										<TableRow>
											<TableCell></TableCell>
										</TableRow>
									) : (
										// <div></div>
										<TableRow>
											<TableCell>
												<TailSpin
													wrapperStyle={{
														marginLeft: '62%',
														transform: 'translateX: "-50%',
													}}
													height='60'
													width='30'
													color='black'
													ariaLabel='loading'
												/>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							) : (
								<TableBody>
									<TableRow>
										<TableCell>
											<div
												style={{
													width: props.resultsFetched ? '249%' : '400%',
													padding: '.2rem 0 .2rem 0',
												}}
											>
												{props.resultsFetched ? (
													<div
														style={{ marginLeft: '62%', transform: 'translateX: "-50%' }}
													>{`There are no ${
														isBugReport ? 'bugs' : 'feedbacks'
													} to show.`}</div>
												) : (
													<TailSpin
														wrapperStyle={{
															marginLeft: '62%',
															transform: 'translateX: "-50%',
														}}
														height='60'
														width='30'
														color='black'
														ariaLabel='loading'
													/>
												)}
											</div>
										</TableCell>
									</TableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>
				</Paper>
			</div>
		</Container>
	);
};

export const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: '36px',
		position: 'relative',
		left: '45%',
		minWidth: '10%',
		...buttonStyle,
	},
	grid: {
		marginTop: theme.spacing(2),
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
	commentsColumn: {
		maxWidth: '250px',
	},
	filters: {
		width: '100%',
		backgroundColor: 'transparent',
		border: '1px solid #D8D8D8',
		borderRadius: '10px',
		boxShadow: 'none',
		padding: '15px',
	},
	paper: {
		width: '100%',
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 1000,
		width: 'auto',
	},
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
	info: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '85%',
		height: '25px',
		fontSize: '15px',
		padding: '0',
		marginBottom: '10px',
		borderRadius: '10px',
	},
	tableCont: {
		width: '100%',
		overflow: 'auto',
	},
}));

export default RenderTable;
