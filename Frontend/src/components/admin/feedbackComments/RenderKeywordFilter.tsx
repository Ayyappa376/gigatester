import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

interface IKeywordFilterProps {
    onSubmit: Function;
    onClear: Function;
    keywords: string[];
}

const keywords = [
    "Audio", "Video", "Sample", "Screen", "Lag", "Slow", "Software", "Frame-loss", "Error", "Recordings"
]


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
        <div className={classes.keywordBlock}>
            <div className={classes.textContainer}>
                <Typography className={classes.textHeader}>Read comments that mention:</Typography>
            </div>
            <div className={classes.flexContainerKeywords}>
                {keywords.map((el) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(el)}} className={keyword === el ? classes.btnVisited : classes.btn}>{el}</Button>
                )}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    keywordBlock: {
        marginLeft: 0,
        '&:hover':{
            color: '#000',
            backgroundColor: '#fff'
        }
    },
    flexContainerKeywords: {
        display: 'flex',
        flexWrap: 'wrap',
        '&:hover':{
            color: '#000',
            backgroundColor: '#fff'
        }
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

export default RenderKeywordFilter;