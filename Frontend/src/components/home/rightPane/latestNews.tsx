// tslint:disable: jsx-no-lambda

import React from 'react';
import {
  Typography,
  createMuiTheme,
  makeStyles,
  Container,
  Button,
  CardActionArea,
  CardContent,
  Box,
  Card,
  CardMedia,
  Zoom,
  CardActions,
} from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { ThemeProvider } from '@material-ui/styles';
import { Text } from '../../../common/Language';
// interface ILeftPane {
//   redirectUrl: string;
// }

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: '7',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    margin: '0px',
    marginTop: '18px',
    // height: '300px',
    // width: '400px',
  },
 
  media: {
    position: 'relative',
    height: '100%',
    paddingTop: '56.25%', // 16:9,
    width: '100%',
    marginTop:'3',
    '&:hover': {
        transform: "scale(1.2)",
    },
  },
  
  glass: {
    position: 'absolute', 
    color: 'white', 
    top: '70%', 
    left: '33%', 
    transform: 'translateX(-50%)',
},
  secondaryText: {
    fontWeight: 'normal',
    fontSize: '32px',
  },
  button: {
    margin: theme.spacing(2),
    marginLeft: '0px',
    backgroundColor: '#042E5B',
    '&:hover, &:focus, &:active': {
      backgroundColor: '#042E5B',
    },
  
  },
}));

const LABEL = <Text tid='measureYourself' />;
const LatestNews = () => {
  const classes = useStyles();

  const onClick = () => { 
    // window.open(
    //   props.redirectUrl,
    //   '_self',
    //   `toolbar=no, location=no, directories=no, status=no, menubar=no,
    //         scrollbars=no, resizable=no, copyhistory=no, width=${500},
    //         height=${5000}, top=${300}, left=${300}`
    // );
  };
  return (
   
      <Card className={classes.root}>
    {/* <Container className={classes.root}> */}
      {/* <ThemeProvider theme={theme}></ThemeProvider> */}
      <CardActionArea >
        
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80"
          title="Tech News"
        />
        <CardContent className = {classes.glass}>
          <Typography component="h2">
            Latest News : Live Blog about Testing
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
         
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
    // //   </ThemeProvider>
    //   <Typography className={classes.secondaryText}>
    //     <Text tid='areYouDoingItRight' />
    //   </Typography>
    //   <Button
    //     onClick={onClick}
    //     variant='contained'
    //     size='large'
    //     color='primary'
    //     className={classes.button}
    //   >
    //     {LABEL}
    //   </Button>
    // </Container>
  );
};
export default LatestNews;
