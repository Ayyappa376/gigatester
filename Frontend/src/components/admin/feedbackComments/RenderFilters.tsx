import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

interface IProps {
    onSelect: Function
}

interface IKeywordFilterProps {
    onSubmit: Function;
    onClear: Function;
    keywords: string[];
}

const ratingButtonValues=[
    {discription: "1-Star-Rating", value: 1 },
    {discription: "2-Star-Rating", value: 2 },
    {discription: "3-Star-Rating", value: 3 },
    {discription: "4-Star-Rating", value: 4 },
    {discription: "5-Star-Rating", value: 5 },
]

const keywords = [
    "Audio", "Video", "Sample", "Screen", "Lag", "Slow", "Software", "Frame-loss", "Error", "Recordings"
]

const RenderRatingFilter = (props: IProps) => {
    const classes = useStyles();
    const [rating, setRating] =useState(0);

    const handleKeywordClick = (val: number) => {
        if(rating === val) {
            props.onSelect(-1);
            setRating(0)
        } else {
            props.onSelect(val);
            setRating(val);
        }
    }

    return (
        <div className={classes.ratingBlock}>
            <div className={classes.textContainer}>
                <Typography className={classes.textHeader}>Choose feedback with rating:</Typography>
            </div>
            <div className={classes.flexContainer}>
                {ratingButtonValues.map((el) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(el.value)}} className={rating === el.value ? classes.btnVisited : classes.btn}>{el.discription}</Button>
                )}
            </div>
        </div>
    )
}

export const RenderKeywordFilter = (props: IKeywordFilterProps) => {
    const classes = useStyles();
    const [keyword, setKeyword] = useState("");

    const handleKeywordClick = (val: string) => {
        if(keyword === val) {
            props.onClear();
            setKeyword("")
        } else {
            props.onSubmit(val);
            setKeyword(val);
        }
    }

    return (
        <div>
            <div className={classes.textContainer}>
                <Typography className={classes.textHeader}>Read comments that mention:</Typography>
            </div>
            <div className={classes.flexContainer}>
                {keywords.map((el) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(el)}} className={keyword === el ? classes.btnVisited : classes.btn}>{el}</Button>
                )}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    ratingBlock: {
        display: 'block',
        boxSizing: 'border-box',
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
       // justifyContent: 'space-between'
    },
    btn: {
        borderRadius: '0px',
        margin: '.4rem',
        transition: 'all .2s',
        '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        },
        '&:focus, &:active': {
            
            backgroundColor: 'transparent',
        }
    },
    btnVisited: {
        borderRadius: '0px',
        margin: '.4rem',
        transition: 'all .2s',
        '&:focus, &:active': {
            color: '#fff',
            backgroundColor: '#259ffb',
            transform: 'translateY(-1px) scale(1)',
            boxShadow: '0 5px 10px rgba(0,0,0,0.2)'
        }
    },
    textContainer: {
        textAlign: 'left',
        textSize: '1.1rem',
        marginLeft: '0.4rem',
    },
    textHeader: {
        fontWeight: 500,
        fontSize: '1.1rem'
    }
})

export default RenderRatingFilter;