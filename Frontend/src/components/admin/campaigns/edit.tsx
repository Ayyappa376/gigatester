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
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  Link,
  CssBaseline,
  DialogTitle,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import Loader from '../../loader';
import {
  IFieldConfigAttributes,
  ICampaignParams,
  IObjectConfigDetails,
  ICampaignInfo,
  IProductInfo,
  IPlatformInfo,
  IDeviceInfo,
  STATUS_CAMPAIGN_DRAFT,
  STATUS_PRODUCT_ACTIVE,
} from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_CAMPAIGNS } from '../../../pages/admin';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import Notification from '../../../common/notification';
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
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
}));

const EditCampaign = (props: any) => {
  const classes = useStyles();
  const [campaignPosted, setCampaignPosted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [campaignDataFetched, setCampaignDataFetched] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [allPlatforms, setAllPlatforms] = useState<IPlatformInfo[]>([]);
  const [allDevices, setAllDevices] = useState<IDeviceInfo[]>([]);
  const [allTestSuites, setAllTestSuites] = useState<
    any[] /*IQuestionnaire[]*/
  >([]);
  const [campaignState, setCampaignState] = React.useState<
    ICampaignParams | undefined
  >();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userParamState, setUserParamState] = React.useState<any>('');
  const [softwareIndex, setSoftwareIndex] = useState(-1);
  const [softwareOption, setSoftwareOption] = useState(false);
  const [fileContentType, setFileContentType] = useState('');
  const [fileSelected, setFileSelected] = useState('');
  const [fileName, setFileName] = useState('');
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='campaignDetailsSavedSuccessfully' />;

  useEffect(() => {
    fetchAllPlatforms();
    fetchAllDevices();
    fetchAllTestSuites();
    fetchCampaignDetails();
  }, []);

  const fetchAllPlatforms = () => {
    Http.get({
      url: `/api/v2/platforms`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.platforms.sort((a: IPlatformInfo, b: IPlatformInfo) => {
          return a.name.localeCompare(b.name);
        });
        setAllPlatforms(response.platforms);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

  const fetchAllDevices = () => {
    Http.get({
      url: `/api/v2/devices`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.devices.sort((a: IDeviceInfo, b: IDeviceInfo) => {
          return a.name.localeCompare(b.name);
        });
        setAllDevices(response.devices);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };
  const fetchAllTestSuites = () => {
    Http.get({
      url: `/api/v2/testSuite`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.sort(
          (a: any /*IQuestionnaire*/, b: any /*IQuestionnaire*/) => {
            return a.name.localeCompare(b.name);
          }
        );
        setAllTestSuites(response);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
      });
  };

  const fetchCampaignDetails = () => {
    Http.get({
      url: `/api/v2/campaigns/${props.campaignId} `,
      state: stateVariable,
    })
      .then((response: any) => {
        console.log(response);
        fixMultiSelectValuesAndSave(response);
        console.log(response);
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
  };

  const getUploadPreSignedUrl = (event: any) => {
    event.preventDefault();
    console.log(event.target.files[0], 'file');
    setFileSelected(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileContentType(event.target.files[0].type);
  };
  const uploadPreSignedUrlSoftware = () => {
    setNotify({
      isOpen: true,
      message: 'Uploading...',
      type: 'info',
    });
    Http.post({
      url: `/api/v2/software/medium`,
      state: stateVariable,
      body: {
        fileName: fileName,
        fileType: fileContentType,
      },
    })
      .then((response: any) => {
        console.log(response, 'reponse');
        console.log(response.filePath, 'preSigned Url');
        console.log(fileSelected, 'file');
        fetch(response.filePath, {
          method: 'PUT',
          body: fileSelected,
        })
          .then((response) => {
            console.log(response);
            setNotify({
              isOpen: true,
              message: `The ${fileName} has been uploaded successfully.`,
              type: 'info',
            });
            setFileName('');
            handleChangeProductSoftware();
            // response.json();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const postData = campaignState;
    if (postData && postData.campaigns) {
      if (postData.campaigns[0].id) {
        Http.put({
          url: `/api/v2/campaigns`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
          .then((response: any) => {
            setCampaignPosted(true);
          })
          .catch((error: any) => {
            handleSaveError(error);
          });
      } else {
        Http.post({
          url: `/api/v2/campaigns`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
          .then((response: any) => {
            setCampaignPosted(true);
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

  const fixMultiSelectValuesAndSave = (response: ICampaignParams) => {
    if (response.campaigns) {
      fixOtherValuesMultiSelect(response.campaignConfig, response.campaigns[0]);
    } else {
      response.campaigns = [];
      response.campaigns.push({
        name: '',
        products: [],
        status: STATUS_CAMPAIGN_DRAFT,
        managers: [],
        startDate: 0,
        id: '',
      });
    }
    setCampaignState(response);
    setCampaignDataFetched(true);
  };

  const fixOtherValuesMultiSelect = (
    config: IObjectConfigDetails,
    values: ICampaignInfo
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
    if (!campaignState) {
      return false;
    }
    Object.keys(campaignState.campaignConfig).forEach((el) => {
      if (campaignState.campaignConfig[el].mandatory) {
        if (
          !campaignState.campaigns ||
          campaignState.campaigns.length === 0 ||
          !campaignState.campaigns[0] ||
          !campaignState.campaigns[0][el]
        ) {
          check = false;
        } else if (
          campaignState.campaignConfig[el].type === 'multi-list' &&
          campaignState.campaigns[0][el].length === 0
        ) {
          check = false;
        }
      }
    });

    return check;
  }

  const handleChangeValue = (event: any, key: string) => {
    if (campaignState) {
      const temp: ICampaignParams | null | undefined = { ...campaignState };
      let values: any = temp.campaigns;

      if (values) {
        values[0][key] = event.target.value;
        setCampaignState(temp);
      }
    }
  };

  const handleChangeOtherValueList = (event: any, key: string) => {
    if (campaignState) {
      const temp: ICampaignParams | null | undefined = { ...campaignState };
      let values: any = temp.campaigns;

      if (values) {
        if (event.target.value === '') {
          values[0][key] = OTHER_STRING;
        } else {
          values[0][key] = event.target.value;
        }
        setCampaignState(temp);
      }
    }
  };
/*
  const handleGeneralApiKeyButton = (index: any) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;
      if (values) {
        let productId: any = values[0].products[index].id;
        Http.post({
          url: `/api/v2/productApiKey/`,
          state: stateVariable,
          body: {
            productId,
          },
        })
          .then((response: any) => {
            console.log('app key', response);
            if (values) {
              values[0].products[index].apiKey = response.data.value;
              values[0].products[index].apiKeyId = response.data.id;
              console.log(values, 'values');
              setCampaignState(temp);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const uploadSoftware = (event: any) => {
    event.preventDefault();
    let uploadedFile = event.target.files[0];
    let formUpload = new FormData();
    formUpload.append('file', uploadedFile);
    formUpload.append('fileName', uploadedFile.name);
    setNotify({
      isOpen: true,
      message: 'Uploading...',
      type: 'info',
    });
    uploadedFile &&
      Http.upload({
        url: `/api/v2/software`,
        body: formUpload,
        state: stateVariable,
      })
        .then((response: any) => {
          console.log(formUpload);
          // getUploadedSoftwares();

          setNotify({
            isOpen: true,
            message: `The ${uploadedFile.name} file has been uploaded successfully.`,
            type: 'info',
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };
*/
  const closeDialog = () => {
    setDialogOpen(false);
    setSoftwareOption(false);
    // props.handleCloseSignup(false);
    // props.getSignInState(false);
  };

  const handleChangedValue = (event: any) => {
    if (event.target.value) {
      setUserParamState(event.target.value);

      setSoftwareOption(true);
    } else {
      setSoftwareOption(false);
    }

    // handleChangeProductSoftware(event, softwareIndex);
    // console.log(userParamState);
  };
/*
  const deleteApiKey = (index: number) => {
    console.log(campaignState);
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        setNotify({
          isOpen: true,
          message: 'Deleting... ',
          type: 'info',
        });

        Http.deleteReq({
          url: `/api/v2/productApiKey/${values[0].products[index].apiKeyId}`,
          state: stateVariable,
        })
          .then((response: any) => {
            console.log(response);
            setFailureMessage(<Text tid='Api Key Deleted Successfully' />);
            setFailure(true);

            if (values) {
              values[0].products[index].apiKey = '';
              values[0].products[index].apiKeyId = '';
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    }
  };

  const deleteSoftware = (index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        if (values[0].products[index].softwareType === 'url') {
          values[0].products[index].software = '';
          setCampaignState(temp);
        } else {
          setNotify({
            isOpen: true,
            message: 'Deleting... ',
            type: 'info',
          });

          Http.deleteReq({
            url: `/api/v2/software/delete/${values[0].products[index].software}`,
            state: stateVariable,
          })
            .then((response: any) => {
              console.log(response);
              setFailureMessage(<Text tid='File Deleted Successfully' />);
              setFailure(true);
              // setNotify({
              //   isOpen: true,
              //   message: "File Deleted Successfully",
              //   type: "info",
              // });

              if (values) {
                values[0].products[index].software = '';
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      }
    }
  };
*/
  const uploadForm = () => {
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              id='uploadFile'
              name='uploadFile'
              label='External File URL'
              fullWidth
              onChange={(event) => handleChangedValue(event)}
            />
          </Grid>
          <Grid item xs={12} sm={12} />
          <br />
          <Grid item xs={6} sm={6} />
          <Typography style={{ fontSize: '16px' }}> OR</Typography>
          <Grid item xs={12} sm={12} />
          <br />
          <Grid item xs={3} sm={3} />
          <input
            style={{ display: 'none' }}
            id='upload-software-file'
            multiple
            type='file'
            onChange={(e) => getUploadPreSignedUrl(e)}
          />
          <Link style={{ fontSize: '14px' }}>
            <label
              htmlFor='upload-software-file'
              style={{ fontSize: '14px', color: '#0645AD' }}
            >
              {fileName ? fileName : 'Click here to upload local software'}
            </label>
          </Link>
          <Grid item xs={4} sm={4} />
          <Grid item xs={4} sm={4} />
          <Button
            component='span'
            variant='outlined'
            disabled={softwareOption}
            className={classes.button}
            onClick={uploadPreSignedUrlSoftware}
          >
            Upload
          </Button>
          <Grid item xs={12} sm={12} />
          <br />
          <br />
          <Grid item xs={12} sm={12} />
          <Grid item xs={3} sm={3} />
          <Button
            component='span'
            variant='outlined'
            onClick={handleChangeProductSoftware}
            disabled={!softwareOption}
          >
            ok
          </Button>
          <Grid item xs={2} sm={2} />
          <Button
            component='span'
            variant='outlined'
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Grid item xs={4} sm={4} />
        </Grid>
      </React.Fragment>
    );
  };

  const handleUploadButton = (index: any) => {
    setDialogOpen(true);
    setSoftwareIndex(index);
  };
  const handleDialogUpload = () => {
    return (
      <React.Fragment>
        <Dialog
          className={classes.dialogPaper}
          open={dialogOpen}
          aria-labelledby='form-dialog-title'
          onClose={closeDialog}
          fullWidth={true}
        >
          <DialogTitle
            id='form-dialog-title'
            style={{ textAlign: 'center', padding: '30px 0px' }}
          >
            <Typography style={{ fontSize: '14px' }}>
              <Text tid={'Upload Software'} />
            </Typography>
          </DialogTitle>
          <DialogContent style={{ marginBottom: '20px' }}>
            <CssBaseline />
            {uploadForm()}
            {/* {verifyEmail ? signUpAcknowledgement() : signUpForm()} */}
          </DialogContent>
        </Dialog>
        <Notification notify={notify} setNotify={setNotify} />
      </React.Fragment>
    );
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
    if (campaignState) {
      const temp: ICampaignParams | null | undefined = { ...campaignState };
      let values: any = temp.campaigns;

      if (values) {
        const updatedString = `${OTHER_STRING}: ${event.target.value}`;
        const valueArray = values[0][key] || [];
        const indexOfOther = returnIndexOfOther(valueArray);
        valueArray[indexOfOther] = updatedString;
        values[0][key] = valueArray;
        setCampaignState(temp);
      }
    }
  };

  const handleChangeMultiValue = (event: any, key: string) => {
    if (campaignState) {
      const temp: ICampaignParams | null | undefined = { ...campaignState };
      let values: any = temp.campaigns;

      if (values) {
        let valueArray = values[0][key] || [];
        valueArray = [...event.target.value];
        values[0][key] = valueArray;
        setCampaignState(temp);
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

  const addProduct = () => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        if (!values[0].products) {
          values[0].products = [];
        }
        values[0].products.push({
          id: '',
          version: '',
          name: '',
          platforms: [],
          status: STATUS_PRODUCT_ACTIVE,
        });
        setCampaignState(temp);
      }
    }
  };

  const deleteProduct = (index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        values[0].products.splice(index, 1);
        setCampaignState(temp);
      }
    }
  };

  const handleChangeProductName = (event: any, index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        values[0].products[index].name = event.target.value;
        setCampaignState(temp);
      }
    }
  };

  const handleChangeProductPlatforms = (event: any, index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;
      console.log(index, 'index');
      if (values) {
        // let valueArray = values[0].products[index].platforms || [];
        // valueArray = [...event.target.value];
        values[0].products[index].platforms = event.target.value;
        setCampaignState(temp);
      }
    }
  };

  const handleChangeProductSoftware = () => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        console.log(softwareIndex, 'softwareIndex');
        console.log(userParamState, 'userParamState');
        if (userParamState) {
          values[0].products[softwareIndex].software = userParamState;
          values[0].products[softwareIndex].softwareType = 'url';
          setCampaignState(temp);
          closeDialog();
        } else if (fileName) {
          values[0].products[softwareIndex].software = fileName;
          values[0].products[softwareIndex].softwareType = fileContentType;
          setCampaignState(temp);
          setTimeout(() => {
            setUserParamState('');
            closeDialog();
          }, 2000);
        }
      }
    }
    setTimeout(() => {
      setUserParamState('');
      closeDialog();
    }, 2000);
  };

  const handleChangeProductDevices = (event: any, index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        let valueArray = values[0].products[index].devices || [];
        valueArray = [...event.target.value];
        values[0].products[index].devices = valueArray;
        setCampaignState(temp);
      }
    }
  };

  const handleChangeProductTestSuite = (event: any, index: number) => {
    if (campaignState) {
      const temp: ICampaignParams = { ...campaignState };
      let values: ICampaignInfo[] | undefined = temp.campaigns;

      if (values) {
        let valueArray = values[0].products[index].testSuite || [];
        valueArray = [...event.target.value];
        values[0].products[index].testSuite = valueArray;
        setCampaignState(temp);
      }
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const renderElements = (
    key: string,
    config: IObjectConfigDetails,
    values: ICampaignInfo
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

  const renderProductsTable = (campaign: ICampaignInfo) => {
    return (
      <Fragment>
        <Container component='div'>
          <div style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item sm={5}>
                <Button
                  className={classes.button}
                  variant='outlined'
                  onClick={() => {
                    addProduct();
                  }}
                >
                  <AddIcon fontSize='large' /> <Text tid='addProduct' />
                </Button>
              </Grid>
              <Grid item sm={5}>
                {/*<SearchControl
                  searchString={searchString}
                  handleSearch={handleSearch}
                />*/}
              </Grid>
              <Grid item sm={2}>
                {/*<PageSizeDropDown
                  handleChange={handleChangeItemsPerPage}
                  itemCount={itemsPerPage}
                />*/}
              </Grid>
            </Grid>
          </div>
          <Paper className='tableArea'>
            <Table className='table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='manageProducts2' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='managePlatforms2' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='manageDevices2' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='software' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='manageTestSuits2' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='apiKey' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      <Text tid='delete' />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaign.products &&
                  campaign.products.map(
                    (product: IProductInfo, index: number) => {
                      return (
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
                            className='tableCell'
                          >
                            <TextField
                              required={true}
                              type='string'
                              id={`productName_${index}`}
                              name={`productName_${index}`}
                              value={product.name ? product.name : ''}
                              onChange={(event) =>
                                handleChangeProductName(event, index)
                              }
                              fullWidth
                              autoComplete='off'
                              className='textFieldStyle'
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            <FormControl className={classes.formControl}>
                              <Select
                                id={`productPlatform_${index}`}
                                name={`productPlatform_${index}`}
                                // multiple
                                value={
                                  product.platforms ? product.platforms : []
                                }
                                onChange={(event) =>
                                  handleChangeProductPlatforms(event, index)
                                }
                                // input={<Input id="select-multiple-chip" />}
                                // renderValue={renderChips}
                                // MenuProps={MenuProps}
                              >
                                {allPlatforms &&
                                  allPlatforms.map((opt: IPlatformInfo) => {
                                    return (
                                      <MenuItem key={opt.id} value={opt.id}>
                                        {opt.name}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            <FormControl className={classes.formControl}>
                              <Select
                                id={`productDevices_${index}`}
                                name={`productDevices_${index}`}
                                multiple
                                value={product.devices ? product.devices : []}
                                onChange={(event) =>
                                  handleChangeProductDevices(event, index)
                                }
                                input={<Input id='select-multiple-chip' />}
                                renderValue={renderChips}
                                MenuProps={MenuProps}
                              >
                                {allDevices &&
                                  allDevices.map((opt: IDeviceInfo) => {
                                    return (
                                      <MenuItem key={opt.id} value={opt.id}>
                                        {opt.name}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            {/* {product.software ? product.software : ""} */}
                            {campaign.products[index].software ? (
                              <>
                                <Link href={product.software}>
                                  <TextField
                                    required={true}
                                    type='string'
                                    id={`productSoftware_${index}`}
                                    name={`productSoftware_${index}`}
                                    value={
                                      product.software ? product.software : ''
                                    }
                                    // onChange={(event) =>
                                    //   handleChangeProductName(event, index)
                                    // }
                                    fullWidth
                                    autoComplete='off'
                                    className='textFieldStyle'
                                  />
                                </Link>
                                <Typography style={{ padding: '0 6px' }}>
                                  <ClearIcon/>
                                  {/*<ClearIcon
                                    onClick={() => {
                                      deleteSoftware(index);
                                    }}
                                  />*/}
                                </Typography>
                              </>
                            ) : (
                              <button
                                // onClick={handleUploadButton(index)}
                                onClick={() => handleUploadButton(index)}
                              >
                                <Typography>Upload</Typography>
                              </button>
                            )}
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            <FormControl className={classes.formControl}>
                              <Select
                                id={`productTestSuite_${index}`}
                                name={`productTestSuite_${index}`}
                                multiple
                                value={
                                  product.testSuite ? product.testSuite : []
                                }
                                onChange={(event) =>
                                  handleChangeProductTestSuite(event, index)
                                }
                                input={<Input id='select-multiple-chip' />}
                                renderValue={renderChips}
                                MenuProps={MenuProps}
                              >
                                {allTestSuites &&
                                  allTestSuites.map(
                                    (opt: any /*IQuestionnaire*/) => {
                                      return (
                                        <MenuItem key={opt.id} value={opt.id}>
                                          {opt.name}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            <Typography className='tableBodyText'>
                              {/* {product.testers ? product.testers : 'testers'} */}
                              {campaign.products[index].apiKey ? (
                                <>
                                  <TextField
                                    required={true}
                                    type='string'
                                    id={`productApiKey_${index}`}
                                    name={`productApiKey_${index}`}
                                    value={product.apiKey ? product.apiKey : ''}
                                    fullWidth
                                    autoComplete='off'
                                    className='textFieldStyle'
                                  />
                                  <Typography style={{ padding: '0 6px' }}>
                                    <ClearIcon/>
                                    {/*<ClearIcon
                                      onClick={() => {
                                        deleteApiKey(index);
                                      }}
                                    />*/}
                                  </Typography>
                                </>
                              ) : ( ''
                                /*<button
                                  onClick={() =>
                                    handleGeneralApiKeyButton(index)
                                  }
                                >
                                  <Typography>Generate Api Key</Typography>
                                </button>*/
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            align='center'
                            className='tableCell'
                          >
                            <MuiThemeProvider theme={tooltipTheme}>
                              <Tooltip
                                title={
                                  <Typography
                                    style={{
                                      fontSize: '12px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Text tid='delete' />
                                  </Typography>
                                }
                              >
                                <Typography style={{ padding: '0 6px' }}>
                                  <ClearIcon
                                    onClick={() => {
                                      deleteProduct(index);
                                    }}
                                  />
                                </Typography>
                              </Tooltip>
                            </MuiThemeProvider>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Fragment>
    );
  };

  const renderFormData = () => {
    if (campaignPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_CAMPAIGNS);
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
          {Object.keys(campaignState!.campaignConfig).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {campaignState!.campaigns &&
                  renderElements(
                    el,
                    campaignState!.campaignConfig,
                    campaignState!.campaigns[0]
                  )}
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container spacing={3} className={classes.grid}>
          {campaignState!.campaigns &&
            renderProductsTable(campaignState!.campaigns[0])}
        </Grid> */}
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.button}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_CAMPAIGNS);
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
      {dialogOpen ? (
        handleDialogUpload()
      ) : campaignDataFetched ? (
        renderFormData()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditCampaign);
