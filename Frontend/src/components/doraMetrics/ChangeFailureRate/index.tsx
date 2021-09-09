import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IRootState } from '../../../reducers';
import { IReqStatusDataItem } from '../../../model/metrics/requirementsData';
import { Http } from '../../../utils';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import SplineAreaChart from './SplineAreaChart';

export default function ChangeFailureRate(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [failureRateGraphData, setFailureRateGraphData] = useState<
    IReqStatusDataItem[]
  >([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);
  const [aggregateValue, setAggregateValue] = useState(0);
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
          ? '/api/metrics/dora/changeFailureRate'
          : `/api/metrics/dora/changeFailureRate?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/dora/changeFailureRate?teamId=${focusTeam.toString()}`
          : `/api/metrics/dora/changeFailureRate?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }

    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setFailureRateGraphData(
          response.graphData.sort((a: any, b: any) => {
            return a.timestamp <= b.timestamp ? -1 : 1;
          })
        );
        setLoader(false);
        setAggregateValue(response.aggregateValue);
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

  const getChangeFailureRate = () => {
    const failureRate: any[] = [];
    failureRateGraphData.map((data: any) => {
      failureRate.push({
        x: data.timestamp,
        y:
          data.totalBuilds > 0
            ? Math.round((data.countFailBuilds / data.totalBuilds) * 100)
            : 0,
      });
    });

    const dataSet = {
      series: [
        {
          name: 'Failure Rate',
          data: failureRate,
        },
      ],
      options: {
        chart: {
          height: 250,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        colors: ['#fc6a26'],
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          title: {
            text: 'Rate in Percentage',
          },
          decimalsInFloat: 0,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
        fill: {
          type: 'solid',
        },
      },
    };
    return dataSet;
  };

  return (
    <SplineAreaChart
      getChangeFailureRate={() => getChangeFailureRate()}
      failureMsg={failureMsg}
      // loader={loader}
      aggregateValue={aggregateValue}
      level={level}
    />
  );
}
