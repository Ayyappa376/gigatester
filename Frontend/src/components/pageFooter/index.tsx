// tslint:disable: jsx-no-lambda

import React from 'react';
import {
    Typography,
    createMuiTheme,
    makeStyles,
    BottomNavigation ,
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '30px',
      backgroundColor: '#060C22',
      color: "#FFFFFF",
      textAlign: 'left',
    },
  }));

const PageFooter = () => {
    const classes = useStyles();
    return (
        <BottomNavigation  className={classes.root}>
        <Typography>© COPYRIGHT 2021 - GIGATESTER</Typography>
          {/* <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} /> */}
        </BottomNavigation>
      );
}

export default PageFooter;