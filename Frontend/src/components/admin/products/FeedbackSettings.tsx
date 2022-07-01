import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select,
  InputLabel, Button, IconButton, makeStyles, FormControlLabel,
  Checkbox, Box } from "@material-ui/core";
import { LightTooltip } from '../../common/tooltip';
import CategoryList from './categoryList';
import AddIcon from '@material-ui/icons/Add';
import { FEEDBACK_OPT, ICategory, IProductParams, FEEDBACK_FLOW_STATIC, IFeedbackFlowType, FEEDBACK_FLOW_DYNAMIC, IFeedbackSettingProps } from '../../../model';
import ClearIcon from '@material-ui/icons/Clear';
import IconSelect from './IconSelect';

const useStyles = makeStyles((theme) => ({
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '20%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
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

const FeedbackSettings = ({
  productParams,
  addFeedbackCategory,
  handleChangeFeedbackCategoryName,
  deleteFeedbackCategory,
  addFeedbackStdFeedbackText,
  handleChangeFeedbackStdFeedbackText,
  deleteFeedbackStdFeedbackText,
  handleFeedbackTitleChange,
  handleFeedbackTooltipChange,
  handleFeedbackDialogMsgChange,
  handleFeedbackThanksMsgChange,
  handleRatingLimitChange,
  handleReqComments,
  handleReqDisplayEmail,
  handleIconChange,
  handleFeedbackFlowChange,
  handleChangeFeedbackStdPositiveFeedbackText,
  handleChangeFeedbackStdNegativeFeedbackText,
  addFeedbackStdPositiveFeedbackText,
  addFeedbackStdNegativeFeedbackText,
  deleteFeedbackStdPositiveFeedbackText,
  deleteFeedbackStdNegativeFeedbackText,
  handleFeedbackGeneralCommentsHeadingChange,
  handleFeedbackCategoryHeadingChange,
  handleFeedbackStdFeedbackHeadingChange,
  handleFeedbackRatingHeadingChange
}: IFeedbackSettingProps) => {
  const classes = useStyles();
  const feedbackFlowType = (productParams && productParams.products && productParams.products[0] &&
    productParams.products[0].feedbackAgentSettings &&
    productParams.products[0].feedbackAgentSettings.feedbackSettings &&
    productParams.products[0].feedbackAgentSettings.feedbackSettings.type)
    ? productParams.products[0].feedbackAgentSettings.feedbackSettings.type
    : FEEDBACK_FLOW_STATIC
  return (
    <Fragment>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
      <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id={`flowType`} required={true}>
              {'Choose the flow of your feedback:'}
            </InputLabel>
            <Select
              name={`select_flowType`}
              value={
                (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.type)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.type
                : FEEDBACK_FLOW_STATIC
              }
              onChange={(event) => handleFeedbackFlowChange(event)}
            >
              <MenuItem key={FEEDBACK_FLOW_STATIC} value={FEEDBACK_FLOW_STATIC}>{FEEDBACK_FLOW_STATIC}</MenuItem>
              <MenuItem key={FEEDBACK_FLOW_DYNAMIC} value={FEEDBACK_FLOW_DYNAMIC}>{FEEDBACK_FLOW_DYNAMIC}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_title`}
            name={`feedback_title`}
            label='Text for the feedback option'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.title)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.title
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackTitleChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.title ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.title.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12} style={{ marginTop: '5px',  marginBottom: '10px', border: 'solid 1px #F1F1F1' }}>
          <Box
            sx={{
              width: '100%',
              marginTop: '5px',
            }}
          >
            <IconSelect
              iconStr={productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.icon ?
                productParams.products[0].feedbackAgentSettings.feedbackSettings.icon : ''}
              handleIconChange={handleIconChange}
              iconType={FEEDBACK_OPT}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_tooltip`}
            name={`feedback_tooltip`}
            label='Tooltip or additional message with the feedback option'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.tooltip)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.tooltip
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackTooltipChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.tooltip ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.tooltip.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_dialogMsg`}
            name={`feedback_dialogMsg`}
            label='Message displayed on top of the feedback dialog'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.dialogMsg)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.dialogMsg
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackDialogMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.dialogMsg ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.dialogMsg.length)}/ 256characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_ratingHeader`}
            name={`feedback_ratingHeader`}
            label='Message to be displayed on top of ratings'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingHeading)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackRatingHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingHeading ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.ratingHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_catListHeader`}
            name={`feedback_catListHeader`}
            label='Message to be displayed on top of category list'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.categoryHeading)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.categoryHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackCategoryHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.categoryHeading ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.categoryHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_stdFeedbackHeader`}
            name={`feedback_stdFeedbackHeader`}
            label='Message to be displayed on top of standard Feedback text'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.stdFeedbackHeading)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.stdFeedbackHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackStdFeedbackHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.stdFeedbackHeading ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.stdFeedbackHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_commentsHeader`}
            name={`feedback_commentsHeader`}
            label='Message to be displayed on top of Comments text box'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.generalCommentsHeading)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.generalCommentsHeading
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackGeneralCommentsHeadingChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.generalCommentsHeading ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.generalCommentsHeading.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feedback_thanksMsg`}
            name={`feedback_thanksMsg`}
            label='Message to be displayed after the user submits a feedback'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings &&
                productParams.products[0].feedbackAgentSettings.feedbackSettings.thanksMsg)
                ? productParams.products[0].feedbackAgentSettings.feedbackSettings.thanksMsg
                : ''
            }
            fullWidth
            onChange={(event) => handleFeedbackThanksMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 256 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackSettings.thanksMsg ?
              `${(productParams.products[0].feedbackAgentSettings.feedbackSettings.thanksMsg.length)}/256 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.feedbackSettings)
                  ? productParams.products[0].feedbackAgentSettings.feedbackSettings.reqComments
                  : true}
                onChange={(event) => handleReqComments('Feedback')}
                value="FeedbackRequireComments"
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
                  productParams.products[0].feedbackAgentSettings.feedbackSettings)
                  ? productParams.products[0].feedbackAgentSettings.feedbackSettings.reqDisplayEmail
                  : true}
                onChange={(event) => handleReqDisplayEmail('Feedback')}
                value="FeedbackDisplayEmail"
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
          <FormControl style={{ minWidth: '100%' }}>
            {(feedbackFlowType === FEEDBACK_FLOW_DYNAMIC) ? (<InputLabel id={`ratingLimit`} required={true}>
              {'The star rating below which negative comments are shown'}
            </InputLabel>) : (<InputLabel id={`ratingLimit`} required={true}>
              {'The star rating till which detailed feedback will be requested'}
            </InputLabel>)}
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
          productParams.products[0].feedbackAgentSettings.feedbackSettings.categories &&
          productParams.products[0].feedbackAgentSettings.feedbackSettings.categories.map((category: ICategory, index: number
            ) => {
            return  <CategoryList category={category} catIndex={index} feedbackFlowType={feedbackFlowType}
            handleChangeFeedbackCategoryName={handleChangeFeedbackCategoryName}
           deleteFeedbackCategory={deleteFeedbackCategory} addFeedbackStdFeedbackText={addFeedbackStdFeedbackText}
           handleChangeFeedbackStdFeedbackText={handleChangeFeedbackStdFeedbackText} deleteFeedbackStdFeedbackText={deleteFeedbackStdFeedbackText}
           handleChangeFeedbackStdPositiveFeedbackText = {handleChangeFeedbackStdPositiveFeedbackText} handleChangeFeedbackStdNegativeFeedbackText = {handleChangeFeedbackStdNegativeFeedbackText}
           addFeedbackStdPositiveFeedbackText={addFeedbackStdPositiveFeedbackText} addFeedbackStdNegativeFeedbackText={addFeedbackStdNegativeFeedbackText} 
           deleteFeedbackStdPositiveFeedbackText={deleteFeedbackStdPositiveFeedbackText} deleteFeedbackStdNegativeFeedbackText={deleteFeedbackStdNegativeFeedbackText}/>
            }
            )}
      </Grid>
    </Fragment>
  );
}

export default FeedbackSettings;