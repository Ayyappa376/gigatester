import React, { useEffect, useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	FormLabel,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		marginTop: '15px',
		paddingLeft: '15px',
		maxWidth: '100%',
	},
}));

interface RatingProps {
  severities: any[];
  handleEmailSeverity: Function;
}

const SeverityLimitButtons = ({ severities, handleEmailSeverity }: RatingProps) => {
	const [value, setValue] = useState<number | undefined>(0);
	const [severityMap, setSeverityMap] = useState<any | undefined>([]);
	const classes = useStyles();

	useEffect(() => {
    if (severities) {
      // This works to map out 'none' and 'all' options but needs to be
      // changed on emailConfig so back end knows what is what and same for rating 
			const newMap = severities;
			newMap.unshift('none');
			newMap.push('all');
			setSeverityMap(newMap);
		}
	}, [severities]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rate = parseInt(event.target.value);
		setValue(rate);
		handleEmailSeverity(rate);
	};

	return (
		<FormControl className={classes.buttonGroup}>
			<FormLabel id='severity-row-radio-buttons-group-label'>
				Choose severity limit that activates email message
			</FormLabel>
			<RadioGroup
				row
				value={value}
				onChange={handleChange}
				aria-labelledby='severity-row-radio-buttons-group-label'
				name='row-radio-buttons-group'
			>
				{severityMap.length > 0
					? severityMap.map((val: string, index: number) => (
							<FormControlLabel
								key={index}
								value={index}
								control={<Radio color='primary' />}
								label={val}
							/>
					  ))
					: null}
				{/* <FormControlLabel value={6} control={<Radio color="primary"/>} label='All' /> */}
			</RadioGroup>
		</FormControl>
	);
};

export default SeverityLimitButtons;
