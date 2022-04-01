import React, { Fragment } from 'react';
import { Grid, Typography, TextField, Button, IconButton,
  FormControl,  InputLabel, Select, MenuItem,
  makeStyles, FormControlLabel, Checkbox
} from "@material-ui/core";
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { ICategory, IProductParams, ISeverity } from '../../../model';
import ClearIcon from '@material-ui/icons/Clear';
import { Http } from '../../../utils';

interface BugSettingProps {
  productParams: IProductParams,
  addBugCategory: Function,
  handleChangeBugCategoryName: Function,
  deleteBugCategory: Function,
  addBugStdFeedbackText: Function,
  handleChangeBugStdFeedbackText: Function,
  deleteBugStdFeedbackText: Function,
  handleBugTitleChange: Function,
  handleBugTooltipChange: Function,
  handleBugDialogMsgChange: Function,
  handleBugThanksMsgChange: Function,
  handleReqComments: Function,
  addBugSeverity: Function,
  handleTrackingSystemDetails: Function,
  handleChangeBugSeverityName: Function,
  handleSetTrackingSystemBugSeverity: Function,
  deleteBugSeverity: Function,
  useTrackingSystemSeverity: boolean,
}



const renderSeverityDetails = (
  severity: ISeverity,
  catIndex: number,
  useTrackingSystemSeverity: boolean,
  handleChangeBugSeverityName: Function,
  deleteBugSeverity: Function,
  ) => {
    return(   
    <Fragment key={catIndex}>
      <Grid container spacing={1} style={{ border: 'solid 1px #aaaaaa', padding: '8px', margin: '4px' }}>
        <Grid item xs={10} sm={10}>
          <TextField
            required
            type='string'
            id={`severity_${catIndex}`}
            name={`severity_${catIndex}`}
            label='Severity Type'
            value={severity}
            disabled={useTrackingSystemSeverity}
            fullWidth
            onChange={(event) => handleChangeBugSeverityName(event, catIndex)}
            autoComplete='off'
            className='textFieldStyle'
          />
        </Grid>
        {useTrackingSystemSeverity ? '' : (<Grid item xs={2} sm={2}>
          <LightTooltip
            title={'Delete this Severity type'}
            aria-label='delete this severity type'
          >
            <IconButton size='small' onClick={() => deleteBugSeverity(catIndex)} >
              <ClearIcon />
            </IconButton>
          </LightTooltip>
        </Grid>)}
      </Grid>
    </Fragment>)
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  helperText: {
    textAlign: 'right',
    margin: 0,
    position: 'absolute',
    right: 0,
  },
}));

const renderCategoryDetails = (
  category: ICategory,
  catIndex: number,
  handleChangeBugCategoryName: Function,
  deleteBugCategory: Function,
  addBugStdFeedbackText: Function,
  handleChangeBugStdFeedbackText: Function,
  deleteBugStdFeedbackText: Function
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
  addBugSeverity,
  handleChangeBugSeverityName,
  handleTrackingSystemDetails,
  deleteBugSeverity,
  handleChangeBugCategoryName,
  deleteBugCategory,
  addBugStdFeedbackText,
  handleChangeBugStdFeedbackText,
  deleteBugStdFeedbackText,
  handleBugTitleChange,
  handleBugTooltipChange,
  handleBugDialogMsgChange,
  handleBugThanksMsgChange,
  handleReqComments,
  useTrackingSystemSeverity
}: BugSettingProps) => {
  const classes = useStyles();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  // const handleRequireComments = (event: any) => {
  //   if (event.target.value === 'true') {
  //     handleReqComments(true, 'Bugs');
  //   } else if (event.target.value === 'false') {
  //     handleReqComments(false, 'Bugs');
  //   }
  // }


  return (
    <Fragment>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_title`}
            name={`bug_title`}
            label='Text for the bug option'
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
            inputProps={{ maxLength: 15 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.title ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.title.length)}/15 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_tooltip`}
            name={`bug_tooltip`}
            label='Tooltip or additional message with the bug option'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.tooltip)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.tooltip
                : ''
            }
            fullWidth
            onChange={(event) => handleBugTooltipChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 45 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.tooltip ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.tooltip.length)}/45 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_dialogMsg`}
            name={`bug_dialogMsg`}
            label='Message displayed on top of the bugs dialog'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg
                : ''
            }
            fullWidth
            onChange={(event) => handleBugDialogMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 80 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg.length)}/80 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_thanksMsg`}
            name={`bug_thanksMsg`}
            label='Message to be displayed after the user submits a bug'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg
                : ''
            }
            fullWidth
            onChange={(event) => handleBugThanksMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 85 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg.length)}/85 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings)
                  ? productParams.products[0].feedbackAgentSettings.bugSettings.reqComments
                  : true}
                onChange={(event) => handleReqComments('Bugs')}
                value="BugRequireComments"
              />
            }
            label={
              <Typography color="textSecondary">
                {"Comment field mandatory?"}
              </Typography>
            }
            labelPlacement={'start'}
          />
          {/* <FormControl style={{ width: '100%'}}>
            <InputLabel id={`mandatoryComments`} required={true}>
              {"Require comments/text when submitting bugs or incidents:"}
            </InputLabel>
            <Select
              name={`select_CommentsMandatory`}
              value={
                (productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings.reqComments)
                  ? productParams.products[0].feedbackAgentSettings.bugSettings.reqComments
                  : 'false'
              }
              onChange={(event) => handleRequireComments(event)}
            >
              <MenuItem key={1} value={'false'}>{'Optional'}</MenuItem>
              <MenuItem key={2} value={'true'}>{'Mandatory'}</MenuItem>
            </Select>
          </FormControl> */}
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
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={10}>
          <Typography variant="h6">Severity:</Typography>
        </Grid>
        {useTrackingSystemSeverity ? '' : (<Grid item xs={2} style={{ textAlign: "center" }}>
          <LightTooltip
            title={'Add a severity type'}
            aria-label='Add a severity type'
          >
            <Button size='small' variant="outlined" onClick={() => addBugSeverity()} >
              <AddIcon /> Severity
            </Button>
          </LightTooltip>
        </Grid>) }
        {productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings.severities &&
          productParams.products[0].feedbackAgentSettings.bugSettings.severities.map((severity: ISeverity, index: number) => {
            return renderSeverityDetails(
              severity,
              index,
              useTrackingSystemSeverity,
              handleChangeBugSeverityName,
              deleteBugSeverity,
 );
          })}
           {productParams && productParams.products && productParams.products[0] && productParams.products[0].trackingSystem ? (<FormControlLabel
                control={
                  <Checkbox
                    checked={(productParams && productParams.products && productParams.products[0] &&
                      productParams.products[0].trackingSystem)
                      ? productParams.products[0].trackingSystem.trackingSystem
                      : false}
                    onChange={(event) => handleTrackingSystemDetails(event,
                       ((productParams && productParams.products && productParams.products[0] &&
                      productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.auth['authUser'] : ''), 
                      ((productParams && productParams.products && productParams.products[0] &&
                        productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.auth['authKey'] : ''), 
                        ((productParams && productParams.products && productParams.products[0] &&
                          productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.url : ''))}
                    value="trackingSystemSeverityDetails"
                  />
                }
                label={
                  <Typography color="textSecondary">
                    {"Use Tracking system severity details"}
                  </Typography>
                }
                labelPlacement={'start'}
              />) : ''
              }
      </Grid>
      </Fragment>
  );
}

export default BugSettings;

function useState<T>(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
