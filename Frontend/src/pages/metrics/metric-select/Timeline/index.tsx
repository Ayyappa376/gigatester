import React, { Fragment } from 'react';
import {
  Typography,
  Tooltip,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import Calendar from './Calendar';
import InfoIcon from '@material-ui/icons/Info';
import { timelineList } from '../../../../common/common';
import { Text } from '../../../../common/Language';
import './style.css';

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        color: '#ffffff',
        backgroundColor: '#000000',
        width: '15vw',
      },
    },
  },
});

export default function DoraMetricsTimeline(props: any) {
  const { updateTimelineData, timeline } = props;
  return (
    <Fragment>
      &nbsp; &nbsp; &nbsp;
      {timelineList.map((timelineData: any, index: number) => {
        return (
          <button
            id={timelineData.id}
            onClick={() => updateTimelineData(timelineData.id)}
            className={
              timeline === timelineData.id ? 'selected' : 'durationBtn'
            }
            disabled={timeline === timelineData.id}
            key={index}
          >
            {timelineData.name}
          </button>
        );
      })}
      &nbsp; &nbsp;
      <Calendar getCustomDates={props.getDoraMetricsCustomDates} />
      &nbsp;
      {
        <MuiThemeProvider theme={theme}>
          <Tooltip
            title={
              <Typography
                style={{
                  fontSize: '12px',
                }}
              >
                <Text tid='clickChartLegendLabelsToFilterTheRecords' />
              </Typography>
            }
          >
            <InfoIcon
              style={{
                fontSize: 24,
                marginTop: '5px',
                position: 'absolute',
              }}
            />
          </Tooltip>
        </MuiThemeProvider>
      }
    </Fragment>
  );
}
