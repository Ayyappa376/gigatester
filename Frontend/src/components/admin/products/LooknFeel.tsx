import React, { useState, useEffect, Fragment } from 'react';
import {
	Grid,
	Typography,
	TextField,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	makeStyles,
	Box,
	colors,
	Button,
} from '@material-ui/core';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import {
	IProductParams,
} from '../../../model';
import { ChromePicker } from 'react-color';

interface SettingsProps {
	productParams: IProductParams;
	handleTitleChange: Function;
	handleMainButtonTitleChange: Function;
	handleFeedbackTypesChange: Function;
	handlePlatformTypeChange: Function;
	handleCaptureSystemDetailsOption: Function;
	handleMainBtnColor: Function;
	handleMainBtnTextColor: Function;
	handleMainBtnFont: Function;
  handleMainBtnPosition: Function;
  handleMainBtnRotation: Function;
  handleMainBtnFontWeight: Function;
  handleMaintButtonLength: Function;
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

const LookAndFeel = ({
	productParams,
	handleMainButtonTitleChange,
	handleMainBtnColor,
	handleMainBtnTextColor,
	handleMainBtnFont,
  handleMainBtnPosition,
  handleMainBtnRotation,
  handleMainBtnFontWeight,
  handleMaintButtonLength,
}: SettingsProps) => {
	const classes = useStyles();
	const [buttonColor, setButtonColor] = useState('#042e5b');
	const [buttonTextColor, setBtnTextColor] = useState('#ffff');
	const [colorSelect, setColorSelect] = useState('please select');
  const [fontSelect, setFontSelect] = useState('Arial,sans-serif');
  const [isCustom, setIsCustom] = useState(false);
  const [customFont, setCustomFont] = useState('');
  const [fWeight, setFontWeight] = useState(400);
	const [buttonText, setButtonText] = useState('Feedback');
	const [btnPosition, setBtnPosition] = useState('right');
  const [rotation, setRotation] = useState('0');
  const [showColor, setShowColor] = useState(false);


	useEffect(() => {
		if (
			productParams &&
			productParams.products &&
			productParams.products[0] &&
			productParams.products[0].feedbackAgentSettings &&
			productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
		) {
			setButtonColor(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
					.bgColor,
			);
			setBtnTextColor(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
					.fgColor,
			);
			setFontSelect(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.font
      );
      setButtonText(
        productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.text
      )
      setRotation(
        productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.rotation
      )
      setFontWeight(
        productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.fontWeight
			)
			setBtnPosition(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.position
			)
		}
	}, [productParams]);

	// useEffect(() => {
	// 	if (rotation) {
	// 		handleMainBtnRotation(rotation)
	// 	}
	// }, [rotation])

	const handleChange = (event: any) => {
		setColorSelect(event.target.value);
	};

  const handleFontChange = (event: any) => {
      setFontSelect(event.target.value);
      handleMainBtnFont(event);
  };

  const handleCustomFont = (event: any) => {
      setCustomFont(event.target.value);
      // handleMainBtnFont(event);
  }

  const handleFontWeight = (event: any) => {
    setFontWeight(event.target.value);
    handleMainBtnFontWeight(event.target.value);
  }

  const handleDegChange = (event: any) => {
    setRotation(event.target.value)
    handleMainBtnRotation(event.target.value);
	}

	const handleBtnPosition = (event: any) => {
		const selectedPosition = event.target.value;
		if (selectedPosition === 'left') {
			handleMainBtnRotation('270');
			setBtnPosition(event.target.value);
			handleMainBtnPosition(event);
		} else if (selectedPosition === 'bottom') {
			handleMainBtnRotation('0');
			setBtnPosition(event.target.value);
			handleMainBtnPosition(event);
		} else if (selectedPosition === 'right') {
			handleMainBtnRotation('90');
			setBtnPosition(event.target.value);
			handleMainBtnPosition(event);
		} else if (selectedPosition === 'top') {
			handleMainBtnRotation('0');
			setBtnPosition(event.target.value);
			handleMainBtnPosition(event);
		}
	}

  const convertTitleWidth = (title: string) => {
    const newWidth = title.length * 10;
    return newWidth.toString();
  }

  const handleTitle = (event: any) => {
    handleMainButtonTitleChange(event);
    let newLength = convertTitleWidth(event.target.value);
    handleMaintButtonLength(newLength);
  }


	return (
		<Grid
			container
			spacing={1}
			style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }}
		>
			<Box
				sx={{
					width: '60%',
				}}
			>
				<Grid item xs={12} sm={12}>
					<TextField
						required={true}
						type='string'
						id={`main_buttonText`}
						name={`main_buttonText`}
						value={
							productParams &&
							productParams.products &&
							productParams.products[0] &&
							productParams.products[0].feedbackAgentSettings &&
							productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
								? productParams.products[0].feedbackAgentSettings
										.widgetLookAndFeel.text
								: ''
						}
						label={'Choose the text you want to display on the initial button:'}
						onChange={(event) => handleTitle(event)}
						fullWidth
						autoComplete='off'
            className='textFieldStyle'
            inputProps={{maxLength: 20}}
						style={{ marginTop: 5 }}
						FormHelperTextProps={{
              className: classes.helperText
            }}
            helperText={productParams &&
							productParams.products &&
							productParams.products[0] &&
							productParams.products[0].feedbackAgentSettings &&
							productParams.products[0].feedbackAgentSettings.widgetLookAndFeel ?
              `${(productParams.products[0].feedbackAgentSettings
								.widgetLookAndFeel.text.length)}/20 characters` : null}
          />
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5}} id={`fontStylingOptions`} required={true}>
							{'Choose font to display on initial button:'}
						</InputLabel>
            <Select
              disabled={isCustom ? true : false}
							name={`select_fontStylingOptions`}
							value={fontSelect}
              onChange={(event) => {
                // if (event.target.value === 'Custom') {
                //   setIsCustom(true);
                // }
								handleFontChange(event);
							}}
						>
							<MenuItem key={1} value={'inherit'}>
								{'inherit (styling from your site)'}
							</MenuItem>
							<MenuItem key={2} value={'Arial,sans-serif'}>
								{'Arial (sans-serif)'}
							</MenuItem>
							<MenuItem key={3} value={'Verdana,sans-serif'}>
								{'Verdana (sans-serif)'}
							</MenuItem>
							<MenuItem key={4} value={'Helvetica,sans-serif'}>
								{'Helvetica (sans-serif)'}
							</MenuItem>
							<MenuItem key={5} value={'Tahoma,sans-serif'}>
								{'Tahoma (sans-serif)'}
							</MenuItem>
							<MenuItem key={6} value={'Trebuchet,sans-serif'}>
								{'Trebuchet (sans-serif)'}
							</MenuItem>
							<MenuItem key={7} value={'Times New Roman,sans-serif'}>
								{'Times New Roman (sans-serif)'}
							</MenuItem>
							<MenuItem key={8} value={'Georgia,serif'}>
								{'Georgia (serif)'}
							</MenuItem>
							<MenuItem key={9} value={'Garamond,serif'}>
								{'Garamond (serif)'}
							</MenuItem>
							<MenuItem key={10} value={'Courier New,monospace'}>
								{'Courier New (monospace)'}
							</MenuItem>
							<MenuItem key={11} value={'Brush Script MT,cursive'}>
								{'Brush Script MT(cursive)'}
              </MenuItem>
              <MenuItem key={12} value={'Monaco, sans-serif'}>
								{'Monaco (sans-serif)'}
              </MenuItem>
              <MenuItem key={13} value={'Andale Mono, sans-serif'}>
								{'Andale Mono (sans-serif)'}
              </MenuItem>
              <MenuItem key={14} value={'Open Sans, sans-serif'}>
								{'Open Sans (sans-serif)'}
              </MenuItem>
              {/* <MenuItem key={12} value={'Custom'}>
								{'Add your custom font'}
							</MenuItem> */}
						</Select>
          </FormControl>
          {isCustom ? (
            <TextField
            required={true}
						type='string'
						id={`main_buttonFont`}
						name={`main_buttonFont`}
						value={customFont}
						label={'Add your custom font:'}
						onChange={(event) => handleCustomFont(event)}
						fullWidth
						autoComplete='off'
            className='textFieldStyle'
            inputProps={{maxLength: 25}}
            style={{ marginTop: 5}}
            />
          ): null}
        </Grid>

        <Grid item xs={12} sm={12}>
          	<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5}} id={`weight`} required={true}>
							{'Choose font weight:'}
						</InputLabel>
						<Select
							name={`select_fontWeight`}
							value={fWeight}
              onChange={(event) => {
                handleFontWeight(event);
							}}
						>
							<MenuItem key={2} value={200}>
								{"lighter"}
							</MenuItem>
							<MenuItem key={3} value={400}>
								{"normal"}
							</MenuItem>
							<MenuItem key={4} value={700}>
								{"bold"}
              </MenuItem>
              <MenuItem key={5} value={900}>
								{"bolder"}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

        <Grid item xs={12} sm={12}>
          	<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5}} id={`rotation`} required={true}>
							{'Choose Widget Rotation (please be aware this may effect other styling):'}
						</InputLabel>
						<Select
							name={`select_rotation`}
							value={rotation}
              onChange={(event) => {
                handleDegChange(event);
							}}
						>
							<MenuItem key={1} value={'0'}>
								{'0 degrees'}
							</MenuItem>
							<MenuItem key={2} value={'90'}>
								{'90 degrees'}
							</MenuItem>
							<MenuItem key={3} value={'180'}>
								{'180 degrees)'}
							</MenuItem>
							<MenuItem key={4} value={'270'}>
								{'270 degrees'}
              </MenuItem>
              <MenuItem key={5} value={'360'}>
								{'360 degrees'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
          	<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5}} id={`position`} required={true}>
							{'Choose Widget position on site: (will affect widget rotation)'}
						</InputLabel>
						<Select
							name={`select_position`}
							value={btnPosition}
              onChange={(event) => {
                handleBtnPosition(event);
							}}
						>
              <MenuItem key={1} value={'left'}>
								{'Left'}
							</MenuItem>
							<MenuItem key={2} value={'right'}>
								{'Right'}
							</MenuItem>
							<MenuItem key={3} value={'top'}>
								{'Top'}
							</MenuItem>
							<MenuItem key={4} value={'bottom'}>
								{'Bottom'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5}} id={`colorStylingOptions`} required={true}>
							{'Choose color styling options:'}
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
							<MenuItem value={'please select'} disabled>
								<em>select an option</em>
							</MenuItem>
							<MenuItem key={buttonColor} value={'buttonColor'}>
								{'Widget button color'}
							</MenuItem>
							<MenuItem key={buttonTextColor} value={'buttonTextColor'}>
								{'Widget text color'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				{showColor ? (
					<Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: 15}} id={`colorSelect`} required={true}>
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
								color={
									colorSelect === 'buttonColor' ? buttonColor : buttonTextColor
								}
								onChange={(color) => {
									// console.log('result', color)
									if (colorSelect === 'buttonColor') {
										setButtonColor(color.hex);
										handleMainBtnColor(color.hex);
									} else {
										setBtnTextColor(color.hex);
										handleMainBtnTextColor(color.hex);
									}
								}}
							/>
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
										label={
											'Choose widget button color: (Hex)'
										}
										onChange={(event) => {
											console.log(event.target.value);
											setButtonColor(event.target.value);
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
										value={buttonTextColor}
										label={
											'Choose widget text color: (Hex)'
										}
										onChange={(event) => {
											setBtnTextColor(event.target.value);
											handleMainBtnTextColor(event);
										}}
										fullWidth
										autoComplete='off'
										className='textFieldStyle'
									/>
								)}
							</Box>
						</Box>
					</Grid>
				) : null}
			</Box>
			<Box
				sx={{
					width: '30%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          padding: 20,
				}}
			>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
        >
          <p style={{ fontSize: 13, textAlign: 'center', color: 'gray', marginBottom: 50}}>Widget Preview</p>
					<Button
						disableRipple
						style={{
							width: 'auto',
							height: 40,
							lineHeight: 40,
							padding: '0 20px',
              margin: 0,
              marginTop: 10,
							borderRadius: '4px 4px 4px 4px',
              backgroundColor: buttonColor,
							color: buttonTextColor,
							textAlign: 'center',
							fontSize: 14,
              fontFamily: isCustom ? customFont : fontSelect,
              fontWeight: fWeight,
              transform: `rotate(${rotation}deg)`,
              textTransform: 'none',
						}}
					>
            {buttonText}
					</Button>
				</Box>
			</Box>
		</Grid>
	);
};

export default LookAndFeel;
