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
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { ITeamAttributes, ITeamParams } from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_TEAMS } from '../../../pages/admin';
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
    ...buttonStyle,
    marginRight: '20px',
  },
  grid: {
    marginTop: theme.spacing(2),
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
  numberInput: { marginTop: '-14px' },
}));

const EditTeam = (props: any) => {
  const classes = useStyles();
  const [teamPosted, setTeamPosted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [teamDataFetched, setTeamDataFetched] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [teamState, setTeamState] = React.useState<ITeamParams | undefined>();
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='teamDetailsUpdatedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/admin/createteam/${props.teamName} `,
      state: stateVariable,
    })
      .then((response: any) => {
        fixOtherValuesMultiSelect(response);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
        setFailure(true);
      });
  }, []);

  const handleSubmit = () => {
    const postData = teamState;
    Http.put({
      url: `/api/v2/admin/createteam`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setTeamPosted(true);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
        } else if (object.code === 401) {
          props.history.push('/relogin');
        }
        setFailureMessage(<Text tid='somethingWentWrong' />);
        setFailure(true);
      });
  };

  const fixOtherValuesMultiSelect = (response: any) => {
    Object.keys(response.config).forEach((el) => {
      if (
        response.config[el].type === 'multi-list' &&
        response.values[el] &&
        response.values[el].options
      ) {
        response.values[el].options.forEach((opt: any) => {
          if (!response.config[el].options.includes(opt)) {
            const index = response.values[el].indexOf(opt);
            response.values[el][index] = 'Other:' + opt;
          }
        });
      }
    });
    setTeamState(response);
    setTeamDataFetched(true);
  };

  const getMultiListOtherTextValue = (values: any) => {
    let ret_value = '';
    if (values) {
      values.forEach((el: string) => {
        if (el.includes('Other:')) {
          ret_value = el.substring(6);
        }
      });
    }
    return ret_value;
  };

  function mandatoryFieldsCheck(): boolean {
    let countFilledElements = 0;
    let totalCount = 0;
    // tslint:disable-next-line: ter-arrow-parens
    if (!teamState) {
      return false;
    }
    Object.keys(teamState.config).map((el) => {
      if (teamState.config[el].Mandatory) {
        if (teamState && teamState.values[el]) {
          if (teamState.config[el].type === 'multi-list') {
            if (teamState.values[el].length > 0) {
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
    if (teamState) {
      const temp: ITeamParams | null | undefined = { ...teamState };
      temp.values[event.target.name] = event.target.value;
      setTeamState(temp);
    }
  };

  const handleChangeOtherValueList = (event: any) => {
    if (teamState) {
      const temp: any = { ...teamState };
      if (event.target.value === '') {
        temp.values[event.target.name] = 'Other';
      } else {
        temp.values[event.target.name] = event.target.value;
      }
      setTeamState(temp);
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
    if (teamState) {
      const temp: any = { ...teamState };
      // const updatedString = 'Other' + ':' + event.target.value;
      const updatedString = `Other: ${event.target.value}`;
      const valueArray = temp.values[event.target.name] || [];
      const indexOfOther = returnIndexOfOther(valueArray);
      valueArray[indexOfOther] = updatedString;
      temp.values[event.target.name] = valueArray;
      setTeamState(temp);
    }
  };

  const handleChangeMultiValue = (event: any) => {
    if (teamState) {
      const temp: ITeamParams | null | undefined = { ...teamState };
      let valueArray = temp.values[event.target.name] || [];
      valueArray = [...event.target.value];
      temp!.values[event.target.name] = valueArray;
      setTeamState(temp);
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
        {(selected as string[]).map((value) => {
          const val = value.includes('Other:') ? 'Other' : value;
          return <Chip key={val} label={val} className={classes.chip} />;
        })}
      </div>
    );
  };

  const removeOthersText = (values: string[]) => {
    const val = values.map((el) => {
      if (el.includes('Other:')) {
        return 'Other';
      }
      return el;
    });
    return val;
  };

  const renderElements = (el: string) => {
    const element: ITeamAttributes = teamState!.config[el];
    const values = teamState ? teamState.values : null;
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
            disabled={el === 'teamName'}
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
                      ? element.options.includes(values[el])
                        ? values[el]
                        : 'Other'
                      : ''
                    : ''
                }
                onChange={handleChangeValue}
              >
                {element.options.map((opt: string) => {
                  return (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                })}
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
                !(values && values[el] && !element.options.includes(values[el]))
              }
              label={'(specify, if Others)'}
              value={
                values && values[el] && !element.options.includes(values[el])
                  ? values[el] === 'Other'
                    ? ''
                    : values[el]
                  : ''
              }
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
                        ? removeOthersText(values[el])
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
              value={getMultiListOtherTextValue(values[el])}
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
                props.goBack(MANAGE_TEAMS);
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
        {/* <Typography variant="h6" gutterBottom>
          Edit Team
        </Typography> */}
        <Grid container spacing={3} className={classes.grid}>
          {Object.keys(teamState!.config).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {renderElements(el)}
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.bottomButtonsContainer}>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_TEAMS);
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
              <Text tid='save' />
            </Button>
          ) : (
            <Button className={classes.button} disabled variant='outlined'>
              <Text tid='save' />
            </Button>
          )}
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
        </div>
      </Fragment>
    );
  };

  const renderForm = () => {
    return renderFormData();
  };

  return (
    <Fragment>
      {teamDataFetched ? (
        renderForm()
      ) : (
        <Container className={classes.loader}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditTeam);
