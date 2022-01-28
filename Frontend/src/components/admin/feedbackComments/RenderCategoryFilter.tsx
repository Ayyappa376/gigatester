import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    setFocusCategory: Function;
    focusCategory: string[];
    disableButtons: boolean;
    categoryList: string[];
}

const categoryList = [
    "Audio", "Video", "Screen", "Images", "Other"
]
const RenderCategoryFilter = (props: IProps) => {
    const {focusCategory, setFocusCategory, categoryList} = props;

    const handleKeywordClick = (val: string) => {
        if(props.disableButtons) {
            return;
        }
        if(focusCategory.indexOf(val) > -1) {
            setFocusCategory((prevValue: string[]) => {
                const prevValCopy = [...prevValue]
                prevValCopy.splice(prevValue.indexOf(val), 1);
                return prevValCopy;
            });
        } else {
            setFocusCategory((prevVal: string[]) => {
                return [...prevVal, val]
            });
        }
    }

    return (
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose bugs with category:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {categoryList.map((val) => 
                    <Button variant='outlined' key={val} onClick={() => {handleKeywordClick(val)}} id={focusCategory.indexOf(val) != -1 ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{val}</Button>
                )}
            </div>
        </div>
    )
}


export default RenderCategoryFilter;