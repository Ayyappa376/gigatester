// tslint:disable: all
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Typography, Button, TableSortLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RouteComponentProps } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import { IAssessmentListItem } from '../../model';
import Tooltip from '@material-ui/core/Tooltip';
import { buttonStyle } from '../../common/common';
import { default as MaterialLink } from '@material-ui/core/Link';
import {
  useActions,
  setAppBarLeftText,
  setAppBarCenterText,
} from '../../actions';
import { getDateTime } from '../../utils/data';
import { Text } from '../../common/Language';

interface ITeamAssesmentRouteParams {
  teamName: string;
  assessmentName: string;
  version: string;
}

type TeamAssessmentsProps = RouteComponentProps<ITeamAssesmentRouteParams>;

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    top: '120px',
    paddingBottom: theme.spacing(4),
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
  backButton: {
    position: 'relative',
    marginTop: '20px',
    marginBottom: '10px',
    ...buttonStyle,
  },
  dateFieldText: {
    color: '#808080',
    minWidth: '150px',
  },
  sortLabelIcon: {
    opacity: 0.3,
    color: 'white',
  },
}));

function TeamAssessments(props: TeamAssessmentsProps) {
  const classes = useStyles();
  const teamAssessments = useSelector(
    (state: IRootState) => state.assesment.teamAssessments
  );
  const setDisplayLeftText = useActions(setAppBarLeftText);
  const setDisplayCenterText = useActions(setAppBarCenterText);
  const teamName = props.match.params.teamName;
  const assessmentName = props.match.params.assessmentName;
  const version = props.match.params.version;
  setDisplayCenterText(`Team: ${teamName}`);
  /* Order related changes */
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('date');
  /* Initialization Order related variables ends here */
  const team =
    teamAssessments &&
    teamAssessments.data!.teams.filter(
      (team) =>
        team.teamName === teamName &&
        team.assessmentName === assessmentName &&
        team.questionnaireVersion === version
    );

  const [assessments, setAssessments] = useState<IAssessmentListItem[]>(
    team[0].assessments
  );
  /* 
    const assessmentsCopy = [...assessments];
    setAssessments(assessmentsCopy.sort( compareDateD )); */

  useEffect(() => {
    if (assessments !== []) {
      let tempSortedAssessmentArray = [...assessments];
      if (order === 'asc') {
        if (orderBy === 'name') {
          setAssessments(tempSortedAssessmentArray.sort(compareName));
        }
        if (orderBy === 'date') {
          setAssessments(tempSortedAssessmentArray.sort(compareDate));
        }
        if (orderBy === 'type') {
          setAssessments(tempSortedAssessmentArray.sort(compareAssessmentType));
        }
        // if (orderBy === 'score') {
        //     setAssessments(tempSortedAssessmentArray.sort(compareScore))
        // }
        // if (orderBy === 'level') {
        //     setAssessments(tempSortedAssessmentArray.sort(compareLevel))
        // }
      }
      if (order === 'desc') {
        if (orderBy === 'name') {
          setAssessments(tempSortedAssessmentArray.sort(compareNameD));
        }
        if (orderBy === 'date') {
          setAssessments(tempSortedAssessmentArray.sort(compareDateD));
        }
        if (orderBy === 'type') {
          setAssessments(
            tempSortedAssessmentArray.sort(compareAssessmentTypeD)
          );
        }
        // if (orderBy === 'score') {
        //     setAssessments(tempSortedAssessmentArray.sort(compareScoreD))
        // }
        // if (orderBy === 'level') {
        //     setAssessments(tempSortedAssessmentArray.sort(compareLevelD))
        // }
      }
    }
  }, [order, orderBy]);

  function compareName(a: IAssessmentListItem, b: IAssessmentListItem) {
    if (a.userId < b.userId) {
      return -1;
    }
    if (a.userId > b.userId) {
      return 1;
    }
    return 0;
  }

  function compareDate(a: IAssessmentListItem, b: IAssessmentListItem) {
    if (!a.dateSubmit) {
      return -1;
    }
    if (!b.dateSubmit) {
      return 1;
    }
    if (a.dateSubmit < b.dateSubmit) {
      return -1;
    }
    if (a.dateSubmit > b.dateSubmit) {
      return 1;
    }
    return 0;
  }

  function compareAssessmentType(
    a: IAssessmentListItem,
    b: IAssessmentListItem
  ) {
    if (!a.assessmentName) {
      return -1;
    }
    if (!b.assessmentName) {
      return 1;
    }
    if (a.assessmentName < b.assessmentName) {
      return -1;
    }
    if (a.assessmentName > b.assessmentName) {
      return 1;
    }
    if (a.questionnaireVersion < b.questionnaireVersion) {
      return -1;
    }
    if (a.questionnaireVersion > b.questionnaireVersion) {
      return 1;
    }
    return 0;
  }

  function compareNameD(a: IAssessmentListItem, b: IAssessmentListItem) {
    if (a.userId < b.userId) {
      return 1;
    }
    if (a.userId > b.userId) {
      return -1;
    }
    return 0;
  }

  function compareDateD(a: IAssessmentListItem, b: IAssessmentListItem) {
    if (!a.dateSubmit) {
      return 1;
    }
    if (!b.dateSubmit) {
      return -1;
    }
    if (a.dateSubmit < b.dateSubmit) {
      return 1;
    }
    if (a.dateSubmit > b.dateSubmit) {
      return -1;
    }
    return 0;
  }

  function compareAssessmentTypeD(
    a: IAssessmentListItem,
    b: IAssessmentListItem
  ) {
    if (!a.assessmentName) {
      return 1;
    }
    if (!b.assessmentName) {
      return -1;
    }
    if (a.assessmentName < b.assessmentName) {
      return 1;
    }
    if (a.assessmentName > b.assessmentName) {
      return -1;
    }
    if (a.questionnaireVersion < b.questionnaireVersion) {
      return 1;
    }
    if (a.questionnaireVersion > b.questionnaireVersion) {
      return -1;
    }
    return 0;
  }
  const getLink = (row: any) => {
    return (
      <MaterialLink
        href='#'
        onClick={() => {
          setDisplayLeftText(
            `${row.assessmentName} - v${row.questionnaireVersion}`
          );
          props.history.push({
            pathname: `/assessment/detail/${row.assessmentId}`,
            state: { prevPath: props.location.pathname },
          });
        }}
      >
        <Typography>
          <Text tid='viewAssessment' />
        </Typography>
      </MaterialLink>
    );
  };

  const handleBackButtonClick = () => {
    props.history.push('/assessment/teams');
  };

  const renderBackButton = () => {
    return (
      <Button
        variant='outlined'
        className={classes.backButton}
        onClick={handleBackButtonClick}
      >
        <Text tid='goBack' />
      </Button>
    );
  };

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
      maxWidth='lg'
      component='div'
      classes={{
        root: classes.containerRoot,
      }}
    >
      <Paper style={{ width: '100%' }}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align='center' className={classes.tableHeadCell}>
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
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort('type');
                  }}
                >
                  <Typography className={classes.tableHeadText}>
                    <Text tid='assessment' />
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
                <Typography className={classes.tableHeadText}>
                  <Text tid='level' />
                </Typography>
              </TableCell>
              <TableCell align='center' className={classes.tableHeadCell}>
                <Typography className={classes.tableHeadText}>
                  <Text tid='linkToAssessments' />
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assessments.map((row, index) => (
              <TableRow
                key={row.assessmentId}
                style={
                  index % 2
                    ? { background: '#EFEFEF' }
                    : { background: 'white' }
                }
              >
                <TableCell component='th' scope='row'>
                  <Tooltip title={<Typography>{row.userId}</Typography>}>
                    <Typography className={classes.tableBodyText}>
                      {row.userId}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align='center'>
                  <Tooltip
                    title={
                      <Typography>
                        {`${row.assessmentName} - v${row.questionnaireVersion}`}
                      </Typography>
                    }
                  >
                    <Typography className={classes.tableBodyText}>
                      {`${row.assessmentName} - v${row.questionnaireVersion}`}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.dateFieldText}>
                    {row.dateSubmit
                      ? getDateTime(row.dateSubmit)
                      : row.date
                      ? getDateTime(row.date)
                      : '-'}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {`${row.result!.percentage}%`}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.tableBodyText}>
                    {row.result!.level}
                  </Typography>
                </TableCell>
                <TableCell align='center'>{getLink(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {renderBackButton()}
    </Container>
  );
}

export default TeamAssessments;
