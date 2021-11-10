import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, InputLabel, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#F0F0F0',
        padding: '10px',
        fontFamily: 'Montserrat'
    },
    title: {
        padding: '10px 0px',
        fontWeight: 600
    },
    subTitle: {
        fontSize: '14px',
        lineHeight: '20px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    button: {
        margin: '20px 0px',
        borderRadius: "5em",
        lineHeight: 1.4
    },
}));

function TopPane() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                    <Typography className={classes.title} >Become a Tester?</Typography>
                    <InputLabel className={classes.subTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text</InputLabel>
                    <Button variant="outlined" color="primary" size='small' className={classes.button}>
                        Click Here
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2} />
                <Grid item xs={12} sm={4} style={{ textAlign: 'left' }}>
                    <Typography className={classes.title}>Test my Product?</Typography>
                    <InputLabel className={classes.subTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text</InputLabel>
                    <Button variant="outlined" color="primary" size='small' className={classes.button}>
                        Click Here
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1} />
            </Grid>
        </Paper >
    );
}

export default TopPane;
