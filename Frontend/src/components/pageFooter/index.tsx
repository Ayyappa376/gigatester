import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '40px',
    backgroundColor: '#060C22',
    color: "#FFFFFF",
    textAlign: 'center',
    paddingTop: '6px'
  },
}));

const PageFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" >&copy; COPYRIGHT 2021 - GIGATESTER</Typography>
    </footer>
  );
}

export default PageFooter;