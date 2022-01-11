import React, { useState } from "react";
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
//import SignInForm from "../signInForm";
import { IOrganizationInfo, STATUS_VERIFY_ORG_PENDING } from "../../model/admin/organization";

const useStyles = makeStyles((theme) => ({
  bigLogo: {
      height: "40px",
      padding: theme.spacing(1),
  },
  dialogPaper: {
      minHeight: "100vh",
      maxHeight: "100vh",
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
}));

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateOrganization(props: any) {
  const classes = useStyles();
  const [orgData, setOrgData] = useState<any>({});
//  const [userParamState, setUserParamState] = React.useState<any>({});
  // const stateVariable = useSelector((state: IRootState) => {
  //   return state;
  // });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [checkBox, setcheckBox] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(props.openOrgCreation);
  // const saveUserData = useActions(saveUserDetails);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMsg, setValidationMsg] = useState(
    "Please fill out email field to sign up"
  );
//    const [openSignin, setOpenSignin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superUserStateVariable, setSuperUserStateVariable] = useState(
      props.superUserStateVariable
  );
  // console.log(props.superUserStateVariable);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChangeValue = (event: any) => {
    if (orgData) {
      const temp: any = { ...orgData };
      temp[event.target.name] = event.target.value;
      setOrgData(temp);
    }
  };

  const closeAlert = () => {
    setSnackbarOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    props.handleCloseOrganizationCreation(false);
    // props.getSignInState(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { email } = orgData;
    // console.log(superUserStateVariable);
    if (validateEmail(email)) {
      if (checkBox) {
        const postData = orgData;
        postData.id = '';
        postData.status = STATUS_VERIFY_ORG_PENDING;
        console.log(superUserStateVariable, 'superUserStateVariable');
        try {
          Http.post({
            url: `/api/v2/organizations`,
            body: { organization: {
              ...postData,
            } },
            state: superUserStateVariable,
          })
            .then((response: any) => {
              setVerifyEmail(true);
              setLoading(false);
              // setNewUserPosted(true);
            })
            .catch((error) => {
              console.log(error);
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

  const orgCreationForm = () => {
    return (
      <React.Fragment>
        <Typography variant="h6">
          <Text tid="registerCompany" />
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="name"
              name="name"
              label="Company Name"
              value={orgData.name || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Contact Phone/Mobile"
              value={orgData.phone || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Contact Email"
            value={orgData.email || ""}
            fullWidth
            onChange={handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="addressLine1"
            name="addressLine1"
            label="Full address"
            value={orgData.addressLine1 || ""}
            fullWidth
            onChange={handleChangeValue}
          />
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              value={orgData.city || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              value={orgData.country || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="state"
              name="state"
              label="State"
              value={orgData.state || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              value={orgData.zipCode || ""}
              fullWidth
              onChange={handleChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="website"
            name="website"
            label="Website"
            value={orgData.website || ""}
            fullWidth
            onChange={handleChangeValue}
          />
        </Grid>
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
{"of this site."}<br />
        </Grid>
        <br />
        <br />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={8} sm={8}>
            {"Already registered. "} 
            <Link component="button" variant="body2">
              {" Login here."}
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
              Send request
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const orgCreationAcknowledgement = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Thank you for requesting to register with us.
        </Typography>
        <Typography variant="subtitle1">
          Our representative will contact you soon on the phone number you provided 
          <br />
          and work with you to create a dedicated setup for your organization.
          <br />
          The email you provided will be used as the default administrator's email.
        </Typography>
        <Box style={{ textAlign: "center", margin: "30px 0" }}>
          <Button variant="contained" onClick={closeDialog}>
            Close
          </Button>
          <br />
        </Box>
      </React.Fragment>
    );
  };

  const orgCreationDialog = () => {
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
            <IconButton aria-label="close" className={classes.closeButton} onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ marginBottom: "20px" }}>
            <CssBaseline />
            {verifyEmail ? orgCreationAcknowledgement() : orgCreationForm()}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };

  return (
    <Container component="main" maxWidth="sm" style={{ paddingBottom: "20px" }}>
      {orgCreationDialog()}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error">
          {errorMessage && errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
