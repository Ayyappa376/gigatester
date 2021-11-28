import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      // height: "350px",
      width: "300px",
      backgroundColor: "#F3F3F3",
      boxShadow: "0px 2px 8px #00000033",
      // alignItems: "center",
      // alignContent: "center",
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      marginLeft: "63px",
    },
  })
);

function LinearProgressWithLabel(props: any) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "5px",
        paddingBottom: "10px",
      }}
    >
      <Box style={{ width: "100%", margin: "5px" }}>
        <Box>
          <Typography display="inline" style={{ marginBottom: "15px" }}>
            Profile Progress
            <Typography
              display="inline"
              style={{ marginLeft: "90px" }}
            >{`${Math.round(props.value)}%`}</Typography>
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          style={{ marginTop: "10px" }}
          {...props}
        />
      </Box>
    </Box>
  );
}

export default function UserProfileStatus(props: any) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(10);
  const history = useHistory();

  useEffect(() => {
    props.updateProfile &&
      props.getUserProfileStatus(progress)
  }, [])

  const getProfilePage = () => {
    history.push("/profile")
  }

  return (
    <div className={classes.root}>
      {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className={classes.small}
      />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
      {/* <Paper> */}
      <Grid style={{ overflow: "hidden" }}>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <Avatar
            alt="Tester"
            src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"
            className={classes.large}
            style={{
              border: "7px solid white",
              paddingBottom: "40px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            style={{ textAlign: "center", fontSize: "16px", fontStyle: "bold" }}
          >
            Username
            <br />
            username@abc.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}></Grid>
        <Paper
          style={{
            backgroundColor: "#E7E7E7",
            display: "flex",
            alignItems: "center",
            margin: "10px",
            marginTop: "20px",
          }}
        >
          <LinearProgressWithLabel value={progress} />
        </Paper>
        <Grid item xs={12} sm={12}>
          <Paper
            style={{
              backgroundColor: "#E7E7E7",
              display: "flex",
              alignItems: "center",
              margin: "10px",
              marginTop: "30px",
            }}
          >
            <Typography style={{ margin: "5px", marginRight: "80px" }}>
              Status
            </Typography>
            <Button style={{ color: progress < 100 ? "red" : "green" }}>{progress < 100 ? 'Incomplete' : 'Completed'}</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            style={{ margin: "15px", color: "#969696", marginTop: "30px" }}
          >
            Complete your profile 100% to continue testing for products
          </Typography>
        </Grid>
        {props.updateProfile &&
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <Button variant="outlined" color="primary" size='medium' className='button' data-testid="save" onClick={getProfilePage}>
              Update Profile
            </Button>
          </div>
        }
      </Grid>
    </div>
  );
}
