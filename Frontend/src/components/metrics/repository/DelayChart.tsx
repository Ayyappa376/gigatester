import React, { useState, useEffect, Fragment } from 'react';
import { Box, Typography, Container, makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import {
  ALL_TEAMS,
  ALL_NAMES,
} from '../../../pages/metrics/metric-select/metricsList';
import { IRepoPullReqWaitTimeDataItem } from '../../../model/metrics/repositoryData';
import Loader from '../../loader';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Text } from '../../../common/Language';
import './style.css';

const useStyles = makeStyles((theme) => ({
  loader: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

export default function PullRequestChart(props: any) {
  const classes = useStyles();
  const [delayCount, setDelayCount] = useState<Object[]>([]);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [displayData, setDisplayData] = useState<
    IRepoPullReqWaitTimeDataItem[]
  >([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam, props.committerName, props.selectedDateRange]);

  useEffect(() => {
    var delayCount = displayData.map((data: any) => {
      return [
        data.timestampEnd,
        data.closedPullReqCount > 0
          ? Math.trunc(data.totalClosureTime / data.closedPullReqCount)
          : 0,
      ];
    });
    setDelayCount(delayCount);
  }, [displayData]);

  const fetchData = () => {
    let { selectedDateRange, timeline, focusTeam, committerName } = props;
    let url: string = '';
    if (focusTeam[0] === ALL_TEAMS) {
      url =
        committerName[0] === ALL_NAMES && timeline === 'one_day'
          ? '/api/metrics/repos/delayGraph'
          : committerName[0] === ALL_NAMES && timeline !== 'one_day'
          ? `/api/metrics/repos/delayGraph?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`
          : timeline === 'one_day'
          ? `/api/metrics/repos/delayGraph?committer=${committerName.toString()}`
          : `/api/metrics/repos/delayGraph?committer=${committerName.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    } else if (committerName[0] === ALL_NAMES) {
      url =
        timeline === 'one_day'
          ? `/api/metrics/repos/delayGraph?teamId=${focusTeam.toString()}`
          : `/api/metrics/repos/delayGraph?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    } else if (timeline === 'one_day' && committerName[0] !== ALL_NAMES) {
      url = `/api/metrics/repos/delayGraph?committer=${committerName.toString()}`;
    } else {
      url = `/api/metrics/repos/delayGraph?committer=${committerName.toString()}&fromDate=${
        selectedDateRange.fromDate
      }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setDisplayData(
          response.sort((a: any, b: any) => {
            return a.timestampEnd <= b.timestampEnd ? -1 : 1;
          })
        );
        setLoader(false);
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

  let delayData = {
    series: [
      {
        name: 'Wait Time',
        data: delayCount,
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
        width: 1.5,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        curve: 'smooth',
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

  return (
    <div id='chart'>
      <div id='chart-timeline'>
        <Fragment>
          <Typography
            variant='subtitle2'
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Box fontWeight={700} mb={loader || failureMsg ? 1.5 : 0}>
              <Text tid='waitTime' />
            </Box>
          </Typography>
        </Fragment>
        {loader ? (
          <Container className={classes.loader}>
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
            options={delayData.options}
            series={delayData.series}
            type='line'
            height={260}
          />
        )}
      </div>
    </div>
  );
}
