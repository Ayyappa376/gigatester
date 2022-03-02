import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select, InputLabel, makeStyles, Button, IconButton, Box } from "@material-ui/core";
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import { ICategory, } from '../../../model';
import ClearIcon from '@material-ui/icons/Clear';

interface CategoryProps {
  productParams: any,
  addBugCategory: any,
  handleChangeBugCategoryName: any,
  deleteBugCategory: any,
  addBugStdFeedbackText: any,
  handleChangeBugStdFeedbackText: any,
  deleteBugStdFeedbackText: any,
  handleBugTitleChange: any,
}

const renderCategoryDetails = (
  category: ICategory,
  catIndex: number,
  handleChangeBugCategoryName: any,
  deleteBugCategory: any,
  addBugStdFeedbackText: any,
  handleChangeBugStdFeedbackText: any,
  deleteBugStdFeedbackText: any
) => {
  return (
    <Fragment key={catIndex}>
      <Grid container spacing={1} style={{ border: 'solid 1px #aaaaaa', padding: '8px', margin: '4px' }}>
        <Grid item xs={10} sm={10}>
          <TextField
            required
            type='string'
            id={`category_${catIndex}`}
            name={`category_${catIndex}`}
            label='Category Name'
            value={category.name}
            fullWidth
            onChange={(event) => handleChangeBugCategoryName(event, catIndex)}
            autoComplete='off'
            className='textFieldStyle'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <LightTooltip
            title={'Delete this Category'}
            aria-label='delete this category'
          >
            <IconButton size='small' onClick={() => deleteBugCategory(catIndex)} >
              <ClearIcon />
            </IconButton>
          </LightTooltip>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <Typography>Standard Feedback:</Typography>
        </Grid>
        <Grid item xs={5} style={{ textAlign: "center" }}>
          <LightTooltip
            title={'Add a standard Feedback text'}
            aria-label='Add a standard Feedback text'
          >
            <Button size='small' variant="outlined" onClick={() => addBugStdFeedbackText(catIndex)} >
              <AddIcon /> Feedback Text
            </Button>
          </LightTooltip>
        </Grid>
        {category.feedbacks &&
          category.feedbacks.map((feedback: string, index: number) => {
            return (
              <Grid key={index} container spacing={1}>
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    required
                    type='string'
                    id={`feedback_${catIndex}_${index}`}
                    name={`feedback_${catIndex}_${index}`}
                    label='Feedback text'
                    value={feedback ? feedback : ''}
                    fullWidth
                    onChange={(event) => handleChangeBugStdFeedbackText(event, catIndex, index)}
                    autoComplete='off'
                    className='textFieldStyle'
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <LightTooltip
                    title={'Delete this standard Feedback'}
                    aria-label='Delete this standard Feedback'
                  >
                    <IconButton size='small' onClick={() => deleteBugStdFeedbackText(catIndex, index)} >
                      <ClearIcon />
                    </IconButton>
                  </LightTooltip>
                </Grid>
              </Grid>
            );
          })
        }
      </Grid>
    </Fragment>
  );
};


const BugSettings = ({
  productParams,
  addBugCategory,
  handleChangeBugCategoryName,
  deleteBugCategory,
  addBugStdFeedbackText,
  handleChangeBugStdFeedbackText,
  deleteBugStdFeedbackText,
  handleBugTitleChange
}: CategoryProps) => {
  return (
    <Fragment>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={10} sm={10}>
          <Box>
            <TextField
              required
              type='string'
              id={`category_$`}
              name={`category_$`}
              label='Message on the bug reporting window.'
              value={
                (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings.title)
                  ? productParams.products[0].feedbackAgentSettings.bugSettings.title
                  : ''
              }
              fullWidth
              onChange={(event) => handleBugTitleChange(event)}
              autoComplete='off'
              className='textFieldStyle'
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={2}>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={10}>
          <Typography variant="h6">Categories:</Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <LightTooltip
            title={'Add a category'}
            aria-label='Add a category'
          >
            <Button size='small' variant="outlined" onClick={() => addBugCategory()} >
              <AddIcon /> Category
            </Button>
          </LightTooltip>
        </Grid>
        {productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings.categories &&
          productParams.products[0].feedbackAgentSettings.bugSettings.categories.map((category: ICategory, index: number) => {
            return renderCategoryDetails(category,
              index,
              handleChangeBugCategoryName,
              deleteBugCategory,
              addBugStdFeedbackText,
              handleChangeBugStdFeedbackText,
              deleteBugStdFeedbackText);
          })}
      </Grid>
      </Fragment>
  );
}

export default BugSettings;