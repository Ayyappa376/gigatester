import React, { useState, useEffect } from 'react';
import { Grid, Button, makeStyles, Tooltip } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import { buttonStyle } from '../../../common/common';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
	export: {
		float: 'right',
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
	type?: string;
}

const ExportBtn = ({ data, client }: exportProps) => {
	const [exportedData, setExportedData] = useState<any>([]);
	const [enable, setDisable] = useState<boolean>(false);
	const classes = useStyles();

	const organizeData = (data: any) => {
		const tempArray: any = [];
		data.forEach((item: any) => {
			const temp: any = {};
			for (let key in item) {
				const current = item[key];
				if (typeof current === 'object' && current !== null) {
					if (Object.keys(current).length > 0) {
						for (let subKey in current) {
							if (current[subKey]) {
								temp[subKey] = current[subKey]
							} else {
								temp[subKey] = 'No Data';
							}
						}
					} else if (Object.keys(current).length === 0) {
						temp[key] = 'No Data';
					}
				} else if (key === 'feedbackComments') {
					let coms = JSON.parse(current);
					for (let subComment in coms) {
						if (Array.isArray(coms[subComment])) {
							coms[subComment].forEach((comment: string) => {
								if (comment) {
									temp[subComment] = comment;
								} else {
									temp[subComment] = 'No standard comments';
								}
							})
						} else {
							temp[subComment] = coms[subComment];
						}
					}
				} else {
					if (typeof current === 'number' && key === 'createdOn') {
						const dateStamp = new Date(current);
						temp[key] = dateStamp.toString();
					} else if (!current) {
						temp[key] = 'No Data';
					} else {
						temp[key] = current;
					}
				}
			}
			tempArray.push(temp);
		})
		return tempArray;
	}

	useEffect(() => {
		if (data.length > 0) {
			setDisable(false);
			const dataOrganized: any[] = organizeData(data);
			setExportedData(dataOrganized);
		} else {
			setDisable(true);
		}
	}, [data])


	const handleExport = (event: any) => {
		console.log('EXPORTING');
		const day = new Date().toISOString().split('T')[0];
		const title = client ? `${client}_${day}` : `'Product_${day}'`;

		const workBook = XLSX.utils.book_new();
		const workSheet = XLSX.utils.json_to_sheet(exportedData);
		XLSX.utils.book_append_sheet(workBook, workSheet, 'FeedbackSheet');
		XLSX.writeFile(workBook, title);
  };

	return (
		<Tooltip title='Click to export selected product data into CSV/XLSX file' arrow>
			<Button
				variant='contained'
				className={classes.export}
				onClick={(event) => handleExport(event)}
				disabled={enable}
			>
				Export
				<GetApp style={{ fontSize: '20px' }} />
			</Button>
		</Tooltip>
	);
};

export default ExportBtn;
