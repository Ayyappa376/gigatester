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
  IconButton,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../../loader';
import { ITeamInfo, IUserAttributes, IUserParams } from '../../../model';
import { Http } from '../../../utils';
import Success from '../../success-page';
import { withRouter } from 'react-router-dom';
import { MANAGE_USERS } from '../../../pages/admin';
import { ModalComponent } from '../../modal';
import { buttonStyle } from '../../../common/common';
import { Text } from '../../../common/Language';
import '../../../css/assessments/style.css';
import { LightTooltip } from '../../common/tooltip';

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
    ...buttonStyle,
  },
  backButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
    marginRight: '20px',
  },
  deleteButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
    marginLeft: '20px',
  },
  makeAdminButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    ...buttonStyle,
    marginLeft: '20px',
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

const EditUser = (props: any) => {
  const classes = useStyles();
  const [userPosted, setUserPosted] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [failure, setFailure] = useState(false);
  const [userDataFetched, setUserDataFetched] = useState(false);
//  const [teamDataFetched, setTeamDataFetched] = useState(false);
  const [failureMessage, setFailureMessage] = useState(
    <Text tid='somethingWentWrong' />
  );
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const userRoles = useSelector((state: IRootState) => {
    return state.user.roles;
  });
  const userEmail = useSelector((state: IRootState) => {
    return state.user.userDetails.email;
  });
//  const [teams, setTeams] = React.useState<ITeamInfo[]>([]);
  const [userState, setUserState] = React.useState<IUserParams | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const [openMakeAdminModal, setOpenMakeAdminModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    <Text tid='userProfileUpdatedSuccessfully' />
  );
  const [roles, setRoles] = useState(['Member', 'Manager', 'Executive'])
  const [productState, setProductState] = useState([]);
  let msgFailure = failureMessage;
  let msgSuccess = successMessage;
  const OTHER_STRING = 'Other';

  useEffect(() => {
//    fetchTeamList();
    fetchUserDetails();
    fetchProducts();
  }, []);

  // const fetchTeamList = () => {
  //   Http.get({
  //     url: `/api/v2/teamlist`,
  //     state: stateVariable,
  //   })
  //   .then((response: any) => {
  //     response.sort((a: any, b: any) => {
  //       if (a.active === b.active) {
  //         return a.teamName.toLowerCase() <= b.teamName.toLowerCase()
  //           ? -1
  //           : 1;
  //       }
  //       return a.active === 'true' ? -1 : 1;
  //     });
  //     setTeams(response);
  //     setTeamDataFetched(true);
  //   })
  //   .catch((error: any) => {
  //     const perror = JSON.stringify(error);
  //     const object = JSON.parse(perror);
  //     if (object.code === 400) {
  //       setFailureMessage(object.apiError.msg);
  //       setFailure(true);
  //     } else if (object.code === 401) {
  //       props.history.push('/relogin');
  //     } else {
  //       props.history.push('/error');
  //     }
  //   })
  // };

  const fetchUserDetails = () => {
    Http.get({
      url: `/api/v2/admin/users/getusers?email=${props.user}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setUserState(response);
        setUserDataFetched(true);
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
          props.history.push('/error');
        }
      });
  };

  const fetchProducts = () => {
    Http.get({
      url: `/api/v2/admin/users/getusers?email=${userEmail}`,
      state: stateVariable,
    })
      .then((response: any) => {
        if(response.values.roles.includes('Admin')){
          Http.get({
            url: `/api/v2/admin/products/`,
            state: stateVariable,
          }).then((response: any) => {
            setProductState(response.values.products);
          }).catch((error)=>{
            console.log(error);
          });
        }
        else if(response.values.products){
          setProductState(response.values.products);
        }
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
          props.history.push('/error');
        }
      });
  };

  const handleDelete = () => {
    const userId = userState!.values.id;
    Http.deleteReq({
      url: `/api/v2/admin/users/${userId}`,
      state: stateVariable,
    })
      .then((response: any) => {
        setUserDeleted(true);
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

  const handleSubmit = () => {
    const postData = userState!.values;
    Http.put({
      url: `/api/v2/admin/users`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setUserPosted(true);
        setSuccessMessage(<Text tid='userProfileUpdatedSuccessfully' />);
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

  const handleMakeAdmin = () => {
    setOpenMakeAdminModal(true);
  };

  const modalMakeAdminNoClicked = () => {
    setOpenMakeAdminModal(false);
  };

  const modalMakeAdminYesClicked = () => {
    const postData = userState!.values;
    postData.roles = ['Admin'];
    setOpenMakeAdminModal(false);
    Http.put({
      url: `/api/v2/admin/users`,
      body: {
        ...postData,
      },
      state: stateVariable,
    })
      .then((response: any) => {
        setUserPosted(true);
        setSuccessMessage(<Text tid='userTypeChangedToAdmin' />);
      })
      .catch((error) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 400) {
          setFailureMessage(object.apiError.msg);
        } else {
          setFailureMessage(<Text tid='somethingWentWrong' />);
        }
        if (object.code === 401) {
          props.history.push('/relogin');
        }
        setFailure(true);
      });
  };

  function mandatoryFieldsCheck(): boolean {
    let countFilledElements = 0;
    let totalCount = 0;
    // tslint:disable-next-line: ter-arrow-parens
    if (!userState) {
      return false;
    }
    Object.keys(userState.config).map((el) => {
      if (userState.config[el].mandatory) {
        if (userState && userState.values[el]) {
          if (userState.config[el].type === 'multi-list') {
            if (userState.values[el].length > 0) {
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
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      temp.values[event.target.name] = event.target.value;
      setUserState(temp);
    }
  };

  const handleChangeSelectedProduct = (event: any, catIndex: number) => {
    if(event.target.value){
      const id = event.target.value.split(' ')[0]
      const version = event.target.value.split(' ')[2]
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      if (temp && temp.values && temp.values.products) {
        temp.values.products[catIndex].productId = id;
        temp.values.products[catIndex].version = version;
        productState.map((val: any) => {
          if(val.productId === id && val.version === version){
            temp.values.products[catIndex].name = val.name;
          }
        })
        setUserState(temp);
      }
    }
  }
  };

  const handleChangeSelectedProductRole = (event: any, catIndex: number) => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      if (temp && temp.values && temp.values.products) {
        temp.values.products[catIndex].role = event.target.value;
        setUserState(temp);
      }
    }
  };

  const handleChangeMultiValue = (event: any) => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      let valueArray = temp.values[event.target.name] || [];
      valueArray = [...event.target.value];
      temp!.values[event.target.name] = valueArray;
      setUserState(temp);
    }
  };

  const renderProducts = (product: any, catIndex: number) => {
    const productVal = product.productId + ' - ' + product.version
    return(
      <Fragment key={catIndex}>
    <FormControl className={classes.formControl}>
            <InputLabel
              id={`product_${catIndex}`}
            >
              {'Product'}
            </InputLabel>
            <Select
              name={`Select_${catIndex}`}
              value={product ? (product.name ? productVal : '') : ''}
              onChange={(event) => {handleChangeSelectedProduct(event, catIndex)}}
            >
              {productState.map((opt: any) => {
                const val = opt.productId + ' - ' + opt.version;
                const displayVal = opt.name + ' - ' + opt.version;
                return (
                  <MenuItem key={val} value={val}>
                    {displayVal}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
          <InputLabel
              id={`product_${catIndex}`}
            >
              {'Role'}
            </InputLabel>
            <Select
              name={`SelectedRole_${catIndex}`}
              value={product ? (product.role ? product.role : '') : ''}
              onChange={(event) => {handleChangeSelectedProductRole(event, catIndex)}}
            >
              {roles.map((opt: any) => {
                return (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
            {/* </Grid>
            {category.feedbacks &&
              category.feedbacks.map((feedback: string, index: number) => {
                return (
                  <Grid key={index} container spacing={1}>
                    <Grid item xs={1} sm={1}></Grid>
                    <Grid item xs={10} sm={10}>
                      <TextField
                        required
                        type='string'
                        id={`feedback_${catIndex}_${index}`}
                        name={`feedback_${catIndex}_${index}`}
                        label='Feedback text'
                        value={feedback ? feedback : ''}
                        fullWidth
                        onChange={(event) => handleChangeBugStdFeedbackText(event, catIndex, index)}
                        autoComplete='off'
                        className='textFieldStyle'
                      />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                      <LightTooltip
                        title={'Delete this standard Feedback'}
                        aria-label='Delete this standard Feedback'
                      >
                        <IconButton size='small' onClick={() => deleteBugStdFeedbackText(catIndex, index)} >
                          <ClearIcon />
                        </IconButton>
                      </LightTooltip>
                    </Grid>
                  </Grid>
                );
              })
            }
          </Grid> */}
          </Fragment>
    )
  }

  const addProductToUser = () => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      if(temp.values && temp.values.products){
      temp.values.products.push({
        productId: '',
        version: '',
        role: '',
        name: ''
      })
      setUserState(temp);
    }
    else{
      temp.values.products = [];
      temp.values.products.push({
        productId: '',
        version: '',
        role: ''
      })
      setUserState(temp);
    }
    }
    // if (productParams) {
    //   const temp: IProductParams | undefined = { ...productParams };
    //   if (temp && temp.products && temp.products[0] && temp.products[0].feedbackAgentSettings &&
    //     temp.products[0].feedbackAgentSettings.bugSettings) {
    //     temp.products[0].feedbackAgentSettings.bugSettings.categories.push({
    //       name: '',
    //       feedbacks: [],
    //     });
    //     setProductParams(temp);
    //   }
    // }
  };

  const handleChangeMultiValueNoOthers = (event: any, groups: any) => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      let newValue = {};
      let deleteValue = false;
      if(event.target.value){
      let valueArray = temp.values[event.target.name] || [];
      const tempArray = [...event.target.value]
      const tempValue = tempArray[tempArray.length -1];
      tempArray.splice(-1);
      tempArray.map((val: any, index: number) => {
        if(val.name === tempValue){
          tempArray.splice(index,1)
          deleteValue = true;
        }
      })
    if(!deleteValue){
      Object.keys(groups).map((key: any, index: number) => {
        if(groups[key] === tempValue){
          newValue = {
            name: tempValue,
            groupId: key
          }
        }
      })
      tempArray.push(newValue);
      }
      valueArray = [...tempArray];
      temp!.values[event.target.name] = valueArray
      setUserState(temp);
      }
      // let values: any = temp.platforms;

      // if (values) {
      //   let valueArray = values[0][key] || [];
      //   valueArray = [...event.target.value];
      //   values[0][key] = valueArray;
      //   setPlatformState(temp);
      // }
    }
  };

  const renderMultiChips = (selected: any) => {
    return (
      <div className={classes.chips}>
        {
        selected && selected.length > 0 &&
          (selected as string[]).map((value: any) => {
          const val = value.groupId;
          const name = value.name;
          // .includes(`${OTHER_STRING}:`) ? OTHER_STRING : value;
          return <Chip key={val} label={name} className={classes.chip} />;
          })
        }
      </div>
    );
  };

  const renderChips = (selected: any, el: string) => {
    return (
      <div className={classes.chips}>
        {(selected as string[]).map((value) => (
          <Chip
            key={value}
            label={/*el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === value)!.teamName :*/ value}
            className={classes.chip}
          />
        ))}
      </div>
    );
  };

  const renderElements = (el: string) => {
    if(el === "teams") {
      return (<div/>);
    }
    const element: IUserAttributes = userState!.config[el];
    const values = userState ? userState.values : null;
    switch (element.type) {
      case 'string':
        return (
          <TextField
            required={element.mandatory}
            type='string'
            id={el}
            name={el}
            value={values ? (values[el] ? values[el] : '') : ''}
            label={element.displayName}
            disabled={el === 'emailId'}
            onChange={handleChangeValue}
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
              id={el}
              name={el}
              value={values ? (values[el] ? values[el] : 0) : 0}
              label={element.displayName}
              onChange={handleChangeValue}
              fullWidth
              autoComplete='off'
              InputProps={{ disableUnderline: true }}
              className='textFieldStyle'
            />
          </div>
        );

      case 'list':
        return (
          <FormControl className={classes.formControl}>
            <InputLabel
              id='demo-simple-select-label'
              required={element.mandatory}
            >
              {element.displayName}
            </InputLabel>
            <Select
              name={el}
              value={values ? (values[el] ? values[el] : '') : ''}
              onChange={handleChangeValue}
            >
              {element.options.map((opt: string) => {
                return (
                  <MenuItem key={opt} value={opt}>
                    { /*el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName :*/ opt }
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      case 'multi-list':
        return (
          <FormControl className={classes.formControl}>
            <InputLabel
              id='demo-mutiple-chip-label'
              required={element.mandatory}
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
              renderValue={(value: any) => renderChips(value, el)}
              MenuProps={MenuProps}
            >
              {element.options.map((opt: any) => (
                <MenuItem key={opt} value={opt}>
                  { /*el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName :*/ opt }
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
        case 'render-products':
          return (
            <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
            <Grid item xs={10}>
              <Typography variant="h6">Products:</Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <LightTooltip
                title={'Add a Product'}
                aria-label='Add a Product'
              >
                <Button size='small' variant="outlined" onClick={() => addProductToUser()} >
                  <AddIcon /> Product
                </Button>
              </LightTooltip>
            </Grid>
            {values && values.products && 
              values.products.map((product: any, index: number) => {
                return renderProducts(product, index)
              })}
          </Grid>
          );
        case 'multi-list-no-others':
          return(
            <FormControl className={classes.formControl}>
            <InputLabel
              id={`label_${el}`}
              required={element.mandatory}
            >
              {element.displayName}
            </InputLabel>
            <Select
              id={`select_${el}`}
              name={`${el}`}
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
              onChange={(event) => handleChangeMultiValueNoOthers(event, element.options)}
              input={<Input id='select-multiple-chip' />}
              renderValue={renderMultiChips}
              MenuProps={MenuProps}
            >
              {element.options ? (
                Object.keys(element.options).map((opt: string) => {
                  const val = [opt, element.options[opt]]
                  return (
                    <MenuItem key={opt} value={element.options[opt]}>
                      {element.options[opt]}
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
          )
        return (
          <FormControl className={classes.formControl}>
            <InputLabel
              id='demo-mutiple-chip-label'
              required={element.mandatory}
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
              renderValue={(value: any) => renderChips(value, el)}
              MenuProps={MenuProps}
            >
              {element.options.map((opt: any) => (
                <MenuItem key={opt} value={opt}>
                  { /*el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName :*/ opt }
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
    }
  };

  const handleClose = () => {
    setFailure(false);
  };

  const deleteClicked = () => {
    setOpenModal(true);
  };

  const modalNoClicked = () => {
    setOpenModal(false);
  };

  const modalYesClicked = () => {
    handleDelete();
  };

  const renderFormData = () => {
    if (userPosted) {
      return (
        <Fragment>
          <Success message={msgSuccess} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_USERS);
              }}
            >
              <Text tid='goBack' />
            </Button>
          </div>
        </Fragment>
      );
    }
    if (userDeleted) {
      return (
        <Fragment>
          <Success message={<Text tid='userProfileDeletedSuccessfully' />} />
          <div className='bottomButtonsContainer'>
            <Button
              className={classes.backButton}
              variant='outlined'
              onClick={() => {
                props.goBack(MANAGE_USERS);
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
        <Grid container spacing={3}>
          {Object.keys(userState!.config).map((el) => {
            return (
              <Grid key={el} item xs={12}>
                {renderElements(el)}
              </Grid>
            );
          })}
        </Grid>
        <div className='bottomButtonsContainer'>
          <Button
            className={classes.backButton}
            variant='outlined'
            onClick={() => {
              props.goBack(MANAGE_USERS);
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
          <Button
            className={classes.makeAdminButton}
            variant='outlined'
            onClick={handleMakeAdmin}
            disabled={!(userRoles && userRoles.includes('Admin'))}
          >
            <Text tid='makeAdmin' />
          </Button>
          <Button
            className={classes.deleteButton}
            variant='outlined'
            onClick={deleteClicked}
          >
            <Text tid='delete' />
          </Button>
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
        <ModalComponent
          message={'deleteTheUser'}
          openModal={openModal}
          handleModalYesClicked={modalYesClicked}
          handleModalNoClicked={modalNoClicked}
        />
        <ModalComponent
          message={'changeTheUserToAnAdmin'}
          openModal={openMakeAdminModal}
          handleModalYesClicked={modalMakeAdminYesClicked}
          handleModalNoClicked={modalMakeAdminNoClicked}
        />
      </Fragment>
    );
  };

  const renderForm = () => {
    return renderFormData();
  };

  return (
    <Fragment>
      {userDataFetched/* && teamDataFetched*/ ? (
        renderForm()
      ) : (
        <Container className='loaderStyle'>
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};

export default withRouter(EditUser);
