import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  InputLabel,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Http } from "../../../utils";
import "../style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: '20px',
    padding: '5px 2px 5px 15px',

    "& > *": {
      margin: theme.spacing(3),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const TestersView = (props: any) => {
  const classes = useStyles();
  console.log(props.testerList, "props");
  //   useEffect(() => {
  //     const getTestersList = () => {
  //       console.log(
  //         props.superUserStateVariable,
  //         "props.superUserStateVariabletester"
  //       );
  //       setTimeout(() => {
  //         Http.get({
  //           url: "/api/v2/admin/users/",
  //           state: props.superUserStateVariable,
  //         })
  //           .then((response: any) => {
  //             console.log(response);
  //             // setPlatformList(response.platforms);
  //           })
  //           .catch((error: any) => {
  //             console.log(error);
  //           });
  //       }, 1000);
  //     };
  //     getTestersList();
  //   }, [props.superUserStateVariable]);

  return (
    <div data-testid="testers">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography className="headerText" data-testid="header">
            Testers
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className="button buttonMarginLeftPane"
            data-testid="viewAllButton"
          >
            View All
          </Button>
        </Grid>
      </Grid>
      <Paper className="sectionBackground sectionBorder">
        <div className={classes.root}>
          {props.testerList.length &&
            props.testerList.slice(0, 6).map((item: any, index: number) => {
              return (
                <Grid
                  item
                  xs={2}
                  sm={2}
                  key={item.emailId}
                  style={{ margin: "5px" }}
                >
                  <Avatar
                    alt={item.emailId}
                    src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"
                    className={classes.large}
                  />
                  <Grid item xs={2} sm={2}>
                    <InputLabel>
                      {
                        item.emailId
                          .split(".")[0]
                          .split("@")[0]
                          .split(/[0-9]/)[0]
                      }
                    </InputLabel>
                  </Grid>
                </Grid>
              );
            })}
        </div>
      </Paper>
    </div>
  );
};

export default TestersView;
