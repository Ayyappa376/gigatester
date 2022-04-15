import React, { useState } from 'react';
import { Button, Paper, Box, Typography, Popover } from '@material-ui/core';

const FilterItem = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Button aria-describedby={id} variant='contained' onClick={handleClick}>
				Open Popover
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Typography>The content of the Popover.</Typography>
			</Popover>
		</div>
	);
};

export default FilterItem;
