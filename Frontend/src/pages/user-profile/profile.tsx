import React from "react";
import {
    Grid,
    makeStyles,
    Container,
} from "@material-ui/core";
import UserProfileStatus from "../../components/userProfileStatus";
import Loader from "../../components/loader";
import ProfileForm from "../../components/userProfileForm";

const useStyles = makeStyles(() => ({}));

export default function Profile(props: any) {
    const { userState, userDataFetched, getUserParamState } = props;

    return (
        <div data-testid="profileForm">
            {userDataFetched ? (
                <Grid container spacing={2} data-testid="profileForm">
                    <Grid item xs={12} sm={4}>
                        {" "}
                        <UserProfileStatus user={userState.values.emailId} />
                    </Grid>
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
