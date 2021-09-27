import React, { Fragment, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@material-ui/core';
import {
  useActions,
  saveUserDetails,
} from '../../actions';
import MuiAlert from '@material-ui/lab/Alert';
import { Auth } from "aws-amplify";
import jwtDecode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import { Text } from '../../common/Language';
import { useInput } from "../../utils/form";
import SignupForm from '../signUpForm';
import SetNewPassword from './setNewPassword';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignInForm(props: any) {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(props.openSignin)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const saveUserData = useActions(saveUserDetails);
  const [dialogPage, setDialogPage] = useState('signIn');
  const [newPasswordState, setNewPasswordState] = useState(false);
  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: newPassword, bind: bindNewPassword } = useInput("");
  const { value: confirmNewpassword, bind: bindConfirmNewPassword } = useInput("");

  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.signIn(
        email, password
      );
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setLoading(false);
        setNewPasswordState(true)
        if (newPassword !== confirmNewpassword) {
          setSnackbarOpen(true);
          setErrorMessage('Password and Confirm Password should be same');
          return;
        }
        if (confirmNewpassword && newPassword === confirmNewpassword) {
          Auth.completeNewPassword(
            user,               // the Cognito User Object
            confirmNewpassword,       // the new password
            {
              email: email,
            }
          ).then(user => {
            if (
              user &&
              user.signInUserSession.idToken &&
              user.signInUserSession.accessToken
            ) {
              const tokenInfo: any = jwtDecode(
                user.signInUserSession.idToken.jwtToken
              );
              saveUserData({
                idToken: user.signInUserSession.idToken.jwtToken,
                accessToken: user.signInUserSession.accessToken,
                userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
                team:
                  tokenInfo['custom:teamName'] &&
                    tokenInfo['custom:teamName'] !== ''
                    ? tokenInfo['custom:teamName']
                    : 'Others',
                roles: tokenInfo['cognito:groups'],
              });
              history.push("/assessmentselect");
              setDialogOpen(false);
              setLoading(true);
            }
          }).catch(e => {
            setErrorMessage('Something Went Wrong. Please try again');
            setLoading(false);
            setSnackbarOpen(true);
          });
        }
      } else if (
        user &&
        user.signInUserSession.idToken &&
        user.signInUserSession.accessToken
      ) {
        const tokenInfo: any = jwtDecode(
          user.signInUserSession.idToken.jwtToken
        );
        saveUserData({
          idToken: user.signInUserSession.idToken.jwtToken,
          accessToken: user.signInUserSession.accessToken,
          userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
          team:
            tokenInfo['custom:teamName'] &&
              tokenInfo['custom:teamName'] !== ''
              ? tokenInfo['custom:teamName']
              : 'Others',
          roles: tokenInfo['cognito:groups'],
        });
        history.push("/assessmentselect");
        setDialogOpen(false);
      }
    } catch (error) {
      let errResponse: any = error;
      setErrorMessage(errResponse.message);
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false)
    props.getSignInState(false);
  }

  const closeAlert = () => {
    setSnackbarOpen(false);
  };

  const onSignUp = () => {
    setDialogPage('signUp')
  }

  const getSignInForm = (page: string) => {
    setDialogPage(page)
  }

  return (
    <Dialog open={dialogOpen} aria-labelledby="form-dialog-title" onClose={closeDialog} fullWidth={dialogPage === 'signUp'} >
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}><Text tid={dialogPage} /></DialogTitle>
      <DialogContent>
        {dialogPage === 'signIn' ?
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box>
              <Box component="form" onSubmit={handleSubmit} >
                {!newPasswordState ? (
                  <Fragment>
                    <TextField
                      required
                      margin="dense"
                      fullWidth
                      id="email"
                      label="Email"
                      type="email"
                      {...bindEmail}
                      autoFocus
                    />
                    <TextField
                      required
                      margin="dense"
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      {...bindPassword}
                    />
                  </Fragment>
                ) : (
                  <SetNewPassword bindNewPassword={bindNewPassword} bindConfirmNewPassword={bindConfirmNewPassword} />
                )}
                < FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                  disabled={loading}
                  style={{ textAlign: "center" }}
                >
                  {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                  {!newPasswordState ? 'Login' : 'Send'}
                </Button>
                <br />
                <br />
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={onSignUp}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <br />
              </Box>
            </Box>
            <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={closeAlert} >
              <Alert onClose={closeAlert} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          </Container> :
          <SignupForm getSignInForm={getSignInForm} />
        }
      </DialogContent>
    </Dialog>
  );
}