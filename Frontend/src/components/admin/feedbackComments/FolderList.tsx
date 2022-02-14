import * as React from 'react';
import { List, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

interface userInfoProps {
  userId: string | undefined,
  sourceIp: string | undefined,
  platformName: string | undefined,
  platformInfo: string | undefined
  platformVersion: any,
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
    padding: '1px 1px',
  },
  list: {
    height: '95%',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listText: {
    width: 'auto',
  }
}));

export default function FolderList({ userId, sourceIp, platformName, platformInfo, platformVersion }: userInfoProps) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItems}>
        {userId && userId.length > 0 ?
        <div>
        <Typography className={classes.labels}>email</Typography>
        <ListItemText className={classes.listText} primary={userId} />
        </div> : null
      }
      </ListItem>
      <ListItem className={classes.listItems}>
      <Typography className={classes.labels}>source IP</Typography>
        <ListItemText className={classes.listText}  primary={sourceIp}/>
      </ListItem>
      <ListItem className={classes.listItems}>
      <Typography className={classes.labels}>platform</Typography>
        <ListItemText className={classes.listText}  primary={platformInfo} />
      </ListItem>
      <ListItem className={classes.listItems}>
      <Typography className={classes.labels}>OS version</Typography>
        <ListItemText className={classes.listText}  primary={platformVersion} />
      </ListItem>
    </List>
  );
}