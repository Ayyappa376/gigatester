import * as React from 'react';
import { Box, Button, Container, Checkbox, CircularProgress, CssBaseline, 
  FormControlLabel, Grid, Link, Snackbar,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,  } from '@material-ui/core';
import { Alert,  } from '@material-ui/lab';
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useInput } from "../../utils/form";

export default function SignInForm(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(props.openSignin)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setLoading(true);
    // console.log('email', email, 'password', password)
    try {
      await Auth.signIn(email, password);
      history.push("/assessmentselect");
      setDialogOpen(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={dialogOpen} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Sign In</DialogTitle>
      <DialogContent>       
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box>
            <Box component="form" onSubmit={handleSubmit} >
              <TextField
                margin="normal"
                // required
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
                margin="normal"
                // required
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
            </Box>
          </Box>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error">
              The user doesn't exist.
            </Alert>
          </Snackbar>
        </Container>
      </DialogContent>
    </Dialog>
  );
}