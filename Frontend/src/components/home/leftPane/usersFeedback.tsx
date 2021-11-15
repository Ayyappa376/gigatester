import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Grid, MobileStepper, Paper, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import '../style.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    img: {
        height: 50,
        width: 50,
        borderRadius: '50%'
    },
    sliderView: {
        margin: '10px 30px',
        overflow: 'hidden'
    }
}));

const UsersFeedback = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.usersFeedback && props.usersFeedback.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <div data-testid="userFeedback">
            <Typography className='headerText' data-testid="header">BUZZ</Typography>
            <Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    className="sliderBackground sliderBorder"
                >
                    {props.usersFeedback && props.usersFeedback.map((item: any, index: number) => (
                        <div key={item.label} className={classes.sliderView} >
                            {Math.abs(activeStep - index) <= 2 ? (
                                <div data-testid="feedbackMessage">
                                    <Grid container spacing={1} >
                                        <Grid item xs={12} sm={2} >
                                            <img className={classes.img} src={item.imgPath} alt={item.label} />
                                        </Grid>
                                        <Grid item xs={12} sm={10} >
                                            {item.label}
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : null}
                        </div>
                    ))
                    }
                </AutoPlaySwipeableViews >
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="dots"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} data-testid="nextButton">
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0} data-testid="backButton">
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </Button>
                    }
                >
                </MobileStepper> 
            </Paper >
        </div>
    );
}

export default UsersFeedback;
