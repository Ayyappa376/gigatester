import * as React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

interface userInfoProps {
  userDetails: any,
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
		width: '300px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	listText: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
  },
  collapseList: {
    display: 'flex',
		flexDirection: 'row',
    justifyContent: 'space-evenly',
		width: '90%',
		margin: 0,
  },
  item: {
    marginLeft: '20px',
  }
}));

export default function UserDetailList({
  userDetails
}: userInfoProps) {
  // const { email,
  //   id,
  //   guid,
  //   name, } = userDetails;
	const classes = useStyles();
	return (
		<Box sx={{  display: 'flex',
		flexDirection: 'column',
			justifyContent: 'flex-start',
		}}>
			{userDetails ? (
        <div className={classes.collapseList}>
          <div>
					{userDetails.email && userDetails.email.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>email</Typography>
							<ListItemText
								className={classes.listText}
								primary={userDetails.email && userDetails.email.length > 0 ? userDetails.email : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>email</Typography>
							<ListItemText
								className={classes.listText}
								primary={'Not found'}
							/>
						</ListItem>
            )}
					{userDetails.id && userDetails.id.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>id</Typography>
							<ListItemText
								className={classes.listText}
								primary={
									userDetails.id && userDetails.id.length > 0 ? userDetails.id : '-'
								}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>id</Typography>
							<ListItemText
								className={classes.listText}
								primary={'Not found'}
							/>
						</ListItem>
            )}
          </div>
          <div className={classes.item}>
					{userDetails.guid && userDetails.guid.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>guid</Typography>
							<ListItemText
								className={classes.listText}
								primary={userDetails.guid && userDetails.guid.length > 0 ? userDetails.guid : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>Guid</Typography>
							<ListItemText
								className={classes.listText}
								primary={'Not found'}
							/>
						</ListItem>
					)}
					{userDetails.name && userDetails.name.length > 0 ? (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>Name </Typography>
							<ListItemText
								className={classes.listText}
								primary={userDetails.name && userDetails.name.length > 0 ? userDetails.name : '-'}
							/>
						</ListItem>
					) : (
						<ListItem className={classes.listItems}>
							<Typography className={classes.labels}>Name</Typography>
							<ListItemText
								className={classes.listText}
								primary={'Not found'}
							/>
						</ListItem>
            )}
          </div>
				</div>
			) : null}
      </Box>
	);
}
