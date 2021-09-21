import React, { useState } from 'react';
import { Box, Button, Container, Paper, Snackbar, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { Auth } from "aws-amplify";
import MuiAlert from '@material-ui/lab/Alert';
import BasicDetailsForm from './basicDetails';
import WorkDetailsForm from './workDetails';
import { useInput, useInputArray } from "../../utils/form";

const steps = ['Basic Details', 'Work Details'];

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignupForm(props: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMsg, setValidationMsg] = useState('Please fill out email and password fields to sign up')
  const { value: firstName, bind: bindFirstName } = useInput("");
  const { value: lastName, bind: bindLastName } = useInput("");
  const { value: address1, bind: bindAddress1 } = useInput("");
  const { value: address2, bind: bindAddress2 } = useInput("");
  const { value: city, bind: bindCity } = useInput("");
  const { value: state, bind: bindState } = useInput("");
  const { value: zip, bind: bindZip } = useInput("");
  const { value: country, bind: bindCountry } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: phone, bind: bindPhone } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");
  const { value: teams, bind: bindTeams } = useInputArray([]);
  const { value: devices, bind: bindDevices } = useInputArray([]);
  const { value: testingExperience, bind: bindTestingExperience } = useInput("");
  const { value: prodTestExperience, bind: bindProdTestExperience } = useInput("");

  // console.log(firstName, lastName, address1, address2, city, state, zip, country, email, phone, password, confirmPassword)
  // console.log(teams, devices, testingExperience, prodTestExperience);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,20})/;
    return re.test(password);
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicDetailsForm
          bindFirstName={bindFirstName}
          bindLastName={bindLastName}
          bindAddress1={bindAddress1}
          bindAddress2={bindAddress2}
          bindCity={bindCity}
          bindState={bindState}
          bindZip={bindZip}
          bindCountry={bindCountry}
          bindEmail={bindEmail}
          bindPhone={bindPhone}
          bindPassword={bindPassword}
          bindConfirmPassword={bindConfirmPassword}
        />;
      case 1:
        return <WorkDetailsForm
          bindTeams={bindTeams}
          bindDevices={bindDevices}
          bindTestingExperience={bindTestingExperience}
          bindProdTestExperience={bindProdTestExperience}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async (action: string) => {
    if (action === 'Next') {
      if ((email && password) && (password === confirmPassword)) {
        if (validateEmail(email) && validatePassword(password)) {
          setActiveStep(activeStep + 1);
        } else if (!validateEmail(email)) {
          setSnackbarOpen(true)
          setValidationMsg('Please enter a valid email');
        } else if (!validatePassword(password)) {
          setSnackbarOpen(true)
          setValidationMsg('A password must have at least 5 characters, including special character, upper and lower case letter, and number');
        }
      } else if (password != confirmPassword) {
        setSnackbarOpen(true)
        setValidationMsg('Password and Confirm Password should be same');
      } else {
        setSnackbarOpen(true)
      }
    }
    if (action === 'signUp') {
      try {
        await Auth.signUp({
          username: email,
          password: confirmPassword,
        });
        setVerifyEmail(true);
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