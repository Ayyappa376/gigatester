import React from 'react';
import { Paper, Box, Typography, Grid } from '@material-ui/core';
import ProductFilter, { VersionFilter } from '../ProductFilter';

const TopToolbar = (props: any) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				width: '100% !important',
				marginTop: '-50px',
				// @ts-ignore
				'& > :not(style)': {
					m: 1,
					width: '100% !important',
					margin: '0 auto',
					height: 158,
					marginLeft: '20',
				},
				'& h4': {
					color: 'rgb(10,34,90)',
					margin: 20,
				},
				'& #filter-dropdown-grid': {
					marginLeft: 20,
				},
			}}
		>
			<Paper elevation={3}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						{/* @ts-ignore */}
						<Typography variant='h4' component='h4' style={{ fontWeight: 600}}>
							View Feedback
						</Typography>
					</Grid>
				</Grid>
				<Grid container spacing={2} id='filter-dropdown-grid'>
					<Grid item xs={4} lg={3}>
						<ProductFilter {...props} />
					</Grid>
					<Grid item xs={4} lg={3}>
						<VersionFilter {...props} />
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default TopToolbar;
