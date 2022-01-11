import { Chip, createStyles, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { Http } from '../../../utils';

export interface ProductInfo {
    description?: string;
    devices?: string[];
    id: string;
    name: string;
    platforms: string[];
    software?: string;
    testers?: TesterStatus[];
    testSuite?: string;
    version: string[];
    [keyName: string]: any;
}

export interface TesterStatus {
    approved: boolean;
    id: string;
}

export interface ILimitedProductDetails {
    id: string;
    name: string;
}

export interface IProductNameIdMapping {
    [key : string] : string
}

interface IProps {
    selectedProdId: string[];
    setSelectedProdId: Function;
    productNameIdMapping: IProductNameIdMapping;
    productInfo: ILimitedProductDetails[]
}

function getStyles(id: string, selectedProds: string[], theme: Theme) {
    return {
      fontWeight:
        selectedProds.indexOf(id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};



const ProductFilter = (props : IProps) => {
    const {selectedProdId, productNameIdMapping, productInfo} = props;
    const classes = useStyles();
    const theme = useTheme();


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setSelectedProdId(event.target.value as string[]);
      };

    return (
        <div style={{paddingLeft: '2rem'}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="product-select-label">Choose Products</InputLabel>
                <Select
                labelId="product-select-label"
                id="product-select"
                multiple
                value={selectedProdId}
                onChange={handleChange}
                input={<Input id="select-multiple-product" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {(selected as string[]).map((value, i) => (
                        <Chip key={value + i} label={productNameIdMapping[value]} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
                >
                {productInfo.map((prod) => (
                    <MenuItem key={prod.id} value={prod.id} style={getStyles(prod.id, selectedProdId, theme)}>
                    {prod.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )

    return(
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="product-select">Choose Product</InputLabel>
                <Select
                labelId="product-select-label"
                id="product-select"
                value={selectedProdId}
                onChange={handleChange}
                >
                    {productInfo.map((el) => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
        width: "100%"
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