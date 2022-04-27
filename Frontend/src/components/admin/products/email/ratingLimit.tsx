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
  },
}))

interface RatingProps {
  limit: number;
  handleEmailRating: Function;
}

const RatingLimitButtons = ({ limit, handleEmailRating }: RatingProps) => {
  const [value, setValue] = useState<number | undefined>(6);
  const classes = useStyles();

  useEffect(() => {
    if (limit) {
      setValue(limit)
    }
  }, [limit])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseInt(event.target.value);
    setValue(rate);
    handleEmailRating(rate);
  }

	return (
		<FormControl className={classes.buttonGroup}>
			<FormLabel id='rating-row-radio-buttons-group-label'>Choose rating limit that activates email message</FormLabel>
			<RadioGroup
        row
        value={value}
        onChange={handleChange}
				aria-labelledby='rating-row-radio-buttons-group-label'
				name='row-radio-buttons-group'
      >
        <FormControlLabel value={0} control={<Radio color="primary" />} label='none' />
				<FormControlLabel value={1} control={<Radio color="primary"/>} label='1 star' />
				<FormControlLabel value={2} control={<Radio color="primary"/>} label='2 stars' />
        <FormControlLabel value={3} control={<Radio color="primary"/>} label='3 stars' />
        <FormControlLabel value={4} control={<Radio color="primary"/>} label='4 stars' />
        <FormControlLabel value={5} control={<Radio color="primary"/>} label='5 stars' />
        <FormControlLabel value={6} control={<Radio color="primary"/>} label='all' />
			</RadioGroup>
		</FormControl>
	);
};

export default RatingLimitButtons;
