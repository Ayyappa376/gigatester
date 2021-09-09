// tslint:disable: all

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography, Tooltip, TableSortLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'react-circular-progressbar/dist/styles.css';
import { IAssessmentListItem } from '../../../../model';
import { withRouter } from 'react-router-dom';
import { getDateTime } from '../../../../utils/data';
import { Text } from '../../../../common/Language';

interface IAssessmentArrayItem {
  data: IAssessmentListItem;
  team: string;
}

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  table: {
    minWidth: 650,
    fontSize: '16px',
  },
  tableHead: {
    backgroundColor: '#3CB1DC',
  },
  tableHeadText: {
    color: '#FFFFFF',
  },
  tableHeadCell: {
    borderRadius: '0px',
  },
  tableBodyText: {
    color: '#808080',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    border: '18px',
  },
  firstColumn: {
    maxWidth: '200px',
    overflow: 'hidden',
  },
  sortLabelIcon: {
    opacity: 0.8,
    color: 'white',
  },
}));

function CategoryBarChartEvent(props: any) {
  const classes = useStyles();
  const [assessmentArray, setAssessmentArray] = useState<
    IAssessmentArrayItem[]
  >([]);
  const [sortedAssessmentArray, setSortedAssessmentArray] = useState<
    IAssessmentArrayItem[]
  >([]);

  /* Order related changes */
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('date');
  /* Initialization Order related variables ends here */

  useEffect(() => {
    let tempAssessmentArray: IAssessmentArrayItem[] = [];
    Object.keys(props.responseData.teams).forEach((team: string) => {
      if (props.focusTeam === 'all' || team === props.focusTeam) {
        props.responseData.teams[team].assessments.forEach(
          (assessment: IAssessmentListItem) => {
            if (
              assessment &&
              assessment.result &&
              assessment.result.categoryWiseResults &&
              assessment.result.categoryWiseResults[props.focusCategory]
            ) {
              let item: IAssessmentArrayItem = { data: assessment, team: team };
              tempAssessmentArray.push(item);
            }
          }
        );
      }
    });
    setAssessmentArray(tempAssessmentArray);
  }, []);

  useEffect(() => {
    if (assessmentArray !== []) {
      let tempSortedAssessmentArray = assessmentArray;
      tempSortedAssessmentArray.sort(compareDateD);
      setSortedAssessmentArray(tempSortedAssessmentArray);
    }
  }, [assessmentArray]);

  useEffect(() => {
    if (assessmentArray !== []) {
      let tempSortedAssessmentArray = [...sortedAssessmentArray];
      if (order === 'asc') {
        if (orderBy === 'name') {
          setSortedAssessmentArray(tempSortedAssessmentArray.sort(compareName));
        }
        if (orderBy === 'date') {
          setSortedAssessmentArray(tempSortedAssessmentArray.sort(compareDate));
        }
        if (orderBy === 'team') {
          setSortedAssessmentArray(tempSortedAssessmentArray.sort(compareTeam));
        }
        if (orderBy === 'score') {
          setSortedAssessmentArray(
            tempSortedAssessmentArray.sort(compareScore)
          );
        }
      }
      if (order === 'desc') {
        if (orderBy === 'name') {
          setSortedAssessmentArray(
            tempSortedAssessmentArray.sort(compareNameD)
          );
        }
        if (orderBy === 'date') {
          setSortedAssessmentArray(
            tempSortedAssessmentArray.sort(compareDateD)
          );
        }
        if (orderBy === 'team') {
          setSortedAssessmentArray(
            tempSortedAssessmentArray.sort(compareTeamD)
          );
        }
        if (orderBy === 'score') {
          setSortedAssessmentArray(
            tempSortedAssessmentArray.sort(compareScoreD)
          );
        }
      }
    }
  }, [order, orderBy]);

  const getLevel = (percentage: number) => {
    // console.log(percentage);
    const userLevels = props.responseData.userLevels;
    let result = '';
    userLevels.forEach((level: any) => {
      if (percentage <= level.upperLimit && percentage >= level.lowerLimit) {
        result = level.name;
      }
    });
    return result;
  };

  function compareName(a: any, b: any) {
    if (a.data.userId < b.data.userId) {
      return -1;
    }
    if (a.data.userId > b.data.userId) {
      return 1;
    }
    return 0;
  }

  function compareDate(a: any, b: any) {
    if (a.data.dateSubmit < b.data.dateSubmit) {
      return -1;
    }
    if (a.data.dateSubmit > b.data.dateSubmit) {
      return 1;
    }
    return 0;
  }

  function compareTeam(a: any, b: any) {
    if (a.team < b.team) {
      return -1;
    }
    if (a.team > b.team) {
      return 1;
    }
    return 0;
  }

  function compareScore(a: any, b: any) {
    if (
      a.data.result!.categoryWiseResults[props.focusCategory].percentage <
      b.data.result!.categoryWiseResults[props.focusCategory].percentage
    ) {
      return -1;
    }
    if (
      a.data.result!.categoryWiseResults[props.focusCategory].percentage >
      b.data.result!.categoryWiseResults[props.focusCategory].percentage
    ) {
      return 1;
    }
    return 0;
  }

  function compareNameD(a: any, b: any) {
    if (a.data.userId < b.data.userId) {
      return 1;
    }
    if (a.data.userId > b.data.userId) {
      return -1;
    }
    return 0;
  }

  function compareDateD(a: any, b: any) {
    if (a.data.dateSubmit < b.data.dateSubmit) {
      return 1;
    }
    if (a.data.dateSubmit > b.data.dateSubmit) {
      return -1;
    }
    return 0;
  }

  function compareTeamD(a: any, b: any) {
    if (a.team < b.team) {
      return 1;
    }
    if (a.team > b.team) {
      return -1;
    }
    return 0;
  }

  function compareScoreD(a: any, b: any) {
    if (
      a.data.result!.categoryWiseResults[props.focusCategory].percentage <
      b.data.result!.categoryWiseResults[props.focusCategory].percentage
    ) {
      return 1;
    }
    if (
      a.data.result!.categoryWiseResults[props.focusCategory].percentage >
      b.data.result!.categoryWiseResults[props.focusCategory].percentage
    ) {
      return -1;
    }
    return 0;
  }

  const handleRequestSort = (property: string) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrder('asc');
      setOrderBy(property);
    }
  };

  return (
    <Container
      maxWidth='md'
      component='div'
      classes={{
        root: classes.containerRoot,
      }}
    >
      <div style={{ width: '97%' }}>
        <Typography variant='h4' color='primary' gutterBottom>
          {props.focusCategory}
        </Typography>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>
                <TableSortLabel
                  classes={{
                    icon: classes.sortLabelIcon,
                  }}
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort('name');
                  }}
                >
                  <Typography className={classes.tableHeadText}>
                    <Text tid='takenBy' />
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                <TableSortLabel
                  classes={{
                    icon: classes.sortLabelIcon,
                  }}
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort('date');
                  }}
                >
                  <Typography className={classes.tableHeadText}>
                    <Text tid='dateSubmitted' />
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                <TableSortLabel
                  classes={{
                    icon: classes.sortLabelIcon,
                  }}
                  active={orderBy === 'team'}
                  direction={orderBy === 'team' ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort('team');
                  }}
                >
                  <Typography className={classes.tableHeadText}>
                    <Text tid='team' />
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                <TableSortLabel
                  classes={{
                    icon: classes.sortLabelIcon,
                  }}
                  active={orderBy === 'score'}
                  direction={orderBy === 'score' ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort('score');
                  }}
                >
                  <Typography className={classes.tableHeadText}>
                    <Text tid='score' />
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                <Typography className={classes.tableHeadText}>Level</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAssessmentArray.map((row, index) => (
              <TableRow
                key={index}
                style={
                  index % 2
                    ? { background: '#EFEFEF' }
                    : { background: 'white' }
                }
              >
                <TableCell
                  component='th'
                  scope='row'
                  className={classes.firstColumn}
                >
                  <Tooltip
                    title={
                      <Typography>
                        {row.data.userId ? row.data.userId : 'NA'}
                      </Typography>
                    }
                  >
                    <Typography className={classes.tableBodyText}>
                      {row.data.userId ? row.data.userId : 'NA'}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {row.data.dateSubmit
                      ? getDateTime(row.data.dateSubmit)
                      : row.data.date
                      ? getDateTime(row.data.date)
                      : '-'}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {row.team}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {row.data.result!.categoryWiseResults[props.focusCategory]
                      .percentage + '%'}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {getLevel(
                      row.data.result!.categoryWiseResults[props.focusCategory]
                        .percentage
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default withRouter(CategoryBarChartEvent);
