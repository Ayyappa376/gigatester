import {
	Box,
	Tabs,
	Tab,
	Container,
	Grid,
	makeStyles,
	Typography,
	Paper,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	IFeedbackComments,
	IProductNameIdMapping,
	ILimitedProductDetails,
} from './common';
import './index.css';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FeedbackTab from './FeedbackTab';
import BugsTab from './BugsTab';
import { getProductDetails } from './methods';
import TopToolbar from './TopToolbar';
import ChatIcon from '@material-ui/icons/Chat'
import BugReportIcon from '@material-ui/icons/BugReport';
//@material-ui/icons

const FeedbackComments = (props: RouteComponentProps & IFeedbackComments) => {
	const { productId } = props;
	const classes = useStyles();
	const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([]);
	const [prodNameIdMapping, setProdNameIdMapping] =
		useState<IProductNameIdMapping>({});
	const [prodNameIdMappingBugCopy, setProdNameIdMappingBugs] =
		useState<IProductNameIdMapping>({});
	const [selectedProdId, setSelectedProdId] = useState<string>('');
	const [productVersion, setProductVersion] = useState('');
	const [filtered, setFiltered] = useState({ product: false, version: false });

	const setProduct = (val: string) => {
		if (val) {
			setSelectedProdId(val);
		}
	};

	const productInfoProp = {
		prodNameIdMapping: prodNameIdMapping,
		prodNameIdMappingBugCopy: prodNameIdMappingBugCopy,
		selectedProdId: selectedProdId,
		productVersion: productVersion,
		selectedProduct: selectedProdId,
		filtered: filtered,
	};

	useEffect(() => {
		productInfoProp.selectedProdId = selectedProdId;
		productInfoProp.productVersion = productVersion;
		productInfoProp.selectedProduct = selectedProdId;
	}, [selectedProdId, productVersion]);

	useEffect(() => {
		let load = false;
		if (!load) {
			getProductDetails({
				productInfo,
				prodNameIdMapping,
				prodNameIdMappingBugCopy,
				setProductInfo,
				setProdNameIdMapping,
				setSelectedProdId,
				setProdNameIdMappingBugs,
				setProductVersion,
				productId,
				productVersion,
			});
		}
		return () => {
			load = true;
		};
	}, []);


	const TabPanel = (props: any) => {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				className='feedback-tab-panel'
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && <div>{children}</div>}
			</div>
		);
	};

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	};

	function tabProps(index: any) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	const renderTabs = () => {
		if (!selectedProdId.trim().length || !productVersion.trim().length) {
			return (
				<Box>
					<Typography variant='h5' component='h2' color='textPrimary'>
						Please select a product and a version above
					</Typography>

					<Paper
						elevation={3}
						style={{
							height: '300px',
							width: '400px',
							background: 'url(magnifying.jpeg)',
							marginTop: '20px',
							// @ts-ignore
							'-webkit-background-size': 'cover',
							'-moz-background-size': 'cover',
							'-o-background-size': 'cover',
							'background-size': 'cover',
						}}
					/>
				</Box>
			);
		}

		return (
			<BasicTabs
				productInfoProp={productInfoProp}
				productVersion={productVersion}
				selectedProdId={selectedProdId}
			/>
		);
	};

	interface BasicTabsProps {
		productInfoProp: any;
		productVersion: any;
		selectedProdId: any;
	}

	const BasicTabs = ({
		productInfoProp,
		productVersion,
		selectedProdId,
	}: BasicTabsProps) => {
		const [value, setValue] = React.useState(0);
		const classes = useStyles();

		const handleChange = (event: any, newValue: number) => {
			setValue(newValue);
		};

		let payLoad = {
			props,
			productInfoProp,
			productVersion,
			selectedProdId,
		};

		return (
			<Box sx={{ width: '100%', marginTop: '40px' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						className={classes.tabs}
						onChange={handleChange}
						aria-label='view-feedback-tabs'
					>
						<Tab icon={<ChatIcon />} label='Feedback' {...tabProps(0)}/>
						<Tab icon={<BugReportIcon /> } label='Bugs' {...tabProps(1)}/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<FeedbackTab {...props} {...payLoad} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<BugsTab {...props} {...payLoad} />
				</TabPanel>
			</Box>
		);
	};

	return (
		<Container>
			<Grid className={classes.selectors} container>
				<TopToolbar
					selectedProdId={selectedProdId}
					setSelectedProdId={setProduct}
					productNameIdMapping={prodNameIdMapping}
					productInfo={productInfo}
					filtered={filtered}
					setFiltered={setFiltered}
					productVersion={productVersion}
					setProductVersion={setProductVersion}
					versionList={
						selectedProdId
							? prodNameIdMapping[selectedProdId]
								? prodNameIdMapping[selectedProdId].version
									? prodNameIdMapping[selectedProdId].version
									: []
								: []
							: []
					}
				/>
			</Grid>
			{renderTabs()}
		</Container>
	);
};

export default withRouter(FeedbackComments);

const useStyles = makeStyles({
	tabs: {
		'& .MuiTabs-indicator': {
			backgroundColor: '#042E5B',
			height: 2.5,
		},
		'& .MuiTab-root.Mui-selected': {
			color: 'white',
			backgroundColor: '#16448C',
			borderRadius: '5px',
		},
		'& .MuiTab-wrapper': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		}
	},
	selectors: {
		position: 'relative',
		marginBottom: '20px',
		marginTop: '20px',
		width: '100%',
		color: 'black',
	},
});
