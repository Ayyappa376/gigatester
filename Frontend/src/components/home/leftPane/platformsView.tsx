import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, InputLabel, Paper, Typography } from '@material-ui/core';

const platformList = [
    {
        label: 'San',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'Las',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: '20%',
        // margin: '10px 20px'
    },
}));

function PlatformsView() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper style={{ background: '#F0F0F0', borderTop: '2px solid #000000', padding: '20px' }}>
            <Grid container spacing={3} >
                {platformList.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} >
                            <Paper key={index} style={{ padding: '10px 20px', borderLeft: '2px solid #000000' }}>
                                <Grid container spacing={4} >
                                    <Grid item xs={3} sm={3} md={3} >
                                        <img className={classes.img} src={item.imgPath} alt={item.label} />
                                    </Grid>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography>{item.label}</Typography>
                                        <InputLabel style={{ fontSize: '12px' }}>{item.label}</InputLabel>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Paper >
    );
};

export default PlatformsView;
