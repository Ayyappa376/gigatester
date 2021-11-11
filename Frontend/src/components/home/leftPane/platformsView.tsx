import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, InputLabel, Paper, Typography } from '@material-ui/core';
import '../style.css';

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

const useStyles = makeStyles(() => ({
    img: {
        height: 40,
        width: 40,
        borderRadius: '20%',
    },
    block: {
        padding: '10px 20px',
        borderLeft: '2px solid #000000'
    },
    subTitle: {
        fontSize: '12px',
        paddingTop: '2px',
    }
}));

function PlatformsView() {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <Typography className='headerText'>Platforms</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="primary" size='small' className='button buttonMarginLeftPane'>
                        View All
                    </Button>
                </Grid>
            </Grid>
            <Paper className="platformViewSection sectionBackground sectionBorder" >
                <Grid container spacing={3} >
                    {platformList.map((item, index) => {
                        return (
                            <Grid item xs={12} sm={6} key={index} >
                                <Paper className={classes.block} >
                                    <Grid container spacing={4} >
                                        <Grid item xs={3} sm={3} md={3} >
                                            <img className={classes.img} src={item.imgPath} alt={item.label} />
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9}>
                                            <Typography>{item.label}</Typography>
                                            <InputLabel className={classes.subTitle}>{item.label}</InputLabel>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper >
        </Fragment>
    );
};

export default PlatformsView;
