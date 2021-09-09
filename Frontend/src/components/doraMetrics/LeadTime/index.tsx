import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Container, Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Loader from '../../loader';
import { useSelector } from 'react-redux';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import { ILeadTimeDataItem } from '../../../model/metrics/doraData';
import { Text } from '../../../common/Language';
import '../style.css';

export default function LeadTime(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [leadTimeGraphData, setLeadTimeGraphData] = useState<
    ILeadTimeDataItem[]
  >([]);
  const [loader, setLoader] = useState(true);
  const [failureMsg, setFailureMsg] = useState(false);
  const [averageTime, setAverageTime] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam, props.selectedDateRange]);

  const fetchData = () => {
    let { timeline, focusTeam, selectedDateRange } = props;
    let url: string = '';
    if (focusTeam[0] === ALL_TEAMS) {
      url =
        timeline === 'one_day'
          ? '/api/metrics/dora/leadTime'
          : `/api/metrics/dora/leadTime?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/dora/leadTime?teamId=${focusTeam.toString()}`
          : `/api/metrics/dora/leadTime?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }

    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setLeadTimeGraphData(
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

  const getLeadCount = () => {
    const totalLeadTime: any[] = [];

    leadTimeGraphData.map((data: any) => {
      totalLeadTime.push([
        data.timestamp,
        data.issueCount > 0
          ? Math.round(data.totalLeadTime / data.issueCount)
          : 0,
      ]);
    });

    const dataSet = {
      series: [
        {
          name: 'Lead Time',
          data: totalLeadTime,
        },
      ],
      options: {
        chart: {
          id: 'chart2',
          type: 'line',
          height: 230,
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
        },
        colors: ['#000080'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 2,
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
            format: 'dd/MM/yy',
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
                  <Text tid='leadTimeForChanges' />
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
              options={getLeadCount().options}
              series={getLeadCount().series}
              type='line'
              height={250}
            />
          )}
        </div>
      </div>
    </div>
  );
}
