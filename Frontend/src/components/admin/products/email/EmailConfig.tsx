import React, { useState, useEffect } from 'react';
import {
	Grid,
	Typography,
	TextField,
	FormControl,
	makeStyles,
	Box,
	FormControlLabel,
	Checkbox,
	Radio,
	RadioGroup,
	FormLabel,
} from '@material-ui/core';
import RatingLimitButtons from './ratingLimit';
import SeverityLimitButtons from './severityLimit';

interface EmailProps {
	key?: number;
	type: string;
	productInfo: any;
	handleEmailText: Function;
	handleEnableEmail: Function;
	handleEmailRating: Function;
	handleEmailSeverity: Function;
}

const EmailBox = ({ type, productInfo, handleEmailText, handleEnableEmail, handleEmailRating, handleEmailSeverity }: EmailProps) => {
	const [check, setChecked] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		if (
			productInfo.products &&
			productInfo.products[0] &&
			productInfo.products[0].emailConfig
		) {
			if (productInfo.products[0].emailConfig.feedbackTypes.includes(type)) {
				setChecked(true);
			}
		}
	}, [productInfo]);

	const handleCheck = (event: any, currentType: string) => {
		// event.stopPropagation();
		if (check) {
			setChecked(false);
			handleEnableEmail(false, currentType)
		} else {
			setChecked(true);
			handleEnableEmail(true, currentType)
		}
	};

	const handleEmailTextChange = (event: any, fbType: string) => {
		handleEmailText(event, fbType);
		//handle email text change - set to product config
	};

	return (
		<Box className={classes.mainContainer}>
			<Box className={classes.checkBoxContainer}>
				<Typography className={classes.titleType}>{type} :</Typography>
				<Checkbox checked={check} onClick={(event) => handleCheck(event, type)} style={{ color: 'white'}} />
				<Typography>
					{check
						? 'Enable email auto reply for user submission'
						: 'Disabled email auto reply for user submission'}
				</Typography>
			</Box>

			<Box className={classes.configContain}>
				{check ? (
					<Box className={classes.emailConfig}>
						{productInfo.products &&
						productInfo.products[0] &&
						productInfo.products[0].emailConfig && type !== 'BUGS' ? (
								<RatingLimitButtons
									ratingSymbol={productInfo.products[0].feedbackAgentSettings.feedbackSettings.ratingIcon}
									ratingObj={productInfo.products[0].emailConfig.ratingLimit}
									handleEmailRating={handleEmailRating}
							/>
						) : null}

						{productInfo.products &&
						productInfo.products[0] &&
							productInfo.products[0].feedbackAgentSettings && productInfo.products[0].feedbackAgentSettings.bugSettings && productInfo.products[0].feedbackAgentSettings.bugSettings.severities && type !== 'FEEDBACK' ? <SeverityLimitButtons severities={productInfo.products[0].feedbackAgentSettings.bugSettings.severities} handleEmailSeverity={handleEmailSeverity} severitiesObj={productInfo.products[0].emailConfig.severityLimit} /> : null}

						<TextField
							className={classes.emailText}
							id='outlined-multiline-static'
							label='Email message'
							value={productInfo.products &&
								productInfo.products[0] &&
								productInfo.products[0].emailConfig && productInfo.products[0].emailConfig.emailText &&  productInfo.products[0].emailConfig.emailText[type] ?  productInfo.products[0].emailConfig.emailText[type] : ''}
							multiline
							onChange={(event) => handleEmailTextChange(event, type)}
							inputProps={{
								maxLength: 3000,
								style: { backgroundColor: '#F5F5F5', padding: '10px' },
							}}
							rows={5}
						/>
					</Box>
				) : null}
			</Box>
		</Box>
	);
};

export default EmailBox;

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		marginBottom: '10px',
		paddingBottom: '15px',
		// paddingLeft: '20px',
		// paddingRight: '10px',
		width: '100%',
		border: 'solid 1px #F1F1F1',
	},
	titleType: {
		fontSize: '17px',
		fontWeight: 'normal',
		textTransform: 'none',
		marginRight: '5px',
		width: '120px',
	},
	details: {
		fontSize: '15px',
		fontWeight: 500,
		textTransform: 'none',
	},
	configContain: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		paddingLeft: '15px',
		paddingRight: '15px',
	},
	checkBoxContainer: {
		width: '100%',
		height: '60px',
		paddingLeft: '25px',
		backgroundColor: '#0D3676',
		color: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	emailConfig: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		marginTop: '5px',
	},
	emailText: {
		marginTop: '20px',
		width: '95%',
		padding: '15px',
	},
	accordSummary: {
		textTransform: 'none',
		margin: 0,
		height: '20px',
	},
}));

{
	/* <Accordion>
<AccordionSummary
  className={classes.accordSummary}
  expandIcon={<ExpandMoreIcon />}
  aria-controls='panel1a-content'
  id='panel1a-header'
>

  <Typography className={classes.details}>{type.toLowerCase()} details and configuration</Typography>
</AccordionSummary>
<AccordionDetails>
  <FormControlLabel control={<Checkbox />} label="Disabled" />
</AccordionDetails>
</Accordion> */
}
