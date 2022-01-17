import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    onSelect: Function
}

const ratingButtonValues=[
    {discription: "1-Star-Rating", value: 1 },
    {discription: "2-Star-Rating", value: 2 },
    {discription: "3-Star-Rating", value: 3 },
    {discription: "4-Star-Rating", value: 4 },
    {discription: "5-Star-Rating", value: 5 },
]

const RenderRatingFilter = (props: IProps) => {
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
        <div id="RenderFilter-Block" >
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose feedbacks with rating:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {ratingButtonValues.map((el) => 
                    <Button variant='outlined' onClick={() => {handleKeywordClick(el.value)}} id={rating === el.value ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el.discription}</Button>
                )}
            </div>
        </div>
    )
}

export default RenderRatingFilter;