import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Typography, TextField, FormControl, MenuItem, Select, InputLabel, makeStyles, Box, colors,
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
import { ChromePicker } from 'react-color'

interface SettingsProps {
  productParams: IProductParams,
  handleTitleChange: Function,
  handleMainButtonTitleChange: Function,
  handleFeedbackTypesChange: Function,
  handlePlatformTypeChange: Function,
  handleCaptureSystemDetailsOption: Function,
  handleMainBtnColor: Function,
  handleMainBtnTextColor: Function,
  handleMainBtnFont: Function,
  handleMainBtnPosition: Function,
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
}));

const LookAndFeel = ({
  productParams,
  handleMainButtonTitleChange,
  handleMainBtnColor,
  handleMainBtnTextColor,
  handleMainBtnFont,
  handleMainBtnPosition,
}: SettingsProps) => {
  const classes = useStyles();
  const [buttonColor, setButtonColor] = useState("#042e5b");
  const [buttonTextColor, setBtnTextColor] = useState('#ffff');
  const [colorSelect, setColorSelect] = useState("please select");
  const [fontSelect, setFontSelect] = useState('Arial,san-serif');
  const [showColor, setShowColor] = useState(false);
  const [showFont, setShowFont] = useState(false);

  useEffect(() => {
    if (productParams && productParams.products && productParams.products[0] &&
      productParams.products[0].feedbackAgentSettings &&
      productParams.products[0].feedbackAgentSettings.widgetLookAndFeel) {
        setButtonColor(productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.bgColor);
        setBtnTextColor(productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.fgColor);
        setFontSelect(productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.font);
      }
  }, [productParams]);

  const handleChange = (event: any) => {
    setColorSelect(event.target.value);
  }

  const handleFontChange = (event: any) => {
    setFontSelect(event.target.value);
    handleMainBtnFont(event);
  }


  return (
    <Grid container spacing={1} style={{borderBottom: 'solid 1px #dddddd', padding: '20px 0'}} >

      <Grid item xs={12} sm={12}>
        <TextField
            required={true}
            type='string'
            id={`main_buttonText`}
            name={`main_buttonText`}
            value={
              (productParams && productParams.products && productParams.products[0] &&
                productParams.products[0].feedbackAgentSettings &&
                productParams.products[0].feedbackAgentSettings.widgetLookAndFeel)
                ? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.text
                : ''
            }
            label={'Choose the text you want to display on the initial button:'}
            onChange={(event) => handleMainButtonTitleChange(event)}
            fullWidth
            autoComplete='off'
            className='textFieldStyle'
          />
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`fontStylingOptions`} required={true}>
            {"Choose fonts to display on initial button:"}
          </InputLabel>
          <Select
            name={`select_fontStylingOptions`}
            value={fontSelect}
            onChange={(event) => {
              if (!showFont) {
                setShowFont(true);
              }
              handleFontChange(event);
            }}
          >
            <MenuItem key={1} value={'inherit'}>{'inherit (global styling on your site)'}</MenuItem>
            <MenuItem key={2} value={'Arial,san-serif'}>{'Arial (sans-serif)'}</MenuItem>
            <MenuItem key={3} value={'Verdana,san-serif'}>{'Verdana (sans-serif)'}</MenuItem>
            <MenuItem key={4} value={'Helvetica,san-serif'}>{'Helvetica (sans-serif)'}</MenuItem>
            <MenuItem key={5} value={'Tahoma,san-serif'}>{'Tahoma (sans-serif)'}</MenuItem>
            <MenuItem key={6} value={'Trebuchet,san-serif'}>{'Trebuchet (sans-serif)'}</MenuItem>
            <MenuItem key={7} value={'Times New Roman,san-serif'}>{'Times New Roman (sans-serif)'}</MenuItem>
            <MenuItem key={8} value={'Georgia,serif'}>{'Georgia (serif)'}</MenuItem>
            <MenuItem key={9} value={'Garamond,serif'}>{'Garamond (serif)'}</MenuItem>
            <MenuItem key={10} value={'Courier New,monospace'}>{'Courier New (monospace)'}</MenuItem>
            <MenuItem key={11} value={'Brush Script MT,cursive'}>{'Brush Script MT(cursive)'}</MenuItem>
          </Select>
        </FormControl>
        {fontSelect !== 'inherit' && showFont ? (
          <Box sx={{ width: '100%',
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          }}>
          <InputLabel id={`fontExample`} required={true}>
            {"Example:"}
          </InputLabel>
            <Typography style={{ fontSize: 25, fontWeight: 'bold', fontFamily: fontSelect, marginLeft: 20 }}>Feedback</Typography>
          </Box>
        ): null}
      </Grid>

    <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`colorStylingOptions`} required={true}>
            {"Choose color styling options:"}
          </InputLabel>
          <Select
            name={`select_colorStylingOPtions`}
            value={colorSelect}
            onChange={(event) => {
              if (!showColor) {
                setShowColor(true);
              }
              handleChange(event);
            }}
          >
            <MenuItem value={"please select"} disabled><em>select an option</em></MenuItem>
            <MenuItem key={buttonColor} value={'buttonColor'}>{'Widget button color'}</MenuItem>
            <MenuItem key={buttonTextColor} value={'buttonTextColor'}>{'Widget text color'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {showColor ? (
              <Grid item xs={12} sm={12}>
              <InputLabel id={`colorSelect`} required={true}>
                    {'Choose an initial color for your widget to show:'}
                  </InputLabel>
                  <br></br>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-start',
                  }}
                >
               <ChromePicker
                    color={colorSelect === 'buttonColor' ? buttonColor : buttonTextColor}
                    onChange={(color) => {
                      // console.log('result', color)
                      if (colorSelect === 'buttonColor') {
                        setButtonColor(color.hex);
                        handleMainBtnColor(color.hex);
                      } else {
                        setBtnTextColor(color.hex);
                        handleMainBtnTextColor(color.hex);
                      }
                  }}/>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    width: '60%',
                    marginLeft: 50,
                  }}
                >
                {colorSelect === 'buttonColor' ? (
                   <TextField
                   required={true}
                   type='string'
                   id={`main_buttonColor`}
                   name={`main_buttonColor`}
                   value={buttonColor}
                   label={'Choose the color you want the widget to initially display: (Hex)'}
                   onChange={(event) => {
                     console.log(event.target.value);
                    setButtonColor(event.target.value)
                    handleMainBtnColor(event);
                   }}
                   fullWidth
                   autoComplete='off'
                   className='textFieldStyle'
                 />
                ) : (
                  <TextField
                  required={true}
                  type='string'
                  id={`main_buttonTextColor`}
                  name={`main_buttonTextColor`}
                  value={ buttonTextColor}
                  label={'Choose the text color you want the widget to initially display: (Hex)'}
                  onChange={(event) => {
                    setBtnTextColor(event.target.value)
                    handleMainBtnTextColor(event)
                  }}
                  fullWidth
                  autoComplete='off'
                  className='textFieldStyle'
                />
                )}
                  </Box>
                </Box>
              </Grid>
      ): null}

  </Grid>
  )
}

export default LookAndFeel;