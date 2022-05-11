import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, {useState} from 'react'
import { FEEDBOT_CATEGORIES, FEEDBOT_SEVERITIES, FEEDBOT_COMMENTS, FEEDBOT_STANDARD_FEEDBACK } from '../../../../model';

const useStyles = makeStyles(() => ({
formControl: {
  minWidth: '100%',
}
}));

const feedbotFieldList = [FEEDBOT_CATEGORIES, FEEDBOT_SEVERITIES, FEEDBOT_COMMENTS, FEEDBOT_STANDARD_FEEDBACK]

const JiraFieldsMapping = (props: any) => {
  const classes = useStyles();
  const {jiraFieldList, handleChangeJiraFieldMapping, productParams} = props;
  const renderFeedbotMapping = () => {
    return (
     feedbotFieldList.map((val, key) => (
       <>
                <FormControl className={classes.formControl}>
                <InputLabel id={`label_${key}`}>
                {val}
                </InputLabel>
                <Select
                  id={`select_${key}`}
                  name={`select_${key}`}
                  value={productParams && productParams.products && productParams.products[0] &&
                    productParams.products[0].trackingSystem && productParams.products[0].trackingSystem.fieldMappings
                    ? productParams.products[0].trackingSystem.fieldMappings[val] : 'Labels'}
                  onChange={(event) => handleChangeJiraFieldMapping(event, val)}
                >
                  {jiraFieldList.length > 0 ? (
                    jiraFieldList.map((opt: any) => {
                      return (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <div />
                  )
                  }
                </Select>
              </FormControl>
              </>
     ))
    )
  }
  
  return (
    <>
    <Grid item xs={10}>
          <Typography variant="h6">Feebot - Jira Field Mapping:</Typography>
     </Grid>
        {renderFeedbotMapping()}

    </>
  )
}

export default JiraFieldsMapping;