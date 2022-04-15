import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';

const TopToolbar = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				width: '100% !important',
				// @ts-ignore
				'& > :not(style)': {
					m: 1,
					width: '90% !important',
					margin: '0 auto',
					height: 128,
				},
			}}
		>
			<Paper elevation={3} color='secondary' />
		</Box>
	);
};

export default TopToolbar;
