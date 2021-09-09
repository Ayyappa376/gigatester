import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Http } from '../../../../utils';
import { IRootState } from '../../../../reducers';
import { getFullDate } from '../../../../utils/data';
import {
  ALL_TEAMS,
  ALL_NAMES,
} from '../../../../pages/metrics/metric-select/metricsList';
import { IRepoPullReqsDataItem } from '../../../../model/metrics/repositoryData';
import PieChart from './PieChart';

var selectedDateRange = { fromDate: 0, toDate: 0 };

export default function PullRequestChart(props: any) {
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [displayData, setDisplayData] = useState<IRepoPullReqsDataItem[]>([
    {
      commitsAccepted: 0,
      commitsCreated: 0,
      commitsPending: 0,
      commitsRejected: 0,
      committerName: '',
      projectName: '',
      teamId: '',
      timestampEnd: 0,
      url: '',
    },
  ]);
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
  const [failureMsg, setFailureMsg] = useState(false);

  useEffect(() => {
    updateData(props.timeline);
    fetchData();
  }, [props.customDate, props.timeline, props.committerName]);

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam]);

  useEffect(() => {
    let acceptedCount = displayData
      .map((a: any) => a.commitsAccepted)
      .reduce(function (a: any, b: any) {
        return a + b;
      });
    let rejectedCount = displayData
      .map((a: any) => a.commitsRejected)
      .reduce(function (a: any, b: any) {
        return a + b;
      });
    let pendingCount = displayData
      .map((a: any) => a.commitsPending)
      .reduce(function (a: any, b: any) {
        return a + b;
      });
    setAcceptedCount(acceptedCount);
    setRejectedCount(rejectedCount);
    setPendingCount(pendingCount);
  }, [displayData]);

  const getDateRange = (dateRange: any) => {
    let { getReposDateRange } = props;
    selectedDateRange = dateRange;
    getReposDateRange(dateRange);
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

  const fetchData = () => {
    let { timeline, focusTeam, committerName } = props;
    let url: string = '';
    if (focusTeam[0] === ALL_TEAMS) {
      url =
        committerName[0] === ALL_NAMES && timeline === 'one_day'
          ? '/api/metrics/repos/pullRequestsGraph'
          : committerName[0] === ALL_NAMES && timeline !== 'one_day'
          ? `/api/metrics/repos/pullRequestsGraph?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`
          : timeline === 'one_day'
          ? `/api/metrics/repos/pullRequestsGraph?committer=${committerName.toString()}`
          : `/api/metrics/repos/pullRequestsGraph?committer=${committerName.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    } else if (committerName[0] === ALL_NAMES) {
      url =
        timeline === 'one_day'
          ? `/api/metrics/repos/pullRequestsGraph?teamId=${focusTeam.toString()}`
          : `/api/metrics/repos/pullRequestsGraph?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    } else if (committerName[0] !== ALL_NAMES) {
      url =
        timeline === 'one_day'
          ? `/api/metrics/repos/pullRequestsGraph?committer=${committerName.toString()}`
          : `/api/metrics/repos/pullRequestsGraph?committer=${committerName.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        getPullRequestStatus(response);
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

  const getPullRequestStatus = (pullRequestStatus: any) => {
    setDisplayData(
      pullRequestStatus.length > 0
        ? pullRequestStatus
        : [
            {
              commitsAccepted: 0,
              commitsCreated: 0,
              commitsPending: 0,
              commitsRejected: 0,
              committerName: '',
              projectName: '',
              teamId: '',
              timestampEnd: 0,
              url: '',
            },
          ]
    );
  };

  let repositoryData = {
    series: [acceptedCount, rejectedCount, pendingCount],
    labels: [acceptedCount, rejectedCount, pendingCount],
    options: {
      chart: {
        type: 'pie',
      },
      chartOptions: {
        labels: [acceptedCount, rejectedCount, pendingCount],
      },
      legend: {
        position: 'bottom',
      },
      colors: ['#00ad6b', '#fc6a26', '#000080'],
      labels: ['Accepted', 'Rejected', 'Pending'],
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
      },
      tooltip: {
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
  };

  return (
    <PieChart
      repositoryData={repositoryData}
      failureMsg={failureMsg}
      loader={loader}
    />
  );
}
