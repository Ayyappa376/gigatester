import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Grid, InputLabel, Tabs, Tab, Typography } from '@material-ui/core';
import Profile from './profile';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    topBar: {
        width: '100%',
        height: '50px',
        boxShadow: '0px 2px 8px #00000033',
        opacity: 1,
        marginTop: '3.5em',
        background: '#F0F0F0 0% 0% no-repeat padding-box',
    },
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: '1em',
        // width: '80%',
    },
}));

export default function UserProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div className={classes.topBar}>
                <Grid container spacing={2} >
                    <Grid item xs={2} sm={2} />
                    <Grid item xs={6} sm={6} >
                        <InputLabel style={{ paddingTop: '12px' }} > Home | Profile </InputLabel>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" style={{ marginTop: '8px' }}>
                            Skip
                        </Button>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Button variant="outlined" color="primary" size='small' className='button' data-testid="save" style={{ marginTop: '8px' }}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} />
                </Grid>
            </div>

            <Grid container >
                <Grid item xs={2} sm={2} md={2} />
                <Grid item xs={8} sm={8} md={8} >
                    <div className={classes.root}>
                        <AppBar position="static" >
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Profile" {...a11yProps(0)} />
                                <Tab label="My History" {...a11yProps(1)} />
                                <Tab label="Other Details" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <Profile />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            My History
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Other Details
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>

        </Fragment>
    );
}
