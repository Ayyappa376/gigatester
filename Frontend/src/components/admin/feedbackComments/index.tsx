import {
	Box,
	Tabs,
	Tab,
	Container,
	Grid,
	makeStyles,
	Divider,
	Paper,
	Button,
} from '@material-ui/core';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	IFeedbackComments,
	IProductNameIdMapping,
	ILimitedProductDetails,
	IAppFeedback,
	IFeedbackBarChartData,
	ILastEvalKey,
	NUMBER_OF_ITEMS_PER_FETCH,
	IFetchRecursiveData,
} from './common';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RenderTable, { Order } from './RenderTable';
import FeedbackTab from './FeedbackTab';
import BugsTab from './BugsTab';
import {
	getFeedbckChartData,
	getFeedbackData,
	getProductDetails,
} from './methods';
import ProductFilter, { VersionFilter } from './ProductFilter';
import TopToolbar from './TopToolbar';
import { Http } from '../../../utils';
import FilterItem from './FilterBar/FilterItem';

const FeedbackComments = (props: RouteComponentProps & IFeedbackComments) => {
	const { productId } = props;
	const classes = useStyles();
	const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<string>('');
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

	// const handleRemoteBtn = () => {
	//   if (typeof window.GigaTester !== 'undefined') {
	//     window.GigaTester.useRemote();
	//   }
	// }

	const TabPanel = (props: any) => {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
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

	function a11yProps(index: any) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	interface BasicTabsProps {
		productInfoProp: any;
	}

	const BasicTabs = ({ productInfoProp }: BasicTabsProps) => {
		const [value, setValue] = React.useState(0);
		const classes = useStyles();

		const handleChange = (event: any, newValue: number) => {
			setValue(newValue);
		};

		let payLoad = {
			props: props,
			productInfoProp: productInfoProp,
		};

		return (
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						className={classes.tabs}
						onChange={handleChange}
						aria-label='view-feedback-tabs'
					>
						<Tab label='Feedback' {...a11yProps(0)} />
						<Tab label='Bugs' {...a11yProps(1)} />
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

	// return (
	// 	<Container>
	// 		<Grid className={classes.selectors} container>
	// 			<TopToolbar />
  //     </Grid>
  //     <Grid>
  //       <FilterItem children={<button>hey</button>}/>
  //     </Grid>
	// 		<BasicTabs productInfoProp={productInfoProp} />
	// 	</Container>
	// );
	return (
	  <Container>
	      <Grid className={classes.selectors} container>
	        <Grid item xl={2} style={{ position: 'relative' }}>
	          <ProductFilter selectedProdId={selectedProdId}
	            setSelectedProdId={setProduct}
	            productNameIdMapping={prodNameIdMapping}
	          productInfo={productInfo}
	          filtered={filtered}
	          setFiltered={setFiltered}
	          />
	        </Grid>
	        <Grid item xl={2} style={{ position: 'relative' }}>
	          <VersionFilter productVersion={productVersion}
	            setProductVersion={setProductVersion}
	            versionList={selectedProdId ? prodNameIdMapping[selectedProdId] ? prodNameIdMapping[selectedProdId].version ?
	              prodNameIdMapping[selectedProdId].version : [] : [] : []}
	              filtered={filtered}
	              setFiltered={setFiltered}
	          />
	      </Grid>
	      </Grid>
	      <BasicTabs productInfoProp={productInfoProp} />
	  </Container>
	)
};

export default withRouter(FeedbackComments);

const useStyles = makeStyles({
	tabs: {
		'& .MuiTabs-indicator': {
			backgroundColor: '#042E5B',
			height: 2.5,
		},
		'& .MuiTab-root.Mui-selected': {
			color: 'black',
			backgroundColor: 'transparent',
		},
	},
	selectors: {
		position: 'relative',
		//    padding: '10px',
		marginBottom: '20px',
		marginTop: '20px',
		width: '100%',
		//    backgroundColor: '#E9E9E9',
		color: 'black',
	},
});
