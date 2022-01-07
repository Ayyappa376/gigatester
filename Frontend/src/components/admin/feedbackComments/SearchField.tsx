import { Paper, InputBase, IconButton, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

interface IProps {
    onSearch: Function,
    clearSearch: Function,
    style: Object,
    keyword: string,
    searchInitiated: boolean,
}

const SearchField = (props: IProps) => {
    const {keyword, onSearch, searchInitiated} = props;

    return (
        <div style={props.style}>
            <div
                style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 'auto' }}
            >
                <InputBase
                    style={{ marginLeft: 1, flex: 1 }}
                    placeholder="Search"
                    value={keyword}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event: any) => {onSearch(event.target.value)}}
                    onKeyPress= {(e) => {
                            if (e.key === 'Enter') {
                                props.onSearch(keyword)
                                e.preventDefault()
                            }
                        }
                    }
                />
                {
                    searchInitiated ? <IconButton type="button" style={{ padding: '10px' }} disableRipple={true} aria-label="cancel" onClick={() => {props.clearSearch(); }}>
                        <ClearIcon /> 
                    </IconButton> : <div/>
                }
                <Divider style={{ height: 28, marginLeft: 5 }} orientation="vertical" />
                <IconButton type="button" style={{ padding: '10px' }} disableRipple={true} aria-label="search" onClick={() => {props.onSearch(keyword); }}>
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SearchField;