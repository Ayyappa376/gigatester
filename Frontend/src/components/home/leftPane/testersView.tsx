import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import '../style.css';

const useStyles = makeStyles(() => ({
    img: {
        height: 60,
        width: 60,
        borderRadius: '50%',
        margin: '10px 20px'
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
                {props.testersList && props.testersList.map((item: any, index: number) => {
                    return (
                        <img aria-label='tester-pic' className={classes.img} src={item.imgPath} alt={item.label} key={index} />
                    )
                })
                }
            </Paper >
        </div>
    );
};

export default TestersView;
