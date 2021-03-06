import * as React from 'react';
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
	FormControlLabel,
	Checkbox,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	IProductParams,
	// EMAIL_MANDATORY,
	// EMAIL_OPTIONAL,
} from '../../../../model';
import EmailBox from './EmailConfig';

interface SettingsProps {
	productParams: IProductParams;
	handleEmailText: Function;
  handleEnableEmail: Function;
  handleEmailRating: Function;
  handleEmailSeverity: Function;
}

const useStyles = makeStyles((theme) => ({
	actionsBlock: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '20%',
	},
	accordSummary: {
		textTransform: 'none',
	},
	accordionTitle: {
		fontSize: '17px',
		fontWeight: 'normal',
		textTransform: 'none',
	},
	accordionBox: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
}));

const EmailSettings = ({
	productParams,
	handleEmailText,
  handleEnableEmail,
  handleEmailRating,
  handleEmailSeverity,
}: SettingsProps) => {
	const classes = useStyles();

	return (
		<Grid
			container
			spacing={1}
			style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }}
		>
			<Grid item xs={12} sm={12}>
				{productParams.products &&
				productParams.products[0] &&
				productParams.products[0].feedbackAgentSettings &&
				productParams.products[0].feedbackAgentSettings.feedbackTypes.length > 0
					? productParams.products[0].feedbackAgentSettings.feedbackTypes.map(
							(type: string, index: number) => (
								<EmailBox
									key={index}
									type={type}
									productInfo={productParams}
									handleEmailText={handleEmailText}
                	handleEnableEmail={handleEnableEmail}
                	handleEmailRating={handleEmailRating}
                	handleEmailSeverity={handleEmailSeverity}
								/>
							),
					  )
					: null}
			</Grid>
		</Grid>
	);
};

export default EmailSettings;
