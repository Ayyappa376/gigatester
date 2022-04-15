import React from 'react';
import { Paper, Box, Typography, Popover, makeStyles } from '@material-ui/core';
import FilterItem from './FilterItem';
import SearchField from '../SearchField';

interface FilterToolbarProps {
	children?: any | any[];
	searchInitiated: any;
	keyword: string;
	handleOnSearch: Function;
	clearSearch: Function;
}

const FilterToolBar = ({
	children,
	keyword,
	searchInitiated,
	clearSearch,
	handleOnSearch,
}: FilterToolbarProps) => {
	const classes = useStyles();

	return (
		<Box
			sx={{
				width: '100%',
				borderRadius: '10px',
			}}
		>
			<Paper className={classes.barFilterPaper}>
				{Array.isArray(children)
					? children.map((child: any, index: number) => {
							return (
								<FilterItem
									key={index}
									children={child.child}
									filterName={child.name}
								/>
							);
					  })
					: null}
				<Box className={classes.searchFieldBox}>
					<SearchField
						style={{ marginRight: '10px', marginTop: '2px', backgroundColor: 'white', width: '250px', height: '35px', borderRadius: '14px' }}
						key='SearchFieldEl'
						default={keyword}
						searchInitiated={searchInitiated}
						onSearch={handleOnSearch}
						clearSearch={clearSearch}
					/>
				</Box>
			</Paper>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
  barFilterPaper: {
    position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#16448C',
		padding: '6px',
		borderRadius: '10px',
  },
  searchFieldBox: {
    height: 'auto',
    width: 'auto',
    position: 'absolute',
    right: '0',
  },
}));

export default FilterToolBar;
