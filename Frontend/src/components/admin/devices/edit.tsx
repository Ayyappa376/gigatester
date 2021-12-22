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
import {
  IFieldConfigAttributes,
  IDeviceParams,
  IObjectConfigDetails,
  IDeviceInfo,
} from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_DEVICES } from '../../../pages/admin';
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
    width: '90%',
  },
  grid2: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    border: '1px solid #dadde9',
    width: '95%',
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

const EditDevice = (props: any) => {
  const classes = useStyles();
  const [devicePosted, setDevicePosted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [deviceDataFetched, setDeviceDataFetched] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [deviceState, setDeviceState] = React.useState<
    IDeviceParams | undefined
  >();
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='deviceDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/devices/${props.deviceId} `,
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
    const postData = deviceState;
    if (postData && postData.devices) {
      if (postData.devices[0].id) {
        Http.put({
          url: `/api/v2/devices`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
          .then((response: any) => {
            setDevicePosted(true);
          })
          .catch((error: any) => {
            handleSaveError(error);
          });
      } else {
        Http.post({
          url: `/api/v2/devices`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
          .then((response: any) => {
            setDevicePosted(true);
          })
          .catch((error: any) => {
            handleSaveError(error);
          });
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
  };

  const fixMultiSelectValuesAndSave = (response: any) => {
    if (response.devices) {
      fixOtherValuesMultiSelect(response.deviceConfig, response.devices[0]);
    } else {
      response.devices = [{}];
    }
    setDeviceState(response);
    setDeviceDataFetched(true);
  };

  const fixOtherValuesMultiSelect = (
    config: IObjectConfigDetails,
    values: IDeviceInfo
  ) => {
    Object.keys(config).forEach((el) => {
      if (config[el].type === 'multi-list' && values && values[el]) {
        values[el].forEach((opt: any, index: number) => {
          if (
            config[el].options &&
            ((config[el].options.custom &&
              !config[el].options.custom.includes(opt)) ||
              (config[el].options.customFixed &&
                !config[el].options.customFixed.includes(opt)))
          ) {
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
    if (!deviceState) {
      return false;
    }
    Object.keys(deviceState.deviceConfig).forEach((el) => {
      if (deviceState.deviceConfig[el].mandatory) {
        if (
          !deviceState.devices ||
          deviceState.devices.length === 0 ||
          !deviceState.devices[0] ||
          !deviceState.devices[0][el]
        ) {
          check = false;
        } else if (
          deviceState.deviceConfig[el].type === 'multi-list' &&
          deviceState.devices[0][el].length === 0
        ) {
          check = false;
        }
      }
    });

    return check;
  }

  const handleChangeValue = (event: any, key: string) => {
    if (deviceState) {
      const temp: IDeviceParams | null | undefined = { ...deviceState };
      let values: any = temp.devices;
      if (values) {
        values[0][key] = event.target.value;
        setDeviceState(temp);
      }
    }
  };

  const handleChangeOtherValueList = (event: any, key: string) => {
    if (deviceState) {
      const temp: IDeviceParams | null | undefined = { ...deviceState };
      let values: any = temp.devices;

      if (values) {
        if (event.target.value === '') {
          values[0][key] = OTHER_STRING;
        } else {
          values[0][key] = event.target.value;
        }
        setDeviceState(temp);
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
    if (deviceState) {
      const temp: IDeviceParams | null | undefined = { ...deviceState };
      let values: any = temp.devices;

      if (values) {
        const updatedString = `${OTHER_STRING}: ${event.target.value}`;
        const valueArray = values[0][key] || [];
        const indexOfOther = returnIndexOfOther(valueArray);
        valueArray[indexOfOther] = updatedString;
        values[0][key] = valueArray;
        setDeviceState(temp);
      }
    }
  };

  const handleChangeMultiValue = (event: any, key: string) => {
    if (deviceState) {
      const temp: IDeviceParams | null | undefined = { ...deviceState };
      let values: any = temp.devices;

      if (values) {
        let valueArray = values[0][key] || [];
        valueArray = [...event.target.value];
        values[0][key] = valueArray;
        setDeviceState(temp);
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
    return values.map((el) =>
      el.includes(`${OTHER_STRING}:`) ? OTHER_STRING : el
    );
  };

  const renderElements = (
    key: string,
    config: IObjectConfigDetails,
    values: IDeviceInfo
  ) => {
    const attrConfig: IFieldConfigAttributes = config[key];
    switch (attrConfig.type) {
      case 'string':
        return (
          <TextField
            required={attrConfig.mandatory}
            type='string'
            id={`${key}`}
            name={`${key}`}
            value={values ? (values[key] ? values[key] : '') : ''}
            label={attrConfig.displayName}
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
              required={attrConfig.mandatory}
              type='number'
              id={`${key}`}
              name={`${key}`}
              value={values ? (values[key] ? values[key] : '') : ''}
              label={attrConfig.displayName}
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
              <InputLabel id={`label_${key}`} required={attrConfig.mandatory}>
                {attrConfig.displayName}
              </InputLabel>
              <Select
                name={`select_${key}`}
                value={
                  values
                    ? values[key]
                      ? attrConfig.options
                        ? attrConfig.options.custom
                          ? attrConfig.options.custom
                              .split(',')
                              .includes(values[key])
                            ? values[key]
                            : OTHER_STRING
                          : attrConfig.options.customFixed
                          ? attrConfig.options.customFixed
                              .split(',')
                              .includes(values[key])
                            ? values[key]
                            : OTHER_STRING
                          : OTHER_STRING
                        : OTHER_STRING
                      : ''
                    : ''
                }
                onChange={(event) => handleChangeValue(event, key)}
              >
                {attrConfig.options && attrConfig.options.custom ? (
                  attrConfig.options.custom.split(',').map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    );
                  })
                ) : attrConfig.options && attrConfig.options.customFixed ? (
                  attrConfig.options.customFixed
                    .split(',')
                    .map((opt: string) => {
                      return (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      );
                    })
                ) : (
                  <div />
                )}
                <MenuItem key={OTHER_STRING} value={OTHER_STRING}>
                  <Text tid='other' />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required={attrConfig.mandatory}
              type='string'
              id={`text_${key}`}
              name={`text_${key}`}
              disabled={
                !values ||
                !values[key] ||
                (attrConfig.options &&
                  attrConfig.options.custom &&
                  attrConfig.options.custom.split(',').includes(values[key])) ||
                (attrConfig.options &&
                  attrConfig.options.customFixed &&
                  attrConfig.options.customFixed
                    .split(',')
                    .includes(values[key]))
              }
              label={`(specify, if ${OTHER_STRING})`}
              value={
                values &&
                values[key] &&
                !(
                  attrConfig.options &&
                  attrConfig.options.custom &&
                  attrConfig.options.custom.split(',').includes(values[key])
                ) &&
                !(
                  attrConfig.options &&
                  attrConfig.options.customFixed &&
                  attrConfig.options.customFixed
                    .split(',')
                    .includes(values[key])
                )
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
            <InputLabel id={`label_${key}`} required={attrConfig.mandatory}>
              {attrConfig.displayName}
            </InputLabel>
            <Select
              name={`select_${key}`}
              value={
                values
                  ? values[key]
                    ? attrConfig.options
                      ? attrConfig.options.custom
                        ? attrConfig.options.custom
                            .split(',')
                            .includes(values[key])
                          ? values[key]
                          : ''
                        : attrConfig.options.customFixed
                        ? attrConfig.options.customFixed
                            .split(',')
                            .includes(values[key])
                          ? values[key]
                          : ''
                        : ''
                      : ''
                    : ''
                  : ''
              }
              onChange={(event) => handleChangeValue(event, key)}
            >
              {attrConfig.options && attrConfig.options.custom ? (
                attrConfig.options.custom.split(',').map((opt: string) => {
                  return (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                })
              ) : attrConfig.options && attrConfig.options.customFixed ? (
                attrConfig.options.customFixed.split(',').map((opt: string) => {
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
              <InputLabel id={`label_${key}`} required={attrConfig.mandatory}>
                {attrConfig.displayName}
              </InputLabel>
              <Select
                id={`select_${key}`}
                name={`select${key}`}
                multiple
                value={
                  values
                    ? values[key]
                      ? values[key].length > 0
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
                {attrConfig.options ? (
                  Object.keys(attrConfig.options).map((opt: string) => {
                    return (
                      <MenuItem key={opt} value={opt}>
                        {attrConfig.options[opt]}
                      </MenuItem>
                    );
                  })
                ) : (
                  <div />
                )}
              </Select>
            </FormControl>
          </Fragment>
        );
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderFormData = () => {
    if (devicePosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_DEVICES);
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
          {Object.keys(deviceState!.deviceConfig).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {deviceState!.devices &&
                  renderElements(
                    el,
                    deviceState!.deviceConfig,
                    deviceState!.devices[0]
                  )}
              </Grid>
            );
          })}
        </Grid>
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.button}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_DEVICES);
            }}
          >
            <Text tid='goBack' />
          </Button>
          {mandatoryFieldsCheck() ? (
            <Button
              onClick={() => {
                handleSave();
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

  return (
    <Fragment>
      {deviceDataFetched ? (
        renderFormData()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditDevice);
