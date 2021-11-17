import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import '../style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const TestersView = (props: any) => {
    const classes = useStyles();

    return (
        <div data-testid="testers">
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <Typography className='headerText' data-testid="header">Testers</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="primary" size='small' className='button buttonMarginLeftPane' data-testid="viewAllButton">
                        View All
                    </Button>
                </Grid>
            </Grid>
            <Paper className="sectionBackground sectionBorder" >
                <div className={classes.root}>
                    {props.testersList && props.testersList.map((item: any, index: number) => {
                        return (
                            <Avatar alt={item.label} src={item.imgPath} className={classes.large} key={index} />
                        )
                    })
                    }
                </div>
            </Paper >
        </div>
    );
};

export default TestersView;
