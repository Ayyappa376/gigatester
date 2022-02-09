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
  createMuiTheme,
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
  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: verificationCode, bind: bindVerificationCode } = useInput("");
  const { value: newPassword, bind: bindNewPassword } = useInput("");
  const { value: confirmNewpassword, bind: bindConfirmNewPassword } =
    useInput("");
  let userData: any = {}
  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
    return re.test(password);
  };
  const sampleDefaultCategory = (params: any) => {
    return (params === "BUGS") ? "Audio" : "Ratings";
  }

  const sampleUserData = function(){
      return userData
  }

  const handleSubmit = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setLoading(true);
    if (verificationCode) {
      if (newPassword !== confirmNewpassword) {
        setNotify({
          isOpen: true,
          message: "Password and Confirmation Password should be the same",
          type: "error",
        });
        setLoading(false);
        return;
      } else if (!validatePassword(confirmNewpassword)) {
        setNotify({
          isOpen: true,
          message:
            "A password must contain at least 8 characters including a lower and an upper-case letter, special character, number.",
          type: "error",
        });
        setLoading(false);
        return;
      }
      Auth.forgotPasswordSubmit(email, verificationCode, confirmNewpassword)
        .then((response) => {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: "Reset Password has been successful",
            type: "success",
          });
          setTimeout(() => {
            closeDialog();
          }, 2000);
        })
        .catch((e) => {
          setNotify({
            isOpen: true,
            message: "Something Went Wrong. Please try again",
            type: "error",
          });
          setLoading(false);
        });
    } else {
      try {
        const user = await Auth.signIn(email, password);
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          setLoading(false);
          setNewPasswordState(true);
          if (newPassword !== confirmNewpassword) {
            setNotify({
              isOpen: true,
              message: "Password and Confirm Password should be same",
              type: "error",
            });
            return;
          }
          if (confirmNewpassword && newPassword === confirmNewpassword) {
            Auth.completeNewPassword(
              user, // the Cognito User Object
              confirmNewpassword, // the new password
              {
                email: email,
              }
            )
              .then((user) => {
                if (
                  user &&
                  user.signInUserSession.idToken &&
                  user.signInUserSession.accessToken
                ) {
                  const tokenInfo: any = jwtDecode(
                    user.signInUserSession.idToken.jwtToken
                  );
                  localStorage.setItem('authToken', user.signInUserSession.idToken.jwtToken);
                  saveUserData({
                    idToken: user.signInUserSession.idToken.jwtToken,
                    accessToken: user.signInUserSession.accessToken,
                    userDetails: jwtDecode(
                      user.signInUserSession.idToken.jwtToken
                    ),
                    team:
                      tokenInfo["custom:teamName"] &&
                      tokenInfo["custom:teamName"] !== ""
                        ? tokenInfo["custom:teamName"]
                        : "Others",
                    roles: tokenInfo["cognito:groups"],
                  });

                  if (tokenInfo["cognito:groups"].length) {
                    if (
                      tokenInfo["cognito:groups"].includes("Admin") ||
                      tokenInfo["cognito:groups"].includes("Manager")
                    ) {
                      return (
                        history.push("/admin"),
                        setDialogOpen(false),
                        setLoading(true)
                      );
                    } else {
                      return (
                        history.push("/profile"),
                        setDialogOpen(false),
                        setLoading(true)
                      );
                    }
                  }
                }
              })
              .catch((e) => {
                setNotify({
                  isOpen: true,
                  message: "Something Went Wrong. Please try again",
                  type: "error",
                });
                setLoading(false);
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
          if (tokenInfo["cognito:groups"].length) {
            console.log(tokenInfo);
            console.log(tokenInfo['email']);
            userData.email = tokenInfo['email']
            if(typeof window.GigaTester !== 'undefined'){
              // window.GigaTester.selectDefaultCategory(sampleDefaultCategory)
              // window.GigaTester.appUserDetails(sampleUserData)
              window.GigaTester.setUserDetails(userData);
              window.GigaTester.setDefaultCategory("Audio", "BUGS");
              window.GigaTester.setDefaultCategory("General", "FEEDBACK");
            }
            if (
              tokenInfo["cognito:groups"].includes("Admin") ||
              tokenInfo["cognito:groups"].includes("Manager")
            ) {
              return history.push("/admin"), setDialogOpen(false);
            } else {
              return history.push("/profile"), setDialogOpen(false);
            }
          }
        }
      } catch (error) {
        let errResponse: any = error;
        setNotify({
          isOpen: true,
          message: errResponse.message,
          type: "error",
        });
        setLoading(false);
      }
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    props.getSignInState(false);
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
        .catch((error) => {
          let errResponse: any = error;
          setNotify({
            isOpen: true,
            message: errResponse.message,
            type: "error",
          });
          // setErrorMessage(errResponse.message);
          setLoading(false);
          // setSnackbarOpen(true);
        });
    } else {
      setNotify({
        isOpen: true,
        message:
          "Please enter email id. We will send a verification code to reset a password",
        type: "info",
      });
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
          <Typography variant="h4">
            <Text tid={"gigaTester"} />
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dialogPage === "login" ? (
            <Container component="main" maxWidth="xs">
              <Typography variant="h6">
                <Text tid={dialogPage} />
              </Typography>
              <CssBaseline />
              <Box component="form" onSubmit={handleSubmit}>
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
                      // required={!forgotPassword}
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
                  {!newPasswordState ? "Login" : "Send"}
                </Button>
              </Box>
              <br />
              {!newPasswordState && (
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
