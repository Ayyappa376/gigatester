import React, { useState, useEffect, Fragment } from 'react';
import { Box, Typography, Container, makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import { IReqLTCTDataItem } from '../../../model/metrics/requirementsData';
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

export default function LeadAndCycleTimeChart(props: any) {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [ltctData, setLtCtData] = useState<IReqLTCTDataItem[]>([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);

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
          ? '/api/metrics/reqs/ltct'
          : `/api/metrics/reqs/ltct?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/reqs/ltct?teamId=${focusTeam.toString()}`
          : `/api/metrics/reqs/ltct?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }

    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setLtCtData(
          response.sort((a: any, b: any) => {
            return a.timestamp <= b.timestamp ? -1 : 1;
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

  const getLtCtCount = () => {
    const totalLeadTime: any[] = [];
    const totalCycleTime: any[] = [];

    ltctData.map((data: any) => {
      totalLeadTime.push([
        data.timestamp,
        data.issueCount ? data.totalLeadTime / data.issueCount : 0,
      ]);
    });

    ltctData.map((data: any) => {
      totalCycleTime.push([
        data.timestamp,
        data.issueCount ? data.totalCycleTime / data.issueCount : 0,
      ]);
    });

    const dataSet = {
      series: [
        {
          name: 'Lead Time',
          data: totalLeadTime,
        },
        {
          name: 'Cycle Time',
          data: totalCycleTime,
        },
        // {
        //   name: 'Lead time benchmark',
        //   data: data3,
        // },
        // {
        //   name: 'Cycle time benchmark',
        //   data: data4,
        // },
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
        colors: ['#000080', '#CA6F1E', '#F26A1E', '#EDD041'],
        stroke: {
          curve: 'smooth',
          width: 1.5,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
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
        <Fragment>
          <Typography
            variant='subtitle2'
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Box fontWeight={700} mb={loader || failureMsg ? 1.5 : 0}>
              <Text tid='leadTime-CycleTime' />
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
            options={getLtCtCount().options}
            series={getLtCtCount().series}
            type='line'
            height={260}
          />
        )}
      </div>
    </div>
  );
}
