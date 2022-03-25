import React from 'react';
//import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Typography, makeStyles, Paper } from '@material-ui/core';

interface IProps {
  message: string;
}

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     fontSize: '75px',
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     minHeight: '250px',
//     minWidth: '40%',
//     maxWidth: '50%',
//     margin: 'auto',
//     border: '1px solid #D8D8D8',
//     borderRadius: '5px',
//     boxShadow: 'none',
//   },
// }));

const Failure = (props: IProps) => {
//  const classes = useStyles();
  return (
    <Typography variant='h5' component='h2' color='textPrimary'>
      {props.message}
    </Typography>
  );
};

export default Failure;
