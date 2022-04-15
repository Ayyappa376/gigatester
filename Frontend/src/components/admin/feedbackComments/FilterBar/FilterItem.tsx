import React, { useState } from 'react';
import { Button, Paper, Box, Typography, Popover, makeStyles, } from '@material-ui/core';
import DateFilter from '../DateFilter';

interface FilterProps {
	children: any,
}

const FilterItem = ({ children }: FilterProps) => {
	const [anchor, setanchor] = useState(null);
	const classes = useStyles();

	const handleClick = (event: any) => {
		setanchor(event.currentTarget);
	};

	const handleClose = () => {
		setanchor(null);
	};

	const open = Boolean(anchor);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Button className={classes.filterBtn} aria-describedby={id} variant='contained' onClick={handleClick}>
				Date
			</Button>
			<Popover
				classes={{ paper: classes.popover }}
				id={id}
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box className={classes.popoverBox}>
					{ children }
				</Box>
			</Popover>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	filterBtn: {
		borderRadius: '10px',
		backgroundColor: 'white',
		color: '#2B559B',
		fontSize: '17px',
		textTransform: 'none',
		marginLeft: '5px',
		marginRight: '5px',
	},
	popover: {
		backgroundColor: '#F8F8F8',
		borderRadius: '15px',
		padding: '7px',
	},
	popoverBox: {
		height: 'auto',
		width: 'auto',
		display: 'grid',
		marginTop: '5px',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridColumnGap: '15px',
		gridRowGap: '15px',
	},
	tempBtn: {
		backgroundColor: 'white',
		color: '#2B559B',
	}
}));

export default FilterItem;

