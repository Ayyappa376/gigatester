import React, { Fragment, useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  InputAdornment,
  Input,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarContent,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Popper,
  Grow,
  ButtonGroup,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { default as MaterialLink } from '@material-ui/core/Link';
//import Switch from '@material-ui/core/Switch';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { buttonStyle } from '../../../common/common';
import { Http } from '../../../utils';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { Loader } from '../..';
import {
  ITeamMetricsDetails,
  IMetricsTool,
  ICollectorConfigDetails,
  ICollectorConfig,
  IObjectConfigDetails,
} from '../../../model';
import { MANAGE_TEAMS } from '../../../pages/admin';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Success from '../../success-page';
import ClearIcon from '@material-ui/icons/Clear';
// import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';
import { LightTooltip } from '../../common/tooltip';
import { ModalComponent } from '../../modal';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import './style.css';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      width: '100%',
    },
    saveButton: {
      marginTop: '36px',
      position: 'relative',
      minWidth: '28%',
      ...buttonStyle,
    },
    backButton: {
      marginTop: '36px',
      position: 'relative',
      minWidth: '10%',
      marginRight: '20px',
      ...buttonStyle,
    },
    connectButton: {
      minWidth: '10%',
      float: 'right',
      marginBottom: '10px',
      ...buttonStyle,
    },
    formControl: {
      minWidth: '100%',
    },
    rootp: {
      width: '100%',
      padding: '10px'
    },
    extraBigColumn: {
//      flexBasis: '87.5%',
      flexBasis: '70%',
    },
    mediumColumn: {
      flexBasis: '20%',
    },
    smallColumn: {
//      flexBasis: '12.5%',
      flexBasis: '10%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
    },
    detailsNonHighlighted: {
      alignItems: 'center',
    },
    nonHighlighted: {
      color: 'inherit',
      backgroundColor: 'inherit',
    },
    noResultsContainer: {
      padding: '30px 0px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      margin: '20px',
    },
    expansion: {
      margin: '5px',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    helpText: { fontSize: '12px', color: '#808080' },
    dividerTeam: {
      margin: `2px 0 0 ${theme.spacing(2)}px`,
    },
    dividerService: {
      margin: `2px 0 0 ${theme.spacing(3)}px`,
    },
    dividerSubService: {
      margin: `2px 0 0 ${theme.spacing(4)}px`,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

const MapMetricsTools = (props: any) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [teamMetricsTools, setTeamMetricsTools] = useState<ITeamMetricsDetails>(
    { config: {}, orgId: '', metrics: [], services: [], teamId: '', teamName: '' }
  );
  const [listSettings, setListSettings] = useState<{ [i: string]: boolean }>({});
  const [fetchedData, setFetchedData] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const [dataPosted, setDataPosted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteToolIndex, setDeleteToolIndex] = useState(-1);
  const [openToggle, setOpenToggle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [connectionState, setConnectionState] = useState<string[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [subServiceList, setSubServiceList] = useState<any[]>([]);
  const [selectedMapItem, setSelectedMapItem] = useState('team');
  const [selectedMapItemId, setSelectedMapItemId] = useState(teamMetricsTools.teamId);
  const [userNote, setUserNote] = useState('');
  let msgFailure = failureMessage;
  let msgSuccess = <Text tid='teamDetailsUpdatedSuccessfully' />;

  useEffect(() => {
    fetchTeamMetricsDetails();
  }, []);

  useEffect(() => {
    let services: any[] = [];
    let subServices: any[] = [];
    teamMetricsTools.services && 
    teamMetricsTools.services.forEach((service) => {
      if (service.active === 'true') {
        services.push(service);
      }
      service.services && service.services.forEach((subService) => {
        if (subService.active === 'true') {
          subServices.push(subService);
        }
      })
    })
    setServiceList(services);
    setSubServiceList(subServices);
  }, [teamMetricsTools]);

  const handleListItemClick = (item: string, itemId: string) => {
    setSelectedMapItem(item);
    setSelectedMapItemId(itemId);
  };

  const fetchTeamMetricsDetails = () => {
    Http.get({
      url: `/api/metrics/team/${props.teamId} `,
      state: stateVariable,
    })
      .then((response: any) => {
        let responseSorted: ITeamMetricsDetails = response;
        responseSorted.config = sortAllConfigAttributes(responseSorted);
        responseSorted.metrics.forEach(
          (tool: IMetricsTool, toolIndex: number) => {
            responseSorted.metrics[toolIndex] = sortToolsAttributes(
              tool,
              responseSorted.config
            );
          }
        );
        setTeamMetricsTools(responseSorted);
        initializeListSettings(responseSorted.config);
        initializeConnectionState(responseSorted.metrics);
        setFetchedData(true);
      })
      .catch((error: any) => {
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

  function sortAllConfigAttributes(
    metricsDetails: ITeamMetricsDetails
  ): ICollectorConfigDetails {
    Object.keys(metricsDetails.config).forEach((key: string) => {
      metricsDetails.config[key].forEach(
        (toolConfig: ICollectorConfig, index: number) => {
          const toolConfigAttrSorted: any = {};
          const toolConfigAttrKeysSorted = Object.keys(
            toolConfig.attributes
          ).sort((a: any, b: any) => {
            if (
              toolConfig.attributes[a].position &&
              toolConfig.attributes[b].position &&
              toolConfig.attributes[a].position! >
                toolConfig.attributes[b].position!
            ) {
              return 1;
            } else if (
              toolConfig.attributes[a].position &&
              toolConfig.attributes[b].position &&
              toolConfig.attributes[a].position! <
                toolConfig.attributes[b].position!
            ) {
              return -1;
            } else {
              return toolConfig.attributes[a].displayName.toLowerCase() >
                toolConfig.attributes[a].displayName.toLowerCase()
                ? 1
                : -1;
            }
          });
          toolConfigAttrKeysSorted.forEach((el: string) => {
            toolConfigAttrSorted[el] = toolConfig.attributes[el];
          });
          metricsDetails.config[key][index].attributes = toolConfigAttrSorted;
        }
      );
    });
    return metricsDetails.config;
  }

  function sortToolsAttributes(
    tool: IMetricsTool,
    config: ICollectorConfigDetails
  ): IMetricsTool {
    let collector: any = {};
    for (let i = 0; i < config[tool.toolType].length; i++) {
      if (config[tool.toolType][i].name === tool.toolName) {
        collector = config[tool.toolType][i];
      }
    }
    const toolAttrSorted: IMetricsTool = {
      enabled: tool.enabled,
      toolName: tool.toolName,
      toolType: tool.toolType,
    };
    Object.keys(collector.attributes).forEach((key: string) => {
      toolAttrSorted[key] = tool[key] || {};
      if((!tool[key] || !tool[key].value) && collector.attributes[key].mandatory) {
        if (
          collector.attributes[key].type === 'list' ||
          collector.attributes[key].type === 'list-no-others' ||
          collector.attributes[key].type === 'multi-list'
        ) {
          toolAttrSorted[key].options = {};
          toolAttrSorted[key].value = collector.attributes[key].type === 'multi-list' ? [] : '';
        } else {
          toolAttrSorted[key].value = collector.attributes[key].defaultValue ? collector.attributes[key].defaultValue : '';
        }
      }
    });
    return toolAttrSorted;
  }

  const initializeListSettings = (colConfig: ICollectorConfigDetails) => {
    const tempSettings: { [i: string]: boolean } = {};
    Object.keys(colConfig).forEach(
      (key: string) => (tempSettings[key] = false)
    );
    setListSettings(tempSettings);
  };

  const initializeConnectionState = (metrics: IMetricsTool[]) => {
    const tempState: string[] = [];
    metrics.forEach((tool: IMetricsTool) => tempState.push(''));
    setConnectionState(tempState);
  }

  const handleSave = () => {
    if (validateDataBeforeSave()) {
      Http.post({
        url: `/api/metrics/team`,
        body: {
          orgId: teamMetricsTools.orgId,
          teamId: teamMetricsTools.teamId,
          services: teamMetricsTools.services,
          metrics: teamMetricsTools.metrics,
        },
        state: stateVariable,
      })
        .then((response: any) => {
          setDataPosted(true);
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
    }
  };

  function validateDataBeforeSave(): boolean {
    //Check for all the mandatory fields for all tools are being set.
    let errorCount = 0;

    teamMetricsTools.metrics.forEach((tool: IMetricsTool) => {
      let collector: any = {};
      for (let i = 0; i < teamMetricsTools.config[tool.toolType].length; i++) {
        if (teamMetricsTools.config[tool.toolType][i].name === tool.toolName) {
          collector = teamMetricsTools.config[tool.toolType][i];
        }
      }
      Object.keys(tool).forEach((key: string) => {
        if (key !== 'toolName' && key !== 'toolType' && key !== 'enabled') {
          if (collector.attributes[key].mandatory && 
              (!tool[key] || !tool[key].value || 
                (collector.attributes[key].type === 'multi-list' && tool[key].value.length === 0) ||
                (collector.attributes[key].type !== 'multi-list' && tool[key].value === ''))) {
            setFailureMessage(
              <Text tid='mandatory.field.of.some.collector.tool.added.do.not.have.value.ensure.that.all.mandatory.fields.are.filled' />
            );
            setFailure(true);
            errorCount += 1;
          }
        }
      });
    });

    if (errorCount === 0) {
      return true;
    } else {
      return false;
    }
  }

  function validateDataBeforeConnect(tool: IMetricsTool): boolean {
    let errorCount = 0;

    let collector: any = {};
    for (let i = 0; i < teamMetricsTools.config[tool.toolType].length; i++) {
      if (teamMetricsTools.config[tool.toolType][i].name === tool.toolName) {
        collector = teamMetricsTools.config[tool.toolType][i];
      }
    }
    Object.keys(tool).forEach((key: string) => {
      if (key !== 'toolName' && key !== 'toolType' && key !== 'enabled') {
        if ((collector.attributes[key].type === 'string' || collector.attributes[key].type === 'password') &&
            (!tool[key] || !tool[key].value || tool[key].value === '')) {
          setFailureMessage(
            <Text tid='fill.the.server.project.url.and.authentication.details.before.connecting' />
          );
          setFailure(true);
          errorCount += 1;
        }
      }
    });

    if (errorCount === 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleConnect = (tool: IMetricsTool, toolIndex: number) => {
    if (validateDataBeforeConnect(tool)) {
      const tempState: string[] = [...connectionState];
      tempState[toolIndex] = 'fetching';
      setConnectionState(tempState);
      Http.post({
        url: `/api/metrics/connect`,
        body: {
          tool: tool,
        },
        state: stateVariable,
      })
        .then((response: any) => {
//          setIsConnecting(false);
          if (response.connect) {
//            setValidConnection('success');
              const tempState: string[] = [...connectionState];
              tempState[toolIndex] = 'success';
              setConnectionState(tempState);

            let temp: ITeamMetricsDetails = { ...teamMetricsTools };
//            temp.metrics[toolIndex] = response.tool;
            if (selectedMapItem === 'team') {
              temp.metrics[toolIndex] = sortToolsAttributes(
                response.tool,
                teamMetricsTools.config
              );
            } else if (selectedMapItem === 'service') {
              temp.services.forEach((service) => {
                if (selectedMapItemId === service.id) {
                  service.metrics[toolIndex] = sortToolsAttributes(
                    response.tool,
                    teamMetricsTools.config
                  );
                }
              })
            } else {
              temp.services.forEach((service) => {
                service.hasOwnProperty('services') && service.services.forEach((subService) => {
                  if (selectedMapItemId === subService.id) {
                    subService.metrics[toolIndex] = sortToolsAttributes(
                      response.tool,
                      teamMetricsTools.config
                    );
                  }
                })
              })
            }            
            setTeamMetricsTools(temp);
          } else {
//            setValidConnection('failed');
            const tempState: string[] = [...connectionState];
            tempState[toolIndex] = 'failed';
            setConnectionState(tempState);
            setFailureMessage(
              <Text tid='connection.failed.check.the.server.project.url' />
            );
            setFailure(true);
          }
        })
        .catch((error) => {
//          setIsConnecting(false);
//          setValidConnection('failed');
          const tempState: string[] = [...connectionState];
          tempState[toolIndex] = 'failed';
          setConnectionState(tempState);

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
    }
  };

  const handleOpenDialog = () => {    
    fetch('/userNote.txt')
    .then((note) => 
      note.text())
    .then(text  => {
      setUserNote(text);
      setOpenDialog(true);
    })  
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setFailure(false);
  };

  const handleBackButton = () => {
    props.goBack(MANAGE_TEAMS);
  };

  const modalNoClicked = () => {
    setDeleteToolIndex(-1);
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    setOpenModal(false);
    deleteMetricsTool();
  };

  const handleAddButtonClick = () => {
    initializeListSettings(teamMetricsTools.config);
    setOpenToggle((prevOpen) => !prevOpen);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const prevOpen = React.useRef(openToggle);
  React.useEffect(() => {
    if (prevOpen.current === true && openToggle === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openToggle;
  }, [openToggle]);

  const handleChangeValue = (
    event: any,
    toolIndex: number,
    attrKey: string
  ) => {
    let temp: ITeamMetricsDetails = { ...teamMetricsTools };
    if (selectedMapItem === 'team') {
      temp.metrics[toolIndex][attrKey].value = event.target.value;
    } else if (selectedMapItem === 'service') {
      temp.services.forEach((service) => {
        if (selectedMapItemId === service.id) {
          service.metrics[toolIndex][attrKey].value = event.target.value;
        } 
      })
    } else {
      temp.services.forEach((service) => {
        service.hasOwnProperty('services') && service.services.forEach((subService) => {
          if (selectedMapItemId === subService.id) {
            subService.metrics[toolIndex][attrKey].value = event.target.value;
          } 
        })
      })
    }

    setTeamMetricsTools(temp);
  };

  const handleChangeMultiValue = (
    event: any,
    toolIndex: number,
    attrKey: string
  ) => {
    let temp: ITeamMetricsDetails = { ...teamMetricsTools };
    let valueArray = [];
    if (selectedMapItem === 'team') {
      valueArray = temp.metrics[toolIndex][attrKey].value || [];
      valueArray = [...event.target.value];
      temp.metrics[toolIndex][attrKey].value = valueArray;
    } else if (selectedMapItem === 'service') {
      temp.services.forEach((service) => {
        if (selectedMapItemId === service.id) {
          valueArray = service.metrics[toolIndex][attrKey].value || [];
          valueArray = [...event.target.value];
          service.metrics[toolIndex][attrKey].value = valueArray;
        } 
      })
    } else {
      temp.services.forEach((service) => {
        service.hasOwnProperty('services') && service.services.forEach((subService) => {
          if (selectedMapItemId === subService.id) {
            valueArray = subService.metrics[toolIndex][attrKey].value || [];
            valueArray = [...event.target.value];
            subService.metrics[toolIndex][attrKey].value = valueArray;
          } 
        })
      })
    }   
    
    setTeamMetricsTools(temp);
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

  const handleEnabledChange = (event: any, toolIndex: number) => {
    event.stopPropagation();
    let temp: ITeamMetricsDetails = { ...teamMetricsTools };
//    temp.metrics[toolIndex].enabled = event.target.checked;
    if (selectedMapItem === 'team') {
      temp.metrics[toolIndex].enabled = !temp.metrics[toolIndex].enabled;
    } else if (selectedMapItem === 'service') {
      temp.services.forEach((service) => {
        if (selectedMapItemId === service.id) {
          service.metrics[toolIndex].enabled = !service.metrics[toolIndex].enabled;
        }
      })
    } else {
      temp.services.forEach((service) => {
        service.hasOwnProperty('services') && service.services.forEach((subService) => {
          if (selectedMapItemId === subService.id) {
            subService.metrics[toolIndex].enabled = !subService.metrics[toolIndex].enabled;
          }
        })
      })
    }
    
    setTeamMetricsTools(temp);
}

  const confirmAndDeleteTool = (event: any, toolIndex: number) => {
    event.stopPropagation();
    setDeleteToolIndex(toolIndex);
    setOpenModal(true);
  };

  const deleteMetricsTool = () => {
    if (deleteToolIndex >= 0) {
      let temp: ITeamMetricsDetails = { ...teamMetricsTools };
      if (selectedMapItem === 'team') {
        temp.metrics.splice(deleteToolIndex, 1);
      } else if (selectedMapItem === 'service') {
        temp.services.forEach((service) => {
          if (selectedMapItemId === service.id) {
            service.metrics.splice(deleteToolIndex, 1);
          }
        })
      } else {
        temp.services.forEach((service) => {
          service.hasOwnProperty('services') && service.services.forEach((subService) => {
            if (selectedMapItemId === subService.id) {
              subService.metrics.splice(deleteToolIndex, 1);
            }
          })
        })
      }
      
      setTeamMetricsTools(temp);

      const tempState: string[] = [...connectionState];
      tempState.splice(deleteToolIndex, 1);
      setConnectionState(tempState);
      }
  };

  const changeListSettings = (id: string) => {
    const tempSettings: { [i: string]: boolean } = { ...listSettings };
    tempSettings[id] = !tempSettings[id];
    setListSettings(tempSettings);
  };

  const handleAddMetricsSelect = (colType: string, colName: string) => {
    let collectorAttrs: IObjectConfigDetails = {};
    for (let i = 0; i < teamMetricsTools.config[colType].length; i++) {
      if (teamMetricsTools.config[colType][i].name === colName) {
        collectorAttrs = teamMetricsTools.config[colType][i].attributes;
      }
    }

    const newTool: IMetricsTool = { toolName: colName, toolType: colType, enabled: true };
    const attrKeys = Object.keys(collectorAttrs);
    for (let i = 0; i < attrKeys.length; i++) {
      newTool[attrKeys[i]] = {};
      if (
        collectorAttrs[attrKeys[i]].type === 'list' ||
        collectorAttrs[attrKeys[i]].type === 'list-no-others' ||
        collectorAttrs[attrKeys[i]].type === 'multi-list'
      ) {
        newTool[attrKeys[i]].options = [];
        newTool[attrKeys[i]].value = collectorAttrs[attrKeys[i]].type === 'multi-list' ? [] : '';
      } else {
        newTool[attrKeys[i]].value = collectorAttrs[attrKeys[i]].defaultValue ? collectorAttrs[attrKeys[i]].defaultValue : '';
      }
    }

    let temp: ITeamMetricsDetails = { ...teamMetricsTools };
    if (selectedMapItem === 'team') {
      temp.metrics.push(newTool);
    } else if (selectedMapItem === 'service') {
      temp.services.forEach((service) => {
        service.metrics = service.hasOwnProperty('metrics') ? service.metrics : [];
        selectedMapItemId === service.id && service.metrics.push(newTool);
      })
    } else {
        temp.services.forEach((service) => {
          service.hasOwnProperty('services') && service.services.forEach((subService) => {
          subService.metrics = subService.hasOwnProperty('metrics') ? subService.metrics : [];
          selectedMapItemId === subService.id && subService.metrics.push(newTool);
        })
      })
    }
    
    setTeamMetricsTools(temp);

    const tempState: string[] = [...connectionState];
    tempState.push('');
    setConnectionState(tempState);

    setOpenToggle(false);
  };

  const renderNoResultsFound = () => {
    return (
      <div className={classes.noResultsContainer}>
        <Text tid='noToolsAreMapped' />
      </div>
    );
  };

  const renderAttribute = (
    tool: IMetricsTool,
    attrKey: string,
    toolIndex: number
  ) => {
    let collectorAttr: any = {};
    for (let i = 0; i < teamMetricsTools.config[tool.toolType].length; i++) {
      if (teamMetricsTools.config[tool.toolType][i].name === tool.toolName) {
        collectorAttr =
          teamMetricsTools.config[tool.toolType][i].attributes[attrKey];
      }
    }
    switch (collectorAttr.type) {
      case 'string':
        return (
          <Fragment>
            <TextField
              required={collectorAttr.mandatory}
              type='string'
              id={`field_${toolIndex}_${attrKey}`}
              name={`field_${toolIndex}_${attrKey}`}
              value={tool[attrKey].value}
              label={collectorAttr.displayName}
              onChange={(event: any) =>
                handleChangeValue(event, toolIndex, attrKey)
              }
              fullWidth
              autoComplete='off'
              className='textFieldStyle'
            />
            <Typography
              key={`help_${toolIndex}_${attrKey}`}
              className={classes.helpText}
            >
              {collectorAttr.helpText
                ? collectorAttr.helpText
                : ''}
            </Typography>
          </Fragment>
        );
      case 'number':
        return (
          <Fragment>
            <div className='numberInput'>
              <TextField
                required={collectorAttr.mandatory}
                type='number'
                id={`field_${toolIndex}_${attrKey}`}
                name={`field_${toolIndex}_${attrKey}`}
                value={tool[attrKey].value}
                label={collectorAttr.displayName}
                onChange={(event: any) =>
                  handleChangeValue(event, toolIndex, attrKey)
                }
                fullWidth
                autoComplete='off'
                InputProps={{ disableUnderline: true }}
                className='textFieldStyle'
              />
            </div>
            <Typography
              key={`help_${toolIndex}_${attrKey}`}
              className={classes.helpText}
            >
              {collectorAttr.helpText
                ? collectorAttr.helpText
                : ''}
            </Typography>
          </Fragment>
        );
      case 'password':
        return (
          <Fragment>
            <TextField
              required={collectorAttr.mandatory}
              type={values.showPassword ? 'text' : 'password'}
              id={`field_${toolIndex}_${attrKey}`}
              name={`field_${toolIndex}_${attrKey}`}
              value={tool[attrKey].value}
              label={collectorAttr.displayName}
              onChange={(event: any) =>
                handleChangeValue(event, toolIndex, attrKey)
              }
              fullWidth
              autoComplete='off'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              className='textFieldStyle'
            />
            <Typography
              key={`help_${toolIndex}_${attrKey}`}
              className={classes.helpText}
            >
              {collectorAttr.helpText
                ? collectorAttr.helpText
                : ''}
            </Typography>
          </Fragment>
        );
      case 'list':
      case 'list-no-others':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id='demo-simple-select-label'
                required={collectorAttr.mandatory}
              >
                {collectorAttr.displayName}
              </InputLabel>
              <Select
                id={`field_${toolIndex}_${attrKey}`}
                name={`field_${toolIndex}_${attrKey}`}
                value={tool[attrKey].value}
                onChange={(event: any) =>
                  handleChangeValue(event, toolIndex, attrKey)
                }
              >
                {tool[attrKey].options &&
                  Object.keys(tool[attrKey].options).map((opt: string) => (
                    <MenuItem key={opt} value={opt}>
                      {tool[attrKey].options[opt]}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Typography
              key={`help_${toolIndex}_${attrKey}`}
              className={classes.helpText}
            >
              {collectorAttr.helpText
                ? collectorAttr.helpText
                : ''}
            </Typography>
          </Fragment>
        );
      case 'multi-list':
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel
                id='demo-mutiple-chip-label'
                required={collectorAttr.mandatory}
              >
                {collectorAttr.displayName}
              </InputLabel>
              <Select
                id={`field_${toolIndex}_${attrKey}`}
                name={`field_${toolIndex}_${attrKey}`}
                multiple
                value={tool[attrKey].value}
                onChange={(event: any) =>
                  handleChangeMultiValue(event, toolIndex, attrKey)
                }
                input={<Input id='select-multiple-chip' />}
                renderValue={renderChips}
                MenuProps={MenuProps}
              >
                {tool[attrKey].options &&
                  Object.keys(tool[attrKey].options).map((opt: string) => (
                    <MenuItem key={opt} value={opt}>
                      {tool[attrKey].options[opt]}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Typography
              key={`help_${toolIndex}_${attrKey}`}
              className={classes.helpText}
            >
              {collectorAttr.helpText
                ? collectorAttr.helpText
                : ''}
            </Typography>
          </Fragment>
        );
    }
  };

  const renderMetricsToolDetails = (tool: IMetricsTool, toolIndex: number) => {
    return (
      <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1c-content'
          id='panel1c-header'
          className={classes.nonHighlighted}
        >
          <div
            className={classes.smallColumn}
            style={{
              marginTop: '10px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <LightTooltip
              title={<Text tid='detachCollector' />}
              aria-label='detach this collector'
            >
              <IconButton
                size='small'
                onClick={(event: any) => confirmAndDeleteTool(event, toolIndex)}
              >
                <ClearIcon />
              </IconButton>
            </LightTooltip>
          </div>
          <div className={classes.extraBigColumn} style={{ marginTop: '10px' }}>
            <Typography className={classes.heading}>{tool.toolName}</Typography>
          </div>
          <div className={classes.mediumColumn} style={{ marginTop: '10px' }}>
            <FormControlLabel
              style={{ paddingLeft: '36px' }}
              control={
                <Checkbox
                  checked={tool.enabled}
                  onChange={(event: any) => handleEnabledChange(event, toolIndex)}
                  value='true'
                  color="secondary"
                />
              }
              label={'Enabled'}
            />
            {/* Disabled
            <Switch
              size="small"
              defaultChecked
              checked={tool.enabled ? tool.enabled : true}
              onChange={(event: any) => handleEnabledChange(event, toolIndex)}
            />
            Enabled*/}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detailsNonHighlighted}>
          <div style={{ display: 'block', width: '100%' }}>
            <Button
              className={classes.connectButton}
              variant='outlined'
              onClick={(event: any) => handleConnect(tool, toolIndex)}
            >
              <Text tid='connectServer' />
            </Button>
            {connectionState[toolIndex] === 'fetching' && (
              <Loader label='Connecting...' />
            )}
            {connectionState[toolIndex] === 'success' && (
              <Typography variant='h5' color='primary'>
                <Text tid='connectedSuccessfully' />
              </Typography>
            )}
            {connectionState[toolIndex] === 'failed' && (
              <Typography variant='h5' color='secondary'>
                <Text tid='connectionFailed' />
              </Typography>
            )}
            {Object.keys(tool).map((attrKey: string, i: number) =>
              attrKey !== 'toolName' && attrKey !== 'toolType' && attrKey !== 'enabled' ? (
                <div style={{ padding: '8px 5px' }} key={i}>
                  {renderAttribute(tool, attrKey, toolIndex)}
                </div>
              ) : (
                ''
              )
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  const renderMetricsTools = () => {
    if (dataPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
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
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <List className={classes.root}>
              <Typography
                className={classes.dividerTeam}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Team
              </Typography>
                <ListItem button selected={selectedMapItemId === teamMetricsTools.teamId || selectedMapItem === 'team'} onClick={() => handleListItemClick('team', teamMetricsTools.teamId)}>
                  <ListItemText primary={teamMetricsTools.teamName} />
                </ListItem>
              {serviceList.length ?
                <Fragment>
                  <Divider component="li" variant="middle" />
                  <li>
                    <Typography
                      className={classes.dividerService}
                      color="textSecondary"
                      display="block"
                      variant="caption"
                    >
                      Service Component
                    </Typography>
                  </li>
                  {serviceList.map((service, index) => {
                    return (
                      <ListItem key={index} button selected={selectedMapItemId === service.id} onClick={() => handleListItemClick('service', service.id)}>
                        <ListItemText className={classes.dividerService} primary={service.name}/>
                      </ListItem>                                 
                    )
                  })}
                    {subServiceList.length &&
                      <Fragment>
                        <Divider component="li" variant="middle" />
                        <li>
                          <Typography
                            className={classes.dividerSubService}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                          >
                            Service Sub-Component
                          </Typography>
                        </li>
                        {subServiceList.map((subService, index) => {
                          return (
                            <ListItem key={index} button selected={selectedMapItemId === subService.id} onClick={() => handleListItemClick('subService', subService.id)}>                            
                              <ListItemText className={classes.dividerSubService} primary={subService.name}/>
                            </ListItem>
                          )
                        })}
                      </Fragment>
                    }
                  </Fragment> : ''
                }
            </List>
          </Paper>
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={handleBackButton}
          >
            <Text tid='goBack' />
          </Button>
          <Button
            className={classes.saveButton}
            onClick={handleSave}
            variant='outlined'
          >
            <Text tid='save' />
          </Button>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <div style={{ width: '100%' }}  className={classes.root}>
            <ButtonGroup
              variant='contained'
              color='primary'
              ref={anchorRef}
              aria-label='split button'
              className={classes.title}
            >
              <Button
                color='primary'
                aria-controls={openToggle ? 'split-button-menu' : undefined}
                aria-expanded={openToggle ? 'true' : undefined}
                aria-label='select merge strategy'
                aria-haspopup='menu'
                onClick={handleAddButtonClick}
                endIcon={
                  openToggle ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                }
              >
                <Text tid='attachCollectors' />
              </Button>
            </ButtonGroup>
            <MaterialLink              
              href='#'
              onClick={handleOpenDialog}
            >
              <Typography style={{ display: 'inline', float: 'right', padding: '25px' }}>
                <Text tid='viewDetails' />
              </Typography>
            </MaterialLink>
            {/* <HelpIcon fontSize='large' onClick={handleOpenDialog}/> */}
            {/* Information */}
            <Popper
              open={openToggle}
              anchorEl={anchorRef.current}
              role={undefined}
              placement={'bottom-start'}
              transition
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper style={{ width: '133%' }}>
                    <List style={{ color: '#000' }}>
                      {Object.keys(teamMetricsTools.config).map(
                        (colKey: string) => (
                          <Fragment key={colKey}>
                            <ListItem
                              button
                              onClick={() => changeListSettings(colKey)}
                              style={{ textAlign: 'left' }}
                            >
                              <ListItemText inset primary={colKey} />
                              {listSettings[colKey] ? (
                                <ArrowDropUpIcon />
                              ) : (
                                <ArrowDropDownIcon />
                              )}
                            </ListItem>
                            <Collapse
                              in={listSettings[colKey]}
                              timeout='auto'
                              unmountOnExit
                            >
                              <List
                                disablePadding
                                style={{ fontSize: '8px' }}
                              >
                                {teamMetricsTools.config[colKey].map(
                                  (
                                    collector: ICollectorConfig,
                                    colIndex: number
                                  ) => (
                                    <ListItem
                                      key={colIndex}
                                      button
                                      onClick={() =>
                                        handleAddMetricsSelect(
                                          colKey,
                                          collector.name
                                        )
                                      }
                                      style={{ fontSize: '8px' }}
                                    >
                                      <ListItemText
                                        inset
                                        primary={collector.name}
                                        style={{
                                          fontSize: '8px',
                                          marginLeft: '8px',
                                        }}
                                      />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </Collapse>
                            <Divider />
                          </Fragment>
                        )
                      )}
                    </List>
                  </Paper>
                </Grow>
              )}
            </Popper>
            {selectedMapItem === 'team' ? !teamMetricsTools.hasOwnProperty('metrics') ||
              teamMetricsTools.hasOwnProperty('metrics') && teamMetricsTools.metrics.length === 0 ?
                renderNoResultsFound() :
                    teamMetricsTools.metrics.map((tool: IMetricsTool, i: number) => {
                      return (
                        <div key={i} className={classes.rootp}>
                          {renderMetricsToolDetails(tool, i)}
                        </div>
                      );
                    })
                : selectedMapItem === 'service' ?           
                    teamMetricsTools.services.map((service) => {
                      if (selectedMapItemId === service.id) {
                        return (
                        !service.hasOwnProperty('metrics') || (service.hasOwnProperty('metrics') && service.metrics.length === 0) ? 
                          renderNoResultsFound() : 
                            service.metrics.map((tool: IMetricsTool, i: number) => {
                              return (
                                <div key={i} className={classes.rootp}>
                                  {renderMetricsToolDetails(tool, i)}
                                </div>
                              );
                        })
                      )}
                    })
                : teamMetricsTools.services.map((service) => {
                    return (
                      service.hasOwnProperty('services') && service.services.map((subService) => {
                        if (selectedMapItemId === subService.id) {
                          return (
                          !subService.hasOwnProperty('metrics') || (subService.hasOwnProperty('metrics') && subService.metrics.length === 0) ? 
                            renderNoResultsFound() : 
                              subService.metrics.map((tool: IMetricsTool, i: number) => {
                                return (
                                  <div key={i} className={classes.rootp}>
                                    {renderMetricsToolDetails(tool, i)}
                                  </div>
                                );
                          })
                        )}
                      })
                    )
                  })
                }
              </div>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={failure}
              onClose={handleCloseSnackbar}
              autoHideDuration={9000}
            >
              <SnackbarContent
                style={{ backgroundColor: '#dd0000' }}
                message={msgFailure}
              />
            </Snackbar>
            <ModalComponent
              message={'metricsToolPermanentDeletionWarning'}
              openModal={openModal}
              handleModalYesClicked={modalYesClicked}
              handleModalNoClicked={modalNoClicked}
            />
          </Paper>
          <Dialog 
            onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <DialogTitle id="simple-dialog-title">Collector Config Details
              <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {userNote}
            </DialogContent>     
          </Dialog>
        </Grid>
      </Grid>
    );
  };

  return (
    <Fragment>
      {
        fetchedData ? (
        renderMetricsTools()
      ) : (
        <Container style={{ textAlign: 'center' }}>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(MapMetricsTools);
