import { Box, Tabs, Tab, Container, Grid, makeStyles, Divider, Paper } from '@material-ui/core';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { IFeedbackComments, IProductNameIdMapping, ILimitedProductDetails, IAppFeedback, IFeedbackBarChartData, ILastEvalKey } from './common';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RenderTable, { Order } from './RenderTable';
import FeedbackTab from './FeedbackTab';
import BugsTab from './BugsTab';
import ProductFilter, { VersionFilter } from './ProductFilter';
import { Http } from '../../../utils';

const FeedbackComments = (props: RouteComponentProps & IFeedbackComments) => {
  const classes = useStyles();
  const [productInfo, setProductInfo] = useState<ILimitedProductDetails[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [prodNameIdMapping, setProdNameIdMapping] = useState<IProductNameIdMapping>({})
  const [prodNameIdMappingBugCopy, setProdNameIdMappingBugs] = useState<IProductNameIdMapping>({})
  const [selectedProdId, setSelectedProdId] = useState<string>(() => {
    if (props.productId) {
      return props.productId;
    }
    return ''
  })
  const [productVersion, setProductVersion] = useState(() => {
    if (props.prodVersion) {
      return props.prodVersion;
    }
    return ''
  });

  const setProduct = (val: string) => {
    if (val) {
      setSelectedProdId(val);
    }
  }

  const productInfoProp = {
    prodNameIdMapping: prodNameIdMapping,
    prodNameIdMappingBugCopy: prodNameIdMappingBugCopy,
    selectedProdId: selectedProdId,
    productVersion: productVersion,
    selectedProduct: selectedProdId,
  }

  useEffect(() => {
    productInfoProp.selectedProdId = selectedProdId;
    productInfoProp.productVersion = productVersion;
    productInfoProp.selectedProduct = selectedProdId;
  }, [selectedProdId, productVersion])


  const getProductDetails = () => {
    Http.get({
      url: `/api/v2/products`,
    }).then((response: any) => {
      console.log(response);
      if (response && response.products && Array.isArray(response.products) && response.products.length > 0) {
        const productInfoCopy = [...productInfo]
        const prodNameIdMappingCopy: any = { ...prodNameIdMapping };
        response.products.forEach((el: any) => {
          const prodInfo = { id: "", name: "" };
          prodInfo.id = el.id;
          prodInfo.name = el.name;
          productInfoCopy.push(prodInfo);
          if (prodNameIdMappingCopy[prodInfo.id]) {
            prodNameIdMappingCopy[prodInfo.id].version.push(el.version);
          } else {
            prodNameIdMappingBugCopy[prodInfo.id] = {
              name: prodInfo.name,
              version: [el.version][0],
              categories: el.feedbackAgentSettings ? el.feedbackAgentSettings.bugSettings.categories ? el.feedbackAgentSettings.bugSettings.categories : [] : []
            }
            prodNameIdMappingCopy[prodInfo.id] = {
              name: prodInfo.name,
              version: [el.version],
              categories: el.feedbackAgentSettings ? el.feedbackAgentSettings.feedbackSettings.categories ? el.feedbackAgentSettings.feedbackSettings.categories : [] : []
            }
          }
        })
        setProductInfo(productInfoCopy);
        setProdNameIdMapping(prodNameIdMappingCopy);
        setProdNameIdMappingBugs(prodNameIdMappingBugCopy);
        if (props.productId && props.prodVersion) {
          return;
        }
        const defaultProductId = Object.keys(prodNameIdMappingCopy)[0];
        setSelectedProdId(defaultProductId);
        setProductVersion(prodNameIdMappingCopy[defaultProductId].version[0]);
      }
    }).catch((error: any) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getProductDetails();
  }, []);



  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
  }

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
    productInfoProp: any,
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
    }

    return (
      <Box sx={{ width: '95%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} className={classes.tabs} onChange={handleChange} aria-label="view-feedback-tabs">
            <Tab  label="Feedback" {...a11yProps(0)} />
            <Tab label="Bugs" {...a11yProps(1)} />
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
  }

  return (
    <Container>
      <Paper>
        <Grid className={classes.selectors} container>
          <Grid item xl={4} style={{ position: 'relative' }}>
            <div >
              <ProductFilter selectedProdId={selectedProdId}
                setSelectedProdId={setProduct}
                productNameIdMapping={prodNameIdMapping}
                productInfo={productInfo}
              />
            </div>
          </Grid>
          <Grid item xl={2} style={{ position: 'relative' }}>
            <VersionFilter productVersion={productVersion}
              setProductVersion={setProductVersion}
              versionList={selectedProdId ? prodNameIdMapping[selectedProdId] ? prodNameIdMapping[selectedProdId].version ?
                prodNameIdMapping[selectedProdId].version : [] : [] : []}
            />
          </Grid>
        </Grid>
        <Box sx={{ padding: '2em' }}>
          <BasicTabs productInfoProp={productInfoProp} />
        </Box>
      </Paper>
    </Container>
  )

}


export default withRouter(FeedbackComments);


const useStyles = makeStyles({
  tabs: {

    "& .MuiTabs-indicator": {
      backgroundColor: "#042E5B",
      height: 2.5,
    },
    "& .MuiTab-root.Mui-selected": {
      color: 'white',
      backgroundColor: '#042E5B',
    },
  },
  tab: {
    border: '1px solid gray',
  },
  selectors: {
    padding: '10px',
    marginBottom: '10px',
    marginTop: '20px',
    width: '100%',
    backgroundColor: '#E9E9E9',
    color: 'black',
  }
})