import React, { useEffect, useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	makeStyles,
	Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		marginTop: '15px',
		paddingLeft: '15px',
		maxWidth: '100%',
	},
	rowGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: '10px',
  },
}));

interface RatingProps {
	severities: any[]; // array from bugSettings
	severitiesObj: any; // object from emailConfig
  handleEmailSeverity: Function;
}

interface stateProps {
  [key: string]: boolean;
}

const SeverityLimitButtons = ({ severities, handleEmailSeverity, severitiesObj }: RatingProps) => {
	const [state, setState] = useState<stateProps>({
		'All': false
	});
	const [prevState, setPrevState] = useState <stateProps>({});
	const [severityMap, setSeverityMap] = useState<any | undefined>([]);
	const classes = useStyles();

	useEffect(() => {
    if (severities) {
			const newMap = severities;
			setSeverityMap(newMap);
		}
		if (Object.keys(severitiesObj).length > 0) {
			severitiesObj['All'] = false;
			setState(severitiesObj);
		} else {
			const newSevObj: stateProps = {};
			severities.forEach((item: string) => {
				newSevObj[item] = false
			})
			setState(newSevObj);
		}
	}, [severities, severitiesObj]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === 'All' && event.target.checked) {
			setPrevState(state);
			let tickAllSeverities: stateProps = {};
			for (let key in state) {
				tickAllSeverities[key] = true;
			}
			setState(tickAllSeverities)
		} else if (event.target.value === 'All' && !event.target.checked) {
			setState(prevState)
		} else {
			setState({
				...state,
				[event.target.value]: event.target.checked,
			});
		}
    handleEmailSeverity({ key: event.target.value, check: event.target.checked })
  };


	return (
		<FormControl className={classes.buttonGroup}>
			<FormLabel id='severity-row-radio-buttons-group-label'>
				Choose severity limit that activates email message - can select multiple *
			</FormLabel>
			<FormGroup className={classes.rowGroup}>
			{severityMap.length > 0
					? severityMap.map((val: string, index: number) => (
							<FormControlLabel
								key={index}
								value={val}
								control={<Checkbox checked={state[val]} color='primary' onChange={handleChange} />}
								label={val}
							/>
					  ))
					: null}
					<FormControlLabel
								value={'All'}
								control={<Checkbox checked={state['All']} color='primary' onChange={handleChange} />}
								label={'All'}
							/>
			</FormGroup>
		</FormControl>
	);
};

export default SeverityLimitButtons;
