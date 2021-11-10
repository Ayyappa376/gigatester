import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

const records = [
    { name: 'Testers', value: '220' }, { name: 'Products', value: '20' }, { name: 'Ongoing Testing', value: '35' }
]

function RecordsCount() {

    return (
        <Grid container spacing={2}  >
            {records.map((item, index) => {
                return (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <Paper style={{ background: '#F0F0F0', padding: '10px 20px' }}>
                            <Typography> {item.name} </Typography>
                            <Typography variant="h5" style={{ color: '#F9F9F9', textShadow: '1px 1px 1px #808080' }}> {item.value}</Typography>
                        </Paper>
                    </Grid>

                )
            })}
        </Grid>
    );
};

export default RecordsCount;
