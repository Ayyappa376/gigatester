import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    onSelect: Function
}

const categoryList = [
    "Audio", "Video", "Screen", "Images", "Other"
]
const RenderCategoryFilter = (props: IProps) => {
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
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose bugs with category:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {categoryList.map((val) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(val)}} id={category === val ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{val}</Button>
                )}
            </div>
        </div>
    )
}


export default RenderCategoryFilter;