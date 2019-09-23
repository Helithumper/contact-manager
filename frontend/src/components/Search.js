import React from 'react'
import { Paper, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) => {
    const {setSearchTerm, searchTerm} = props;

    return(
        <Paper>
            <TextField
                InputProps={{startAdornment: <InputAdornment><SearchIcon/></InputAdornment>}}
                onChange={event => {setSearchTerm(event.target.value)}}
                value={searchTerm}
            />
        </Paper>
    );
}
export default Search;