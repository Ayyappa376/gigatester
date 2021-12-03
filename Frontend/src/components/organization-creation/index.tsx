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

export default function CreateOrganization(props: any) {
    const classes = useStyles();
    const [userParamState, setUserParamState] = React.useState<any>({});
    // const stateVariable = useSelector((state: IRootState) => {
    //   return state;
    // });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [checkBox, setcheckBox] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(props.openOrgCreation);
    // const saveUserData = useActions(saveUserDetails);
    const [errorMessage, setErrorMessage] = useState("");
    const [openSignin, setOpenSignin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [superUserStateVariable, setSuperUserStateVariable] = useState(
        props.superUserStateVariable
    );
    // console.log(props.superUserStateVariable);

    // const validateEmail = (email: string) => {
    //     const re =
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // };

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

    const closeAlert = () => {
        setSnackbarOpen(false);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        props.handleCloseOrganizationCreation(false);
        // props.getSignInState(false);
    };

    // const handleSubmit = () => {

    // };

    const orgCreationForm = () => {
        return (
            <React.Fragment>
                {/* <Typography variant="h6">
                    <Text tid="createAccount" />
                </Typography> */}
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
                    <br />

                    <Grid item xs={1} sm={1}></Grid>
                    <Grid item xs={3} sm={3}>
                        {/* <Button
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
                        </Button> */}
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    };

    const orgCreationAcknowledgement = () => {
        return (
            <React.Fragment>

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
            {/* <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={closeAlert}
            >
                <Alert onClose={closeAlert} severity="error">
                    {errorMessage && errorMessage}
                </Alert>
            </Snackbar> */}
        </Container>
    );
}
