import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles((theme) => ({
    recordValue: {
        color: '#F9F9F9',
        textShadow: '1px 1px 1px #808080'
    },
}));

const RecordsCount = (props: any) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}  >
            {props.records && props.records.map((item: any, index: number) => {
                return (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <Paper className="recordsCountSection sectionBackground" data-testid={`recordCount-${item.name}`}>
                            <Typography data-testid='recordName'> {item.name} </Typography>
                            <Typography variant="h5" className={classes.recordValue} data-testid='recordCount'>{item.value}</Typography>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default RecordsCount;
