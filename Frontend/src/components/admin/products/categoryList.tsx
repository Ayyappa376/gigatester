import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select,
    InputLabel, Button, makeStyles, IconButton, FormControlLabel,
    Checkbox, Box } from "@material-ui/core";
import { ICategory } from '../../../model';
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const CategoryList = (
    props: any
    // handleChangeFeedbackCategoryName: Function,
    // deleteFeedbackCategory: Function,
    // addFeedbackStdFeedbackText: Function,
    // handleChangeFeedbackStdFeedbackText: Function,
    // deleteFeedbackStdFeedbackText: Function
  ) => {
    const { category, catIndex, handleChangeFeedbackCategoryName, handleChangeFeedbackStdFeedbackText, deleteFeedbackCategory, addFeedbackStdFeedbackText, deleteFeedbackStdFeedbackText } = props
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
              <IconButton size='small'
               onClick={() => deleteFeedbackCategory(catIndex)} 
               >
                <ClearIcon />
              </IconButton>
            </LightTooltip>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={6}>
            <Typography>Standard Feedback:</Typography>
          </Grid>
          <Grid item xs={5} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a standard Feedback text'}
              aria-label='Add a standard Feedback text'
            >
              <Button size='small' variant="outlined"
               onClick={() => addFeedbackStdFeedbackText(catIndex)} 
               >
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
                      <IconButton size='small'
                       onClick={() => deleteFeedbackStdFeedbackText(catIndex, index)}
                        >
                        <ClearIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                </Grid>
              );
            })
          }
                  <Grid item xs={6}>
            <Typography>Positive Feedback:</Typography>
          </Grid>
          <Grid item xs={5} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a positive Feedback text'}
              aria-label='Add a positive Feedback text'
            >
              <Button size='small' variant="outlined"
               onClick={() => addFeedbackStdFeedbackText(catIndex)} 
               >
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
                      <IconButton size='small'
                       onClick={() => deleteFeedbackStdFeedbackText(catIndex, index)} 
                       >
                        <ClearIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                </Grid>
              );
            })
          }
            <Grid item xs={6}>
            <Typography>Negative Feedback:</Typography>
          </Grid>
                  <Grid item xs={5} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a negative Feedback text'}
              aria-label='Add a negative Feedback text'
            >
              <Button size='small' variant="outlined"
               onClick={() => addFeedbackStdFeedbackText(catIndex)} 
               >
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
                      // onChange={(event) => handleChangeFeedbackStdFeedbackText(event, catIndex, index)}
                      autoComplete='off'
                      className='textFieldStyle'
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <LightTooltip
                      title={'Delete this standard Feedback'}
                      aria-label='Delete this standard Feedback'
                    >
                      <IconButton size='small'
                       onClick={() => deleteFeedbackStdFeedbackText(catIndex, index)} 
                       >
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

  export default CategoryList;