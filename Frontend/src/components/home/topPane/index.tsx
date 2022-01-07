import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "../style.css";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F0F0F0",
    paddingTop: "50px",
    fontFamily: "Montserrat",
    width: "100%",
    height: '16em'
  },
  title: {
    padding: "10px 15px",
  },
  text: {
    padding: "5px 15px",
    fontSize: "14px",
    lineHeight: "20px",
    colour: '#999999',
  },
}));

const TesterEvents = (props: any) => {
  const classes = useStyles();
  //   const [openSignup, setOpenSignup] = useState(false);
  const handleSignup = () => {
    props.getSignupDialog(true);
    // setOpenSignup(true);
  };

  const handleOrganizationSelection = () => {
    props.getOrganizationSelectionDialog(true);
    // setOpenSignup(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} data-testid="testerEvents">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={5} style={{ textAlign: "right" }}>
            <Typography variant="h6" className={classes.title}>Become a Tester?</Typography>
            <Typography className={classes.text}>
              Register as tester, search with the name of devices that you will test on,
              choose from a wide range of products and provide valuable early feedback.
              Earn for each successful tests completed.
            </Typography>
            <Button
              variant="outlined"
              onClick={handleSignup}
              color="primary"
              size="small"
              className="button buttonMarginTopPane"
              data-testid="signUp"
            >
              Register as Tester
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} style={{ textAlign: "left" }}>
            <Typography variant="h6" className={classes.title}>Test my Product?</Typography>
            <Typography className={classes.text}>
              Register your company to get your products crowd tested by professional testers
              and end users. Receive valuable feedback, bugs, recomendations; communicate with 
              them and derive valuable insights.
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOrganizationSelection}
              color="primary"
              size="small"
              className="button buttonMarginTopPane"
              data-testid="signIn"
            >
              Register your Company
            </Button>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default TesterEvents;
