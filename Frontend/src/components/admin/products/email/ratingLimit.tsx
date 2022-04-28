import React, { useEffect, useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	FormLabel,
	makeStyles,
  FormGroup,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		marginTop: '15px',
		paddingLeft: '15px',
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
	ratingObj: any;
	ratingSymbol: string;
	handleEmailRating: Function;
}

interface stateProps {
  [key: number]: boolean;
}

const RatingLimitButtons = ({
	ratingSymbol,
	ratingObj,
	handleEmailRating,
}: RatingProps) => {
  const [state, setState] = useState<stateProps>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [ratingMap, setRatingMap] = useState<number[]>([])
	const classes = useStyles();
	const RATE_LIMIT = 7; //remove 0th index, and add 7th which is all

  useEffect(() => {
    if (Object.keys(ratingObj).length > 0) {
      setState(ratingObj)
    }
    const rateMapping = Array.from(Array(RATE_LIMIT).keys());
    rateMapping.shift();
    setRatingMap(rateMapping);
  }, [ratingObj]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.value]: event.target.checked,
    });
    handleEmailRating({ key: event.target.value, check: event.target.checked })
  };

	return (
		<FormControl className={classes.buttonGroup}>
			<FormLabel id='rating-row-radio-buttons-group-label'>
				Choose rating limit that activates email message - can select multiple *
			</FormLabel>
			<FormGroup className={classes.rowGroup}>
				{ratingMap.length > 0 ? ratingMap.map((val: number, index) => (
					<FormControlLabel
						key={index}
						value={val}
            control={<Checkbox checked={state[val]} color='primary' onChange={handleChange}/>}
						label={val !== 6 ? `${val} - ${ratingSymbol.toLowerCase()}` : 'All'}
					/>
				)) : null}
			</FormGroup>
		</FormControl>
	);
};

export default RatingLimitButtons;

{
	/* <RadioGroup
row
value={value}
onChange={handleChange}
aria-labelledby='rating-row-radio-buttons-group-label'
name='row-radio-buttons-group'
>
<FormControlLabel value={1} control={<Radio color="primary"/>} label='1 star' />
<FormControlLabel value={2} control={<Radio color="primary"/>} label='2 stars' />
<FormControlLabel value={3} control={<Radio color="primary"/>} label='3 stars' />
<FormControlLabel value={4} control={<Radio color="primary"/>} label='4 stars' />
<FormControlLabel value={5} control={<Radio color="primary"/>} label='5 stars' />
<FormControlLabel value={6} control={<Radio color="primary"/>} label='all' />
</RadioGroup> */
}
