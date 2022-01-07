import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface IProps {
    onSelect: Function
}

const buttonValues=[
    {discription: 'all', value: -1},
    {discription: "1-Star-Rating", value: 1 },
    {discription: "2-Star-Rating", value: 2 },
    {discription: "3-Star-Rating", value: 3 },
    {discription: "4-Star-Rating", value: 4 },
    {discription: "5-Star-Rating", value: 5 },
] 

const RenderRatingFilter = (props: IProps) => {
    const classes = useStyles();
    return (
        <div className={classes.ratingBlock}>
            <div className={classes.flexContainer}>
                {buttonValues.map((el) => 
                    <Button variant='contained' onClick={() => {props.onSelect(el.value)}} className={classes.btn}>{el.discription}</Button>
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
        justifyContent: 'space-between'
    },
    btn: {
        borderRadius: '0px',
        '&:hover': {
            transform: 'translateY(-3px)'
        },
        '&:focus, &:active': {
            transform: 'translateY(-1px)',

        }
    },
})

export default RenderRatingFilter;