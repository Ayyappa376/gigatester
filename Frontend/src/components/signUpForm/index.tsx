import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Snackbar,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
  CssBaseline,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@material-ui/core";

import { Http } from "../../utils";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers";
import { Text } from "../../common/Language";
import { SuperUser } from "../../utils/http/constants";
import SignInForm from "../signInForm";

const useStyles = makeStyles((theme) => ({
  bigLogo: {
    height: "40px",
    padding: theme.spacing(1),
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignupForm(props: any) {
  const classes = useStyles();
  const [userParamState, setUserParamState] = React.useState<any>({});
  // const stateVariable = useSelector((state: IRootState) => {
  //   return state;
  // });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [checkBox, setcheckBox] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(props.openSignup);
  // const saveUserData = useActions(saveUserDetails);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMsg, setValidationMsg] = useState(
    "Please fill out email field to sign up"
  );
  const [openSignin, setOpenSignin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superUserStateVariable, setSuperUserStateVariable] = useState(
    props.superUserStateVariable
  );
  console.log(props.superUserStateVariable);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // const platformValues = () => {
  //   if (signUpStateVariable) {
  //     console.log(signUpStateVariable);
  //     Http.get({
  //       url: "/api/v2/platforms/",
  //       state: signUpStateVariable,
  //     })
  //       .then((response: any) => {
  //         console.log(signUpStateVariable);
  //         console.log(response.platforms);
  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //       });
  //   }
  // };
  // setTimeout(() => {
  //   platformValues();
  // }, 500);
  const handleChangeValue = (event: any) => {
    if (userParamState) {
      const temp: any = { ...userParamState };
      temp[event.target.name] = event.target.value;
      setUserParamState(temp);
    }
  };

  const getSignInPage = () => {
    setOpenSignin(true);
  };

  const closeAlert = () => {
    setSnackbarOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    props.handleCloseSignup(false);
    // props.getSignInState(false);
  };

  const getSignInState = (state: boolean) => {
    setOpenSignin(state);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { emailId } = userParamState;
    console.log(superUserStateVariable);
    if (validateEmail(emailId)) {
      if (checkBox) {
        const postData = userParamState;
        postData["roles"] = ["Member"];
        try {
          Http.post({
            url: `/api/v2/admin/users`,
            body: {
              ...postData,
            },
            state: superUserStateVariable,
          })
            .then((response: any) => {
              setVerifyEmail(true);
              setLoading(false);
              // setNewUserPosted(true);
            })
            .catch((error) => {
              // console.log(error);
              setLoading(false);
              setErrorMessage(
                "An account with the given email already exists."
              );
              setSnackbarOpen(true);
            });
        } catch (error) {
          let errResponse: any = error;
          setLoading(false);
          setErrorMessage(errResponse.message);
          setSnackbarOpen(true);
        }
      } else {
        setErrorMessage(
          "Please agree to Privacy and Terms and Conditions of this site to sign up"
        );
        setLoading(false);
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarOpen(true);
      setLoading(false);
      setValidationMsg("Please enter a valid email");
    }
  };

  const signUpForm = () => {
    return (
      <React.Fragment>
        <Typography variant="h6">
          <Text tid="createAccount" />
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="Firs_5918865382"
              name="Firs_5918865382"
              label="First name"
              value={userParamState.Firs_5918865382 || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={5}>
            <TextField
              id="Last_1057488597"
              name="Last_1057488597"
              label="Last name"
              value={userParamState.Last_1057488597 || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="emailId"
              name="emailId"
              label="Email Id"
              value={userParamState.emailId || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
            <FormControl required style={{ width: "100%" }}>
              <InputLabel id="country">Country</InputLabel>
              <Select
                id="country"
                name="country"
                fullWidth
                value={userParamState.country || ""}
                onChange={handleChangeValue}
              >
                <div className={classes.chips}>
                  <MenuItem value={"unitedStates"}>United States</MenuItem>
                  <Chip
                    key={"unitedStates"}
                    label={"unitedStates"}
                    className={classes.chip}
                  />
                </div>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  color="primary"
                  checked={checkBox}
                  onChange={(e) => {
                    setcheckBox(e.target.checked);
                  }}
                />
              }
              label={"I agree to Privacy and Terms and Conditions of this site"}
              labelPlacement="end"
            />
            {/* <Link >{"Privacy and Terms and Conditions"} </Link>
{"of this site."}<br /> */}
          </Grid>
          <br />
          <br />
          <br />
          <Grid item xs={8} sm={8}>
            {"Already have an account"} <br />
            <Link onClick={getSignInPage} component="button" variant="body2">
              {"Login here"}
            </Link>
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={3} sm={3}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              type="submit"
              // disabled={loading}
              style={{ textAlign: "center" }}
              onClick={handleSubmit}
            >
              {loading && (
                <CircularProgress size={20} style={{ marginRight: 20 }} />
              )}
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const signUpAcknowledgement = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Thank you for the Signup.
        </Typography>
        <Typography variant="subtitle1">
          We have sent a temporary password to email address given in the form.{" "}
          <br />
          Please check your email, get the temporary password for setting up new
          password <br />
          and then click the button below to continue set up new password and
          Signin.
        </Typography>
        <Box style={{ textAlign: "center", margin: "30px 0" }}>
          <Button variant="contained" onClick={getSignInPage}>
            Continue
          </Button>
          <br />
        </Box>
      </React.Fragment>
    );
  };

  const signUpDialog = () => {
    return (
      <React.Fragment>
        <Dialog
          className={classes.dialogPaper}
          open={dialogOpen}
          aria-labelledby="form-dialog-title"
          onClose={closeDialog}
          fullWidth={true}
        >
          <DialogTitle
            id="form-dialog-title"
            style={{ textAlign: "center", padding: "30px 0px" }}
          >
            <Typography variant="h4">
              <Text tid={"gigaTester"} />
            </Typography>
          </DialogTitle>
          <DialogContent style={{ marginBottom: "20px" }}>
            <CssBaseline />
            {verifyEmail ? signUpAcknowledgement() : signUpForm()}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };

  return openSignin ? (
    <SignInForm openSignin={openSignin} getSignInState={getSignInState} />
  ) : (
    <Container component="main" maxWidth="sm" style={{ paddingBottom: "20px" }}>
      {signUpDialog()}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error">
          {errorMessage ? errorMessage : validationMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
