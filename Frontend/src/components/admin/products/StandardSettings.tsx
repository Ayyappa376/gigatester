import * as React from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select, InputLabel, makeStyles,
  FormControlLabel, Checkbox
 } from "@material-ui/core";
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { FEEDBACK_TYPE_FEEDBACK, FEEDBACK_TYPE_BUGS,
  INVOKE_TYPE_MANUAL,
  IProductParams,
  PLATFORM_TYPE_BROWSER,
  PLATFORM_TYPE_NATIVE_REACT,
  EMAIL_MANDATORY,
  EMAIL_OPTIONAL,
} from '../../../model';

interface SettingsProps {
  productParams: IProductParams,
  handleTitleChange: Function,
  handleThanksStrChange: Function,
  handleVideoAudioMaxDurationChange: Function,
  handleInvokeOnChange: Function,
  handleInvokeDelayChange: Function,
  handleUploadFileMaxSizeChange: Function,
  handleFeedbackTypesChange: Function,
  handlePlatformTypeChange: Function,
  handleEmailOption: Function,
  handleCaptureSystemDetailsOption: Function,
}

const useStyles = makeStyles((theme) => ({
  actionsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '20%',
  },
  backButton: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  button: {
    marginTop: '36px',
    position: 'relative',
    minWidth: '10%',
    marginRight: '20px',
    ...buttonStyle,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  sections: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
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
}));

