import React, { Fragment } from 'react';
import { Typography, Tooltip } from '@material-ui/core';
import Calendar from '../../../components/metrics/repository/Calendar';
import { timelineList } from '../../../common/common';
import InfoIcon from '@material-ui/icons/Info';
import { Text } from '../../../common/Language';
import './style.css';

export default function ReposTimeline(props: any) {
  const { reposTimeline, updateReposData, getReposCustomDates } = props;
  return (
    <Fragment>
      &nbsp;&nbsp;
      {timelineList.map((timelineData: any, index: number) => {
        return (
          <button
            id={timelineData.id}
            onClick={() => updateReposData(timelineData.id)}
            className={
              reposTimeline === timelineData.id ? 'selected' : 'durationBtn'
            }
            disabled={reposTimeline === timelineData.id}
            key={index}
          >
            {timelineData.name}
          </button>
        );
      })}
      &nbsp; &nbsp;
      <Calendar getCustomDates={getReposCustomDates} />
      &nbsp;
      {
        <Tooltip
          title={
            <Typography style={{ width: '12vw', fontSize: '10px' }}>
              <Text tid='clickChartLegendLabelsToFilterTheRecords' />
            </Typography>
          }
        >
          <InfoIcon
            style={{
              fontSize: 22,
              marginTop: '5px',
              position: 'absolute',
            }}
          />
        </Tooltip>
      }
    </Fragment>
  );
}
