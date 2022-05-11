import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useActions, saveUserDetails } from "../../actions";
import { Auth } from "aws-amplify";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Text } from "../../common/Language";
import { useInput } from "../../utils/form";
import SignupForm from "../signUpForm";
import SetNewPassword from "./setNewPassword";
import Notification from "../../common/notification";
declare global {
  interface Window { GigaTester: any; }
}
export default function SignInForm(props: any) {
  const useStyles = makeStyles((theme) => ({
    bigLogo: {
      height: "40px",
      padding: theme.spacing(1),
    },
    dialogPaper: {
      minHeight: "90vh",
      maxHeight: "90vh",
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }));

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(props.openSignin);
  const [changePasswordState, setChangePasswordState] = useState(props.changePassword);
  const saveUserData = useActions(saveUserDetails);
  const [dialogPage, setDialogPage] = useState("login");
  const [newPasswordState, setNewPasswordState] = useState(false);
  const classes = useStyles();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [newSignInUser, setNewSignInUser] = useState(undefined);
  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: verificationCode, bind: bindVerificationCode } = useInput("");
  const { value: oldPassword, bind: bindOldPassword } = useInput("");
  const { value: newPassword, bind: bindNewPassword } = useInput("");
  const { value: confirmNewpassword, bind: bindConfirmNewPassword } = useInput("");
  const [allowedDomains, setAllowedDomains] = useState(['dish.com', 'gmail.com'])
  let userData: any = {}

  const handleSuccessfulSignIn = (user: any) => {
    const tokenInfo: any = jwtDecode(
      user.signInUserSession.idToken.jwtToken
    );
    console.log(tokenInfo);
    localStorage.setItem('authToken', user.signInUserSession.idToken.jwtToken);
    saveUserData({
      idToken: user.signInUserSession.idToken.jwtToken,
      accessToken: user.signInUserSession.accessToken,
      userDetails: jwtDecode(user.signInUserSession.idToken.jwtToken),
      team:
        tokenInfo["custom:teamName"] &&
        tokenInfo["custom:teamName"] !== ""
          ? tokenInfo["custom:teamName"]
          : "Others",
      roles: tokenInfo["cognito:groups"],
    });

    //set the feedback component's context
    userData.email = tokenInfo['email']
    if(typeof window.GigaTester !== 'undefined'){
      window.GigaTester.setUserDetails(userData);
      window.GigaTester.setDefaultCategory("Admin-Bug", "BUGS");
      window.GigaTester.setDefaultCategory("Admin", "FEEDBACK");
    }

    if (tokenInfo["cognito:groups"].length) {
      if (
        tokenInfo["cognito:groups"].includes("Admin") ||
        tokenInfo["cognito:groups"].includes("Manager")
      ) {
        return (
          history.push("/admin"),
          setLoading(true),
          closeDialog()
        );
      } else {
        return (
          history.push("/profile"),
          setLoading(true),
          closeDialog()
        );
      }
    }
  };

  const notifyError = (message: string) => {
    if(message.includes("auth lambda trigger is not configured")) {
      message = "User does not exist";
    }
    if(message.includes("Username/Custom")) {
      message = "User does not exist";
    }
    setNotify({
      isOpen: true,
      message: message,
      type: "error",
    });
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$^*.\[\]{}\(\)\?\-\"\!@#%&\/\\,><\':;|_~`+\=])(?=.{8,20})/; //any of these should be allowed ^$*.[]{}()?-"!@#%&/\,><':;|_~`+=
    return re.test(password);
  };

  const validateNewPasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      notifyError("Password and Confirm Password should be same");
      return false;
    }
    if (!validatePassword(confirmPassword)) {
      notifyError("Password must contain 8 to 20 characters including a lower-case letter, an upper-case letter, a number and a special character.");
      return false;
    }
    return true;
  };

  const submitForgotPassword = async () => {
    if(!validateNewPasswords(newPassword, confirmNewpassword)) {
      setLoading(false);
      return;
    }
    Auth.forgotPasswordSubmit(email, verificationCode, confirmNewpassword)
      .then((response) => {
        setLoading(false);
        setNotify({
          isOpen: true,
          message: "Password reset successfully",
          type: "success",
        });
        setTimeout(() => {
          closeDialog();
        }, 2000);
      })
      .catch((e) => {
        notifyError(e.message);
        setLoading(false);
      });
  };

  const submitChangePassword = async () => {
    if(!validateNewPasswords(newPassword, confirmNewpassword)) {
      setLoading(false);
      return;
    }
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, oldPassword, confirmNewpassword);
    })
    .then((response) => {
      setLoading(false);
      setNotify({
        isOpen: true,
        message: "Password changed successfully",
        type: "success",
      });
      setTimeout(() => {
        closeDialog();
      }, 2000);
    })
    .catch((e) => {
      notifyError(e.message);
      setLoading(false);
    });
  };

  const submitNewPasswordRequest = async (user: any) => {
    if(!validateNewPasswords(newPassword, confirmNewpassword)) {
      setLoading(false);
      return;
    }
//    if (confirmNewpassword && newPassword === confirmNewpassword) {
      Auth.completeNewPassword(user, confirmNewpassword, { email: email })
      .then((newUser) => {
        if (newUser && newUser.signInUserSession.idToken && newUser.signInUserSession.accessToken) {
          handleSuccessfulSignIn(newUser);
        } else {
          notifyError("Set password failed. Please try again");
        }
        setLoading(false);
      })
      .catch((e) => {
        notifyError(e.message);
        setLoading(false);
      });
//    }
  };

  const submitSignInRequest = async () => {
    try {
      const user = await Auth.signIn(email, password);
      if (user && user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setNewSignInUser(user);
        setNewPasswordState(true);
//        submitNewPasswordRequest(user);
      } else if (user && user.signInUserSession.idToken && user.signInUserSession.accessToken) {
        handleSuccessfulSignIn(user);
      } else {
        notifyError("Login failed. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      let e: any = error;
      notifyError(e.message);
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let extention = getSecondPart(String(email).toLowerCase()) || "";
    if(!re.test(String(email).toLowerCase())) {
      notifyError("Please enter a valid email");
    } else if(allowedDomains.indexOf(extention) < 0){
      notifyError("Please use your official organization email");
    }
    return re.test(String(email).toLowerCase()) && allowedDomains.indexOf(extention) > -1 ? true : false;
  };
  
  const getSecondPart = (str: string) =>  {
    return str.split('@').pop();
  }

  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    if(validateEmail(email)){
      console.log("In handleSubmit");
      setLoading(true);
      if (verificationCode) {
        submitForgotPassword();
      } else if (changePasswordState) {
        submitChangePassword();
      } else if (newPasswordState && newSignInUser) {
        submitNewPasswordRequest(newSignInUser);
      } else {
        submitSignInRequest();
      }
    } else {      
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    props.setSignInState(false);
  };

  const onSignUp = () => {
    setDialogPage("signUp");
  };

  const getSignInForm = (state: boolean) => {
    setDialogOpen(state);
  };

  const onForgotPassword = () => {
    setLoading(false);
    setNotify({
      isOpen: true,
      message: "Loading...",
      type: "info",
    });
    if (email) {
      Auth.forgotPassword(email)
      .then((data) => {
        setNewPasswordState(true);
        setForgotPassword(true);
      })
      .catch((e) => {
        notifyError(e.message);
        setLoading(false);
      });
    } else {
      notifyError("Please enter email id. We will send a verification code to reset your password");
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Dialog
        className={classes.dialogPaper}
        open={dialogOpen}
        aria-labelledby="form-dialog-title"
        onClose={closeDialog}
        fullWidth={dialogPage === "signUp"}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textAlign: "center", padding: "30px 0px" }}
        >
          <Typography style={{ fontSize: "26px" }}>
            <Text tid={"gigaTester"} />
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dialogPage === "login" ? (
            <Container component="main" maxWidth="xs">
              {!newPasswordState && !changePasswordState ? (
                <Typography variant="h6">
                  <Text tid={dialogPage} />
                </Typography>
              ) : (
                <div/>
              )}
              <CssBaseline />
              <Box component="form" onSubmit={handleSubmit}>
                {!newPasswordState && !changePasswordState ? (
                  <Fragment>
                    <TextField                      
                      margin="dense"
                      fullWidth
                      id="email"
                      label="Email *"
                      type="email"
                      {...bindEmail}
                      autoFocus
                    />
                    <TextField
                      margin="dense"
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      {...bindPassword}
                    />
                  </Fragment>
                ) : (
                  <SetNewPassword
                    bindNewPassword={bindNewPassword}
                    bindConfirmNewPassword={bindConfirmNewPassword}
                    bindVerificationCode={bindVerificationCode}
                    forgotPassword={forgotPassword}
                    bindOldPassword={bindOldPassword}
                    changePasswordState={changePasswordState}
                  />
                )}
                <br />
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
                  {loading && (
                    <CircularProgress size={20} style={{ marginRight: 20 }} />
                  )}
                  {!newPasswordState && !changePasswordState ? "Login" : "Send"}
                </Button>
              </Box>
              <br />
              {!newPasswordState && !changePasswordState && (
                <Fragment>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={onForgotPassword}
                      >
                        {"Forgot password?"}
                      </Link>
                    </Grid>
                    <Grid item>
                      {/* <Link
                        component="button"
                        variant="body2"
                        onClick={onSignUp}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link> */}
                    </Grid>
                  </Grid>
                  <br />
                </Fragment>
              )}
            </Container>
          ) : (
            <SignupForm getSignInForm={getSignInForm} />
          )}
        </DialogContent>
      </Dialog>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}
