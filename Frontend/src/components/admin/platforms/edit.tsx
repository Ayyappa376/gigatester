import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  makeStyles,
  MuiThemeProvider,
  TextField,
  Typography,
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
  Tooltip,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import { IFieldConfigAttributes, IPlatformParams, IObjectConfigDetails, IPlatformInfo } from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_PLATFORMS } from '../../../pages/admin';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';

const OTHER_STRING = 'Other';

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
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  grid: {
    marginTop: theme.spacing(2),
    width: '90%'
  },
  grid2: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    border: '1px solid #dadde9',
    width: '95%'
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
}));

const EditPlatform = (props: any) => {
  const classes = useStyles();
  const [platformPosted, setPlatformPosted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [platformDataFetched, setPlatformDataFetched] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [platformState, setPlatformState] = React.useState<IPlatformParams | undefined>();
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='platformDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/platforms/${props.platformId} `,
      state: stateVariable,
    })
    .then((response: any) => {
      fixMultiSelectValuesAndSave(response);
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

  const handleSave = () => {
    const postData = platformState;
    if(postData && postData.platforms) {
      if(postData.platforms[0].id) {
        Http.put({
          url: `/api/v2/platforms`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
        .then((response: any) => { setPlatformPosted(true); })
        .catch((error: any) => { handleSaveError(error); });
      } else {
        Http.post({
          url: `/api/v2/platforms`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
        .then((response: any) => { setPlatformPosted(true); })
        .catch((error: any) => { handleSaveError(error); });
      }
    }
  };

  const handleSaveError = (error: any) => {
    const perror = JSON.stringify(error);
    const object = JSON.parse(perror);
    if (object.code === 400) {
      setFailureMessage(object.apiError.msg);
    } else if (object.code === 401) {
      props.history.push('/relogin');
    } else {
      setFailureMessage(<Text tid='somethingWentWrong' />);
      setFailure(true);
    }
}

  const fixMultiSelectValuesAndSave = (response: any) => {
    if (response.platforms) {
      fixOtherValuesMultiSelect(response.platformConfig, response.platforms[0]);
    } else {
      response.platforms = [{}];
    }
    setPlatformState(response);
    setPlatformDataFetched(true);
  };

  const fixOtherValuesMultiSelect = (config: IObjectConfigDetails, values: IPlatformInfo) => {
    Object.keys(config).forEach((el) => {
      if (config[el].type === 'multi-list' && values && values[el]) {
        values[el].forEach((opt: any, index: number) => {
          if (config[el].options &&
            ((config[el].options.custom && !config[el].options.custom.includes(opt)) ||
              (config[el].options.customFixed && !config[el].options.customFixed.includes(opt)))) {
            values![el][index] = `${OTHER_STRING}:${opt}`;
          }
        });
      }
    });
  };

  const getMultiListOtherTextValue = (values: any) => {
    let ret_value = '';
    if (values) {
      values.forEach((el: string) => {
        if (el.includes(`${OTHER_STRING}:`)) {
          ret_value = el.substring(6);
        }
      });
    }
    return ret_value;
  };

  function mandatoryFieldsCheck(): boolean {
    let check: boolean = true;
    // tslint:disable-next-line: ter-arrow-parens
    if (!platformState) {
      return false;
    }
    Object.keys(platformState.platformConfig).forEach((el) => {
      if (platformState.platformConfig[el].mandatory) {
        if (!platformState.platforms || platformState.platforms.length === 0 ||
            !platformState.platforms[0] || !platformState.platforms[0][el]) {
          check = false;
        } else if ((platformState.platformConfig[el].type === 'multi-list') &&
          (platformState.platforms[0][el].length === 0)) {
          check = false;
        }
      }
    });

    return check;
  }

  const handleChangeValue = (event: any, key: string) => {
    if (platformState) {
      const temp: IPlatformParams | null | undefined = { ...platformState };
      let values: any = temp.platforms;

      if (values) {
        values[0][key] = event.target.value;
        setPlatformState(temp);
      }
    }
  };

  const handleChangeOtherValueList = (event: any, key: string) => {
    if (platformState) {
      const temp: IPlatformParams | null | undefined = { ...platformState };
      let values: any = temp.platforms;

      if (values) {
        if (event.target.value === '') {
          values[0][key] = OTHER_STRING;
        } else {
          values[0][key] = event.target.value;
        }
        setPlatformState(temp);
      }
    }
  };

  const returnIndexOfOther = (array: string[]) => {
    let index = -1;
    array.forEach((el, i) => {
      if (el.includes(OTHER_STRING)) {
        index = i;
      }
    });
    return index;
  };

  const handleChangeOtherMultilist = (event: any, key: string) => {
    if (platformState) {
      const temp: IPlatformParams | null | undefined = { ...platformState };
      let values: any = temp.platforms;

      if (values) {
        const updatedString = `${OTHER_STRING}: ${event.target.value}`;
        const valueArray = values[0][key] || [];
        const indexOfOther = returnIndexOfOther(valueArray);
        valueArray[indexOfOther] = updatedString;
        values[0][key] = valueArray;
        setPlatformState(temp);
      }
    }
  };

  const handleChangeMultiValue = (event: any, key: string) => {
    if (platformState) {
      const temp: IPlatformParams | null | undefined = { ...platformState };
      let values: any = temp.platforms;

      if (values) {
        let valueArray = values[0][key] || [];
        valueArray = [...event.target.value];
        values[0][key] = valueArray;
        setPlatformState(temp);
      }
    }
  };

  const includesOther = (array: string[]) => {
    let otherExist = false;
    array.forEach((el) => {
      if (el.includes(OTHER_STRING)) {
        otherExist = true;
      }
    });
    return otherExist;
  };

  const renderChips = (selected: any) => {
    return (
      <div className={classes.chips}>
        {(selected as string[]).map((value) => {
          const val = value.includes(`${OTHER_STRING}:`) ? OTHER_STRING : value;
          return <Chip key={val} label={val} className={classes.chip} />;
        })}
      </div>
    );
  };

  const removeOthersText = (values: string[]) => {
    const val = values.forEach((el) => {
      if (el.includes(`${OTHER_STRING}:`)) {
        return OTHER_STRING;
      }
      return el;
    });
    return val;
  };

  const renderElements = (key: string, config: IObjectConfigDetails, values: IPlatformInfo) => {
    const element: IFieldConfigAttributes = config[key];
    switch (element.type) {
      case 'string':
        return (
          <TextField
            required={element.mandatory}
            type='string'
            id={`${key}`}
            name={`${key}`}
            value={values ? (values[key] ? values[key] : '') : ''}
            label={element.displayName}
            onChange={(event) => handleChangeValue(event, key)}
            fullWidth
            autoComplete='off'
            className='textFieldStyle'
          />
        );
      case 'number':
        return (
          <div className='numberInput'>
            <TextField
              required={element.mandatory}
              type='number'
              id={`${key}`}
              name={`${key}`}
              value={values ? (values[key] ? values[key] : '') : ''}
              label={element.displayName}
              onChange={(event) => handleChangeValue(event, key)}
              fullWidth
              autoComplete='off'
              InputProps={{ disableUnderline: true }}
              className='textFieldStyle'
            />
          </div>
        );
      case 'list':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id={`label_${key}`}
                required={element.mandatory}
              >
                {element.displayName}
              </InputLabel>
              <Select
                name={`select_${key}`}
                value={
                  values
                    ? values[key]
                      ? element.options
                        ? element.options.custom
                          ? element.options.custom.split(',').includes(values[key])
                            ? values[key]
                            : OTHER_STRING
                          : element.options.customFixed
                            ? element.options.customFixed.split(',').includes(values[key])
                              ? values[key]
                              : OTHER_STRING
                            : OTHER_STRING
                        : OTHER_STRING
                      : ''
                    : ''
                }
                onChange={(event) => handleChangeValue(event, key)}
              >
                {element.options && element.options.custom ? (
                  element.options.custom.split(',').map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    );
                  })
                ) : (
                  element.options && element.options.customFixed ? (
                    element.options.customFixed.split(',').map((opt: string) => {
                      return (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <div />
                  )
                )}
                <MenuItem key={OTHER_STRING} value={OTHER_STRING}>
                  <Text tid='other' />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required={element.mandatory}
              type='string'
              id={`text_${key}`}
              name={`text_${key}`}
              disabled={
                !values || !values[key] ||
                (element.options && element.options.custom && element.options.custom.split(',').includes(values[key])) ||
                (element.options && element.options.customFixed && element.options.customFixed.split(',').includes(values[key]))
              }
              label={`(specify, if ${OTHER_STRING})`}
              value={
                values &&
                values[key] &&
                !(element.options && element.options.custom && element.options.custom.split(',').includes(values[key])) &&
                !(element.options && element.options.customFixed && element.options.customFixed.split(',').includes(values[key]))
                ? values[key] === OTHER_STRING
                  ? ''
                  : values[key]
                : ''
              }
              onChange={(event) => handleChangeOtherValueList(event, key)}
              autoComplete='off'
              className='textFieldStyle'
            />
          </Fragment>
        );
      case 'list-no-others':
        return (
          <FormControl className={classes.formControl}>
            <InputLabel
              id={`label_${key}`}
              required={element.mandatory}
            >
              {element.displayName}
            </InputLabel>
            <Select
              name={`select_${key}`}
              value={
                values
                  ? values[key]
                    ? element.options
                      ? element.options.custom
                        ? element.options.custom.split(',').includes(values[key])
                          ? values[key]
                          : ''
                        : element.options.customFixed
                          ? element.options.customFixed.split(',').includes(values[key])
                            ? values[key]
                            : ''
                          : ''
                      : ''
                    : ''
                  : ''
              }
              onChange={(event) => handleChangeValue(event, key)}
            >
              {element.options && element.options.custom ? (
                element.options.custom.split(',').map((opt: string) => {
                  return (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                })
              ) : (
                element.options && element.options.customFixed ? (
                  element.options.customFixed.split(',').map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    );
                  })
                ) : (
                  <div />
                )
              )}
            </Select>
          </FormControl>
        );
      case 'multi-list':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id={`label_${key}`}
                required={element.mandatory}
              >
                {element.displayName}
              </InputLabel>
              <Select
                id={`select_${key}`}
                name={`select${key}`}
                multiple
                value={
                  values
                    ? values[key]
                      ? values[key] !== ''
                        ? removeOthersText(values[key])
                        : []
                      : []
                    : []
                }
                onChange={(event) => handleChangeMultiValue(event, key)}
                input={<Input id='select-multiple-chip' />}
                renderValue={renderChips}
                MenuProps={MenuProps}
              >
                {element.options && element.options.custom ? (
                  element.options.custom.split(',').map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    );
                  })
                ) : (
                  element.options && element.options.customFixed ? (
                    element.options.customFixed.split(',').map((opt: string) => {
                      return (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <div />
                  )
                )}
                <MenuItem key={OTHER_STRING} value={OTHER_STRING}>
                  <Text tid='other' />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required={element.mandatory}
              type='string'
              id={`text_${key}`}
              name={`text_${key}`}
              disabled={!(values && values[key] && includesOther(values[key]))}
              value={
                values
                  ? values[key]
                    ? getMultiListOtherTextValue(values[key])
                    : ''
                  : ''
              }
              label={'(specify, if ${OTHER_STRING})'}
              onChange={(event) => handleChangeOtherMultilist(event, key)}
              autoComplete='off'
              className='textFieldStyle'
            />
          </Fragment>
        );
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderFormData = () => {
    if (platformPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_PLATFORMS);
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
        <Grid container spacing={3} className={classes.grid}>
          {Object.keys(platformState!.platformConfig).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {platformState!.platforms && renderElements(el, platformState!.platformConfig, platformState!.platforms[0])}
              </Grid>
            );
          })}
        </Grid>
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.button}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_PLATFORMS);
            }}
          >
            <Text tid='goBack' />
          </Button>
          {mandatoryFieldsCheck() ? (
            <Button
              onClick={() => {
                handleSave()
              }}
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

  // const renderForm = () => {
  //   return renderFormData();
  // };

  return (
    <Fragment>
      {platformDataFetched ? (
        renderFormData()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditPlatform);
