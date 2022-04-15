import React, { useState } from 'react';
import { Button, Paper, Box, Typography, Popover, makeStyles, } from '@material-ui/core';
import DateFilter from '../DateFilter';
import { filter } from 'lodash';

interface FilterProps {
	children: any,
	filterName: string,
	currentDisable: string,
}

const FilterItem = ({ children, filterName, currentDisable}: FilterProps) => {
	const [anchor, setanchor] = useState(null);
	const [flag, setFlag] = useState(false);
	const classes = useStyles();

	const handleClick = (event: any) => {
		if (!flag) {
			setFlag(true)
		}
		setanchor(event.currentTarget);
	};

	const handleClose = () => {
		if (flag) {
			setFlag(false)
		}
		setanchor(null);
	};

	const open = Boolean(anchor);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Button className={flag ? classes.filterBtnSelected : classes.filterBtn} aria-describedby={id} variant='contained' onClick={handleClick}>
				{filterName ? filterName : null}
			</Button>
			<Popover
				classes={{ paper: classes.popover }}
				id={id}
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
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
		borderRadius: '17px',
		backgroundColor: 'white',
		color: '#2B559B',
		fontSize: '15px',
		textTransform: 'none',
		marginLeft: '5px',
		marginRight: '5px',
	},
	filterBtnSelected: {
		borderRadius: '15px',
		backgroundColor: '#259ffb',
		color: 'white',
		fontSize: '15px',
		textTransform: 'none',
		marginLeft: '5px',
		marginRight: '5px',
	},
	popover: {
		backgroundColor: '#FBFBFB',
		borderRadius: '15px',
		padding: '7px',
		marginTop: '5px',
	},
	popoverBox: {
		height: 'auto',
		width: 'auto',
		display: 'grid',
		marginTop: '5px',
	},
	tempBtn: {
		backgroundColor: 'white',
		color: '#2B559B',
	}
}));

export default FilterItem;

