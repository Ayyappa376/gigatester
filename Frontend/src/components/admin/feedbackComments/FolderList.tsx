import * as React from 'react';
import { List, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

interface userInfoProps {
  userId: string | undefined,
  platformInfo: string | undefined,
  sourceIp: string | undefined,
  osInfo: string | undefined
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

export default function FolderList({ userId, platformInfo, sourceIp, osInfo }: userInfoProps) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItems}>
        <Typography className={classes.labels}>email</Typography>
        <ListItemText className={classes.listText} primary={userId && userId.length > 0 ? userId : '-'} />
      </ListItem>
      <ListItem className={classes.listItems}>
        <Typography className={classes.labels}>source IP</Typography>
        <ListItemText className={classes.listText}  primary={sourceIp && sourceIp.length > 0 ? sourceIp : '-'}/>
      </ListItem>
      <ListItem className={classes.listItems}>
        <Typography className={classes.labels}>platform</Typography>
        <ListItemText className={classes.listText}  primary={platformInfo && platformInfo.length > 0 ? platformInfo : '-'} />
      </ListItem>
      <ListItem className={classes.listItems}>
        <Typography className={classes.labels}>OS</Typography>
        <ListItemText className={classes.listText}  primary={osInfo && osInfo.length > 0 ? osInfo : '-'} />
      </ListItem>
    </List>
  );
}