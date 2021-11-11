import React from 'react';
import {
  Typography,
  makeStyles,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from '@material-ui/core';
import '../style.css';

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

const LatestNews = (props: any) => {
  const classes = useStyles();

  return (
    <div data-testid="latestNews">
      <Typography className='headerText' data-testid="header">LATEST NEWS</Typography>
      {props.latestNews && props.latestNews.map((item: any, index: number) => {
        return (
          <Card className={classes.root} key={index}>
            <CardActionArea >
              <CardMedia
                className={classes.media}
                image={item.imgPath}
                title="Tech News"
              />
              <CardContent className={classes.glass} data-testid="newsTitle">
                <Typography component="h2">
                  {item.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </div>
  );
};

export default LatestNews;
