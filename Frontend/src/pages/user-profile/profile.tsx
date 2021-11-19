import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  // FormControl,
  Container,
  // MenuItem,
  // Select,
  // InputLabel,
  // Input,
  // Chip,
} from "@material-ui/core";
import Loader from "../../components/loader";
import { IUserParams, IUserAttributes } from "../../model";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DevicesOutlinedIcon from "@material-ui/icons/DevicesOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ProfileForm from "../../components/userProfileForm";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const useStyles = makeStyles(() => ({}));

export default function Profile(props: any) {
  const classes = useStyles();
  const { userState, userDataFetched, getUserParamState } = props;

  return (
    <div data-testid="profileForm">
      {userDataFetched ? (
        <Grid container spacing={2} data-testid="profileForm">
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={8}>
            <ProfileForm
              userState={userState}
              userDataFetched={userDataFetched}
              getUserParamState={getUserParamState}
            />
          </Grid>
        </Grid>
      ) : (
        <Container className="loaderStyle">
          <Loader />
        </Container>
      )}
    </div>
  );
}
