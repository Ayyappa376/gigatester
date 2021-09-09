import React, { useState, useEffect, Fragment } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import './style.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { Http } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { buttonStyle } from '../../../common/common';
import PageSizeDropDown from '../../common/page-size-dropdown';
import RenderPagination from '../../common/pagination';
import SearchControl from '../../common/searchControl';
import { getDate } from '../../../utils/data';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Text } from '../../../common/Language';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '28px',
    position: 'relative',
    left: '45%',
    minWidth: '10%',
    ...buttonStyle,
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  loader: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  formControl: {
    minWidth: '100%',
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
  containerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '40%',
  },
  backButton: {
    marginTop: '28px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  bottomButtonsContainer: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  circularProgress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCell: {
    borderRadius: '0px',
    paddingBottom: '7px',
    paddingTop: '7px',
  },
  buttons: {
    ...buttonStyle,
  },
}));

const ManageQuestion = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [responseReceived, setResponseReceived] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Object[]>([]);
  const [questions, setQuestions] = useState<Object[]>([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questionnaires, setQuestionnaires] = useState<any>(null);
  const [focusQuestionnaire, setFocusQuestionnaire] = useState('0');
  const userDetails = useSelector((state: IRootState) => {
    return state.user;
  });
  const [itemLimit, setItemLimit] = useState({
    lowerLimit: 0,
    upperLimit: 9,
  });

  const fetchQuestionnaireList = () => {
    Http.get({
      url: `/api/v2/assignment?teamId=${userDetails.team}`,
      state: stateVariable,
    })
      .then((response: any) => {
        const filteredQuestionnaires: any = [];
        response.questionnaires.forEach((el: any) => {
          if (response.questionnaireSelected.includes(el.questionnaireId)) {
            filteredQuestionnaires.push(el);
          }
        });
        setQuestionnaires(filteredQuestionnaires);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          props.history.push('/relogin');
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

  const fetchQuestionList = () => {
    setBackdropOpen(true);
    let url: string = `/api/v2/admin/createquestion?type=${focusQuestionnaire}`;
    if (focusQuestionnaire === '0') {
      url = '/api/v2/admin/createquestion';
    }
    Http.get({
      url: url,
      state: stateVariable,
    })
      .then((response: any) => {
        setResponseReceived(true);
        setQuestions(response);
        setAllQuestions(response);
        setBackdropOpen(false);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          props.history.push('/relogin');
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
        setBackdropOpen(false);
      });
  };

  useEffect(() => {
    fetchQuestionnaireList();
    fetchQuestionList();
    setSearchString('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchQuestionList();
    setSearchString('');
    setCurrentPage(1);
  }, [focusQuestionnaire]);

  useEffect(() => {
    setNumberOfQuestions(questions.length);
  }, [questions]);

  useEffect(() => {
    if (searchButtonPressed) {
      setSearchButtonPressed(false);
      const searchedItems: any = [];
      if (searchString === '') {
        setQuestions([]);
      }
      allQuestions.forEach((el: any) => {
        if (el.question.toLowerCase().includes(searchString.toLowerCase())) {
          searchedItems.push(el);
        }
      });
      setQuestions(searchedItems);
      setCurrentPage(1);
    }
  }, [searchButtonPressed]);

  useEffect(() => {
    calculateLimits();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    calculateLimits();
  }, [itemsPerPage]);

  const calculateLimits = () => {
    const lowerLimit = (currentPage - 1) * itemsPerPage;
    const upperLimit = lowerLimit + itemsPerPage - 1;
    setItemLimit({ lowerLimit, upperLimit });
  };

  const handleSearch = (str?: string) => {
    if (typeof str !== 'undefined') {
      setSearchString(str);
    }
    setSearchButtonPressed(true);
  };

  const handleChangeItemsPerPage = (event: any) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
  };

  const handlePaginationClick = (event: number) => {
    setCurrentPage(event);
  };

  const handleChangeQuestionnaire = (event: any) => {
    setFocusQuestionnaire(event.target.value);
  };

  const renderQuestionsTable = () => {
    return (
      <Container
        maxWidth='md'
        component='div'
        classes={{
          root: classes.containerRoot,
        }}
      >
        <Backdrop className={classes.backdrop} open={backdropOpen}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <div style={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item sm={5}>
              <FormControl className={classes.formControl}>
                <InputLabel id='filter-control'>
                  <Text tid='chooseQuestionnaire' />
                </InputLabel>
                <Select
                  name={'selectQuestionnaire'}
                  value={focusQuestionnaire}
                  onChange={handleChangeQuestionnaire}
                >
                  <MenuItem key={'allQuestions'} value={'0'}>
                    <Text tid='allQuestions' />
                  </MenuItem>
                  {questionnaires && questionnaires.length !== 0 ? (
                    questionnaires.map((el: any) => (
                      <MenuItem
                        key={el.questionnaireId}
                        value={el.questionnaireId}
                      >
                        {el.displayName}
                      </MenuItem>
                    ))
                  ) : (
                    <div />
                  )}
                  <MenuItem key={'ummappedQuestions'} value={'0000'}>
                    <Text tid='unmappedQuestions' />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <SearchControl
                searchString={searchString}
                handleSearch={handleSearch}
              />
            </Grid>
            <Grid item sm={2}>
              <PageSizeDropDown
                handleChange={handleChangeItemsPerPage}
                itemCount={itemsPerPage}
              />
            </Grid>
          </Grid>
        </div>
        <Paper style={{ width: '100%', marginTop: '20px' }}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>
                  <Typography className={classes.tableHeadText}>
                    <Text tid='question' />
                  </Typography>
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  <Typography className={classes.tableHeadText}>
                    <Text tid='lastUpdate' />
                  </Typography>
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  <Typography className={classes.tableHeadText}>
                    <Text tid='actions' />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((row: any, index: number) => {
                if (index < itemLimit.lowerLimit) {
                  return;
                }
                if (index > itemLimit.upperLimit) {
                  return;
                }
                if (row.question) {
                  return (
                    <TableRow
                      key={row.id}
                      /* style={index % 2 ? { background : '#EFEFEF' } : { background : 'white' }} */
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        className={classes.tableCell}
                      >
                        <Typography className={classes.tableBodyText}>
                          {row.question}
                        </Typography>
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        className={classes.tableCell}
                        align='center'
                      >
                        <Typography className={classes.tableBodyText}>
                          {row.lastModifiedOn
                            ? getDate(row.lastModifiedOn)
                            : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='outlined'
                          className={classes.buttons}
                          onClick={() => {
                            props.editQuestionClicked(row);
                          }}
                        >
                          <Text tid='edit' /> <ArrowForwardIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <Fragment>
          <RenderPagination
            pageRangeDisplayed={10}
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={numberOfQuestions}
            handleChange={handlePaginationClick}
          />
        </Fragment>
        <div className={classes.bottomButtonsContainer}>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={props.goBack}
          >
            <Text tid='goBack' />
          </Button>
        </div>
      </Container>
    );
  };

  return (
    <Fragment>
      {responseReceived ? (
        renderQuestionsTable()
      ) : (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageQuestion);
