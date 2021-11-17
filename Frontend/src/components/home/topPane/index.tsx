import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, InputLabel, Paper, Typography } from "@material-ui/core";
import SignupForm from "../../signUpForm";
import "../style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F0F0F0",
    padding: "10px",
    fontFamily: "Montserrat",
  },
  title: {
    padding: "10px 0px",
    fontWeight: 600,
  },
  subTitle: {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

const TesterEvents = (props: any) => {
  const classes = useStyles();
  //   const [openSignup, setOpenSignup] = useState(false);
  const handleSignup = () => {
    props.getSignupDialog(true);
    // setOpenSignup(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} data-testid="testerEvents">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography className={classes.title}>Become a Tester?</Typography>
            <InputLabel className={classes.subTitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum has been the industry standard dummy text
            </InputLabel>
            <Button
              variant="outlined"
              onClick={handleSignup}
              color="primary"
              size="small"
              className="button buttonMarginTopPane"
              data-testid="signUp"
            >
              Click Here
            </Button>
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={4} style={{ textAlign: "left" }}>
            <Typography className={classes.title}>Test my Product?</Typography>
            <InputLabel className={classes.subTitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum has been the industry standard dummy text
            </InputLabel>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className="button buttonMarginTopPane"
              data-testid="signIn"
            >
              Click Here
            </Button>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default TesterEvents;
