import React, { useState, useEffect, Fragment } from 'react';
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Checkbox,
  Button,
  Snackbar,
  SnackbarContent,
  makeStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Loader } from '../../..';
import { buttonStyle } from '../../../../common/common';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../reducers';
import { Http } from '../../../../utils';
import { default as MaterialLink } from '@material-ui/core/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { withRouter } from 'react-router-dom';
import { ModalComponent } from '../../../modal';
import { getDate } from '../../../../utils/data';
import { Text } from '../../../../common/Language';

export interface Questionnaire {
  active?: boolean;
  categories?: string[];
  categoriesMap?: CategoriesMap;
  createdBy?: string;
  createdOn: number;
  description?: string;
  lastVersion?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  name: string;
  publishedBy?: string;
  publishedOn?: number;
  questionnaireId: string;
  questions: string[];
  randomize?: boolean;
  recommendation?: boolean;
  version: string;
}

export interface CategoriesMap {
  [questionId: string]: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '28px',
    position: 'relative',
    left: '45%',
    minWidth: '10%',
    ...buttonStyle,
  },
  loader: {
    marginTop: '50px',
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
  containerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
}));

const ManageQuestionnaires = (props: any) => {
  const classes = useStyles();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [fetchQuestionnaires, setFetchQuestionnaires] = React.useState(false);
  const [focusQuestionnaire, setFocusQuestionnaire] = useState<
    Questionnaire | {}
  >({});
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  //    const [deleteQuestionnaireName, setDeleteQuestionnaireName] = useState('');
  const userDetails = useSelector((state: IRootState) => {
    return state.user;
  });
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  let msgFailure = failureMessage;

  const fetchQuestionnaireList = () => {
    setBackdropOpen(true);
    Http.get({
      url: '/api/v2/questionnaire?status=all&latest=true',
      state: stateVariable,
    })
      .then((response: any) => {
        setFetchQuestionnaires(true);
        setQuestionnaires(response);
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
      });
  };

  useEffect(() => {
    fetchQuestionnaireList();
  }, []);

  const handleClose = () => {
    setFailure(false);
  };

  const editQuestionnaireClicked = (questionnaireSelected: any) => {
    props.handleEditQuestionnaire(questionnaireSelected);
  };

  const mapQuestionsClicked = (questionnaireSelected: any) => {
    props.handleMapQuestionStandalone(questionnaireSelected);
  };

  const publishClicked = (row: any) => {
    setFocusQuestionnaire(row);
    setOpenModal(true);
  };

  const publishQuestionnaire = () => {
    setBackdropOpen(true);
    const postData = { ...focusQuestionnaire, active: true };
    Http.put({
      url: '/api/v2/questionnaire',
      body: {
        type: 'publish',
        questionnaire: postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setBackdropOpen(false);
        fetchQuestionnaireList();
      })
      .catch((error) => {
        setBackdropOpen(false);
        fetchQuestionnaireList();
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
          setFailure(true);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

  const handleModalYes = () => {
    setOpenModal(false);
    publishQuestionnaire();
  };

  const handleModalNo = () => {
    setOpenModal(false);
  };

  const renderPage = () => {
    return (
      <Fragment>
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
          <Paper style={{ width: '100%', marginTop: '15px' }}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    <Typography className={classes.tableHeadText}>
                      <Text tid='questionnaires' />
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align='center'>
                    <Typography className={classes.tableHeadText}>
                      <Text tid='version' />
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align='center'>
                    <Typography className={classes.tableHeadText}>
                      <Text tid='actions' />
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align='center'>
                    <Typography className={classes.tableHeadText}>
                      <Text tid='published' />
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align='center'>
                    <Typography className={classes.tableHeadText}>
                      <Text tid='modifiedOn' />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionnaires.map((row: Questionnaire, index: number) => (
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
                      className={classes.tableCell}
                    >
                      <Typography className={classes.tableBodyText}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      className={classes.tableCell}
                      align='center'
                    >
                      <Typography className={classes.tableBodyText}>
                        {row.version ? row.version : 1}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      className={classes.tableCell}
                    >
                      <div className={classes.actionsBlock}>
                        <MaterialLink
                          href='#'
                          onClick={() => {
                            editQuestionnaireClicked(row);
                          }}
                        >
                          <Typography>
                            <Text tid='edit' />
                          </Typography>
                        </MaterialLink>
                        <Typography>&nbsp;|&nbsp;</Typography>
                        <MaterialLink
                          href='#'
                          onClick={() => {
                            mapQuestionsClicked(row);
                          }}
                        >
                          <Typography>
                            <Text tid='map-Questions' />
                          </Typography>
                        </MaterialLink>
                        {!row.active ? (
                          <Fragment>
                            <Typography>&nbsp;|&nbsp;</Typography>
                            <MaterialLink
                              href='#'
                              onClick={() => {
                                publishClicked(row);
                              }}
                            >
                              <Typography>
                                <Text tid='publish' />
                              </Typography>
                            </MaterialLink>
                          </Fragment>
                        ) : (
                          <Typography>&nbsp;</Typography>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      className={classes.tableCell}
                      align='center'
                    >
                      {row.active ? (
                        <CheckCircleIcon fontSize='large' htmlColor='#66bb6a' />
                      ) : (
                        <CancelIcon fontSize='large' htmlColor='#dd0000' />
                      )}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      align='center'
                      className={classes.tableCell}
                    >
                      <Typography className={classes.tableBodyText}>
                        {row.active
                          ? row.publishedOn
                            ? getDate(row.publishedOn)
                            : row.modifiedOn
                            ? getDate(row.modifiedOn)
                            : getDate(row.createdOn)
                          : 'NA'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={failure}
          onClose={handleClose}
          autoHideDuration={9000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#dd0000',
            }}
            message={msgFailure}
          />
        </Snackbar>
        <ModalComponent
          message={'publishTheQuestionnaire'}
          openModal={openModal}
          handleModalNoClicked={handleModalNo}
          handleModalYesClicked={handleModalYes}
        />
      </Fragment>
    );
  };
  return (
    <Fragment>
      {fetchQuestionnaires ? (
        renderPage()
      ) : (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(ManageQuestionnaires);
