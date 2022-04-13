import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import './stylesRenderFilters.css'

interface IKeywordFilterProps {
    onSubmit: Function;
    onClear: Function;
    keys: boolean;
    default: string;
    disableButtons: boolean;
    setDisable: Function;
}

const keywords = [
    "Audio", "Video", "Sample", "Screen", "Lag", "Slow", "Software", "Frame-loss", "Error", "Recordings"
]


export const RenderKeywordFilter = (props: IKeywordFilterProps) => {
    const [keyword, setKeyword] = useState(() => {
        if(props.default) return props.default;
        return '';
    });
    const {setDisable} = props;

    const handleKeywordClick = (val: string) => {
        if(props.disableButtons) {
            return;
        }
        if(keyword === val) {
            props.onClear();
            setDisable('');
            setKeyword("");
        } else {
            setKeyword(val);
            setDisable('key');
            props.onSubmit(val);
            console.log(val, 'keyword');
        }
    }

    return (
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Read comments that mention:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {keywords.map((el) =>
                    <Button variant='outlined' disabled={props.keys} key={el} onClick={() => {handleKeywordClick(el)}} id={keyword === el ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el}</Button>
                )}
            </div>
        </div>
    )
}

export default RenderKeywordFilter;