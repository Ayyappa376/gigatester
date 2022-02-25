import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '30px',
    backgroundColor: '#060C22',
    color: "#FFFFFF",
    textAlign: 'center',
    paddingTop: '5px',
    position: 'fixed',
    bottom: 0,
  },
}));

const PageFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" >&copy; COPYRIGHT 2021 - GIGATESTER. All rights reserved. | Privacy Policy | Disclaimer | Terms &amp; Conditions</Typography>
    </footer>
  );
}

export default PageFooter;