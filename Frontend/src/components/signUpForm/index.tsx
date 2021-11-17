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
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import jwtDecode from "jwt-decode";
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
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignupForm(props: any) {
  const classes = useStyles();
  const [userParamState, setUserParamState] = React.useState<any>({});
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
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
  const signUpStateVariable = stateVariable;

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const getServiceUserToken = async () => {
      const { userName, password } = SuperUser;
      try {
        const user = await Auth.signIn(userName, password);
        if (
          user &&
          user.signInUserSession.idToken &&
          user.signInUserSession.accessToken
        ) {
          const tokenInfo: any = jwtDecode(
            user.signInUserSession.idToken.jwtToken
          );
          signUpStateVariable["user"] = {
            idToken: user.signInUserSession.idToken.jwtToken,
            accessToken: user.signInUserSession.accessToken,
            userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
            team:
              tokenInfo["custom:teamName"] &&
              tokenInfo["custom:teamName"] !== ""
                ? tokenInfo["custom:teamName"]
                : "Others",
            teams: [],
            roles: ["Admin"],
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    getServiceUserToken();
  }, []);

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

  const handleSubmit = () => {
    setLoading(true);
    const { emailId } = userParamState;
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
            state: signUpStateVariable,
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
        <MenuItem value={"unitedStates"}>United States</MenuItem>
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
          <Link component="button" variant="body2">
            {"Login here"}
          </Link>
        </Grid>
        <Grid item xs={4} sm={4} justify="flex-end">
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
        <br />
      </Grid>
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
            style={{ textAlign: "center", padding: "40px 0px" }}
          >
            <Typography variant="h4">
              <Text tid={"gigaTester"} />
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              <Text tid="createAccount" />
            </Typography>
            <CssBaseline />
            {verifyEmail ? signUpAcknowledgement() : signUpForm()}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };

  return openSignin ? (
    <SignInForm openSignin={openSignin} />
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
