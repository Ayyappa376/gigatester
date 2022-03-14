import { Chip, createStyles, FormControl, Input, InputBase, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';
import { IProductNameIdMapping, ILimitedProductDetails } from './common';

interface IProps {
    selectedProdId: string;
    setSelectedProdId: Function;
    productNameIdMapping: IProductNameIdMapping;
    productInfo: ILimitedProductDetails[]
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ProductFilter = (props : IProps) => {
    const {selectedProdId, productNameIdMapping, productInfo} = props;
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setSelectedProdId(event.target.value as string);
      };

//    const label = 'Choose Product';

    return (
        <div>
            <FormControl className={classes.formControlBig}>
                <InputLabel id="product-select-label">Choose Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    value={selectedProdId}
                    onChange={handleChange}
                >
                 <MenuItem disabled value="">
                    <em>Please Select</em>
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
}

export const VersionFilter = (props : IVersionFilterProps) => {
    const {productVersion, versionList} = props;
    const classes = useStyles();
    const theme = useTheme();


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setProductVersion(event.target.value as string);
    };

    return (
        <div style={{paddingLeft: '1rem'}}>
            <FormControl className={classes.formControlSmall}>
                <InputLabel id="demo-customized-select-label">Version</InputLabel>
                <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={productVersion}
                onChange={handleChange}
                >
                <MenuItem key={0} value={""} >
                    <em>Please Select</em>
                </MenuItem>
                {versionList.map((version, i) => <MenuItem key={version + i.toString()} value={version}>{version}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlBig: {
        width: "250px",
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