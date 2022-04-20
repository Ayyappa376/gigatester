import {
	createStyles,
	makeStyles,
	Theme,
	Box,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Collapse,
	lighten,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import React, { useState, Suspense } from 'react';
import { getDateTime } from '../../../utils/data';
import FolderList from './FolderList';
import UserDetailList from './UserDetList';
import ContextDetList from './ContextDetList';
import { buttonStyle } from '../../../common/common';
import RenderComments from './RenderComments';
import RenderStars from './RenderStars';
import RenderMedia from './RenderMedia';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AnnouncmentIcon from '@material-ui/icons/Announcement';

interface RowProps {
	index: number;
	tableData: any;
	innerRef: any;
	row: any;
	fetchAllUrls: boolean;
	platformInfo: any;
	osInfo: any;
	isBugReport: boolean;
	signedUrlMapping: any;
	props: any;
}

const RenderRow = ({
	index,
	row,
	tableData,
	innerRef,
	platformInfo,
	osInfo,
	isBugReport,
	props,
	signedUrlMapping,
	fetchAllUrls,
}: RowProps) => {
	const classes = useStyles();
	const [show, setShow] = useState(false);

	// console.log('row', row);

	const handleClick = () => {
		if (show) {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	return (
		<React.Fragment>
			<tr>
				<td>
					<IconButton
						aria-label='expand row'
						size='small'
						className={classes.iconButton}
						onClick={() => handleClick()}
					>
						{show ? (
							<KeyboardArrowDownIcon
								style={index % 2 ? { color: 'rgb(10,34,90)' } : { color: 'rgb(10,34,90)' }}
							/>
						) : (
							<KeyboardArrowRight
								style={index % 2 ? { color: 'rgb(10,34,90)' } : { color: 'rgb(10,34,90)' }}
							/>
						)}
					</IconButton>
				</td>
			</tr>
			<TableRow
				innerRef={index === tableData.length - 1 ? innerRef : null}
				hover
				role='checkbox'
				tabIndex={-1}
				key={row.id}
				onClick={() => handleClick()}
				style={
					index % 2
						? { background: 'white', borderBottom: 'none', minHeight: '160px' }
						: {
								background: 'rgba(10, 34, 90, 0.1)',
								borderBottom: 'none',
								minHeight: '160px',
						  }
				}
			>
				<TableCell
					style={{
						fontSize: '1rem',
						maxWidth: '12rem',
						overflowWrap: 'break-word',
						whiteSpace: 'normal',
						textOverflow: 'ellipsis',
					}}
				>
					<FolderList
						isCollapse={false}
						userId={row.userId}
						platformInfo={undefined}
						sourceIp={undefined}
						osInfo={undefined}
						pageURL={undefined}
					/>
				</TableCell>
				<TableCell align='center' style={{ fontSize: '1rem', minWidth: '12rem' }}>
					{row.createdOn ? getDateTime(row.createdOn) : '-'}
				</TableCell>
				{isBugReport ? (
					<TableCell align='center' style={{ fontSize: '1rem' }}>
						{row.bugPriority ? row.bugPriority : 'unknown'}
					</TableCell>
				) : (
					<TableCell align='center' style={{ minWidth: '150px', fontSize: '1rem' }}>
						<RenderStars rating={row.productRating} />
					</TableCell>
				)}
				<TableCell align='center' style={{ fontSize: '1rem' }}>
					{Array.isArray(row.feedbackCategory) === true
						? row.feedbackCategory.map((cat: string, index: number) => (
								<div
									key={index}
									style={{ marginBottom: '5px', overflowWrap: 'break-word' }}
								>
									{cat}
								</div>
						  ))
						: row.feedbackCategory
						? row.feedbackCategory
						: '-'}
				</TableCell>
				<TableCell align='left' className={classes.commentBox}>
					<div className={classes.commentBox}>
						{row.feedbackMedia.image ||
						row.feedbackMedia.audio ||
						row.feedbackMedia.video ||
						row.feedbackMedia.file ? (
							<Tooltip title='Contains attachment' placement='bottom' arrow>
								<IconButton
									aria-label='asset attached'
									size='small'
									className={classes.assetIcon}
								>
									<AnnouncmentIcon style={{ color: '#0B4263', fontSize: '20px' }} />
								</IconButton>
							</Tooltip>
						) : null}
						<RenderComments
							category={row.feedbackCategory}
							isBugReport={isBugReport}
							comments={
								row.feedbackComments && typeof row.feedbackComments === 'string'
									? JSON.parse(row.feedbackComments)
									: undefined
							}
							old={true}
						/>
					</div>
				</TableCell>
			</TableRow>
			<TableRow
				style={
					index % 2
						? { background: 'white', borderBottom: 'none' }
						: { background: 'rgba(10, 34, 90, 0.1) ', borderBottom: 'none' }
				}
			>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
					colSpan={6}
				>
					<Collapse in={show} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table
								size='small'
								aria-label='purchases'
								style={{ borderBottom: 'none' }}
							>
								<TableHead>
									<TableRow style={{ borderBottom: 'none' }}>
										<TableCell style={{ borderBottom: 'none', textAlign: 'center' }}>
											Additional Information
										</TableCell>
										<TableCell style={{ borderBottom: 'none', textAlign: 'center' }}>
											User details
										</TableCell>
										<TableCell style={{ borderBottom: 'none', textAlign: 'center' }}>
											Attachment
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow style={{ borderBottom: 'none' }}>
										<TableCell style={{ borderBottom: 'none', width: '35%' }}>
											<FolderList
												isCollapse={true}
												userId={row.userId}
												platformInfo={platformInfo}
												sourceIp={row.sourceIP}
												osInfo={osInfo}
												pageURL={row.pageURL}
											/>
										</TableCell>
										<TableCell style={{ borderBottom: 'none', minWidth: '10%' }}>
											<UserDetailList userDetails={row.userDetails} />
										</TableCell>
										{/* <TableCell style={{ borderBottom: 'none', minWidth: '10%' }}>
											<ContextDetList userDetails={row.userDetails} />
										</TableCell> */}
										<TableCell style={{ borderBottom: 'none' }}>
											<Suspense fallback={<div style={{ width: '100%' }}>loading...</div>}>
												<RenderMedia
													row={row}
													signedUrlMapping={signedUrlMapping}
													fetchAllUrls={fetchAllUrls}
													props={props}
												/>
											</Suspense>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControlBig: {
			width: '190px',
		},
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
			minWidth: 750,
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
		collapseBox: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			width: '100%',
			padding: '5px',
		},
		iconButton: {
			position: 'absolute',
			margin: '1px',
		},
		assetIcon: {
			position: 'absolute',
			right: '0',
		},
		commentBox: {
			maxHeight: '13vh',
			overflow: 'auto',
			fontSize: '1rem',
			position: 'relative',
			'&::-webkit-scrollbar': {
				width: '3px',
			},
			'&::-webkit-scrollbar-track': {
				backgroundColor: 'white',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: 'gray',
				borderRadius: '5px',
			},
		},
	}),
);

export default RenderRow;
