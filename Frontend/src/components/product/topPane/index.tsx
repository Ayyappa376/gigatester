import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputLabel, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F0F0F0",
    paddingTop: "10px",
    fontFamily: "Montserrat",
    width: "100%",
    height: '10em'
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

  return (
    <React.Fragment>
      <Paper className={classes.root} data-testid="testerEvents">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography className={classes.title}>Tester</Typography>
            <InputLabel className={classes.subTitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum has been the industry standard dummy text
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={4} style={{ textAlign: "left" }}>

          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default TesterEvents;
