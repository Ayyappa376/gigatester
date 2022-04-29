import React, { useState, useEffect } from 'react';
import { Grid, Button, makeStyles, Tooltip } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import { buttonStyle } from '../../../common/common';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
	export: {
		height: '40px',
		width: '150px',
		display: 'flex',
		flexDirection: 'row',
		...buttonStyle,
	},
}));

interface exportProps {
	data?: any;
	client?: string;
}

const ExportBtn = ({ data, client }: exportProps) => {
	const classes = useStyles();

	const handleExport = (event: any) => {
		console.log('EXPORTING');
		const day = new Date().toISOString().split('T')[0];
		const title = client ? `${client}_${day}` : `'Product_${day}'`;

		const workBook = XLSX.utils.book_new();
		const workSheet = XLSX.utils.json_to_sheet(data);
		XLSX.utils.book_append_sheet(workBook, workSheet, 'FeedbackSheet');
		XLSX.writeFile(workBook, title);
  };

	return (
		<Tooltip title='Click to export selected product data into CSV/XLSX file' arrow>
			<Button
				variant='contained'
				className={classes.export}
				onClick={(event) => handleExport(event)}
			>
				Export
				<GetApp style={{ fontSize: '20px' }} />
			</Button>
		</Tooltip>
	);
};

export default ExportBtn;
