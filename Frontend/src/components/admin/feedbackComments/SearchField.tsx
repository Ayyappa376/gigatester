import { Paper, InputBase, IconButton, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

interface IProps {
    onSearch: Function,
    clearSearch: Function,
    style: Object,
    phrase: string
}

const SearchField = (props: IProps) => {
    const [keyword, setKeyword] = useState("");
    const [searchInitiated, setSearchInitiated] = useState(false)

    useEffect(() => {
        setKeyword(props.phrase);
    }, [])
    return (
        <div style={props.style}>
            <Paper
                component="form"
                style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 'auto' }}
            >
                <InputBase
                    style={{ marginLeft: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event: any) => {setKeyword(event.target.value)}}
                    onKeyPress= {(e) => {
                            if (e.key === 'Enter') {
                                props.onSearch(keyword)
                                setSearchInitiated(true);
                                e.preventDefault()
                            }
                        }
                    }
                />
                {
                    searchInitiated ? <IconButton type="button" style={{ padding: '10px' }} disableRipple={true} aria-label="cancel" onClick={() => {setKeyword(''); props.clearSearch(); setSearchInitiated(false)}}>
                        <ClearIcon />
                    </IconButton> : <div/>
                }
                <Divider style={{ height: 28, margin: 0.5 }} orientation="vertical" />
                <IconButton type="button" style={{ padding: '10px' }} disableRipple={true} aria-label="search" onClick={() => {props.onSearch(keyword); setSearchInitiated(true)}}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    )
}

export default SearchField;