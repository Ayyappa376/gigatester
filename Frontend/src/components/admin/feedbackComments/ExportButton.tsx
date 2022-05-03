import React, { useState, useEffect } from 'react';
import { Grid, Button, makeStyles, Tooltip } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import { buttonStyle } from '../../../common/common';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
	export: {
		float: 'right',
		height: '38px',
		width: 'auto',
		display: 'flex',
		flexDirection: 'row',
		...buttonStyle,
		fontSize: '13px',
	},
	tooltip: {
		fontSize: '12px',
	},
}));

interface exportProps {
	data?: any;
	client?: string;
	type?: string;
	fetchMore: Function;
}

const ExportBtn = ({ data, client, type, fetchMore }: exportProps) => {
	const [exportedData, setExportedData] = useState<any>([]);
	const [enable, setDisable] = useState<boolean>(false);
	const [toExport , setToExport] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(0);
	const classes = useStyles();

	// console.log('data', data);
	console.log('quanitty', quantity)

	const organizeData = (data: any) => {
		const tempArray: any = [];
		data.forEach((item: any) => {
			const temp: any = {};
			for (let key in item) {
				const current = item[key];
				if (typeof current === 'object' && current !== null) {
					if (Object.keys(current).length > 0) {
						for (let subKey in current) {
							let capSubKey = subKey.toUpperCase();
							if (current[subKey]) {
								temp[capSubKey] = current[subKey]
							} else {
								temp[capSubKey] = 'No Data';
							}
						}
					} else if (Object.keys(current).length === 0) {
						temp[key.toUpperCase()] = 'No Data';
					}
				} else if (key === 'feedbackComments') {
					let coms = JSON.parse(current);
					for (let subComment in coms) {
						let capSubComment = subComment.toUpperCase();
						if (Array.isArray(coms[subComment])) {
							coms[subComment].forEach((comment: string) => {
								if (comment.length > 0) {
									temp[capSubComment] = comment;
								} else {
									temp[capSubComment] = 'NO STANDARD COMMENTS';
								}
							})
						} else {
							if (coms[subComment]) {
								temp[capSubComment] = coms[subComment];
							} else {
								temp[capSubComment] = 'NO GENERAL COMMENT';
							}
						}
					}
				} else if (key === 'platformInfo') {
					let platInfo = JSON.parse(current);
					for (let subInfo in platInfo) {
						let capSubInfo = subInfo.toUpperCase();
						if (subInfo) {
							temp[capSubInfo] = platInfo[subInfo]
						} else {
							temp[capSubInfo] = 'No platform data'
						}
					}
				} else {
					let capKey = key.toUpperCase();
					if (typeof current === 'number' && key === 'createdOn') {
						const dateStamp = new Date(current);
						temp[capKey] = dateStamp.toString();
					} else if (!current) {
						temp[capKey] = 'No Data';
					} else {
						temp[capKey] = current;
					}
				}
			}
			tempArray.push(temp);
		})
		return tempArray;
	}

	useEffect(() => {
		if (data.length > 0 && data !== exportedData) {
			setDisable(false);
			const dataOrganized: any[] = organizeData(data);
			setQuantity(dataOrganized.length)
			setExportedData(dataOrganized);
		} else {
			setDisable(true);
		}
	}, [data])

	useEffect(() => {

		if (exportedData.length > 0 && toExport) {
			console.log('EXPORTING');
			// create day stamp, title for export file, and feedback type (Feedback or bugs)
			const day = new Date().toISOString().split('T')[0];
			const title = client ? `${client}_${day}.xlsx` : `'Product_${day}.xlsx'`;
			const dataType = type ? type : 'Feedback';

			// XLSX functions -> create workbook, create worksheet (map JSON data to excel sheets)
			const workBook = XLSX.utils.book_new();
			const workSheet = XLSX.utils.json_to_sheet(exportedData);
			XLSX.utils.book_append_sheet(workBook, workSheet, `${dataType}-Sheet`);
			// exports XLSX file based on data set above
			XLSX.writeFile(workBook, title);
		}
	}, [exportedData])


	const handleExport = (event: any) => {
		// on click, fetchMore will call max db scan of 999999
		fetchMore(999999);
		// set export to true allows useEffect with exportedData state to export excel file
		setToExport(true);

  };

	return (
		<Tooltip title='Click to export selected or filtered product data into CSV/XLSX file'
		classes={{
			tooltip: classes.tooltip,
		}}
			arrow>
			<Button
				variant='contained'
				className={classes.export}
				onClick={(event) => handleExport(event)}
				disabled={enable}
			>
				Export {type}
				<GetApp style={{ fontSize: '20px' }} />
			</Button>
		</Tooltip>
	);
};

export default ExportBtn;
