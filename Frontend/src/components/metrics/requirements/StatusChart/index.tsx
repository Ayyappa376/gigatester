import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFullDate } from '../../../../utils/data';
import { IRootState } from '../../../../reducers';
import { IReqStatusDataItem } from '../../../../model/metrics/requirementsData';
import { Http } from '../../../../utils';
import {
  ALL_PRIORITIES,
  ALL_TEAMS,
  ALL_TYPES,
} from '../../../../pages/metrics/metric-select/metricsList';
import SplineAreaChart from './SplineAreaChart';

export default function PullRequestChart(props: any) {
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [requirementStatusData, setRequirementStatusData] = useState<
    IReqStatusDataItem[]
  >([]);
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);

  let date = new Date();
  let yesterday = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
  let one_week = getFullDate(
    new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  let one_month = getFullDate(
    new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000)
  );
  let six_months = getFullDate(
    new Date(date.getTime() - 182 * 24 * 60 * 60 * 1000)
  );
  let one_year = getFullDate(
    new Date(date.getTime() - 365 * 24 * 60 * 60 * 1000)
  );
  let ytd = `01 Jan ${date.getFullYear()}`;
  let custom_from_date = getFullDate(props.customDate[0]);
  let custom_to_date = getFullDate(props.customDate[1]);

  useEffect(() => {
    updateData(props.timeline);
    fetchData();
  }, [props.customDate, props.timeline]);

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam, props.selectedDateRange]);

  const fetchData = () => {
    let {
      timeline,
      focusTeam,
      itemType,
      itemPriority,
      selectedDateRange,
    } = props;
    let url: string = '';
    let itemFilterCondition =
      itemType[0] !== ALL_TYPES &&
      itemPriority[0] === ALL_PRIORITIES &&
      timeline !== 'one_day'
        ? `/api/metrics/reqs/status?type=${itemType.toString()}&fromDate=${
            selectedDateRange.fromDate
          }&toDate=${selectedDateRange.toDate}`
        : itemType[0] !== ALL_TYPES &&
          itemPriority[0] !== ALL_PRIORITIES &&
          timeline !== 'one_day'
        ? `/api/metrics/reqs/status?type=${itemType.toString()}&priority=${itemPriority.toString()}&fromDate=${
            selectedDateRange.fromDate
          }&toDate=${selectedDateRange.toDate}`
        : itemType[0] === ALL_TYPES &&
          itemPriority[0] !== ALL_PRIORITIES &&
          timeline !== 'one_day'
        ? `/api/metrics/reqs/status?priority=${itemPriority.toString()}&fromDate=${
            selectedDateRange.fromDate
          }&toDate=${selectedDateRange.toDate}`
        : `/api/metrics/reqs/status?type=${itemType.toString()}&priority=${itemPriority.toString()}`;

    if (focusTeam[0] === ALL_TEAMS) {
      url =
        timeline === 'one_day' &&
        itemType[0] === ALL_TYPES &&
        itemPriority[0] === ALL_PRIORITIES
          ? `/api/metrics/reqs/status`
          : itemType[0] === ALL_TYPES &&
            itemPriority[0] === ALL_PRIORITIES &&
            timeline !== 'one_day'
          ? `/api/metrics/reqs/status?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`
          : itemFilterCondition;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/reqs/status?teamId=${focusTeam.toString()}`
          : itemType[0] === ALL_TYPES &&
            itemPriority[0] === ALL_PRIORITIES &&
            timeline !== 'one_day'
          ? `/api/metrics/reqs/status?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`
          : itemFilterCondition;
    }

    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setRequirementStatusData(
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

  const getDateRange = (dateRange: any) => {
    let { getRequirementsDateRange } = props;
    getRequirementsDateRange(dateRange);
  };

  const updateData = (timeline: string) => {
    switch (timeline) {
      case 'one_day':
        getDateRange({
          fromDate: new Date(yesterday).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'one_week':
        getDateRange({
          fromDate: new Date(one_week).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'one_month':
        getDateRange({
          fromDate: new Date(one_month).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'six_months':
        getDateRange({
          fromDate: new Date(six_months).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'one_year':
        getDateRange({
          fromDate: new Date(one_year).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'ytd':
        getDateRange({
          fromDate: new Date(ytd).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'all':
        getDateRange({
          fromDate: new Date(one_year).getTime().toString(),
          toDate: new Date(date).getTime().toString(),
        });
        break;
      case 'custom':
        getDateRange({
          fromDate: new Date(custom_from_date).getTime().toString(),
          toDate: new Date(custom_to_date).getTime().toString(),
        });
        break;
      default:
    }
  };

  const getIssueCount = () => {
    const countNew: any[] = [];
    const countInProgress: any[] = [];
    const countResolved: any[] = [];

    requirementStatusData.map((data: any) => {
      countNew.push({ x: data.timestamp, y: data.countNew });
    });

    requirementStatusData.map((data: any) => {
      countInProgress.push({ x: data.timestamp, y: data.countInProgress });
    });

    requirementStatusData.map((data: any) => {
      countResolved.push({ x: data.timestamp, y: data.countResolved });
    });

    const dataSet = {
      series: [
        {
          name: 'Resolved',
          data: countResolved,
        },
        {
          name: 'In Progress',
          data: countInProgress,
        },
        {
          name: 'New',
          data: countNew,
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
        colors: ['#00ad6b', '#000080', '#E8E002'],
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
      getIssueCount={() => getIssueCount()}
      failureMsg={failureMsg}
      loader={loader}
    />
  );
}
