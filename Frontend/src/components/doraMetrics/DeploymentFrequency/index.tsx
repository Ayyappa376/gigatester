import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import { IDeploymentDataItem } from '../../../model/metrics/doraData';
import AreaChart from './AreaChart';

export default function DeploymentFrequency(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [deploymentGraphData, setDeploymentGraphData] = useState<
    IDeploymentDataItem[]
  >([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
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
          ? '/api/metrics/dora/deployment'
          : `/api/metrics/dora/deployment?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/dora/deployment?teamId=${focusTeam.toString()}`
          : `/api/metrics/dora/deployment?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setDeploymentGraphData(
          response.graphData.sort((a: any, b: any) => {
            return a.timestampEnd <= b.timestampEnd ? -1 : 1;
          })
        );
        setLoader(false);
        setTotalCount(response.aggregateValue);
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

  const getCount = () => {
    const successfulDeployments: any[] = [];

    deploymentGraphData.map((data: any) => {
      successfulDeployments.push([data.timestamp, data.countSuccessBuilds]);
    });

    const dataSet = {
      series: [
        {
          name: 'Successful Build',
          data: successfulDeployments,
        },
      ],

      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          stacked: true,
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ['#00ad6b'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        fill: {
          curve: 'smooth',
          type: 'solid',
        },
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
            text: 'Number of Counts',
          },
          decimalsInFloat: 0,
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
    <AreaChart
      getCount={() => getCount()}
      getDateRange={props.getDateRange}
      timeline={props.timeline}
      customDate={props.customDate}
      failureMsg={failureMsg}
      loader={loader}
      totalCount={totalCount}
      level={level}
    />
  );
}
