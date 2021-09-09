import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Container, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Loader from '../../loader';
import { Text } from '../../../common/Language';
import '../style.css';

export default function SplineAreaChart(props) {
  const { level, aggregateValue, loader, failureMsg } = props;

  return (
    <div id='chart'>
      <div id='chart-timeline'>
        <div className={loader || failureMsg ? 'chartArea' : ''}>
          <Typography
            variant='subtitle2'
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Box fontWeight={700} mb={2}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Text tid='changeFailureRate' />
                </Grid>
                <Grid item xs={3}>
                  <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                    <Text tid='level' />:
                  </span>{' '}
                  <span
                    className={
                      level === 'Elite'
                        ? 'levelEliteColor'
                        : level === 'High'
                        ? 'levelHighColor'
                        : level === 'Medium'
                        ? 'levelMediumColor'
                        : 'levelLowColor'
                    }
                  >
                    {props.level}
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                    <Text tid='averageRate' />
                  </span>{' '}
                  <span className='countText'>
                    {aggregateValue + '%' && aggregateValue.toFixed() + '%'}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </Typography>
          {loader ? (
            <Container className={loader}>
              <Loader />
            </Container>
          ) : failureMsg ? (
            <Alert severity='error'>
              <AlertTitle>
                <Text tid='error' />
              </AlertTitle>
              <Text tid='somethingWentWrong' />
            </Alert>
          ) : (
            <ReactApexChart
              options={props.getChangeFailureRate().options}
              series={props.getChangeFailureRate().series}
              type='area'
              height={250}
            />
          )}
        </div>
      </div>
    </div>
  );
}
