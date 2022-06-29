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
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Http } from "../../utils";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers";
import { Text } from "../../common/Language";
import SignInForm from "../signInForm";
import { useActions, saveOrganizationDetails } from "../../actions";
import { IOrganizationInfo } from "../../model/organization";

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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  signUpBtn: {
    textAlign: "center",
    position: 'absolute',
    right: theme.spacing(1),
    bottom: theme.spacing(1),
  }
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
  const stateVariable = useSelector((state: IRootState) => state);
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
  const [allowedDomains, setAllowedDomains] = useState<string[] | undefined>(undefined);
  const saveOrganizationData = useActions(saveOrganizationDetails);
  
  useEffect(() => {
    const data: IOrganizationInfo | null = stateVariable.organizationDetails;    
    if(data){
      setAllowedDomains(data.emailDomains);
    } else {
      Http.get({
        url: '/api/v2/organizations/0',
        state: { stateVariable },
        customHeaders: { 
          noauthvalidate: 'true'
        },
      })
      .then((response: any) => {
        if(response){   
          console.log(response);       
          saveOrganizationData({            
            emailDomains: response?.organizationDetails?.emailDomains,
            name: response?.organizationDetails?.name,
            orgPrefix: response?.organizationDetails?.orgPrefix,
            url: response?.organizationDetails?.url,
            status: response?.organizationDetails?.status
          });
          setAllowedDomains(response?.organizationDetails?.emailDomains);
        }
      })
      .catch((error: any) => {
        console.log(error);      
      });
    }
  },[])
  
  const validateEmail = (email: string) => {
    console.log(email, allowedDomains);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let extention = getSecondPart(String(email).toLowerCase()) || "";
    if(!email || !re.test(email.toLowerCase())) {
      setValidationMsg("Please enter a valid email");
      return false;
    }
    if(allowedDomains && allowedDomains.length > 0 && allowedDomains.indexOf(extention) < 0){
      setValidationMsg("Please use your official organization email");
      return false;
    }
    return true;
  };
  
  const getSecondPart = (str: string) =>  {
    return str.split('@').pop();
  }

  const handleChangeValue = (event: any) => {
    if (userParamState) {
      const temp: any = { ...userParamState };
      temp[event.target.name] = event.target.value;
      setUserParamState(temp);
    }
  };

  const getSignInPage = () => {
    setOpenSignin(true);
    // props.handleCloseSignup(false);
  };

  const closeAlert = () => {
    setSnackbarOpen(false);
  };

  const closeDialog = () => {
    setOpenSignin(false);
    setDialogOpen(false);
    props.handleCloseSignup(false);
  };

  const setSignInState = (state: boolean) => {
    if(state) {
      setOpenSignin(state);
    } else {
      closeDialog();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const { emailId } = userParamState;
    if (validateEmail(emailId)) {
      if (checkBox) {
        const postData = userParamState;
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
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrorMessage(
              "Failed to register user."
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
      setErrorMessage('');
      // setValidationMsg("Please enter a valid email");
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const openSignUpForm = () => {
    setOpenSignin(false);
  }

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
              label={""}
              labelPlacement="end"
            />
            {"I agree to the"} <Link >{"Privacy and Terms and Conditions"} </Link>
            {"of this site."}
            <br />
          </Grid>
          <br />
          <br />
          <br />
          <Grid item xs={8} sm={8}>
            {"Already have an account. "} 
            <Link onClick={getSignInPage} component="button" variant="body2">
              <Text tid={"signIn"} />
            </Link>
          </Grid>
          <Grid item xs={4} sm={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              type="submit"
              // disabled={loading}
              className="signUpBtn"
              onClick={handleSubmit}
            >
              {loading && (
                <CircularProgress size={20} style={{ marginRight: 20 }} />
              )}
              <Text tid={"signUp"} />
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
          Thank you for registering with us.
        </Typography>
        <Typography variant="subtitle1">
          We have sent you a temporary password at the email address you provided in the form.{" "}
          <br />
          Please get the temporary password from your email and click the button below to
          <br />
          continue to create a new password and sign in.
        </Typography>
        <Box style={{ textAlign: "center", margin: "30px 0" }}>
          <Button variant="contained" onClick={getSignInPage}>
            Continue to SignIn
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
          // onClose={closeDialog}
          fullWidth={true}
        >
          <DialogTitle
            id="form-dialog-title"
            style={{ textAlign: "center", padding: "30px 0px" }}
          >
            <Typography variant="h4">
              <Text tid={"gigaTester"} />
            </Typography>
            {/* <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
              <CloseIcon />
            </IconButton> */}
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
    <SignInForm 
      openSignin={openSignin} 
      setSignInState={setSignInState} 
      changePassword={false} 
      openSignUpForm={openSignUpForm} 
    />
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
