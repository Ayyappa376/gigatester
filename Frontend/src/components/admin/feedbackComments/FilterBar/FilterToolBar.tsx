import React from 'react';
import { Paper, Box, Typography, Popover, makeStyles } from '@material-ui/core';
import FilterItem from './FilterItem';

interface FilterToolbarProps {
  children?: any | any[],
}

const FilterToolBar = ({ children }: FilterToolbarProps) => {
  const classes = useStyles();

  return (
    <Box sx={{
      width: '100%',
      borderRadius: '10px',
    }}>
      <Paper className={classes.barFilterPaper}>
        {Array.isArray(children) ? (
          children.map((child: any, index: number) => {
            return <FilterItem key={index} children={child.child} filterName={child.name}/>
          })
        ): null}
      </Paper>
    </Box>
	);
};

const useStyles = makeStyles((theme) => ({
  barFilterPaper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#16448C',
    padding: '6px',
    borderRadius: '10px',
	},
}));


export default FilterToolBar;


