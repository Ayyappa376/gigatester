import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, InputLabel, Paper, Typography } from '@material-ui/core';
import '../style.css';

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

const PlatformsView = (props: any) => {
    const classes = useStyles();
    return (
        <div data-testid="platform">
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <Typography className='headerText' data-testid="header" >Platforms</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="primary" size='small' className='button buttonMarginLeftPane' data-testid="viewAllButton">
                        View All
                    </Button>
                </Grid>
            </Grid>
            <Paper className="platformViewSection sectionBackground sectionBorder" >
                <Grid container spacing={3} >
                    {props.platformList && props.platformList.map((item: any, index: number) => {
                        return (
                            <Grid item xs={12} sm={6} key={index} >
                                <Paper className={classes.block} data-testid={`platform-${item.id}`} >
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
        </div >
    );
};

export default PlatformsView;
