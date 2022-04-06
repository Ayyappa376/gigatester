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
	POS_RIGHT_MIDDLE,
	POS_RIGHT_BOTTOM,
	POS_LEFT_MIDDLE,
	POS_LEFT_BOTTOM,
	POS_BOTTOM_RIGHT,
	POS_BOTTOM_LEFT,
	POS_CUSTOM,
} from '../../../model';
import { ChromePicker } from 'react-color';

interface SettingsProps {
	productParams: IProductParams;
	handleMainBtnTitleChange: Function;
	handleMainBtnColor: Function;
	handleMainBtnTextColor: Function;
	handleMainBtnFont: Function;
	handleMainBtnFontWeight: Function;
	handleMainBtnFontStyle: Function;
	handleMainBtnPosition: Function;
	handleMainBtnRotation: Function;
//	handleMainBtnTop: Function;
//	handleMainBtnLeft: Function;
	handleMainBtnCustom: Function;
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
	customLabel: {
		fontSize: '13px',
		marginRight: '10px',
		minWidth: '50px',
	},
	customBox: {
		padding: '2px',
		width: 'auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginRight: '15px',
	},
}));

const LookAndFeel = ({
	productParams,
	handleMainBtnTitleChange,
	handleMainBtnColor,
	handleMainBtnTextColor,
	handleMainBtnFont,
	handleMainBtnFontWeight,
	handleMainBtnFontStyle,
	handleMainBtnPosition,
	handleMainBtnRotation,
	handleMainBtnCustom,
}: SettingsProps) => {
	const classes = useStyles();
	const [buttonColor, setButtonColor] = useState<string | undefined>('#042e5b');
	const [buttonTextColor, setBtnTextColor] = useState<string | undefined>(
		'#ffffff',
	);
	const [colorSelect, setColorSelect] = useState<string | undefined>(
		'please select',
	);
	const [fontSelect, setFontSelect] = useState<string | undefined>(
		'Arial,sans-serif',
	);
	// const [isCustomFont, setIsCustomFont] = useState<Boolean | undefined>(false);
	const [isCustomPos, setIsCustomPos] = useState<Boolean | undefined>(false);
	const [customFont, setCustomFont] = useState<string | undefined>('');
	const [fWeight, setFontWeight] = useState<number | undefined>(400);
	const [fStyle, setFontStyle] = useState<string | undefined>('normal');
	const [buttonText, setButtonText] = useState<string | undefined>('Feedback');
	const [btnPosition, setBtnPosition] = useState<string>(POS_RIGHT_MIDDLE);
	const [rotation, setRotation] = useState<string | undefined>('0');

	useEffect(() => {
		if (
			productParams &&
			productParams.products &&
			productParams.products[0] &&
			productParams.products[0].feedbackAgentSettings &&
			productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
		) {
			setButtonColor(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.bgColor,
			);
			setBtnTextColor(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.fgColor,
			);
			setFontSelect(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.font,
			);
			setFontWeight(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
					.fontWeight,
			);
			setFontStyle(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.fontStyle,
			);
			setButtonText(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.text,
			);
			setBtnPosition(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.position,
			);
			setRotation(
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.rotation,
			);
			if (
				productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
					.position === 'CUSTOM'
			) {
				setIsCustomPos(true);
			}
		}
	}, [productParams]);

	// const handleChange = (event: any) => {
	// 	setColorSelect(event.target.value);
	// };

	const handleFontChange = (event: any) => {
		setFontSelect(event.target.value);
		handleMainBtnFont(event);
	};

	// const handleCustomFont = (event: any) => {
	// 	setCustomFont(event.target.value);
	// 	// handleMainBtnFont(event);
	// };

	const handleFontWeight = (event: any) => {
		setFontWeight(event.target.value);
		handleMainBtnFontWeight(event.target.value);
	};

	const handleFontStyle = (event: any) => {
		setFontWeight(event.target.value);
		handleMainBtnFontStyle(event.target.value);
	};

	// const handleDegChange = (event: any) => {
	// 	setRotation(event.target.value);
	// 	handleMainBtnRotation(event.target.value);
	// };

	const handleCustomPosition = (event: any, property: string) => {
		handleMainBtnCustom(event, property);
	};

	const handleBtnPosition = (event: any) => {
		const selectedPosition = event.target.value;
		console.log(selectedPosition);

		if (
			selectedPosition === 'RIGHT_MIDDLE' ||
			selectedPosition === 'RIGHT_BOTTOM'
		) {
			handleMainBtnRotation('90');
			setBtnPosition(selectedPosition);
			handleMainBtnPosition(event);
			setIsCustomPos(false);
		} else if (
			selectedPosition === 'LEFT_MIDDLE' ||
			selectedPosition === 'LEFT_BOTTOM'
		) {
			handleMainBtnRotation('270');
			setBtnPosition(selectedPosition);
			handleMainBtnPosition(event);
			setIsCustomPos(false);
		} else if (
			selectedPosition === 'BOTTOM_RIGHT' ||
			selectedPosition === 'BOTTOM_LEFT'
		) {
			handleMainBtnRotation('0');
			setBtnPosition(selectedPosition);
			handleMainBtnPosition(event);
			setIsCustomPos(false);
		} else if (selectedPosition === 'CUSTOM') {
			handleMainBtnRotation('0');
			setBtnPosition(selectedPosition);
			handleMainBtnPosition(event);
			setIsCustomPos(true);
		}
	};

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
								? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.text
								: ''
						}
						label={'Choose the text you want to display on the initial button:'}
						onChange={(event) => handleMainBtnTitleChange(event)}
						fullWidth
						autoComplete='off'
						className='textFieldStyle'
						inputProps={{ maxLength: 20 }}
						style={{ marginTop: 5 }}
						FormHelperTextProps={{
							className: classes.helperText,
						}}
						helperText={
							productParams &&
							productParams.products &&
							productParams.products[0] &&
							productParams.products[0].feedbackAgentSettings &&
							productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
								? `${productParams.products[0].feedbackAgentSettings.widgetLookAndFeel.text.length}/20 characters`
								: null
						}
					/>
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl className={classes.formControl}>
						<InputLabel
							style={{ marginTop: 5 }}
							id={`fontStylingOptions`}
							required={true}
						>
							{'Choose font to display on initial button:'}
						</InputLabel>
						<Select
							// disabled={isCustomFont ? true : false}
							name={`select_fontStylingOptions`}
							value={fontSelect}
							onChange={(event) => {
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
					{/* {isCustomFont ? (
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
							inputProps={{ maxLength: 25 }}
							style={{ marginTop: 5 }}
						/>
					) : null} */}
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5 }} id={`weight`} required={true}>
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
								{'lighter'}
							</MenuItem>
							<MenuItem key={3} value={400}>
								{'normal'}
							</MenuItem>
							<MenuItem key={4} value={700}>
								{'bold'}
							</MenuItem>
							<MenuItem key={5} value={900}>
								{'bolder'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5 }} id={`style`} required={true}>
							{'Choose font style:'}
						</InputLabel>
						<Select
							name={`select_fontStyle`}
							value={fStyle}
							onChange={(event) => {
								handleFontStyle(event);
							}}
						>
							<MenuItem key={2} value={'normal'}>
								{'normal'}
							</MenuItem>
							<MenuItem key={3} value={'italic'}>
								{'italic'}
							</MenuItem>
							<MenuItem key={4} value={'underline'}>
								{'underline'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							width: '100%',
							padding: '5px',
						}}
					>
						<Box
							sx={{
								margin: '5px',
							}}
						>
							<InputLabel
								style={{ marginTop: '10px', marginBottom: '10px', fontSize: '15px' }}
								id={`colorStylingOptions`}
								required={true}
							>
								{'Choose button color:'}
							</InputLabel>
							<ChromePicker
								color={buttonColor}
								onChange={(color) => {
									setButtonColor(color.hex);
									handleMainBtnColor(color.hex);
								}}
							/>
						</Box>
						<Box
							sx={{
								margin: '5px',
							}}
						>
							<InputLabel
								style={{ marginTop: '10px', marginBottom: '10px', fontSize: '15px' }}
								id={`colorStylingOptions`}
								required={true}
							>
								{'Choose text color:'}
							</InputLabel>
							<ChromePicker
								color={buttonTextColor}
								onChange={(color) => {
									// console.log('result', color)
									setBtnTextColor(color.hex);
									handleMainBtnTextColor(color.hex);
								}}
							/>
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} sm={12} style={{ marginTop: '20px'}}>
					<FormControl className={classes.formControl}>
						<InputLabel style={{ marginTop: 5 }} id={`position`} required={true}>
							{'Choose Widget position on site:'}
						</InputLabel>
						<Select
							// disabled={isCustomPos ? true : false}
							name={`select_position`}
							value={btnPosition}
							onChange={(event) => {
								handleBtnPosition(event);
							}}
						>
							<MenuItem key={1} value={POS_RIGHT_MIDDLE}>
								{'Right - Middle'}
							</MenuItem>
							<MenuItem key={2} value={POS_RIGHT_BOTTOM}>
								{'Right - Bottom'}
							</MenuItem>
							<MenuItem key={3} value={POS_LEFT_MIDDLE}>
								{'Left - Middle'}
							</MenuItem>
							<MenuItem key={4} value={POS_LEFT_BOTTOM}>
								{'Left - Bottom'}
							</MenuItem>
							<MenuItem key={5} value={POS_BOTTOM_LEFT}>
								{'Bottom - Left'}
							</MenuItem>
							<MenuItem key={6} value={POS_BOTTOM_RIGHT}>
								{'Bottom - Right'}
							</MenuItem>
							<MenuItem key={7} value={POS_CUSTOM}>
								{'Custom'}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
					{isCustomPos ? (
						<InputLabel
							style={{ marginTop: 5 }}
							id={`customProperties`}
							required={true}
						>
							{
								'If more specific positioning is required, feel free to add properties below. Empty fields will not be applied'
							}
				</InputLabel>
					): null}
					{isCustomPos ? (
						<Box
							sx={{
								padding: '10px',
								paddingLeft: '20px',
								width: '98%',
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gridTemplateRows: 'repeat(4, 1fr)',
								gridColumnGap: '0px',
								gridRowGap: '0px',
							}}
						>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Top</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.top
										: ''
								}
								label={'pixels or percentage'}
								onChange={(event) => handleCustomPosition(event, 'top')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5}}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Bottom:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.bottom
										: ''
								}
								label={'pixels or percentage'}
								onChange={(event) => handleCustomPosition(event, 'bottom')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Right:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.right
										: ''
								}
								label={'pixels or percentage'}
								onChange={(event) => handleCustomPosition(event, 'right')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Left:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.left
										: ''
								}
								label={'pixels or percentage'}
								onChange={(event) => handleCustomPosition(event, 'left')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Border Radius:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.borderRadius
										: ''
								}
								label={'pixels or percentage'}
								onChange={(event) => handleCustomPosition(event, 'borderRadius')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Rotation:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.rotation
										: ''
								}
								label={'0 - 360'}
								onChange={(event) => handleCustomPosition(event, 'rotation')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Margin:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.margin
										: ''
								}
								label={'pixels'}
								onChange={(event) => handleCustomPosition(event, 'margin')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
							<Box className={classes.customBox}>
								<Typography className={classes.customLabel}>Padding:</Typography>
								<TextField
								type='string'
								id={`customPosition`}
								name={`customPosition`}
								value={
									productParams &&
									productParams.products &&
									productParams.products[0] &&
									productParams.products[0].feedbackAgentSettings &&
									productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
										? productParams.products[0].feedbackAgentSettings.widgetLookAndFeel
												.custom.padding
										: ''
								}
								label={'pixels'}
								onChange={(event) => handleCustomPosition(event, 'padding')}
								fullWidth
								autoComplete='off'
								className='textFieldStyle'
								style={{ marginTop: 5 }}
								inputProps={{ maxLength: 8 }}
							/>
							</Box>
						</Box>
					) : null}
				</Grid>

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
					<p
						style={{
							fontSize: 13,
							textAlign: 'center',
							color: 'gray',
							marginBottom: 50,
						}}
					>
						Widget Preview
					</p>
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
							fontFamily: fontSelect,
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
