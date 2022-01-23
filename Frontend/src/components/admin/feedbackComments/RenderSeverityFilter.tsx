import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    setFocusSeverity: Function;
    focusSeverity: string[];
    disableButtons: boolean;
}

const severityList = [
    "Critical", "High", "Medium", "Low"
]
const RenderSeverityFilter = React.memo((props: IProps) => {
    const {focusSeverity, setFocusSeverity} = props;

    const handleKeywordClick = (val: string) => {
        if(props.disableButtons) {
            return;
        }
        if(focusSeverity.indexOf(val) > -1) {
            setFocusSeverity((prevValue: string[]) => {
                const prevValCopy = [...prevValue]
                prevValCopy.splice(prevValue.indexOf(val), 1);
                return prevValCopy;
            });
        } else {
            setFocusSeverity((prevVal: string[]) => {
                return [...prevVal, val]
            });
        }
    }

    return (
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose bugs with severity:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {severityList.map((el) => {
                    return <Button variant='outlined' disabled={props.disableButtons}
                    key={el} onClick={() => {handleKeywordClick(el)}} id={focusSeverity.indexOf(el) != -1 ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el}</Button>
                }
                )}
            </div>
        </div>
    )
})

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

export default RenderSeverityFilter;