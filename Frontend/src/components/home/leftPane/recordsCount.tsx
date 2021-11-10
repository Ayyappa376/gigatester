import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../style.css';

const records = [
    { name: 'Testers', value: '220' }, { name: 'Products', value: '20' }, { name: 'Ongoing Testing', value: '35' }
]

const useStyles = makeStyles((theme) => ({
    recordValue: {
        color: '#F9F9F9',
        textShadow: '1px 1px 1px #808080'
    },
}));

function RecordsCount() {
    const classes = useStyles();

    return (
        <Grid container spacing={2}  >
            {records.map((item, index) => {
                return (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <Paper className="recordsCountSection sectionBackground">
                            <Typography> {item.name} </Typography>
                            <Typography variant="h5" className={classes.recordValue} >{item.value}</Typography>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default RecordsCount;
