import React, { Fragment, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Input,
  ListItemText,
  Checkbox,
  Typography,
  Paper,
} from '@material-ui/core';
import {
  DeploymentFrequency,
  LeadTime,
  MTTR,
  ChangeFailureRate,
} from '../../../components/doraMetrics';
import DoraMetricsTimeline from './Timeline';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import MetricsList from './metricsList';
import { useSelector } from 'react-redux';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { Text } from '../../../common/Language';

export const ALL_TEAMS = 'All';
export const ALL_NAMES = 'All';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: 'relative',
    top: '100px',
    // backgroundColor: '#f7f7f7',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    paddingBottom: 0,
    border: '1px solid #b6b6b6',
    // boxShadow: '0px 0px 4px #a2a2a2',
  },
  doraMetricsContainer: {
    border: '1px solid #b1b1b1',
    marginTop: '20px',
    paddingBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 2px #a2a2a2',
    backgroundColor: '#e0e0e0',
  },
  fixedHeight: {
    height: 350,
  },
  toolbar: {
    fontSize: '12px !important',
    fontWeight: 'bold',
    display: 'initial',
  },
  topScrollContainer: {
    paddingTop: '100px !important',
    marginTop: '-85px !important',
  },
  viewMoreText: {
    color: 'blue',
    cursor: 'pointer',
    fontSize: '14px',
  },
  doraMetricsLinkText: {
    color: 'blue',
    cursor: 'pointer',
    float: 'right',
  },
}));

let now = new Date();
let todayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let todayEnd = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59,
  999
);

const MetricDetails = (props: any) => {
  const classes = useStyles();
  // const [status, setBuildStatus] = useState({ status: 0 }); // using bitwise operator for 3 bits, all set to 1s.
  const [dateRange, setDateRange] = useState({});
  const [focusTeam, setFocusTeam] = useState<string[]>([ALL_TEAMS]);
  const [teamList, setTeamList] = useState<Object[]>([]);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [customDate, setCustomDate] = useState([todayBegin, todayEnd]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [teamsFailureMsg, setTeamsListFailureMsg] = useState(false);
  const [metricType, setMetricType] = useState('doraMetrics');
  const [timeline, setTimeline] = useState('one_day');

  useEffect(() => {
    getTeams();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMetricType(props.metricType);
  }, [props.metricType]);

  const getTeams = () => {
    Http.get({
      url: `/api/v2/teamlist`,
      state: stateVariable,
    })
      .then((response: any) => {
        const teamListCopy = [...response].filter((a: any) => {
          return a.active === 'true';
        });
        setTeamList(
          teamListCopy.sort((a: any, b: any) => {
            return a.teamName.toUpperCase() <= b.teamName.toUpperCase()
              ? -1
              : 1;
          })
        );
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          setTeamsListFailureMsg(true);
        }
      });
  };

  const getFocusTeam = (event: any) => {
    let selectedTeams = event.target.value;
    if (selectedTeams.length === 0) {
      selectedTeams.push('All');
      setFocusTeam(selectedTeams);
    } else if (selectedTeams[0] === 'All' && selectedTeams.length > 1) {
      selectedTeams.shift();
      setFocusTeam(selectedTeams);
    } else {
      setFocusTeam(selectedTeams);
    }
  };

  const getDoraMetricsCustomDates = (dateRange: any) => {
    setCustomDate(dateRange);
    setTimeline('custom');
  };

  const updateTimelineData = (timeline: any) => {
    setTimeline(timeline);
    setCustomDate([todayBegin, todayEnd]);
  };

  const doraMetricsPage = () => {
    return (
      <Grid container>
        <Grid container className={classes.doraMetricsContainer} spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className={classes.topScrollContainer}
            id='doraMetrics'
          >
            <Typography variant='h6'>
              <Text tid='doraMetrics:' />
              <div className={classes.toolbar}>
                <DoraMetricsTimeline
                  timeline={timeline}
                  updateTimelineData={(timeline: any) =>
                    updateTimelineData(timeline)
                  }
                  getDoraMetricsCustomDates={(dateRange: any) =>
                    getDoraMetricsCustomDates(dateRange)
                  }
                  customDate={customDate}
                />
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}></Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              className={fixedHeightPaper}
              style={{ backgroundColor: '#f1f4ff' }}
            >
              <DeploymentFrequency
                focusTeam={focusTeam}
                timeline={timeline}
                customDate={customDate}
                getDateRange={(dateRange: any) => setDateRange(dateRange)}
                selectedDateRange={dateRange}
              />
              <InputLabel
                onClick={() => setMetricType('build')}
                className={classes.viewMoreText}
              >
                <Text tid='viewMore' />
              </InputLabel>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper}>
              <LeadTime
                timeline={timeline}
                focusTeam={focusTeam}
                customDate={customDate}
                selectedDateRange={dateRange}
              />
              <InputLabel
                onClick={() => setMetricType('requirements')}
                className={classes.viewMoreText}
              >
                <Text tid='viewMore' />
              </InputLabel>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper}>
              <MTTR
                timeline={timeline}
                focusTeam={focusTeam}
                customDate={customDate}
                selectedDateRange={dateRange}
              />
              <InputLabel
                onClick={() => setMetricType('build')}
                className={classes.viewMoreText}
              >
                <Text tid='viewMore' />
              </InputLabel>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              className={fixedHeightPaper}
              style={{ backgroundColor: '#f1f4ff' }}
            >
              <ChangeFailureRate
                timeline={timeline}
                focusTeam={focusTeam}
                customDate={customDate}
                selectedDateRange={dateRange}
              />
              <InputLabel
                onClick={() => setMetricType('build')}
                className={classes.viewMoreText}
              >
                <Text tid='viewMore' />
              </InputLabel>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={2} style={{ paddingTop: '5px' }}>
          <Grid item xs={12} md={9} lg={9}>
            <InputLabel
              id='demo-simple-select-label'
              style={{ color: '#525252' }}
            >
              <Text tid='chooseTeam' />: &nbsp;&nbsp;&nbsp;
              <Select
                labelId='demo-mutiple-checkbox-label'
                id='demo-mutiple-checkbox'
                multiple
                value={focusTeam}
                onChange={getFocusTeam}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
                style={{ width: '25%', paddingLeft: '5px' }}
              >
                {teamList.map((opt: any, i: number) => {
                  return (
                    <MenuItem key={i} value={opt.teamId}>
                      <Checkbox
                        checked={focusTeam.indexOf(opt.teamName) > -1}
                      />
                      <ListItemText primary={opt.teamName} />
                    </MenuItem>
                  );
                })}
              </Select>
              {teamsFailureMsg && (
                <span style={{ color: '#f44336' }}>
                  <Text tid='errorInLoadingTeamList' />
                </span>
              )}
            </InputLabel>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            {metricType !== 'doraMetrics' &&
              props.metricType === 'doraMetrics' && (
                <InputLabel
                  onClick={() => setMetricType('doraMetrics')}
                  className={classes.doraMetricsLinkText}
                >
                  <Text tid='doraMetrics' />
                </InputLabel>
              )}
          </Grid>
        </Grid>

        {metricType === 'doraMetrics' && props.metricType === 'doraMetrics' ? (
          doraMetricsPage()
        ) : (
          <MetricsList focusTeam={focusTeam} metricType={props.metricType} />
        )}
      </Container>
    </Fragment>
  );
};

export default withRouter(MetricDetails);
