import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

interface IProps {
    onSelect: Function
}

const categoryList = [
    "Audio", "Video", "Screen", "Images", "Other"
]
const RenderCategoryFilter = (props: IProps) => {
    const classes = useStyles();
    const [category, setCategory] =useState("");

    const handleKeywordClick = (val: string) => {
        if(category === val) {
            props.onSelect("");
            setCategory("")
        } else {
            props.onSelect(val);
            setCategory(val);
        }
    }

    return (
        <div className={classes.ratingBlock}>
            <div className={classes.textContainer}>
                <Typography className={classes.textHeader}>Choose bugs with category:</Typography>
            </div>
            <div className={classes.flexContainer}>
                {categoryList.map((val) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(val)}} className={category === val ? classes.btnVisited : classes.btn}>{val}</Button>
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

export default RenderCategoryFilter;