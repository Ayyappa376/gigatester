import React, { useEffect, useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	makeStyles,
	Checkbox,
} from '@material-ui/core';
import { IProductParams } from '../../../../model';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		marginTop: '15px',
		paddingLeft: '15px',
		maxWidth: '100%',
	},
	rowGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: '10px',
  },
}));

interface FilterProps {
	productParams: IProductParams;
	handleChangeExtSeverityFilter: Function;
	handleChangeExtCategoryFilter: Function;
}

const JiraFieldFilters = (props: any) => {
    const classes = useStyles();
    const {productParams, handleChangeExtSeverityFilter, handleChangeExtCategoryFilter}: FilterProps = props;
    const severityMap: string[] = [];

 const renderJiraSeverityFilter = () => {
    return(
        <>
        <FormControl className={classes.buttonGroup}>
			<FormLabel id='severity-row-radio-buttons-group-label'>
				Choose severity limit that push bugs to external tracking system - can select multiple *
			</FormLabel>
			<FormGroup className={classes.rowGroup}>
			{productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings.severities.map((val: string, index: number) => (
							<FormControlLabel
								key={index}
								value={val}
								control={
                                <Checkbox color='primary'
                                checked={(productParams && productParams.products && productParams.products[0] &&
                                    productParams.products[0].trackingSystem &&
                                    productParams.products[0].trackingSystem.filters &&
                                    productParams.products[0].trackingSystem.filters.severities)
                                    ? productParams.products[0].trackingSystem.filters.severities[val]
                                    : false}
                                onChange={(event) => handleChangeExtSeverityFilter(event)}
                                 />}
								label={val}
							/>
					  ))}
			</FormGroup>
		</FormControl>
        </>
    )
 }

 const renderJiraCategoryFilter = () => {
    return(
        <>
        <FormControl className={classes.buttonGroup}>
			<FormLabel id='category-row-radio-buttons-group-label'>
				Choose category limit that push  to external tracking system - can select multiple *
			</FormLabel>
			<FormGroup className={classes.rowGroup}>
			{productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings &&
        //   productParams.products[0].feedbackAgentSettings.bugSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings.categories.map((val: any, index: number) => (
							<FormControlLabel
								key={index}
								value={val.name}
								control={
                                <Checkbox color='primary'
                                checked={(productParams && productParams.products && productParams.products[0] &&
                                    productParams.products[0].trackingSystem &&
                                    productParams.products[0].trackingSystem.filters &&
                                    productParams.products[0].trackingSystem.filters.categories)
                                    ? productParams.products[0].trackingSystem.filters.categories[val.name]
                                    : false}
                                onChange={(event) => handleChangeExtCategoryFilter(event)}
                                 />}
								label={val.name}
							/>
					  ))}
					{/* <FormControlLabel
								value={'All'}
								control={<Checkbox checked={state['All']} color='primary' onChange={handleChange} />}
								label={'All'}
							/> */}
			</FormGroup>
		</FormControl>
        </>
    )
 }
  return (
      <>
          {renderJiraSeverityFilter()}
          {renderJiraCategoryFilter()}
      </>

  )
}

export default JiraFieldFilters