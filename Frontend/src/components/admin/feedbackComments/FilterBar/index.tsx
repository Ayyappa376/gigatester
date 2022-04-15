import React from 'react';
import { Paper, Box, Typography, Popover, makeStyles } from '@material-ui/core';
import FilterItem from './FilterItem';
import DateFilter from '../DateFilter';

interface FilterToolbarProps {
  children?: any,
}

const FilterToolBar = ({ children }: FilterToolbarProps) => {
  const classes = useStyles();

  return (
    <Box sx={{
      width: '100%',
      borderRadius: '10px',
    }}>
      <Paper className={classes.barFilterPaper}>
        <FilterItem children={children}/>
      </Paper>
    </Box>
	);
};

const useStyles = makeStyles((theme) => ({
  barFilterPaper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D8E4F7',
    padding: '6px',
    borderRadius: '10px',
	},
}));


export default FilterToolBar;


