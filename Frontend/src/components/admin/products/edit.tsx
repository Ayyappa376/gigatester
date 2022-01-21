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
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import {
  IFieldConfigAttributes,
  IProductParams,
  IObjectConfigDetails,
  IProductInfo,
} from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_PRODUCTS } from '../../../pages/admin';
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

const EditProduct = (props: any) => {
  const classes = useStyles();
  const [productPosted, setProductPosted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [productDataFetched, setProductDataFetched] = useState(false);
//  const [notify, setNotify] = useState({
//    isOpen: false,
//    message: '',
//    type: '',
//  });
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [productState, setProductState] = React.useState<
    IProductParams | undefined
  >();
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='productDetailsSavedSuccessfully' />;

  useEffect(() => {
    Http.get({
      url: `/api/v2/products/${props.productId}/${props.version}`,
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
    const postData = productState;
    if (postData && postData.products) {
      if (postData.products[0].id) {
        Http.put({
          url: `/api/v2/products`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
        .then((response: any) => {
          setProductPosted(true);
        })
        .catch((error: any) => {
          handleSaveError(error);
        });
      } else {
        Http.post({
          url: `/api/v2/products`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
        .then((response: any) => {
          setProductPosted(true);
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
/*
  const handleGeneralApiKeyButton = () => {
    if (productState) {
      const temp: IProductParams = { ...productState };
      let values: IProductInfo[] | undefined = temp.products;
      if (values) {
        let productId: any = values[0].products[0].id;
        Http.post({
          url: `/api/v2/productApiKey/`,
          state: stateVariable,
          body: {
            productId,
          },
        })
          .then((response: any) => {
            if (values) {
              values[0].products[0].apiKey = response.apiKey;
              values[0].products[0].apiKeyId = response.apiKeyId;
              setProductState(temp);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const deleteApiKey = () => {
    if (productState) {
      const temp: IProductParams = { ...productState };
      let values: IProductInfo[] | undefined = temp.products;

      if (values) {
        setNotify({
          isOpen: true,
          message: 'Deleting... ',
          type: 'info',
        });

        Http.deleteReq({
          url: `/api/v2/productApiKey/${values[0].products[0].apiKeyId}`,
          state: stateVariable,
        })
          .then((response: any) => {
            setFailureMessage(<Text tid='Api Key Deleted Successfully' />);
            setFailure(true);

            if (values) {
              values[0].products[0].apiKey = '';
              values[0].products[0].apiKeyId = '';
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    }
  };
*/
  const fixMultiSelectValuesAndSave = (response: any) => {
    if (response.products) {
      fixOtherValuesMultiSelect(response.productConfig, response.products[0]);
    } else {
      response.products = [{}];
    }
    setProductState(response);
    setProductDataFetched(true);
  };

  const fixOtherValuesMultiSelect = (
    config: IObjectConfigDetails,
    values: IProductInfo
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
    if (!productState) {
      return false;
    }
    Object.keys(productState.productConfig).forEach((el) => {
      if (productState.productConfig[el].mandatory) {
        if (
          !productState.products ||
          productState.products.length === 0 ||
          !productState.products[0] ||
          !productState.products[0][el]
        ) {
          check = false;
        } else if (
          productState.productConfig[el].type === 'multi-list' &&
          productState.products[0][el].length === 0
        ) {
          check = false;
        }
      }
    });

    return check;
  }

  const handleChangeValue = (event: any, key: string) => {
    if (productState) {
      const temp: IProductParams | null | undefined = { ...productState };
      let values: any = temp.products;
      if (values) {
        values[0][key] = event.target.value;
        setProductState(temp);
      }
    }
  };

  const handleChangeOtherValueList = (event: any, key: string) => {
    if (productState) {
      const temp: IProductParams | null | undefined = { ...productState };
      let values: any = temp.products;

      if (values) {
        if (event.target.value === '') {
          values[0][key] = OTHER_STRING;
        } else {
          values[0][key] = event.target.value;
        }
        setProductState(temp);
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
    if (productState) {
      const temp: IProductParams | null | undefined = { ...productState };
      let values: any = temp.products;

      if (values) {
        const updatedString = `${OTHER_STRING}: ${event.target.value}`;
        const valueArray = values[0][key] || [];
        const indexOfOther = returnIndexOfOther(valueArray);
        valueArray[indexOfOther] = updatedString;
        values[0][key] = valueArray;
        setProductState(temp);
      }
    }
  };

  const handleChangeMultiValue = (event: any, key: string) => {
    if (productState) {
      const temp: IProductParams | null | undefined = { ...productState };
      let values: any = temp.products;
      if (values) {
        let valueArray = values[0][key] || [];
        valueArray = [...event.target.value];
        values[0][key] = valueArray;
        setProductState(temp);
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
    values: IProductInfo
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
//            disabled={key==='version' && values!==undefined && values.id!==undefined && values.id.length>0}
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
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel id={`label_${key}`} required={attrConfig.mandatory}>
                {attrConfig.displayName}
              </InputLabel>
              <Select
                id={`select_${key}`}
                name={`select${key}`}
                value={values[key] ? values[key] : ''}
                onChange={(event) => handleChangeValue(event, key)}
                // input={<Input id='demo-simple-select' />}
                // renderValue={renderChips}
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
    if (productPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_PRODUCTS);
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
          {Object.keys(productState!.productConfig).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {productState!.products &&
                  renderElements(
                    el,
                    productState!.productConfig,
                    productState!.products[0]
                  )}
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container spacing={3} className={classes.grid}>
          {productState!.products &&
            renderProductsTable(productState!.products[0])}
        </Grid> */}
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.button}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_PRODUCTS);
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
      {productDataFetched ? (
        renderFormData()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditProduct);
