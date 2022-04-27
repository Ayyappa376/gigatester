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
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	actionsBlock: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '20%',
	},
	accordionTitle: {
		fontSize: '17px',
		fontWeight: 'normal',
		textTransform: 'none',
	},
	contain: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
	},
	checkBoxContainer: {
    width: '100%',
    height: '40px',
    padding: 0,
    margin: 0,
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
}));

interface EmailProps {}

const EmailBox = () => {
	const [check, setChecked] = useState(false);
	const classes = useStyles();

	// useEffect(() => {

	// }, [])

	const handleCheck = (event: any) => {
    if (check) {
      setChecked(false)
    } else {
      setChecked(true);
    }
  };

  const handleEmailTextChange = (event: any) => {
    //handle email text change - set to product config
  }

	return (
		<Box className={classes.contain}>
			<Box className={classes.checkBoxContainer}>
				<Checkbox
					checked={check}
					onClick={(event) => handleCheck(event)}
				/>
				<Typography>
					{check
						? 'Enable email auto reply for user submission'
						: 'Disabled email auto reply for user submission'}
				</Typography>
			</Box>

			{check ? (
				<Box className={classes.emailConfig}>
					<TextField
						className={classes.emailText}
						id='outlined-multiline-static'
						label='Email message'
						value={
							'Dear Customer, We value your opinion and feedback. Thank you for submitting your thoughts. Please visit us soon. Best, Cuvo'
						}
						multiline
            inputProps={{ maxLength: 3000, style: { backgroundColor: '#F5F5F5'} }}
						rows={5}
					/>
				</Box>
			) : null}
		</Box>
	);
};

export default EmailBox;
