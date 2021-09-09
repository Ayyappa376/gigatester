import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Http } from '../../../../utils';
import { IRootState } from '../../../../reducers';
import { ALL_TEAMS } from '../../../../pages/metrics/metric-select/metricsList';
import { IBuildsDataItem } from '../../../../model/metrics/buildsData';
import AreaChart from './AreaChart';

export default function BuildChart(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [buildsData, setBuildsData] = useState<IBuildsDataItem[]>([]);
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
          ? '/api/metrics/builds/graph'
          : `/api/metrics/builds/graph?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/builds/graph?teamId=${focusTeam.toString()}`
          : `/api/metrics/builds/graph?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setBuildsData(
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

  const getBuildsCount = () => {
    const successBuilds: any[] = [];
    const failureBuilds: any[] = [];
    const otherBuilds: any[] = [];

    buildsData.map((data: any) => {
      successBuilds.push([data.timestampEnd, data.countSuccessBuilds]);
    });

    buildsData.map((data: any) => {
      failureBuilds.push([data.timestampEnd, data.countFailBuilds]);
    });

    buildsData.map((data: any) => {
      otherBuilds.push([data.timestampEnd, data.countOtherBuilds]);
    });

    const dataSet = {
      series: [
        {
          name: 'Successful Build',
          data: successBuilds,
        },
        {
          name: 'Failed Build',
          data: failureBuilds,
        },
        {
          name: 'Other Build',
          data: otherBuilds,
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
          events: {
            legendClick: function (chartContext: any, seriesIndex: any) {
              // chartContext attribute need to be keep as per the syntax
              props.handleLegendClick(seriesIndex);
            },
          },
        },
        colors: ['#00ad6b', '#fc6a26', '#000080'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        fill: {
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
          floating: false,
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
      getBuildsCount={() => getBuildsCount()}
      getBuildsDateRange={props.getBuildsDateRange}
      timeline={props.timeline}
      customDate={props.customDate}
      failureMsg={failureMsg}
      loader={loader}
    />
  );
}
