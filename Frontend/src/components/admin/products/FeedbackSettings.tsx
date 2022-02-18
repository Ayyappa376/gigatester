import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select, InputLabel, makeStyles, Button, IconButton, Box } from "@material-ui/core";
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import { ICategory, } from '../../../model';
import ClearIcon from '@material-ui/icons/Clear';

interface CategoryProps {
  productParams: any,
  addFeedbackCategory: any,
  handleChangeFeedbackCategoryName: any,
  deleteFeedbackCategory: any,
  addFeedbackStdFeedbackText: any,
  handleChangeFeedbackStdFeedbackText: any,
  deleteFeedbackStdFeedbackText: any,
  handleFeedbackTitleChange: any,
  handleRatingLimitChange: any,
}

const renderCategoryDetails = (
  category: ICategory,
  catIndex: number,
  handleChangeFeedbackCategoryName: any,
  deleteFeedbackCategory: any,
  addFeedbackStdFeedbackText: any,
  handleChangeFeedbackStdFeedbackText: any,
  deleteFeedbackStdFeedbackText: any
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
            onChange={(event) => handleChangeFeedbackCategoryName(event, catIndex)}
            autoComplete='off'
            className='textFieldStyle'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <LightTooltip
            title={'Delete this Category'}
            aria-label='delete this category'
          >
            <IconButton size='small' onClick={() => deleteFeedbackCategory(catIndex)} >
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
            <Button size='small' variant="outlined" onClick={() => addFeedbackStdFeedbackText(catIndex)} >
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
                    onChange={(event) => handleChangeFeedbackStdFeedbackText(event, catIndex, index)}
                    autoComplete='off'
                    className='textFieldStyle'
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <LightTooltip
                    title={'Delete this standard Feedback'}
                    aria-label='Delete this standard Feedback'
                  >
                    <IconButton size='small' onClick={() => deleteFeedbackStdFeedbackText(catIndex, index)} >
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


const FeedbackSettings = ({
  productParams,
  addFeedbackCategory,
  handleChangeFeedbackCategoryName,
  deleteFeedbackCategory,
  addFeedbackStdFeedbackText,
  handleChangeFeedbackStdFeedbackText,
  deleteFeedbackStdFeedbackText,
  handleFeedbackTitleChange,
  handleRatingLimitChange,
}: CategoryProps) => {
  return (
    <Fragment>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={12} sm={12}>
          <Box>
            <TextField
              required
              type='string'
              id={`category_$`}
              name={`category_$`}
              label='Message on the feedbacks window.'
              value={
                (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                  productParams.products[0].feedbackAgentSettings.feedbackSettings.title)
                  ? productParams.products[0].feedbackAgentSettings.feedbackSettings.title
                  : ''
              }
              fullWidth
              onChange={(event) => handleFeedbackTitleChange()}
              autoComplete='off'
              className='textFieldStyle'
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl style={{ minWidth: '100%' }}>
            <InputLabel id={`ratingLimit`} required={true}>
              {'The star rating till which detailed feedback will requested:'}
            </InputLabel>
            <Select
              name={`select_ratingLimit`}
              value={
                (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingLimit
                : ''
              }
              onChange={(event) => handleRatingLimitChange(event)}
            >
              <MenuItem key={1} value={1}>{'1 star rating'}</MenuItem>
              <MenuItem key={2} value={2}>{'2 star rating'}</MenuItem>
              <MenuItem key={3} value={3}>{'3 star rating'}</MenuItem>
              <MenuItem key={4} value={4}>{'4 star rating'}</MenuItem>
              <MenuItem key={5} value={5}>{'5 star rating'}</MenuItem>
            </Select>
          </FormControl>
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
            <Button size='small' variant="outlined" onClick={() => addFeedbackCategory()} >
              <AddIcon /> Category
            </Button>
          </LightTooltip>
        </Grid>
        {productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.feedbackSettings &&
          productParams.products[0].feedbackAgentSettings.feedbackSettings.categories.map((category: ICategory, index: number) => {
            return renderCategoryDetails(category,
              index,
              handleChangeFeedbackCategoryName,
              deleteFeedbackCategory,
              addFeedbackStdFeedbackText,
              handleChangeFeedbackStdFeedbackText,
              deleteFeedbackStdFeedbackText);
          })}
      </Grid>
    </Fragment>
  );
}

export default FeedbackSettings;