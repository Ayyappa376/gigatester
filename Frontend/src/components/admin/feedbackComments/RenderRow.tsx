import {
	Chip,
	createStyles,
	FormControl,
	Input,
	InputBase,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
	withStyles,
	TableRow,
	TableCell,
	Collapse,
	Link,
	lighten,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getDate, getDateTime } from '../../../utils/data';
import FolderList from './FolderList';
import { buttonStyle } from '../../../common/common';
import RenderComments from './RenderComments';
import RenderStars from './RenderStarts';
import AudioPlayer from './audioPlayer';

interface RowProps {
	index: number;
	tableData: any;
	ref: any;
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
	ref,
	platformInfo,
	osInfo,
	isBugReport,
	props,
	signedUrlMapping,
	fetchAllUrls,
}: RowProps) => {
	// const {selectedProdId, productNameIdMapping, productInfo} = props;
	const classes = useStyles();
	const [show, setShow] = useState(false);

	const handleClick = () => {
		if (show) {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	return (
		<React.Fragment>
			<TableRow
				innerRef={index === tableData.length - 1 ? ref : null}
				hover
				role='checkbox'
				tabIndex={-1}
				key={row.id}
				onClick={() => handleClick()}
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
				<TableCell
					align='center'
					style={{ fontSize: '1rem', minWidth: '12rem' }}
				>
					{row.createdOn ? getDateTime(row.createdOn) : '-'}
				</TableCell>
				{isBugReport ? (
					<TableCell align='center' style={{ fontSize: '1rem' }}>
						{row.bugPriority}
					</TableCell>
				) : (
					<TableCell
						align='center'
						style={{ minWidth: '150px', fontSize: '1rem' }}
					>
						<RenderStars rating={row.productRating} />
					</TableCell>
				)}
				<TableCell align='center' style={{ fontSize: '1rem' }}>
					{row.feedbackCategory ? row.feedbackCategory : '-'}
				</TableCell>
				<TableCell align='left' style={{ maxWidth: '30vw', fontSize: '1rem' }}>
					<div style={{ overflow: 'auto', maxHeight: '20vh' }}>
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
			<Collapse
				in={show}
				timeout='auto'
				unmountOnExit
				style={{ width: '100%' }}
			>
				<TableRow>
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
							isCollapse={true}
							userId={row.userId}
							platformInfo={platformInfo}
							sourceIp={row.sourceIP}
							osInfo={osInfo}
							pageURL={row.pageURL}
						/>
					</TableCell>
					<TableCell
						style={{
							fontSize: '1rem',
							width: '14rem',
						}}
					>
						<div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div key='image-attachment'>
									{row.feedbackMedia ? (
										row.feedbackMedia.image ? (
											<Link
												component='button'
												variant='body2'
												style={{ fontSize: 11 }}
												onClick={() => {
													props.viewAttachmentClicked(
														row.feedbackMedia.image,
														row.id,
														'image',
													);
												}}
											>
												{signedUrlMapping &&
												signedUrlMapping[row.feedbackMedia.image] &&
												signedUrlMapping[row.feedbackMedia.image].signedUrl ? (
													<img
														src={
															signedUrlMapping[row.feedbackMedia.image]
																.signedUrl
														}
														style={{ width: 150, marginTop: 10 }}
													></img>
												) : (
													<div />
												)}
											</Link>
										) : (
											<div />
										)
									) : (
										<div />
									)}
								</div>
								<div key='video-attachment'>
									{row.feedbackMedia ? (
										row.feedbackMedia.video ? (
											fetchAllUrls ? (
												<div style={{ maxWidth: 700 }}>
													<video
														width='50%'
														controls
														style={
															row.feedbackMedia.image
																? {
																		display: 'flex',
																		marginTop: 20,
																		marginLeft: 20,
																  }
																: {
																		display: 'block',
																		marginTop: 20,
																		marginLeft: 'auto',
																		marginRight: 'auto',
																  }
														}
													>
														<source
															src={
																signedUrlMapping[row.feedbackMedia.video]
																	? signedUrlMapping[row.feedbackMedia.video]
																			.signedUrl
																		? signedUrlMapping[row.feedbackMedia.video]
																				.signedUrl
																		: ''
																	: ''
															}
															type='video/mp4'
														/>
													</video>
												</div>
											) : (
												<div style={{ maxWidth: 700 }}>
													<video
														width='50%'
														controls
														style={
															row.feedbackMedia.image
																? {
																		display: 'flex',
																		marginTop: 20,
																		marginLeft: 20,
																  }
																: {
																		display: 'block',
																		marginTop: 20,
																		marginLeft: 'auto',
																		marginRight: 'auto',
																  }
														}
													></video>
												</div>
											)
										) : (
											<div />
										)
									) : (
										<div />
									)}
								</div>
							</div>
							<div key='audio-attachment'>
								{row.feedbackMedia ? (
									row.feedbackMedia.audio ? (
										<AudioPlayer url={row.feedbackMedia.audio} />
									) : (
										<div />
									)
								) : (
									<div />
								)}
							</div>
							<div key='file-attachment'>
								{row.feedbackMedia ? (
									row.feedbackMedia.file ? (
										fetchAllUrls ? (
											<a
												href={
													signedUrlMapping[row.feedbackMedia.file]
														? signedUrlMapping[row.feedbackMedia.file].signedUrl
															? signedUrlMapping[row.feedbackMedia.file]
																	.signedUrl
															: ''
														: ''
												}
												download
												target='_blank'
											>
												<Link
													component='button'
													variant='body2'
													style={{ fontSize: 11 }}
												>
													Download attachment
												</Link>
											</a>
										) : (
											<div />
										)
									) : (
										<div />
									)
								) : (
									<div />
								)}
							</div>
						</div>
					</TableCell>
				</TableRow>
			</Collapse>
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
	}),
);

export default RenderRow;
