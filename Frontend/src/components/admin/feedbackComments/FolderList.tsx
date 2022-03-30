import * as React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Typography,
	makeStyles,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

interface userInfoProps {
	userId: string | undefined;
	platformInfo: string | undefined;
	sourceIp: string | undefined;
	osInfo: string | undefined;
	pageURL: string | undefined;
	isCollapse: boolean;
}

const useStyles = makeStyles((theme) => ({
	labels: {
		fontSize: '12px',
		color: 'gray',
	},
	listItems: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: '1px 1px !important',
		overflowWrap: 'normal',
		whiteSpace: 'normal',
		wordWrap: 'break-word',
	},
	list: {
		height: '95%',
		maxWidth: '190px',
		width: '190px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	listText: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));

export default function FolderList({
	userId,
	platformInfo,
	sourceIp,
	osInfo,
	pageURL,
	isCollapse,
}: userInfoProps) {
	const classes = useStyles();
	return (
		<List className={classes.list}>
			{userId && userId.length > 0 ? (
				<ListItem className={classes.listItems}>
					<Typography className={classes.labels}>email</Typography>
					<ListItemText
						className={classes.listText}
						primary={userId && userId.length > 0 ? userId : '-'}
						primaryTypographyProps={{
							style: {
								maxWidth: isCollapse ? 'auto' : '160px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							},
						}}
					/>
				</ListItem>
			) : null}
			{isCollapse ? (
				<div>
					{sourceIp && sourceIp.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>source IP</Typography>
							<ListItemText
								className={classes.listText}
								primary={sourceIp && sourceIp.length > 0 ? sourceIp : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>source IP</Typography>
							<ListItemText
								className={classes.listText}
								primary={'No source IP found'}
							/>
						</ListItem>
					)}
					{platformInfo && platformInfo.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>platform</Typography>
							<ListItemText
								className={classes.listText}
								primary={
									platformInfo && platformInfo.length > 0 ? platformInfo : '-'
								}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>platform</Typography>
							<ListItemText
								className={classes.listText}
								primary={'No platform information found'}
							/>
						</ListItem>
					)}
					{osInfo && osInfo.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>OS</Typography>
							<ListItemText
								className={classes.listText}
								primary={osInfo && osInfo.length > 0 ? osInfo : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>OS</Typography>
							<ListItemText
								className={classes.listText}
								primary={'No operating system information found'}
							/>
						</ListItem>
					)}
					{pageURL && pageURL.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>page URL</Typography>
							<ListItemText
								className={classes.listText}
								primary={pageURL && pageURL.length > 0 ? pageURL : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>page URL</Typography>
							<ListItemText
								className={classes.listText}
								primary={'No page URL fond'}
							/>
						</ListItem>
					)}
				</div>
			) : null}
		</List>
	);
}
