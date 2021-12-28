import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelect(props: any) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">{props.label}</InputLabel>
            <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={
                    props.values
                        ? props.values[props.label.toLowerCase()]
                            ? props.values[props.label.toLowerCase()] !== ''
                                ? props.values[props.label.toLowerCase()]
                                : []
                            : []
                        : []
                }
                name={props.label.toLowerCase()}
                onChange={event => props.handleChangeMultiValue(event)}
                input={<Input />}
                renderValue={(selected: any) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {props.list.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.id}>
                        <Checkbox checked={props.values && 
                                            props.values[props.label.toLowerCase()] &&
                                            props.values[props.label.toLowerCase()].indexOf(item.id) > -1} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
