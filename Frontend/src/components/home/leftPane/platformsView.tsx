import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, InputLabel, Paper, Typography } from "@material-ui/core";
import { Http } from "../../../utils";
import { useSelector } from "react-redux";
import { IRootState } from "../../../reducers";
import "../style.css";

const useStyles = makeStyles(() => ({
  img: {
    height: 40,
    width: 40,
    borderRadius: "20%",
  },
  block: {
    padding: "10px 20px",
    borderLeft: "2px solid #000000",
  },
  subTitle: {
    fontSize: "12px",
    paddingTop: "2px",
  },
}));

const PlatformsView = (props: any) => {
  const classes = useStyles();
  const [platformNames, setPlatformNames] = useState(props.platformList);
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  //   useEffect(() => {
  //     setTimeout(() => {
  //       Http.get({
  //         url: "/api/v2/platforms/",
  //         state: stateVariable,
  //       })
  //         .then((response: any) => {
  //           setPlatformNames(response.platforms);
  //         })
  //         .catch((error: any) => {
  //           console.log(error);
  //         });
  //     }, 5000);
  //   }, []);

  return (
    <div data-testid="platform">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography className="headerText" data-testid="header">
            Platforms
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
      <Paper className="platformViewSection sectionBackground sectionBorder">
        <Grid container spacing={3}>
          {props.platformList.length &&
            props.platformList.map((item: any) => {
              //   console.log(item);
              return (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Paper
                    className={classes.block}
                    data-testid={`platform-${item.id}`}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={3} sm={3} md={3}>
                        <img
                          className={classes.img}
                          src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
                          alt={item.id}
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9}>
                        <Typography>{item.name}</Typography>
                        <InputLabel className={classes.subTitle}>
                          {item.name}
                        </InputLabel>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </div>
  );
};

export default PlatformsView;
