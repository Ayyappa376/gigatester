import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  createStyles,
  makeStyles,
  withStyles,
  Theme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  TablePagination,
  IconButton,
  useTheme,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getDateTime } from '../../../utils/data';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import {
  IBuildsDataItem,
  STATUS_PASS,
  STATUS_FAIL,
  STATUS_OTHER,
} from '../../../model/metrics/buildsData';
import Loader from '../../loader';
import { ALL_TEAMS } from '../../../pages/metrics/metric-select/metricsList';
import { Text } from '../../../common/Language';
import './style.css';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IBuildsDataItem;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'buildNum', numeric: false, disablePadding: true, label: 'buildId' },
  { id: 'teamId', numeric: true, disablePadding: false, label: 'team' },
  {
    id: 'projectName',
    numeric: true,
    disablePadding: false,
    label: 'project',
  },
  { id: 'status', numeric: true, disablePadding: false, label: 'status' },
  {
    id: 'timestamp',
    numeric: true,
    disablePadding: false,
    label: 'timestamp',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    label: 'duration',
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IBuildsDataItem
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IBuildsDataItem) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableHeadText}
          >
            <TableSortLabel
              classes={{
                icon: classes.sortLabelIcon,
              }}
              hideSortIcon={true}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <label className={classes.tableHeadText}>
                <Text tid={headCell.label} />
              </label>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      boxShadow: '0px 0px 1px #888888',
    },
    table: {
      minWidth: 350,
    },
    tableHeadText: {
      backgroundColor: '#3CB1DC',
      color: '#FFFFFF',
      fontSize: '14px',
      borderRadius: '0px',
      cursor: 'pointer',
      lineHeight: 1.2,
    },
    sortLabelIcon: {
      opacity: 0.4,
      color: 'white !important',
    },
    container: {
      maxHeight: 200,
    },
    loader: {
      marginTop: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  })
);

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const BuildTable = (props: any) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IBuildsDataItem>('buildNum');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [passedBuild, setPassedBuild] = useState(true);
  const [failedBuild, setFailedBuild] = useState(true);
  const [otherBuild, setOtherBuild] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [buildsData, setBuildsData] = useState<IBuildsDataItem[]>([]);
  const [displayData, setDisplayData] = useState<IBuildsDataItem[]>([]);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [failureMsg, setFailureMsg] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (props.focusTeam[0] === 'All' && props.focusTeam.length > 1) {
      props.focusTeam.shift();
    }
    fetchData();
  }, [props.focusTeam, props.selectedDateRange]);

  useEffect(() => {
    if ((props.buildStatus.status & 1) === 1) {
      setPassedBuild(!passedBuild);
    }
    if ((props.buildStatus.status & 2) === 2) {
      setFailedBuild(!failedBuild);
    }
    if ((props.buildStatus.status & 4) === 4) {
      setOtherBuild(!otherBuild);
    }
  }, [props.buildStatus]);

  useEffect(() => {
    let temp: IBuildsDataItem[] = [];
    buildsData.map((data: IBuildsDataItem) => {
      if (
        (passedBuild && data.status === STATUS_PASS) ||
        (failedBuild && data.status === STATUS_FAIL) ||
        (otherBuild && data.status === STATUS_OTHER)
      ) {
        temp.push(data);
      }
    });
    setDisplayData(temp);
  }, [passedBuild, failedBuild, otherBuild]);

  const fetchData = () => {
    let { timeline, focusTeam, selectedDateRange } = props;
    let url: string = '';
    if (focusTeam[0] === ALL_TEAMS) {
      url =
        timeline === 'one_day'
          ? '/api/metrics/builds/list'
          : `/api/metrics/builds/list?fromDate=${selectedDateRange.fromDate}&toDate=${selectedDateRange.toDate}`;
    } else {
      url =
        timeline === 'one_day'
          ? `/api/metrics/builds/list?teamId=${focusTeam.toString()}`
          : `/api/metrics/builds/list?teamId=${focusTeam.toString()}&fromDate=${
              selectedDateRange.fromDate
            }&toDate=${selectedDateRange.toDate}`;
    }
    Http.get({
      url,
      state: stateVariable,
    })
      .then((response: any) => {
        setBuildsData(response);
        setLoader(false);
        setPassedBuild(true);
        setFailedBuild(true);
        setOtherBuild(true);
        setDisplayData(response);
      })
      .catch((error) => {
        setLoader(false);
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          setFailureMsg(true);
        }
      });
  };

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f1f1f1',
        },
      },
    })
  )(TableRow);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IBuildsDataItem
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = displayData.map((n: any) => n.buildNum);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, displayData.length - page * rowsPerPage);

  const renderTable = () => {
    return (
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            aria-label='sticky table'
            className={classes.table}
            aria-labelledby='tableTitle'
            size='small'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={Number(buildsData)}
            />
            <TableBody style={{ overflow: 'auto' }}>
              {stableSort(displayData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <TableCell align='center'>
                        <a
                          href={row.url}
                          target='_blank'
                          style={{ textDecoration: 'underline' }}
                        >
                          {row.buildNum}
                        </a>
                      </TableCell>
                      <TableCell align='center'>{row.teamId}</TableCell>
                      <TableCell align='center'>{row.projectName}</TableCell>
                      <TableCell align='center'>{row.status}</TableCell>
                      <TableCell align='center'>
                        {row.timestamp ? getDateTime(row.timestamp) : '-'}
                      </TableCell>
                      <TableCell align='center'>{row.duration}</TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          // labelRowsPerPage='Records per page'
          rowsPerPageOptions={[5, 10, 20, 50]}
          component='div'
          count={displayData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ to, count }) => `${to} of ${count}`}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant='subtitle2'>
        <Box
          fontWeight={700}
          fontFamily='Helvetica, Arial, sans-serif'
          mb={props.loader || props.failureMsg ? 2 : 1.5}
        >
          <Text tid='buildsDetails' />
        </Box>
      </Typography>
      {loader ? (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      ) : failureMsg ? (
        <Alert severity='error'>
          <AlertTitle>
            <Text tid='error' />
          </AlertTitle>
          <Text tid='somethingWentWrong' />
        </Alert>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default withRouter(BuildTable);
