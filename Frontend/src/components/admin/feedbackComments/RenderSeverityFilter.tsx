import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import './stylesRenderFilters.css'

interface IProps {
    setFocusSeverity: Function;
    focusSeverity: string[];
    disableButtons: boolean;
    disable: any;
    setDisable: Function;
}

const severityList = [
    "Critical", "High", "Medium", "Low"
]
const RenderSeverityFilter = React.memo((props: IProps) => {
    const {focusSeverity, setFocusSeverity, disable, setDisable} = props;
    const [show, setShow] = useState<boolean>(false);

    const handleKeywordClick = (val: string) => {
        if(props.disableButtons) {
            return;
        }
        if(focusSeverity.indexOf(val) > -1) {
            setDisable('severity');
            setFocusSeverity((prevValue: string[]) => {
                const prevValCopy = [...prevValue]
                prevValCopy.splice(prevValue.indexOf(val), 1);
                return prevValCopy;
            });
        } else {
            setFocusSeverity((prevVal: string[]) => {
                return [...prevVal, val]
            });
            setDisable('severity');
        }
    }

    return (
        <div id="RenderFilter-Block">
            <div id="RenderFilter-textContainer">
                <Typography id="RenderFilter-textHeader">Choose bugs with severity:</Typography>
            </div>
            <div id="RenderFilter-flexContainer">
                {severityList.map((el) => {
                    return <Button variant='outlined' disabled={disable}
                    key={el} onClick={() => {handleKeywordClick(el)}} id={focusSeverity.indexOf(el) != -1 ? "RenderFilter-btnVisited" : "RenderFilter-btn"}>{el}</Button>
                }
                )}
            </div>
        </div>
    )
})


export default RenderSeverityFilter;