const StandardSettings = ({
  productParams,
  handleInvokeDelayChange,
  handleTitleChange,
  handleThanksStrChange,
  handleVideoAudioMaxDurationChange,
  handleInvokeOnChange,
  handleFeedbackTypesChange,
  handleUploadFileMaxSizeChange,
  handlePlatformTypeChange,
  handleEmailOption,
  handleCaptureSystemDetailsOption,
}: SettingsProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >
      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`platformType`} required={true}>
            {'Choose the platform of your product:'}
          </InputLabel>
          <Select
            name={`select_platformType`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.platform)
              ? productParams.products[0].feedbackAgentSettings.platform
              : ''
            }
            onChange={(event) => handlePlatformTypeChange(event)}
          >
            <MenuItem key={PLATFORM_TYPE_BROWSER} value={PLATFORM_TYPE_BROWSER}>{PLATFORM_TYPE_BROWSER}</MenuItem>
            <MenuItem key={PLATFORM_TYPE_NATIVE_REACT} value={PLATFORM_TYPE_NATIVE_REACT}>{PLATFORM_TYPE_NATIVE_REACT}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          required={true}
          type='string'
          id={`title`}
          name={`title`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.title)
            ? productParams.products[0].feedbackAgentSettings.title
            : ''
          }
          label={'Title to display on the dialog'}
          onChange={(event) => handleTitleChange(event)}
          fullWidth
          autoComplete='off'
          className='textFieldStyle'
          FormHelperTextProps={{
            className: classes.helperText
          }}
          helperText={`${(productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.title.length)}/15 chars`}
          inputProps={{maxLength: 15}}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          required={true}
          type='string'
          id={`thanksStr`}
          name={`thanksStr`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.thanksStr)
            ? productParams.products[0].feedbackAgentSettings.thanksStr
            : ''
          }
          label={'A short thank you caption to display after Feedback or Bug is submitted'}
          onChange={(event) => handleThanksStrChange(event)}
          fullWidth
          autoComplete='off'
          className='textFieldStyle'
          inputProps={{ maxLength: 60 }}
          FormHelperTextProps={{
            className: classes.helperText
          }}
          helperText={productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.thanksStr ?
            `${(productParams.products[0].feedbackAgentSettings.thanksStr.length)}/60 chars` : null}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`feedbackTypes`} required={true}>
            {'What can users submit using this widget (select multiple):'}
          </InputLabel>
          <Select
            name={`select_feedbackTypes`}
            multiple
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.feedbackTypes)
              ? productParams.products[0].feedbackAgentSettings.feedbackTypes
              : []
            }
            onChange={(event) => handleFeedbackTypesChange(event)}
          >
            <MenuItem key={FEEDBACK_TYPE_FEEDBACK} value={FEEDBACK_TYPE_FEEDBACK}>{'Submit Feedback'}</MenuItem>
            <MenuItem key={FEEDBACK_TYPE_BUGS} value={FEEDBACK_TYPE_BUGS}>{'Submit Bugs'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`uploadFileMaxSize`} required={true}>
            {'Maximum size of the file that can be uploaded (In MB):'}
          </InputLabel>
          <Select
            name={`select_uploadFileMaxSize`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.uploadFileMaxSize)
              ? productParams.products[0].feedbackAgentSettings.uploadFileMaxSize
              : ''
            }
            onChange={(event) => handleUploadFileMaxSizeChange(event)}
          >
            <MenuItem key={200} value={200}>{'200 MB'}</MenuItem>
            <MenuItem key={400} value={400}>{'400 MB'}</MenuItem>
            <MenuItem key={600} value={600}>{'600 MB'}</MenuItem>
            <MenuItem key={800} value={800}>{'800 MB'}</MenuItem>
            <MenuItem key={1024} value={1024}>{'1 GB'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`videoAudioMaxDuration`} required={true}>
            {'Maximum duration of the Audio and Video recordings (In minutes):'}
          </InputLabel>
          <Select
            name={`select_videoAudioMaxDuration`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration)
              ? productParams.products[0].feedbackAgentSettings.videoAudioMaxDuration
              : ''
            }
            onChange={(event) => handleVideoAudioMaxDurationChange(event)}
          >
            <MenuItem key={0.5} value={0.5}>{'half a minute'}</MenuItem>
            <MenuItem key={1} value={1}>{'1 minute'}</MenuItem>
            <MenuItem key={1.5} value={1.5}>{'1 and a half minutes'}</MenuItem>
            <MenuItem key={2} value={2}>{'2 minutes'}</MenuItem>
            <MenuItem key={2.5} value={2.5}>{'2 and a half minutes'}</MenuItem>
            <MenuItem key={3} value={3}>{'3 minutes'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`mandatoryEmail`} required={true}>
            {"Is user's email field mandatory for form submission:"}
          </InputLabel>
          <Select
            name={`select_emailMandatory`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.requireEmail)
              ? productParams.products[0].feedbackAgentSettings.requireEmail
              : 'OPTIONAL'
            }
            onChange={(event) => handleEmailOption(event)}
          >
            <MenuItem key={EMAIL_OPTIONAL} value={EMAIL_OPTIONAL}>{'Optional'}</MenuItem>
            <MenuItem key={EMAIL_MANDATORY} value={EMAIL_MANDATORY}>{'Mandatory'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={(productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings)
                ? productParams.products[0].feedbackAgentSettings.captureSystemDetails
                : true}
              onChange={(event) => handleCaptureSystemDetailsOption(event)}
              value="captureSystemDetails"
            />
          }
          label={
            <Typography color="textSecondary">
              {"Capture User's system details?"}
            </Typography>
          }
          labelPlacement={'start'}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`invokeOn`} required={true}>
            {'How will the feedback dialog be invoked (can select multiple):'}
          </InputLabel>
          <Select
            name={`select_invokeOn`}
            multiple
            value={
              (productParams && productParams.products && productParams.products[0] &&
              productParams.products[0].feedbackAgentSettings &&
              productParams.products[0].feedbackAgentSettings.invokeOn)
              ? productParams.products[0].feedbackAgentSettings.invokeOn
              : []
            }
            onChange={(event) => handleInvokeOnChange(event)}
          >
            <MenuItem key={INVOKE_TYPE_MANUAL} value={INVOKE_TYPE_MANUAL}>{'User manually clicks button'}</MenuItem>
            {/*<MenuItem key={INVOKE_TYPE_AFTER_DELAY} value={INVOKE_TYPE_AFTER_DELAY}>{'Automatically display after sometime'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_CONTEXT_CHANGE} value={INVOKE_TYPE_CONTEXT_CHANGE}>{'Automatically display on context change'}</MenuItem>
            <MenuItem key={INVOKE_TYPE_IDLE} value={INVOKE_TYPE_IDLE}>{'Automatically display when the is inactivity'}</MenuItem>*/}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          required={false}
          type='number'
          id={`invokeDelay`}
          name={`invokeDelay`}
          value={
            (productParams && productParams.products && productParams.products[0] &&
            productParams.products[0].feedbackAgentSettings &&
            productParams.products[0].feedbackAgentSettings.invokeDelay)
            ? productParams.products[0].feedbackAgentSettings.invokeDelay
            : ''
          }
          label={'The delay (in minutes) after which feedback will be requested automatically'}
          onChange={(event) => handleInvokeDelayChange(event)}
          fullWidth
          autoComplete='off'
          InputProps={{ disableUnderline: true }}
          className='textFieldStyle'
        />
      </Grid>
    </Grid>
  );
}

export default StandardSettings;