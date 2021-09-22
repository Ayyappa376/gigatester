import React, { useState } from 'react';
import { Box, Button, Container, Paper, Snackbar, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { Auth } from "aws-amplify";
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
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMsg, setValidationMsg] = useState('Please fill out email and password fields to sign up')

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
    return re.test(password);
  }

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
    const { emailId, password, confirmPassword } = userParamState;
    if (action === 'Next') {
      if ((emailId && password) &&
        (password === confirmPassword)) {
        if (validateEmail(emailId) && validatePassword(password)) {
          setActiveStep(activeStep + 1);
        } else if (!validateEmail(emailId)) {
          setSnackbarOpen(true)
          setValidationMsg('Please enter a valid email');
        } else if (!validatePassword(password)) {
          setSnackbarOpen(true)
          setValidationMsg('A password must have at least 5 characters, including special character, upper and lower case letter, and number');
        }
      } else if (password !== confirmPassword) {
        setSnackbarOpen(true)
        setValidationMsg('Password and Confirm Password should be same');
      } else {
        setSnackbarOpen(true)
      }
    }
    if (action === 'signUp') {
      delete userParamState['password'];
      delete userParamState['confirmPassword']
      const postData = userParamState;
      postData['status'] = 'registered';
      postData['roles'] = ['Member'];
      postData['orgId'] = "dev";

      try {
        await Auth.signUp({
          username: emailId,
          password: confirmPassword,
        });
        setVerifyEmail(true);
        Http.post({
          url: `/api/v2/admin/users`,
          body: {
            ...postData,
          },
          state: stateVariable,
        })
          .then((response: any) => {
            // console.log(response);
            // setNewUserPosted(true);
          })
          .catch((error) => {
            setErrorMessage('Error in storing user data');
            setSnackbarOpen(true);
            const perror = JSON.stringify(error);
            const object = JSON.parse(perror);
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
            <Typography variant="h5" gutterBottom>
              Thank you for the Signup.
            </Typography>
            <Typography variant="subtitle1">
              We have sent an verification link to email address given in the form. <br />
              Please check your email, follow the instructions to verify given email address. <br />
              and then click the button below to continue Signin.
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