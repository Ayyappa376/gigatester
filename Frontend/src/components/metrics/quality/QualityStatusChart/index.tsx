import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Http } from '../../../../utils';
import { IRootState } from '../../../../reducers';
import { ALL_TEAMS } from '../../../../pages/metrics/metric-select/metricsList';
import { IQualityGraphDataItem } from '../../../../model/metrics/quality';
import LineChart from './LineChart';
import { english } from '../../../../common/apexChartLocales';

export default function QualityReport(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [qualityReport, qualityReportData] = useState<IQualityGraphDataItem[]>(
    []
  );
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
          ? '/api/metrics/quality/graph'
          : `/api/metrics/quality/graph?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/quality/graph?teamId=${focusTeam.toString()}`
          : `/api/metrics/quality/graph?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        // console.log('response - quality graph', response);
        qualityReportData(
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

  const getQualityReport = () => {
    const reliability: any[] = [];
    const security: any[] = [];
    const maintainabilty: any[] = [];
    const coverage: any[] = [];
    const duplications: any[] = [];

    qualityReport.map((data: any) => {
      reliability.push({ x: data.timestamp, y: data.reliability });
    });

    qualityReport.map((data: any) => {
      security.push({ x: data.timestamp, y: data.security });
    });

    qualityReport.map((data: any) => {
      maintainabilty.push({ x: data.timestamp, y: data.maintainability });
    });

    qualityReport.map((data: any) => {
      coverage.push({ x: data.timestamp, y: data.coverage });
    });

    qualityReport.map((data: any) => {
      duplications.push({ x: data.timestamp, y: data.duplications });
    });

    const dataSet = {
      series: [
        {
          name: 'Reliability',
          data: reliability,
        },
        {
          name: 'Security',
          data: security,
        },
        {
          name: 'Maintainabilty',
          data: maintainabilty,
        },
        {
          name: 'Coverage',
          data: coverage,
        },
        {
          name: 'Duplications',
          data: duplications,
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
          locales: [english],
          defaultLocale: 'en',
        },
        colors: ['#CA6F1E', '#f6546a', '#ffa500', '#003366', '#20b2aa'],
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
          title: {
            text: 'Values',
          },
          decimalsInFloat: 2,
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
    <LineChart
      getQualityReport={() => getQualityReport()}
      getQualityDateRange={props.getQualityDateRange}
      timeline={props.timeline}
      customDate={props.customDate}
      failureMsg={failureMsg}
      loader={loader}
    />
  );
}
