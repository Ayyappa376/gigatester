import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select,
    InputLabel, Button, makeStyles, IconButton, FormControlLabel,
    Checkbox, Box } from "@material-ui/core";
import { FEEDBACK_FLOW_DYNAMIC, ICategory, IFeedbackFlowType, ICategoryList } from '../../../model';
import { Alert } from '@material-ui/lab';
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  info: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 'max-content',
		height: '20px',
		fontSize: '13px',
		padding: '5px',
		marginBottom: '10px',
		borderRadius: '10px',
	},
}));


const CategoryList = (
    props: ICategoryList
  ) => {
    const { category, catIndex, feedbackFlowType, handleChangeFeedbackCategoryName, handleChangeFeedbackStdFeedbackText, deleteFeedbackCategory, addFeedbackStdFeedbackText, deleteFeedbackStdFeedbackText, handleChangeFeedbackStdPositiveFeedbackText, handleChangeFeedbackStdNegativeFeedbackText, addFeedbackStdPositiveFeedbackText,
      addFeedbackStdNegativeFeedbackText, deleteFeedbackStdPositiveFeedbackText, deleteFeedbackStdNegativeFeedbackText } = props;
      const classes = useStyles();
    return (
      <Fragment key={catIndex}>
        <Grid container spacing={1} style={{ border: 'solid 1px #aaaaaa', padding: '8px', margin: '4px' }}>
          <Grid item xs={11} sm={11}>
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
          <Grid item xs={1} sm={1}>
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
          <Grid item xs={9} style={{width: 'max-content'}}>
            <Typography style={{paddingLeft: '10px'}}>Standard Feedback:</Typography>
            <Alert className={classes.info} severity='info'>
											Standard text appears for all the rating.
						</Alert>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
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
          {feedbackFlowType === FEEDBACK_FLOW_DYNAMIC ? (<><Grid item xs={9} style={{width: 'max-content'}}>
            <Typography style={{paddingLeft: '10px'}}>Positive Feedback:</Typography>
            <Alert className={classes.info} severity='info'>
											Standard text appears for rating greater than or equal to selected rating limit.
						</Alert>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a positive Feedback text'}
              aria-label='Add a positive Feedback text'
            >
              <Button size='small' variant="outlined"
               onClick={() => addFeedbackStdPositiveFeedbackText(catIndex)} 
               >
                <AddIcon /> Feedback Text
              </Button>
            </LightTooltip>
          </Grid>
          {category.positiveFeedbacks &&
            category.positiveFeedbacks.map((feedback: string, index: number) => {
              return (
                <Grid key={index} container spacing={1}>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={10} sm={10}>
                    <TextField
                      required
                      type='string'
                      id={`positivefeedback_${catIndex}_${index}`}
                      name={`positivefeedback_${catIndex}_${index}`}
                      label='Feedback text'
                      value={feedback ? feedback : ''}
                      fullWidth
                      onChange={(event) => handleChangeFeedbackStdPositiveFeedbackText(event, catIndex, index)}
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
                       onClick={() => deleteFeedbackStdPositiveFeedbackText(catIndex, index)} 
                       >
                        <ClearIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                </Grid>
              );
            })
          }
            <Grid item xs={9} style={{width: 'max-content'}}>
            <Typography style={{paddingLeft: '10px'}}>Negative Feedback:</Typography>
            <Alert className={classes.info} severity='info'>
											Standard text appears for rating lesser than selected rating limit.
						</Alert>
          </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a negative Feedback text'}
              aria-label='Add a negative Feedback text'
            >
              <Button size='small' variant="outlined"
               onClick={() => addFeedbackStdNegativeFeedbackText(catIndex)} 
               >
                <AddIcon /> Feedback Text
              </Button>
            </LightTooltip>
          </Grid>
          {category.negativeFeedbacks &&
            category.negativeFeedbacks.map((feedback: string, index: number) => {
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
                      onChange={(event) => handleChangeFeedbackStdNegativeFeedbackText(event, catIndex, index)}
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
                       onClick={() => deleteFeedbackStdNegativeFeedbackText(catIndex, index)} 
                       >
                        <ClearIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                </Grid>
              );
            })
          }</>)  : ''}
        </Grid>
      </Fragment>
    );
  };

  export default CategoryList;