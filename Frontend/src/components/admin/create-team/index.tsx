import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  FormControl,
  Container,
  MenuItem,
  Select,
  InputLabel,
  Input,
  Chip,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { fetchTeamParameters } from '../../../actions/admin/create-team-action';
import { useActions } from '../../../actions';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { ITeamAttributes, ITeamParams } from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { ADMIN_HOME } from '../../../pages/admin';
import { buttonStyle } from '../../../common/common';
import { Text } from '../../../common/Language';

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

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '28px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
  },
  backButton: {
    marginTop: '28px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  textField: {
    borderBottom: 'none!important',
    boxShadow: 'none!important',
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  bottomButtonsContainer: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallGrid: {
    marginTop: '6px',
  },
  numberInput: { marginTop: '-14px' },
}));

const CreateTeam = (props: any) => {
  const classes = useStyles();
  const [teamPosted, setTeamPosted] = useState(false);
  const getTeamParams = useActions(fetchTeamParameters);
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [
    createTeamParams,
    setCreateTeamParams,
  ] = React.useState<ITeamParams | null>(null);
  const [teamParamState, setTeamParamState] = React.useState<any>({});
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='teamIsCreated' />;

  useEffect(() => {
    getTeamParams();
  }, []);

  useEffect(() => {
    Http.get({
      url: '/api/v2/admin/createteam',
      state: stateVariable,
    })
      .then((response: any) => {
        setCreateTeamParams(response);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        }
      });
  }, []);

  const handleSubmit = () => {
    const postData = createTeamParams;
    if (postData) {
      postData['values'] = teamParamState;
      postData['orgId'] = createTeamParams ? createTeamParams['orgId'] : '';
    }
    Http.post({
      url: `/api/v2/admin/createteam`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setTeamPosted(true);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
          setFailure(true);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          setFailureMessage(<Text tid='somethingWentWrong' />);
          setFailure(true);
        }
      });
  };

  function mandatoryFieldsCheck(): boolean {
    let countFilledElements = 0;
    let totalCount = 0;
    // tslint:disable-next-line: ter-arrow-parens
    Object.keys(createTeamParams!.config).map((el) => {
      if (createTeamParams!.config[el].Mandatory) {
        if (teamParamState && teamParamState[el]) {
          if (createTeamParams!.config[el].type === 'multi-list') {
            if (teamParamState[el].length > 0) {
              countFilledElements = countFilledElements + 1;
            }
          } else {
            countFilledElements = countFilledElements + 1;
          }
        }
        totalCount = totalCount + 1;
      }
    });
    if (totalCount === countFilledElements) {
      return true;
    }
    return false;
  }

  const handleChangeValue = (event: any) => {
    if (teamParamState) {
      const temp: any = { ...teamParamState };
      temp[event.target.name] = event.target.value;
      setTeamParamState(temp);
    }
  };

  const handleChangeOtherValueList = (event: any) => {
    if (teamParamState) {
      const temp: any = { ...teamParamState };
      if (event.target.value === '') {
        temp[event.target.name] = 'Other';
      } else {
        temp[event.target.name] = event.target.value;
      }
      setTeamParamState(temp);
    }
  };

  const returnIndexOfOther = (array: string[]) => {
    let index = -1;
    array.forEach((el, i) => {
      if (el.includes('Other')) {
        index = i;
      }
    });
    return index;
  };

  const handleChangeOtherMultilist = (event: any) => {
    if (teamParamState) {
      const temp: any = { ...teamParamState };
      // const updatedString = 'Other' + ':' + event.target.value;
      const updatedString = `Other: ${event.target.value}`;
      const valueArray = temp[event.target.name] || [];
      const indexOfOther = returnIndexOfOther(valueArray);
      valueArray[indexOfOther] = updatedString;
      temp[event.target.name] = valueArray;
      setTeamParamState(temp);
    }
  };

  const handleChangeMultiValue = (event: any) => {
    if (teamParamState) {
      const temp: any = { ...teamParamState };
      let valueArray = temp[event.target.name] || [];
      valueArray = [...event.target.value];
      temp[event.target.name] = valueArray;
      setTeamParamState(temp);
    }
  };

  const includesOther = (array: string[]) => {
    let otherExist = false;
    array.forEach((el) => {
      if (el.includes('Other')) {
        otherExist = true;
      }
    });
    return otherExist;
  };

  const renderChips = (selected: any) => {
    return (
      <div className={classes.chips}>
        {(selected as string[]).map((value) => (
          <Chip key={value} label={value} className={classes.chip} />
        ))}
      </div>
    );
  };

  const renderElements = (el: string) => {
    const element: ITeamAttributes = createTeamParams!.config[el];
    const values = teamParamState ? teamParamState : null;
    switch (element.type) {
      case 'string':
        return (
          <TextField
            required={element.Mandatory}
            type='string'
            id={el}
            name={el}
            value={values ? (values[el] ? values[el] : '') : ''}
            label={element.displayName}
            onChange={handleChangeValue}
            fullWidth
            autoComplete='off'
            className={classes.textField}
          />
        );
      case 'number':
        return (
          <div className={classes.numberInput}>
            <TextField
              required={element.Mandatory}
              type='number'
              id={el}
              name={el}
              value={values ? (values[el] ? values[el] : '') : ''}
              label={element.displayName}
              onChange={handleChangeValue}
              fullWidth
              autoComplete='off'
              InputProps={{ disableUnderline: true }}
              className={classes.textField}
            />
          </div>
        );

      case 'list':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id='demo-simple-select-label'
                required={element.Mandatory}
              >
                {element.displayName}
              </InputLabel>
              <Select
                name={el}
                value={
                  values
                    ? values[el]
                      ? element.options
                        ? element.options.includes(values[el])
                          ? values[el]
                          : 'Other'
                        : 'Other'
                      : ''
                    : ''
                }
                onChange={handleChangeValue}
              >
                {element.options ? (
                  element.options.map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    );
                  })
                ) : (
                  <div />
                )}
                <MenuItem key={'Other'} value={'Other'}>
                  <Text tid='other' />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required={element.Mandatory}
              type='string'
              id={el}
              name={el}
              disabled={
                !(
                  values &&
                  values[el] &&
                  element.options &&
                  !element.options.includes(values[el])
                )
              }
              label={'(specify, if Others)'}
              onChange={handleChangeOtherValueList}
              autoComplete='off'
              className={classes.textField}
            />
          </Fragment>
        );
      case 'list-no-others':
        return (
          <FormControl className={classes.formControl}>
            <InputLabel
              id='demo-simple-select-label'
              required={element.Mandatory}
            >
              {element.displayName}
            </InputLabel>
            <Select
              name={el}
              value={
                values
                  ? values[el]
                    ? element.options
                      ? element.options.includes(values[el])
                        ? values[el]
                        : ''
                      : ''
                    : ''
                  : ''
              }
              onChange={handleChangeValue}
            >
              {element.options ? (
                element.options.map((opt: string) => {
                  return (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                })
              ) : (
                <div />
              )}
            </Select>
          </FormControl>
        );
      case 'multi-list':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id='demo-mutiple-chip-label'
                required={element.Mandatory}
              >
                {element.displayName}
              </InputLabel>
              <Select
                id='demo-mutiple-chip'
                name={el}
                multiple
                value={
                  values
                    ? values[el]
                      ? values[el] !== ''
                        ? values[el]
                        : []
                      : []
                    : []
                }
                onChange={handleChangeMultiValue}
                input={<Input id='select-multiple-chip' />}
                renderValue={renderChips}
                MenuProps={MenuProps}
              >
                {element.options.map((opt: any) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
                <MenuItem key={'Other'} value={'Other'}>
                  <Text tid='other' />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required={element.Mandatory}
              type='string'
              id={el}
              name={el}
              disabled={!(values && values[el] && includesOther(values[el]))}
              label={'(specify, if Others)'}
              onChange={handleChangeOtherMultilist}
              autoComplete='off'
              className={classes.textField}
            />
          </Fragment>
        );
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderFormData = () => {
    if (teamPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className={classes.bottomButtonsContainer}>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={() => {
                setTeamPosted(false);
                setTeamParamState({});
              }}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Grid container>
          {Object.keys(createTeamParams!.config).map((el) => {
            return (
              <Grid key={el} container className={classes.smallGrid}>
                <Grid key={el} item xs={5}>
                  {renderElements(el)}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.bottomButtonsContainer}>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={() => {
              props.goBack(ADMIN_HOME);
            }}
          >
            <Text tid='goBack' />
          </Button>
          {mandatoryFieldsCheck() ? (
            <Button
              onClick={handleSubmit}
              className={classes.button}
              variant='outlined'
            >
              <Text tid='submit' />
            </Button>
          ) : (
            <Button className={classes.button} disabled variant='outlined'>
              <Text tid='submit' />
            </Button>
          )}
        </div>
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
      </Fragment>
    );
  };

  const renderForm = () => {
    return renderFormData();
  };

  return (
    <Fragment>
      {createTeamParams !== null ? (
        renderForm()
      ) : (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(CreateTeam);
