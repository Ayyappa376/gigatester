import React, { Fragment } from 'react';
import {
  Typography,
  createMuiTheme,
  makeStyles,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from '@material-ui/core';
import '../style.css';

const latestNews = [
  {
    label: 'Latest News : Live Blog about Testing',
    imgPath:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
  },
  {
    label: 'Latest News : Live Blog about Testing',
    imgPath:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
  },
  {
    label: 'Latest News : Live Blog about Testing',
    imgPath:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 0px',
  },
  media: {
    position: 'relative',
    height: '100%',
    paddingTop: '46.25%', // 16:9,
    width: '100%',
    marginTop: '3',
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
}));

const LatestNews = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className='headerText'>LATEST NEWS</Typography>
      {latestNews.map((item, index) => {
        return (
          <Card className={classes.root} key={index}>
            <CardActionArea >
              <CardMedia
                className={classes.media}
                image={item.imgPath}
                title="Tech News"
              />
              <CardContent className={classes.glass}>
                <Typography component="h2">
                  {item.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </Fragment>
  );
};

export default LatestNews;
