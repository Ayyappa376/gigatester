import React, { Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select,
  InputLabel, Button, IconButton, makeStyles, FormControlLabel,
  Checkbox, Box } from "@material-ui/core";
import { FEATURE_OPT, IProductParams } from '../../../model';
import IconSelect from './IconSelect';

interface FeatRequestProps {
  productParams: IProductParams;
  handleReqComments: Function;
  handleReqDisplayEmail: Function;
  handleIconChange: Function;
  handleFeatureReqTitleChange: Function;
  handleFeatureReqTooltipChange: Function;
  handlFeatureReqDialogMsgChange: Function;
  handleFeatureReqThanksMsgChange: Function;
}

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


const FeatureRequestSettings = ({
  productParams,
  handleReqComments,
  handleReqDisplayEmail,
  handleIconChange,
  handleFeatureReqTitleChange,
  handleFeatureReqTooltipChange,
  handlFeatureReqDialogMsgChange,
  handleFeatureReqThanksMsgChange,
}: FeatRequestProps) => {
  const classes = useStyles();

  // console.log('productParams', productParams)
  return (
    <Fragment>
      <Grid container spacing={1} style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }} >
        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feature_title`}
            name={`feature_title`}
            label='Text for the feature request/enhancement option'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings.title)
                ? productParams.products[0].feedbackAgentSettings.featureReqSettings.title
                : ''
            }
            fullWidth
            onChange={(event) => {
              event.stopPropagation()
              handleFeatureReqTitleChange(event)
            }}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 15 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings.title ?
              `${(productParams.products[0].feedbackAgentSettings.featureReqSettings.title.length)}/15 characters` : null}
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
                productParams.products[0].feedbackAgentSettings.featureReqSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings.icon ?
                productParams.products[0].feedbackAgentSettings.featureReqSettings.icon : ''}
              handleIconChange={handleIconChange}
              iconType={FEATURE_OPT}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feature_tooltip`}
            name={`feature_tooltip`}
            label='Tooltip or additional message with the feature request option'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings.tooltip)
                ? productParams.products[0].feedbackAgentSettings.featureReqSettings.tooltip
                : ''
            }
            fullWidth
            onChange={(event) => handleFeatureReqTooltipChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 45 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings.tooltip ?
              `${(productParams.products[0].feedbackAgentSettings.featureReqSettings.tooltip.length)}/45 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feature_dialogMsg`}
            name={`feature_dialogMsg`}
            label='Message displayed on top of the feature request dialog'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings.dialogMsg)
                ? productParams.products[0].feedbackAgentSettings.featureReqSettings.dialogMsg
                : ''
            }
            fullWidth
            onChange={(event) => handlFeatureReqDialogMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 80 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings.dialogMsg ?
              `${(productParams.products[0].feedbackAgentSettings.featureReqSettings.dialogMsg.length)}/80 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            type='string'
            id={`feature_thanksMsg`}
            name={`feature_thanksMsg`}
            label='Message to be displayed after the user submits a feature request/enhancement'
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings &&
                productParams.products[0].feedbackAgentSettings.featureReqSettings.thanksMsg)
                ? productParams.products[0].feedbackAgentSettings.featureReqSettings.thanksMsg
                : ''
            }
            fullWidth
            onChange={(event) => handleFeatureReqThanksMsgChange(event)}
            autoComplete='off'
            className='textFieldStyle'
            inputProps={{ maxLength: 85 }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings &&
              productParams.products[0].feedbackAgentSettings.featureReqSettings.thanksMsg ?
              `${(productParams.products[0].feedbackAgentSettings.featureReqSettings.thanksMsg.length)}/85 characters` : null}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                  productParams.products[0].feedbackAgentSettings &&
                  productParams.products[0].feedbackAgentSettings.featureReqSettings)
                  ? productParams.products[0].feedbackAgentSettings.featureReqSettings.reqComments
                  : true}
                onChange={(event) => handleReqComments('Feature_Request')}
                value="FeatureRequireComments"
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
                  productParams.products[0].feedbackAgentSettings.featureReqSettings)
                  ? productParams.products[0].feedbackAgentSettings.featureReqSettings.reqDisplayEmail
                  : true}
                onChange={(event) => handleReqDisplayEmail('Feature_Request')}
                value="FeatureDisplayEmail"
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
      </Grid>
    </Fragment>
  );
}

export default FeatureRequestSettings;