import { Chip, createStyles, FormControl, Input, InputBase, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme, withStyles } from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';
import { IProductNameIdMapping, ILimitedProductDetails, CONST_PRODUCT_ALL_VERSION } from './common';

interface IProps {
    selectedProdId: string;
    setSelectedProdId: Function;
    productNameIdMapping: IProductNameIdMapping;
    productInfo: ILimitedProductDetails[];
    filtered: any;
    setFiltered: Function;
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ProductFilter = (props : IProps) => {
    const {selectedProdId, productNameIdMapping, productInfo, filtered, setFiltered} = props;
    const classes = useStyles();
    const [chose, setChose] = useState('');

    useEffect(() => {
        setChose(props.selectedProdId);
	}, [selectedProdId]);

    const handleChange = (event: any) => {
        setChose(event.target.value)
        props.setSelectedProdId(event.target.value as string);
        console.log(event.target.value);
        if (!filtered.product) {
            setFiltered((prevState: any) => ({
                ...prevState,
                 product: true
            }))
        }
      };

    // console.log(props.selectedProdId);
    // console.log(chose);

    return (
        <div>
            <FormControl className={classes.formControlBig}>
                <InputLabel id="product-select-label">Choose Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    value={chose}
                    defaultValue={selectedProdId}
                    onChange={(event) => handleChange(event)}
                >
                 <MenuItem disabled value="">
                    Please Select
                 </MenuItem>
                {Object.keys(productNameIdMapping).map((id) => (
                    <MenuItem key={id} value={id} >
                        {productNameIdMapping[id].name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}

interface IVersionFilterProps {
    productVersion: string;
    setProductVersion: Function;
    versionList: string[];
    filtered: any;
    setFiltered: Function;
}

export const VersionFilter = (props : IVersionFilterProps) => {
    const {productVersion, versionList, filtered, setFiltered} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [chose, setChose] = useState('');

	useEffect(() => {
        setChose(props.productVersion);
	}, [productVersion]);

    const handleChange = (event: any) => {
        setChose(event.target.value)
        props.setProductVersion(event.target.value as string);
        if (!filtered.version) {
            setFiltered((prevState: any) => ({
                ...prevState,
                 version: true
            }))
        }
    };

    // console.log(props.productVersion);
    // console.log({chose});
    return (
        <div style={{paddingLeft: '1rem'}}>
            <FormControl style={{
                width: "150px"
            }}>
                <InputLabel id="demo-customized-select-label">Version</InputLabel>
                <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={chose}
                onChange={handleChange}
                >
                <MenuItem disabled key={0} value={""} >
                    Please Select
                    </MenuItem>
                 {/* <MenuItem key={1} value={CONST_PRODUCT_ALL_VERSION} >
                    All versions
                </MenuItem> */}
                    {versionList.map((version, i) => <MenuItem key={version + i.toString()} value={version}>{version}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlBig: {
        width: "190px",
      },
      formControlSmall: {
        width: "150px",
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
  }),
);

export default ProductFilter;