import React, { Fragment } from 'react';
import { Typography, Tooltip } from '@material-ui/core';
import Calendar from '../../../components/metrics/repository/Calendar';
import { timelineList } from '../../../common/common';
import InfoIcon from '@material-ui/icons/Info';
import { Text } from '../../../common/Language';
import './style.css';

export default function RequirementsTimeline(props: any) {
  const {
    requirementsTimeline,
    updateRequirementsData,
    getRequirementsCustomDates,
  } = props;
  return (
    <Fragment>
      &nbsp;&nbsp;
      {timelineList.map((timelineData: any, index: number) => {
        return (
          <button
            id={timelineData.id}
            onClick={() => updateRequirementsData(timelineData.id)}
            className={
              requirementsTimeline === timelineData.id
                ? 'selected'
                : 'durationBtn'
            }
            disabled={requirementsTimeline === timelineData.id}
            key={index}
          >
            {timelineData.name}
          </button>
        );
      })}
      &nbsp; &nbsp;
      <Calendar getCustomDates={getRequirementsCustomDates} />
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
