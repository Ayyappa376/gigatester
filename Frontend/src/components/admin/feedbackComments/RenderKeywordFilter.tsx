import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IKeywordFilterProps {
    onSubmit: Function;
    onClear: Function;
    keywords: string[];
}

const keywords = [
    "Audio", "Video", "Sample", "Screen", "Lag", "Slow", "Software", "Frame-loss", "Error", "Recordings"
]


export const RenderKeywordFilter = (props: IKeywordFilterProps) => {
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
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Read comments that mention:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {keywords.map((el) => 
                    <Button variant='outlined' key={el} onClick={() => {handleKeywordClick(el)}} id={keyword === el ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el}</Button>
                )}
            </div>
        </div>
    )
}

export default RenderKeywordFilter;