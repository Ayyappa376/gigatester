import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Snackbar, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { Auth } from "aws-amplify";
import jwtDecode from 'jwt-decode';
import { Http } from '../../utils';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import BasicDetailsForm from './basicDetails';
import WorkDetailsForm from './workDetails';

const steps = ['Basic Details', 'Work Details'];

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignupForm(props: any) {
  const [userParamState, setUserParamState] = React.useState<any>({});
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  // const saveUserData = useActions(saveUserDetails);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMsg, setValidationMsg] = useState('Please fill out email field to sign up')
  const serviceUserEmail = 'darshan.hn@pinimbus.com';
  const serviceUserPassword = 'Giga@2021';
  const signUpStateVariable = stateVariable;

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    const getServiceUserToken = async () => {
      try {
        const user = await Auth.signIn(
          serviceUserEmail, serviceUserPassword
        );
        if (
          user &&
          user.signInUserSession.idToken &&
          user.signInUserSession.accessToken
        ) {
          const tokenInfo: any = jwtDecode(
            user.signInUserSession.idToken.jwtToken
          );
          signUpStateVariable['user'] =
          {
            idToken: user.signInUserSession.idToken.jwtToken,
            accessToken: user.signInUserSession.accessToken,
            userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
            team:
              tokenInfo['custom:teamName'] &&
                tokenInfo['custom:teamName'] !== ''
                ? tokenInfo['custom:teamName']
                : 'Others',
            teams: [],
            roles: ['Admin'],
          };
        }
      } catch (error) {
        console.log(error)
      }
    }

    getServiceUserToken();
  }, [])

  const handleChangeValue = (event: any) => {
    if (userParamState) {
      const temp: any = { ...userParamState };
      temp[event.target.name] = event.target.value;
      setUserParamState(temp);
    }
  };

  const handleChangeMultiValue = (event: any) => {
    if (event.target.name === 'teams') {
      setSelectedTeams(event.target.value);
    } else {
      setSelectedDevices(event.target.value);
    }
    if (userParamState) {
      const temp: any = { ...userParamState };
      let valueArray = temp[event.target.name] || [];
      valueArray = [...event.target.value];

      temp[event.target.name] = valueArray;
      setUserParamState(temp);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicDetailsForm
          handleChangeValue={handleChangeValue}
          userParamState={userParamState}
        />;
      case 1:
        return <WorkDetailsForm
          handleChangeValue={handleChangeValue}
          handleChangeMultiValue={handleChangeMultiValue}
          userParamState={userParamState}
          selectedTeams={selectedTeams}
          selectedDevices={selectedDevices}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async (action: string) => {
    const { emailId } = userParamState;
    if (action === 'Next') {
      if (emailId) {
        if (validateEmail(emailId)) {
          setActiveStep(activeStep + 1);
        } else {
          setSnackbarOpen(true)
          setValidationMsg('Please enter a valid email');
        }
      }
    }
    if (action === 'signUp') {
      if (selectedTeams.length) {
        const postData = userParamState;
        postData['roles'] = ['Member'];
        postData['orgId'] = "dev";
        console.log(postData);
        try {
          Http.post({
            url: `/api/v2/admin/users`,
            body: {
              ...postData,
            },
            state: signUpStateVariable,
          })
            .then((response: any) => {
              setVerifyEmail(true);
              // setNewUserPosted(true);
            })
            .catch((error) => {
              // console.log(error)
              setErrorMessage('An account with the given email already exists.');
              setSnackbarOpen(true);
              // const perror = JSON.stringify(error);
              // const object = JSON.parse(perror);
              // if (object.code === 400) {
              // setFailureMessage(object.apiError.msg);
              // setFailure(true);
              // } else if (object.code === 401) {
              //   props.history.push('/relogin');
              // } else {
              // setFailureMessage(<Text tid='somethingWentWrong' />);
              // setFailure(true);
              // }
            });
        } catch (error) {
          let errResponse: any = error;
          setErrorMessage(errResponse.message);
          setSnackbarOpen(true);
        }
      } else {
        setErrorMessage('Please choose platform');
        setSnackbarOpen(true);
      }

    };
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getSignInPage = () => {
    props.getSignInForm('signIn')
  }

  const closeAlert = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm" >
      <Paper variant="outlined" >
        {verifyEmail ? (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Thank you for the Signup.
            </Typography>
            <Typography variant="subtitle1">
              We have sent a temporary password to email address given in the form. <br />
              Please check your email, get the temporary password for setting up new password <br />
              and then click the button below to continue set up new password and Signin.
            </Typography>
            <Box style={{ textAlign: 'center', margin: '30px 0' }}>
              <Button variant="contained" onClick={getSignInPage}>
                Continue
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stepper activeStep={activeStep} >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div style={{ margin: '0px 15px' }}>
              {getStepContent(activeStep)}
            </div>
            <Box style={{ textAlign: 'center', margin: '30px 0' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => handleNext((activeStep === steps.length - 1) ? 'signUp' : 'Next')}
              >
                {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={closeAlert} >
        <Alert onClose={closeAlert} severity="error">
          {errorMessage ? errorMessage : validationMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

// import React, { useState, useEffect, Fragment } from 'react';
// import {
//   Box,
//   Grid,
//   makeStyles,
//   TextField,
//   Button,
//   FormControl,
//   Container,
//   MenuItem,
//   Select,
//   InputLabel,
//   Input,
//   Chip,
//   Snackbar,
//   SnackbarContent,
//   Typography
// } from '@material-ui/core';
// import { Auth } from "aws-amplify";
// import jwtDecode from 'jwt-decode';
// import { IRootState } from '../../reducers';
// import Loader from '../loader';
// import { Http } from '../../utils';
// // import Success from '../../success-page';
// import { useSelector } from 'react-redux';
// import { IUserParams, IUserAttributes } from '../../model/admin/create-user';
// import { withRouter } from 'react-router-dom';
// import { buttonStyle } from '../../common/common';
// import { Text } from '../../common/Language';
// import '../../css/assessments/style.css';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginTop: '36px',
//     position: 'relative',
//     minWidth: '10%',
//     ...buttonStyle,
//   },
//   backButton: {
//     marginTop: '36px',
//     position: 'relative',
//     minWidth: '10%',
//     ...buttonStyle,
//     marginRight: '20px',
//   },
//   formControl: {
//     minWidth: '100%',
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
// }));

// const SignupForm = (props: any) => {
//   const classes = useStyles();
//   const [newUserPosted, setNewUserPosted] = useState(false);
//   const [failure, setFailure] = useState(false);
//   const [verifyEmail, setVerifyEmail] = useState(false);
//   const [failureMessage, setFailureMessage] = useState(
//     <Text tid='somethingWentWrong' />
//   );
//   const [serviceUserState, setServiceUserState] = useState(false);
//   const stateVariable = useSelector((state: IRootState) => {
//     return state;
//   });
//   let msgFailure = failureMessage;
//   const signUpStateVariable = stateVariable;
//   const serviceUserEmail = 'darshan.hn@pinimbus.com';
//   const serviceUserPassword = 'Change@sep21';

//   const [
//     createUserParams,
//     setCreateUserParams,
//   ] = React.useState<IUserParams | null>(null);
//   const [userParamState, setUserParamState] = React.useState<any>({});

//   useEffect(() => {
//     const getServiceUserToken = async () => {
//       try {
//         const user = await Auth.signIn(
//           serviceUserEmail, serviceUserPassword
//         );
//         if (
//           user &&
//           user.signInUserSession.idToken &&
//           user.signInUserSession.accessToken
//         ) {
//           const tokenInfo: any = jwtDecode(
//             user.signInUserSession.idToken.jwtToken
//           );
//           setServiceUserState(true)
//           signUpStateVariable['user'] =
//           {
//             idToken: user.signInUserSession.idToken.jwtToken,
//             accessToken: user.signInUserSession.accessToken,
//             userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
//             team:
//               tokenInfo['custom:teamName'] &&
//                 tokenInfo['custom:teamName'] !== ''
//                 ? tokenInfo['custom:teamName']
//                 : 'Others',
//             teams: [],
//             roles: ['Admin'],
//           };
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getServiceUserToken();
//   }, [])

//   useEffect(() => {
//     if (serviceUserState) {
//       Http.get({
//         url: '/api/v2/admin/users/createuser',
//         state: signUpStateVariable,
//       })
//         .then((response: any) => {
//           console.log('response', response);
//           // const responseConfigSorted: any = {};
//           // const responseKeysSorted = Object.keys(response.config).sort(
//           //   (a: any, b: any) => {
//           //     return response.config[a].displayName >
//           //       response.config[b].displayName
//           //       ? 1
//           //       : -1;
//           //   }
//           // );
//           // responseKeysSorted.forEach((el: string) => {
//           //   responseConfigSorted[el] = response.config[el];
//           // });
//           // response.config = responseConfigSorted;
//           console.log('response', response);
//           setCreateUserParams(response);
//         })
//         .catch((error) => {
//           console.log('error', error);
//           const perror = JSON.stringify(error);
//           const object = JSON.parse(perror);
//           if (object.code === 401) {
//             props.history.push('/relogin');
//           } else {
//             props.history.push('/error');
//           }
//         });
//     }
//   }, [serviceUserState]);

//   const handleSubmit = () => {
//     const postData = userParamState;
//     postData['orgId'] = createUserParams ? createUserParams['orgId'] : '';
//     Http.post({
//       url: `/api/v2/admin/users`,
//       body: {
//         ...postData,
//       },
//       state: stateVariable,
//     })
//       .then((response: any) => {
//         setVerifyEmail(true);
//         setNewUserPosted(true);
//       })
//       .catch((error) => {
//         const perror = JSON.stringify(error);
//         const object = JSON.parse(perror);
//         if (object.code === 400) {
//           setFailureMessage(object.apiError.msg);
//           setFailure(true);
//         } else if (object.code === 401) {
//           props.history.push('/relogin');
//         } else {
//           setFailureMessage(<Text tid='somethingWentWrong' />);
//           setFailure(true);
//         }
//       });
//   };

//   function mandatoryFieldsCheck(): boolean {
//     let countFilledElements = 0;
//     let totalCount = 0;
//     // tslint:disable-next-line: ter-arrow-parens
//     Object.keys(createUserParams!.config).forEach((el) => {
//       if (createUserParams!.config[el].Mandatory) {
//         if (userParamState && userParamState[el]) {
//           countFilledElements = countFilledElements + 1;
//         }
//         totalCount = totalCount + 1;
//       }
//     });
//     if (totalCount === countFilledElements) {
//       return true;
//     }
//     return false;
//   }

//   const handleChangeValue = (event: any) => {
//     if (userParamState) {
//       const temp: any = { ...userParamState };
//       temp[event.target.name] = event.target.value;
//       setUserParamState(temp);
//     }
//   };

//   // const handleChangeOtherValueList = (event: any) => {
//   //   if (userParamState) {
//   //     const temp: any = { ...userParamState };
//   //     if (event.target.value === '') {
//   //       temp[event.target.name] = 'Other';
//   //     } else {
//   //       temp[event.target.name] = event.target.value;
//   //     }
//   //     setUserParamState(temp);
//   //   }
//   // };

//   // const returnIndexOfOther = (array: string[]) => {
//   //   let index = -1;
//   //   array.forEach((el, i) => {
//   //     if (el.includes('Other')) {
//   //       index = i;
//   //     }
//   //   });
//   //   return index;
//   // };

//   // const handleChangeOtherMultilist = (event: any) => {
//   //   if (userParamState) {
//   //     const temp: any = { ...userParamState };
//   //     const updatedString = 'Other' + ':' + event.target.value;
//   //     const valueArray = temp[event.target.name] || [];
//   //     const indexOfOther = returnIndexOfOther(valueArray);
//   //     valueArray[indexOfOther] = updatedString;
//   //     temp[event.target.name] = valueArray;
//   //     setUserParamState(temp);
//   //   }
//   // };

//   const handleChangeMultiValue = (event: any) => {
//     if (userParamState) {
//       const temp: any = { ...userParamState };
//       let valueArray = temp[event.target.name] || [];
//       valueArray = [...event.target.value];
//       temp[event.target.name] = valueArray;
//       setUserParamState(temp);
//     }
//   };

//   // const includesOther = (array: string[]) => {
//   //   let otherExist = false;
//   //   array.forEach((el) => {
//   //     if (el.includes('Other')) {
//   //       otherExist = true;
//   //     }
//   //   });
//   //   return otherExist;
//   // };

//   const renderChips = (selected: any) => {
//     return (
//       <div className={classes.chips}>
//         {(selected as string[]).map((value) => (
//           <Chip key={value} label={value} className={classes.chip} />
//         ))}
//       </div>
//     );
//   };

//   function getStyles(values: any, opt: string, el: string) {
//     if (values && values[el] && values[el].includes(opt)) {
//       return {
//         color: 'white',
//         backgroundColor: '#042E5B',
//       };
//     }
//   }

//   const getSignInPage = () => {
//     props.getSignInForm('signIn')
//   }

//   const renderElements = (el: string) => {
//     const element: IUserAttributes = createUserParams!.config[el];
//     const values = userParamState ? userParamState : null;
//     switch (element.type) {
//       case 'string':
//         return (
//           <TextField
//             required={element.Mandatory}
//             type='string'
//             id={el}
//             name={el}
//             value={values ? (values[el] ? values[el] : '') : ''}
//             label={element.displayName}
//             onChange={handleChangeValue}
//             fullWidth
//             autoComplete='off'
//             className='textFieldStyle'
//           />
//         );
//       case 'number':
//         return (
//           <div className='numberInput'>
//             <TextField
//               required={element.Mandatory}
//               type='number'
//               id={el}
//               name={el}
//               value={values ? (values[el] ? values[el] : '') : ''}
//               label={element.displayName}
//               onChange={handleChangeValue}
//               fullWidth
//               autoComplete='off'
//               InputProps={{ disableUnderline: true }}
//               className='textFieldStyle'
//             />
//           </div>
//         );

//       case 'list':
//         return (
//           <FormControl className={classes.formControl}>
//             <InputLabel
//               id='demo-simple-select-label'
//               required={element.Mandatory}
//             >
//               {element.displayName}
//             </InputLabel>
//             <Select
//               name={el}
//               value={
//                 values
//                   ? values[el]
//                     ? element.options.includes(values[el])
//                       ? values[el]
//                       : 'Other'
//                     : ''
//                   : ''
//               }
//               onChange={handleChangeValue}
//             >
//               {element.options.map((opt: string) => {
//                 return (
//                   <MenuItem key={opt} value={opt}>
//                     {opt}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//         );
//       case 'multi-list':
//         return (
//           <FormControl className={classes.formControl}>
//             <InputLabel
//               id='demo-mutiple-chip-label'
//               required={element.Mandatory}
//             >
//               {element.displayName}
//             </InputLabel>
//             <Select
//               id='demo-mutiple-chip'
//               name={el}
//               multiple
//               value={
//                 values
//                   ? values[el]
//                     ? values[el] !== ''
//                       ? values[el]
//                       : []
//                     : []
//                   : []
//               }
//               onChange={handleChangeMultiValue}
//               input={<Input id='select-multiple-chip' />}
//               renderValue={renderChips}
//               MenuProps={MenuProps}
//             >
//               {element.options.map((opt: any) => (
//                 <MenuItem
//                   key={opt}
//                   value={opt}
//                   style={getStyles(values, opt, el)}
//                 >
//                   {opt}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
//     }
//   };

//   const handleClose = () => {
//     setFailure(false);
//   };

//   const renderFormData = () => {
//     // if (newUserPosted) {
//     //   return (
//     //     <Fragment>
//     //       <div className='bottomButtonsContainer'>
//     //         <Button
//     //           className={classes.backButton}
//     //           variant='outlined'
//     //           onClick={() => {
//     //             setNewUserPosted(false);
//     //             setUserParamState({});
//     //           }}
//     //         >
//     //           <Text tid='goBack' />
//     //         </Button>
//     //       </div>
//     //     </Fragment>
//     //   );
//     // }
//     return (
//       <Fragment>
//         <Grid container spacing={3}>
//           {Object.keys(createUserParams!.config).map((el) => {
//             return (
//               <Grid key={el} item xs={6}>
//                 {renderElements(el)}
//               </Grid>
//             );
//           })}
//         </Grid>
//         <div className='bottomButtonsContainer'>
//           {/* <Button
//             className={classes.backButton}
//             variant='outlined'
//             onClick={props.goBack}
//           >
//             <Text tid='goBack' />
//           </Button> */}
//           {mandatoryFieldsCheck() ? (
//             <Button
//               onClick={handleSubmit}
//               className={classes.button}
//               variant='outlined'
//             >
//               <Text tid='submit' />
//             </Button>
//           ) : (
//             <Button className={classes.button} disabled variant='outlined'>
//               <Text tid='submit' />
//             </Button>
//           )}
//         </div>
//         <Snackbar
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           open={failure}
//           onClose={handleClose}
//           autoHideDuration={9000}
//         >
//           <SnackbarContent
//             style={{
//               backgroundColor: '#dd0000',
//             }}
//             message={msgFailure}
//           />
//         </Snackbar>
//       </Fragment>
//     );
//   };

//   const renderForm = () => {
//     return renderFormData();
//   };

//   return (
//     <Fragment>
//       {(createUserParams !== null && !verifyEmail) ? (
//         renderForm()
//       ) : (createUserParams === null && !verifyEmail) ? (
//         <Container className='loaderStyle'>
//           <Loader />
//         </Container>
//       ) : (
//         <React.Fragment>
//           <Typography variant="h6" gutterBottom>
//             Thank you for the Signup.
//           </Typography>
//           <Typography variant="subtitle1">
//             We have sent a temporary password to email address given in the form. <br />
//             Please check your email, get the temporary password for setting up new password <br />
//             and then click the button below to continue set up new password and Signin.
//           </Typography>
//           <Box style={{ textAlign: 'center', margin: '30px 0' }}>
//             <Button variant="contained" onClick={getSignInPage}>
//               Continue
//             </Button>
//           </Box>
//         </React.Fragment>
//       )
//       }
//     </Fragment>
//   );
// };

// export default withRouter(SignupForm);
