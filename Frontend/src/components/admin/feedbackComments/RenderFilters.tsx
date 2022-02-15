import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    setFocusRating: Function;
    focusRating: number[];
    disableButtons: boolean;
    rating: boolean;
    setDisable: Function;
}

const ratingButtonValues=[
    {discription: "1-Star-Rating", value: 1 },
    {discription: "2-Star-Rating", value: 2 },
    {discription: "3-Star-Rating", value: 3 },
    {discription: "4-Star-Rating", value: 4 },
    {discription: "5-Star-Rating", value: 5 },
]

const RenderRatingFilter = React.memo((props: IProps) => {
    const {focusRating, setFocusRating, rating, setDisable } = props;

    const handleKeywordClick = (val: number) => {
        console.log(val, props.disableButtons);
        if(props.disableButtons) {

            return;
        }
        if(focusRating.indexOf(val) > -1) {
            setDisable('rating');
            setFocusRating((prevValue: number[]) => {
                const prevValCopy = [...prevValue]
                prevValCopy.splice(prevValue.indexOf(val), 1);
                return prevValCopy;
            });
        } else {
            setFocusRating((prevVal: number[]) => {
                return [...prevVal, val]
            });
            setDisable('rating');
        }
    }

    return (
        <div id="RenderFilter-Block" >
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose feedbacks with rating:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {ratingButtonValues.map((el) => {
                    console.log()
                    return <Button variant='outlined' disabled={rating}
                    key={el.value} onClick={() => {handleKeywordClick(el.value)}} id={focusRating.indexOf(el.value) != -1 ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el.discription}</Button>
                }
                )}
            </div>
        </div>
    )
})

export default RenderRatingFilter;