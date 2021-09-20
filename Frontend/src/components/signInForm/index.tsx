import * as React from 'react';
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
  IconButton,
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
import { useInput } from "../../utils/form";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignInForm(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(props.openSignin)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const saveUserData = useActions(saveUserDetails);
  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.signIn(
        email, password
      );
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

  return (
    <Dialog open={dialogOpen} aria-labelledby="form-dialog-title" onClose={closeDialog} >
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Sign In</DialogTitle>
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box>
            <Box component="form" onSubmit={handleSubmit} >
              <TextField
                margin="dense"
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                {...bindEmail}
                autoFocus
              />
              <TextField
                margin="dense"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...bindPassword}
                autoComplete="current-password"
              />
              <FormControlLabel
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
                Login
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
                  <Link href="#" variant="body2">
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
        </Container>
      </DialogContent>
    </Dialog>
  );
}