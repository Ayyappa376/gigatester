import { Chip, createStyles, FormControl, Input, InputBase, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { IProductNameIdMapping, ILimitedProductDetails } from './common';
import {Collapse} from 'react-collapse';

// interface IProps {
//     selectedProdId: string;
//     setSelectedProdId: Function;
//     productNameIdMapping: IProductNameIdMapping;
//     productInfo: ILimitedProductDetails[]
// }


const ExtraInfo = () => {
    // const {selectedProdId, productNameIdMapping, productInfo} = props;
    const classes = useStyles();

    return (
      <div>
        <Collapse isOpened={false}>
              <div>Random content</div>
        </Collapse>
      </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlBig: {
        width: "190px",
      },

  }),
);

export default ExtraInfo;