import React, { useState, useEffect, Fragment } from 'react';
import {
  Typography,
  Grid,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  makeStyles,
  MuiThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { Http } from '../../../utils';
import { IRootState } from '../../../reducers';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import Notification from '../../../common/notification';
import { ADMIN_HOME } from '../../../pages/admin';
import DropDown from '../../common/dropDown';
import { ModalComponent } from '../../modal';
import InfoIcon from '@material-ui/icons/Info';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';

export const numberOfOptionsArray = [2, 3, 4, 5, 6, 7];

export interface IAnswer {
  answer: string;
  weightageFactor: number;
}

export interface IAnswers {
  [answerId: string]: IAnswer;
}

export interface IQuestionDetails {
  answers: IAnswers;
  comments: string;
  hint?: string;
  hintURL?: string;
  id: string;
  level: 'Low' | 'Medium' | 'High';
  question: string;
  scoreObtained?: number;
  thresholdScore?: number;
  type: string;
  numberOfAnswers: number;
  NA?: boolean;
  version: number;
  reason?: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  formControl: {
    minWidth: '100%',
  },
  backButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
}));

const CreateQuestion = (props: any) => {
  const classes = useStyles();
  const emptyAnswer: IAnswer = {
    answer: '',
    weightageFactor: 1,
  };
  const [answerVariable, setAnswerVariable] = useState<IAnswer[]>([
    emptyAnswer,
  ]);
  const [questionPosted, setQuestionPosted] = useState(false);
  const [numberOfOptions, setNumberOfOptions] = useState(2);
  const [proposedNumberOfOptions, setProposedNumberOfOptions] = useState(0);
  const [weightageFactorArray, setWeightFactorArray] = useState([1, 2]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const defaultPostData: IQuestionDetails = {
    answers: {},
    comments: '',
    id: 'ques',
    version: 1,
    question: '',
    type: 'select',
    numberOfAnswers: 1,
    NA: false,
    level: 'Low',
    reason: false,
  };
  const [postData, setPostData] = useState<IQuestionDetails>(defaultPostData);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const handleAnswerChangeValue = (event: any, i: number) => {
    const answerCopy = [...answerVariable];
    answerCopy[i].answer = event.target.value;
    setAnswerVariable(answerCopy);
  };

  const handleWeightageChangeValue = (event: any, i: number) => {
    const answerCopy = [...answerVariable];
    answerCopy[i].weightageFactor = event.target.value;
    setAnswerVariable(answerCopy);
  };

  const validateAnswers = () => {
    let validWeightage = true;
    let validAnswer = true;
    let iteration = 0;
    for (const answer of answerVariable) {
      if (answer.answer === '') {
        setNotify({
          isOpen: true,
          message: 'answerCannotBeBlank',
          type: 'error',
        });
        return false;
      }
      if (!weightageFactorArray.includes(answer.weightageFactor)) {
        setNotify({
          isOpen: true,
          message: 'weightageFactorCannotBeBlank',
          type: 'error',
        });
        return false;
      }
      answerVariable.forEach((el, i: number) => {
        if (i !== iteration) {
          if (
            el.weightageFactor === answer.weightageFactor &&
            postData.type === 'select'
          ) {
            validWeightage = false;
          } else if (el.answer === answer.answer) {
            validAnswer = false;
          }
        }
      });
      iteration = iteration + 1;
    }
    if (validWeightage && validAnswer) {
      return true;
    }
    if (!validAnswer) {
      setNotify({
        isOpen: true,
        message: 'answerMustBeUnique',
        type: 'error',
      });
      return false;
    }
    setNotify({
      isOpen: true,
      message: 'useDistinctWeightages',
      type: 'error',
    });
    return false;
  };

  const validatePostData = () => {
    if (postData.question === '') {
      setNotify({
        isOpen: true,
        message: 'questionCannotBeEmpty',
        type: 'error',
      });
      return {};
    }
    if (answerVariable.length < 2) {
      setNotify({
        isOpen: true,
        message: 'atleastTwoAnswerOptions',
        type: 'error',
      });
      return {};
    }
    const answersValid = validateAnswers();
    if (!answersValid) {
      return {};
    }
    if (postData.comments === '') {
      setNotify({
        isOpen: true,
        message: 'recommendationsCannotBeEmpty',
        type: 'error',
      });
      return {};
    }
    const answersData: IAnswers = {};
    answerVariable.forEach((el: IAnswer, i: number) => {
      answersData[`ans${i + 1}`] = el;
    });
    return { ...postData, answers: answersData };
  };

  const handleSubmit = () => {
    const dataValid = validatePostData();
    if (Object.keys(dataValid).length > 0) {
      Http.post({
        url: `/api/v2/admin/createquestion`,
        body: {
          ...dataValid,
        },
        state: stateVariable,
      })
        .then((response: any) => {
          setQuestionPosted(true);
        })
        .catch((error) => {
          const perror = JSON.stringify(error);
          const object = JSON.parse(perror);
          if (object.code === 400) {
            setQuestionPosted(true);
            setNotify({
              isOpen: true,
              message: object.apiError.msg,
              type: 'error',
            });
          } else if (object.code === 401) {
            props.history.push('/relogin');
          } else {
            setNotify({
              isOpen: true,
              message: 'somethingWentWrong',
              type: 'error',
            });
          }
        });
    }
  };

  const handleChangeLevelValue = (event: any) => {
    setPostData({ ...postData, level: event.target.value });
  };

  const changeNaFlag = () => {
    setPostData({ ...postData, NA: !postData.NA });
  };

  const changeReasonFlag = () => {
    setPostData({ ...postData, reason: !postData.reason });
  };

  const changeMultiSelect = () => {
    if (postData.type === 'select') {
      setPostData({ ...postData, type: 'multi-select' });
    } else {
      setPostData({ ...postData, type: 'select', numberOfAnswers: 1 });
    }
  };

  const updateQuestionName = (event: any) => {
    setPostData({ ...postData, question: event.target.value });
  };

  const updateRecommendation = (event: any) => {
    setPostData({ ...postData, comments: event.target.value });
  };

  const updateHint = (event: any) => {
    setPostData({ ...postData, hint: event.target.value });
  };

  const updateHintUrl = (event: any) => {
    setPostData({ ...postData, hintURL: event.target.value });
  };

  const updateNumberOfAnswers = (event: any) => {
    setPostData({
      ...postData,
      numberOfAnswers: parseInt(event.target.value, 10),
    });
  };

  const updateThresholdScore = (event: any) => {
    setPostData({
      ...postData,
      thresholdScore: parseInt(event.target.value, 10),
    });
  };

  const confirmationModalYesClicked = () => {
    setNumberOfOptions(proposedNumberOfOptions);
    setOpenConfirmationModal(false);
  };

  const confirmationModalNoClicked = () => {
    setOpenConfirmationModal(false);
  };

  useEffect(() => {
    if (answerVariable.length > numberOfOptions) {
      const difference = answerVariable.length - numberOfOptions;
      const answerVariableCopy = [...answerVariable];
      answerVariableCopy.splice(answerVariable.length - difference, difference);
      setAnswerVariable(answerVariableCopy);
    }
    if (answerVariable.length < numberOfOptions) {
      const difference = numberOfOptions - answerVariable.length;
      const answerVariableCopy = [...answerVariable];
      for (let i = 0; i < difference; i = i + 1) {
        answerVariableCopy.push({ ...emptyAnswer });
      }
      setAnswerVariable(answerVariableCopy);
    }
    setWeightFactorArray(
      Array.from(Array(numberOfOptions), (val, num) => num + 1)
    );
  }, [numberOfOptions]);

  const handleNumberOfOptionsChange = (event: any) => {
    const newNumberOfOptions = event.target.value;
    if (newNumberOfOptions >= 2) {
      if (newNumberOfOptions >= answerVariable.length) {
        setNumberOfOptions(newNumberOfOptions);
      } else {
        setProposedNumberOfOptions(newNumberOfOptions);
        setOpenConfirmationModal(true);
      }
    }
  };

  const renderChooseNumberOfOptions = () => {
    return (
      <DropDown
        onChange={(event: any) => {
          handleNumberOfOptionsChange(event);
        }}
        value={numberOfOptions}
        list={numberOfOptionsArray}
        label={'Choose Total Number Of Options'}
        dropDownClass='dropdownWidth'
      />
    );
  };

  const renderAnswers = (el: IAnswer, i: number) => {
    return (
      <Fragment key={i}>
        <form className={classes.formContainer} noValidate autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <TextField
                multiline
                variant='outlined'
                type='string'
                id={i.toString()}
                name={i.toString()}
                value={el.answer}
                label={'Answer'}
                onChange={(event: any) => {
                  handleAnswerChangeValue(event, i);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <DropDown
                onChange={(event: any) => {
                  handleWeightageChangeValue(event, i);
                }}
                value={el.weightageFactor}
                list={weightageFactorArray}
                label={'Choose Weightage Factor'}
                dropDownClass='dropdownWidth'
              />
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  };

  const resetState = () => {
    setQuestionPosted(false);
    setPostData(defaultPostData);
    setAnswerVariable([emptyAnswer, emptyAnswer]);
    setNumberOfOptions(2);
    setWeightFactorArray([1, 2]);
  };

  const questionComponent = () => {
    if (questionPosted) {
      setNotify({
        isOpen: true,
        message: 'questionIsCreated',
        type: 'success',
      });     
    }
    return (
      <Fragment>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              multiline
              id='QuestionName'
              name='QuestionName'
              variant='outlined'
              label='Question'
              fullWidth
              onChange={updateQuestionName}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            {renderChooseNumberOfOptions()}
          </Grid>
          <Grid item xs={6} sm={6} />
          <Grid item xs={3} sm={3}>
            <MuiThemeProvider theme={tooltipTheme}>
              <Tooltip
                title={
                  <Typography className='tooltipTitleStyle'>
                    <Text tid='selectTheWeightageFactor' />
                  </Typography>
                }
                placement='right'
              >
                <InfoIcon className='infoIconStyle' />
              </Tooltip>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        {answerVariable.map((el: IAnswer, i: number) => renderAnswers(el, i))}
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              variant='outlined'
              id='recommendation'
              name='recommendation'
              label='Add recommendation'
              fullWidth
              onChange={updateRecommendation}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={12}>
            <TextField
              multiline
              variant='outlined'
              id='hint'
              name='hint'
              label='Add hint'
              onChange={updateHint}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              variant='outlined'
              id='hintUrl'
              name='hintUrl'
              label='Add hint-url'
              onChange={updateHintUrl}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label' required={true}>
                <Text tid='level' />
              </InputLabel>
              <Select
                name={'level'}
                value={postData.level}
                onChange={handleChangeLevelValue}
              >
                <MenuItem key={'High'} value={'High'}>
                  <Text tid='high' />
                </MenuItem>
                <MenuItem key={'Medium'} value={'Medium'}>
                  <Text tid='medium' />
                </MenuItem>
                <MenuItem key={'Low'} value={'Low'}>
                  <Text tid='low' />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            {/* <div className={classes.numberInput}> */}
            <TextField
              type='number'
              id='thresholdScore'
              name='thresholdScore'
              label='Threshold Score'
              fullWidth
              value={postData.thresholdScore}
              onChange={updateThresholdScore}
              InputProps={{ disableUnderline: true }}
            />
            {/* </div> */}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.type === 'multi-select'}
                  onChange={changeMultiSelect}
                  value='multi-select'
                />
              }
              label={
                <Typography color='textSecondary'>
                  <Text tid='multiSelect' />
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <div className={classes.numberInput}> */}
            <TextField
              required
              type='number'
              id='numberOfAnswers'
              name='numberOfAnswers'
              label='Number Of Answers'
              fullWidth
              value={postData.numberOfAnswers}
              onChange={updateNumberOfAnswers}
              disabled={postData.type === 'select'}
              InputProps={{ disableUnderline: true }}
            />
            {/* </div> */}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.NA}
                  onChange={changeNaFlag}
                  value='na'
                />
              }
              label={
                <Typography color='textSecondary'>
                  <Text tid='addNotApplicableOption' />
                </Typography>
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.reason}
                  onChange={changeReasonFlag}
                  value='reason'
                />
              }
              label={
                <Typography color='textSecondary'>
                  <Text tid='reason' />
                </Typography>
              }
            />
            <MuiThemeProvider theme={tooltipTheme}>
              <Tooltip
                title={
                  <Typography className='tooltipTitleStyle'>
                    <Text tid='reasonForThisSelection' />
                  </Typography>
                }
                placement='right'
              >
                <InfoIcon className='infoIconStyle' />
              </Tooltip>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={() => {
              props.goBack(ADMIN_HOME);
            }}
          >
            <Text tid='goBack' />
          </Button>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            variant='outlined'
          >
            <Text tid='submit' />
          </Button>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <ModalComponent
          openModal={openConfirmationModal}
          message={'deleteTheExtraNumberOfOptionsFromTheEnd'}
          handleModalNoClicked={confirmationModalNoClicked}
          handleModalYesClicked={confirmationModalYesClicked}
        />
      </Fragment>
    );
  };

  return questionComponent();
};

export default withRouter(CreateQuestion);
