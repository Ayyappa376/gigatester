import React, { Fragment } from 'react';
import { Grid, Typography, TextField, Button, IconButton,
  makeStyles, FormControlLabel, Checkbox, Box
} from "@material-ui/core";
import { LightTooltip } from '../../common/tooltip';
import AddIcon from '@material-ui/icons/Add';
import { BUGS_OPT, ICategory, IProductParams, TRACKING_SYSTEM_SELF, IBugSettingProps } from '../../../model';
import ClearIcon from '@material-ui/icons/Clear';
import IconSelect from './IconSelect';
import ExtTrackingSystemSettings from './extTrackingSystem/ExtTrackingSystemSettings';

const renderSeverityDetails = (
  severity: string,
  sevIndex: number,
  enableEdit: boolean,
  handleChangeBugSeverityName: Function,
  deleteBugSeverity: Function,
  ) => {
    return(
      <Grid container spacing={1} key={`severity_${sevIndex}`} style={{ border: 'solid 1px #aaaaaa', padding: '8px', margin: '4px' }}>
        <Grid item xs={10} sm={10}>
          <TextField
            required
            type='string'
            id={`severity_${sevIndex}`}
            name={`severity_${sevIndex}`}
            label='Severity Type'
            value={severity}
            disabled={!enableEdit}
            fullWidth
            onChange={(event) => handleChangeBugSeverityName(event, sevIndex)}
            autoComplete='off'
            className='textFieldStyle'
          />
        </Grid>
        {enableEdit ? (<Grid item xs={2} sm={2}>
          <LightTooltip
            title={'Delete this Severity value'}
            aria-label='delete this severity value'
          >
            <IconButton size='small' onClick={() => deleteBugSeverity(sevIndex)} >
              <ClearIcon />
            </IconButton>
          </LightTooltip>
        </Grid>) : ''}
      </Grid>
    )
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
	dialogue: {
		fontSize: '18px',
		fontWeight: 500,
		color: 'rgb(10, 34, 90)',
		textAlign: 'left',
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
//  useTrackingSystemSeverity,
  addBugCategory,
  handleChangeBugCategoryName,
  deleteBugCategory,
  handleChangeJiraFieldMapping,
  addBugStdFeedbackText,
  handleChangeBugStdFeedbackText,
  deleteBugStdFeedbackText,
  addBugSeverity,
  handleChangeBugSeverityName,
  // handleExtTrackingSystemSync,
  handleChangeExtSeverityFilter,
  handleChangeExtCategoryFilter,
  deleteBugSeverity,
  handleBugTitleChange,
  handleBugTooltipChange,
  handleBugDialogMsgChange,
  handleBugThanksMsgChange,
  handleReqComments,
  handleReqDisplayEmail,
  handleShowSeverityOption,
  handleIconChange,
  handleURLChange,
  handleAuthChange,
  handleTrackingSytemProjectDetails,
  handleExtSystemSeverity,
  handleSystemTypeChange,
  handleBugGeneralCommentsHeadingChange,
  handleBugCategoryHeadingChange,
  handleBugStdFeedbackHeadingChange,
  handleBugSeverityHeadingChange
}: IBugSettingProps) => {
  const classes = useStyles();

  const usingExtTrackingSystem = productParams && productParams.products && productParams.products[0] &&
    productParams.products[0].trackingSystem && productParams.products[0].trackingSystem.type !== TRACKING_SYSTEM_SELF;

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
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.title ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.title.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12} style={{ marginTop: '5px', marginBottom: '10px', border: 'solid 1px #F1F1F1' }}>
          <Box
            sx={{
              width: '100%',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <IconSelect
              iconStr={productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.icon ?
                productParams.products[0].feedbackAgentSettings.bugSettings.icon : ''}
              handleIconChange={handleIconChange}
              iconType={BUGS_OPT}
            />
          </Box>
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
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.tooltip ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.tooltip.length)}/256 characters` : null}
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
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.dialogMsg.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_catListHeader`}
            name={`bug_catListHeader`}
            label='Message to be displayed on top of category list'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.categoryHeading)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.categoryHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleBugCategoryHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.categoryHeading ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.categoryHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_severityListHeader`}
            name={`bug_severityListHeader`}
            label='Message to be displayed on top of severity list'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.severityHeading)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.severityHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleBugSeverityHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.severityHeading ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.severityHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_stdFeedbackHeader`}
            name={`bug_stdFeedbackHeader`}
            label='Message to be displayed on top of standard Feedback text'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.stdFeedbackHeading)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.stdFeedbackHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleBugStdFeedbackHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.stdFeedbackHeading ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.stdFeedbackHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`bug_commentsHeader`}
            name={`bug_commentsHeader`}
            label='Message to be displayed on top of Comments text box'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings &&
                productParams.products[0].feedbackAgentSettings.bugSettings.generalCommentsHeading)
                ? productParams.products[0].feedbackAgentSettings.bugSettings.generalCommentsHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleBugGeneralCommentsHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.generalCommentsHeading ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.generalCommentsHeading.length)}/256 characters` : null}
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
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings &&
              productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg ?
              `${(productParams.products[0].feedbackAgentSettings.bugSettings.thanksMsg.length)}/256 characters` : null}
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
                {"Require general comment field?"}
              </Typography>
            }
            labelPlacement={'start'}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings)
                  ? productParams.products[0].feedbackAgentSettings.bugSettings.reqDisplayEmail
                  : true}
                onChange={(event) => handleReqDisplayEmail('Bugs')}
                value="BugDisplayEmail"
              />
            }
            label={
              <Typography color="textSecondary">
                {"Show email field if default value is set?"}
              </Typography>
            }
            labelPlacement={'start'}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.bugSettings)
                  ? productParams.products[0].feedbackAgentSettings.bugSettings.showSeverity
                  : true}
                onChange={(event) => handleShowSeverityOption()}
                value="BugShowSeverity"
              />
            }
            label={
              <Typography color="textSecondary">
                {"Show Severity Options to Users?"}
              </Typography>
            }
            labelPlacement={'start'}
          />
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
        {usingExtTrackingSystem ? '' :
          (<Grid item xs={2} style={{ textAlign: "center" }}>
            <LightTooltip
              title={'Add a severity type'}
              aria-label='Add a severity type'
            >
              <Button size='small' variant="outlined" onClick={() => addBugSeverity()} >
                <AddIcon /> Severity
              </Button>
            </LightTooltip>
          </Grid>)
        }
        {productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].feedbackAgentSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings &&
          productParams.products[0].feedbackAgentSettings.bugSettings.severities &&          
          productParams.products[0].feedbackAgentSettings.bugSettings.severities.map((severity: string, index: number) => {
            return renderSeverityDetails(
              severity,
              index,
              usingExtTrackingSystem ? false: true,
              handleChangeBugSeverityName,
              deleteBugSeverity,
            )
          })
        }
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={10}>
          <Typography variant="h6">External System Settings:</Typography>
        </Grid>
        </Grid>
               <Grid item xs={12} sm={12} style={{ marginTop: '5px', marginBottom: '10px', border: 'solid 1px #F1F1F1' }}>
          <Box
            sx={{
              width: '100%',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
        <ExtTrackingSystemSettings productParams={productParams} handleTrackingSytemProjectDetails={handleTrackingSytemProjectDetails} handleSystemTypeChange={handleSystemTypeChange} handleChangeJiraFieldMapping={handleChangeJiraFieldMapping} handleChangeExtSeverityFilter={handleChangeExtSeverityFilter} handleChangeExtCategoryFilter={handleChangeExtCategoryFilter}
        handleURLChange={handleURLChange} handleExtSystemSeverity={handleExtSystemSeverity} handleAuthChange={handleAuthChange} />
        </Box>
        </Grid>
        {/* {productParams && productParams.products && productParams.products[0] &&
          productParams.products[0].trackingSystem ?
          (<FormControlLabel
            control={
              <Checkbox
                checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].trackingSystem)
                  ? productParams.products[0].trackingSystem.trackingSystem
                : false}
                // onChange={(event) => handleTrackingSystemDetails(event,
                //     ((productParams && productParams.products && productParams.products[0] &&
                //   productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.auth['authUser'] : ''),
                //   ((productParams && productParams.products && productParams.products[0] &&
                //     productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.auth['authKey'] : ''),
                //     ((productParams && productParams.products && productParams.products[0] &&
                //       productParams.products[0].trackingSystem) ? productParams.products[0].trackingSystem.url : ''))}
                value="trackingSystemSeverityDetails"
              />
            }
            label={
              <Typography color="textSecondary">
                {"Upload bugs to tracking system."}
              </Typography>
            }
            labelPlacement={'start'}
          />) : ''
          } */}
      </Grid>
    </Fragment>
  );
}

export default BugSettings;

function useState<T>(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
