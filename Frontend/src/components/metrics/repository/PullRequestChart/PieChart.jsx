import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Container, makeStyles } from '@material-ui/core';
import Loader from '../../../loader';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Text } from '../../../../common/Language';
import '../style.css';

const useStyles = makeStyles((theme) => ({
  loader: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

export default function PieChart(props) {
  const classes = useStyles();

  return (
    <div id='chart'>
      <div id='chart-timeline'>
        <Fragment>
          <Typography
            variant='subtitle2'
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Box
              fontWeight={700}
              mb={props.loader || props.failureMsg ? 1.5 : 0}
            >
              <Text tid='pullRequestsStatus' />
            </Box>
          </Typography>
        </Fragment>
        {props.loader ? (
          <Container className={classes.loader}>
            <Loader />
          </Container>
        ) : props.failureMsg ? (
          <Alert severity='error'>
            <AlertTitle>
              <Text tid='error' />
            </AlertTitle>
            <Text tid='somethingWentWrong' />
          </Alert>
        ) : (
          <div
            style={{
              marginLeft: props.loader || props.failureMsg ? '' : '-40px',
              paddingRight: props.loader || props.failureMsg ? '' : '-40px',
            }}
          >
            <ReactApexChart
              options={props.repositoryData.options}
              series={props.repositoryData.series}
              type='pie'
              width={350}
            />
          </div>
        )}
      </div>
    </div>
  );
}
