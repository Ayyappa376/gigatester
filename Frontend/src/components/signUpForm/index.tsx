import * as React from 'react';
import { AppBar, Box, Button, Container, CssBaseline, Link, Paper, Stepper, Step, StepLabel, Toolbar, Typography } from '@material-ui/core';
// import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import BasicDetailsForm from './basicDetails';
import WorkDetailsForm from './workDetails';

const steps = ['Basic Details', 'Work Details'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <BasicDetailsForm />;
    case 1:
      return <WorkDetailsForm />;
    default:
      throw new Error('Unknown step');
  }
}

// const theme = createTheme();

export default function SignupForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" >
        <Paper variant="outlined" >
          <Stepper activeStep={activeStep} >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for the Signup.
                </Typography>
                <Typography variant="subtitle1">
                  Please confirm the registration by verifying link in your email. 
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box style={{ textAlign: 'center', margin: '30px 0' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}                   
                  >
                    {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    // </ThemeProvider>
  );
}