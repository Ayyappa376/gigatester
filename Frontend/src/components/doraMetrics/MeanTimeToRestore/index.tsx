import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import { IMeanTimeToRestoreDataItem } from '../../../model/metrics/doraData';
import Loader from '../../loader';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Text } from '../../../common/Language';
import '../style.css';

export default function MTTR(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [mttrGraphData, setMttrGraphData] = useState<
    IMeanTimeToRestoreDataItem[]
  >([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);
  const [averageTime, setAverageTime] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam, props.committerName, props.selectedDateRange]);

  const fetchData = () => {
    let { timeline, focusTeam, selectedDateRange } = props;
    let url: string = '';
    if (focusTeam[0] === ALL_TEAMS) {
      url =
        timeline === 'one_day'
          ? '/api/metrics/dora/mttr'
          : `/api/metrics/dora/mttr?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/dora/mttr?teamId=${focusTeam.toString()}`
          : `/api/metrics/dora/mttr?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }

    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setMttrGraphData(
          response.graphData.sort((a: any, b: any) => {
            return a.timestamp <= b.timestamp ? -1 : 1;
          })
        );
        setLoader(false);
        getAverageTimeInHours(response.aggregateValue);
        setLevel(response.level);
      })
      .catch((error) => {
        setLoader(false);
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          return <Redirect to='/relogin' />;
        } else {
          setFailureMsg(true);
        }
      });
  };

  const getAverageTimeInHours = (minutes: number) => {
    setAverageTime(
      (minutes / 60).toFixed() + ':' + (minutes % 60).toFixed() + ' ' + 'Hrs'
    );
  };

  const getMttrCount = () => {
    const mttr: any[] = [];

    mttrGraphData.map((data: any) => {
      mttr.push([
        data.timestamp,
        data.issueCount > 0
          ? Math.round(data.totalRestoreTime / data.issueCount)
          : 0,
      ]);
    });

    let dataSet = {
      series: [
        {
          name: 'Mean Time in Hours',
          data: mttr,
        },
      ],
      options: {
        chart: {
          id: 'areachart-2',
          type: 'line',
          height: 230,
          toolbar: {
            show: false,
          },
        },
        colors: ['#CA6F1E'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return (value / 60).toFixed();
            },
          },
          title: {
            text: 'Number of Hours',
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
        },
      },
    };
    return dataSet;
  };

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
                  <Text tid='meanTimeToRestore' />
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
                    {level}
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                    <Text tid='averageTime' />
                  </span>{' '}
                  <span className='countText'>
                    {averageTime && averageTime}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </Typography>
          {loader ? (
            <Container className='loader'>
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
              options={getMttrCount().options}
              series={getMttrCount().series}
              type='line'
              height={250}
            />
          )}
        </div>
      </div>
    </div>
  );
}
