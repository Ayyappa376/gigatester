import {
	createStyles,
	makeStyles,
	Theme,
	Box,
	Button,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './stylesRenderFilters.css';
import { filterDate } from './methods';
import DatePicker from 'react-datepicker';
import { findLastIndex, first } from 'lodash';
import "react-datepicker/dist/react-datepicker.css";

interface IDateProps {
	setDateRange: Function;
}

const DateFilter = ({ setDateRange }: IDateProps) => {
  const [date, setDate] = useState(new Date());
  const [firstDate, setFirstDate] = useState<Date | undefined>();
  const [secondDate, setSecondDate] = useState<Date | undefined>();
  const [selectedDate, setSelectedDate] = useState('1Y');
  const classes = useStyles();

  const dateOptions: string[] = ['1D', '1W', '1M', '6M', '1Y'];

  const handleFirstDate = (item: any) => {
    setFirstDate(item);
  };

  const handleSecondDate = (item: any) => {
    setSecondDate(item)
  }

  useEffect(() => {
    const today = new Date();

    if (firstDate && secondDate) {
      const startDay = Date.parse(firstDate.toString());
      const endDay = Date.parse(secondDate.toString())
      setDateRange({ startDate: startDay, endDate: endDay });
      setSelectedDate('')
    }
  }, [firstDate, secondDate])

  const handleDateChange = (date: any, filter: string) => {
    const newDate = new Date(date);
    const today = new Date();
    const todaysDate = Date.parse(today.toString());
    let result: any = filterDate(newDate, filter);
    console.log('result', result);
    if (firstDate && secondDate) {
      setFirstDate(undefined);
      setSecondDate(undefined);
    }

		if (filter === '') {
			setSelectedDate(filter);
			setDate(result['dateObj']);
			setDateRange({ startDate: todaysDate, endDate: result['epoch'] });
		} else if (filter === selectedDate) {
			result = filterDate(newDate, '1Y');
			setSelectedDate('1Y');
			setDate(result['dateObj']);
			setDateRange({ startDate: todaysDate, endDate: result['epoch'] });
		} else {
			setSelectedDate(filter);
			setDate(result['dateObj']);
			setDateRange({ startDate: todaysDate, endDate: result['epoch'] });
		}
	};

	return (
		<Box
			sx={{
				minWidth: '50%',
				height: 'auto',
				padding: '5px',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
		>
			{dateOptions.map((day, index: number) => (
				<Button
					key={index}
					id={day === selectedDate ? 'RenderFilter-btnVisited' : 'RenderFilter-btn'}
					size='small'
					variant='outlined'
					onClick={(event) => handleDateChange(event, day)}
				>
					{day}
				</Button>
			))}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
				}}
      >
        <div style={{ width: '40px', marginLeft: '5px', textAlign: 'center' }}>
          <Typography>OR</Typography>
        </div>
				<div style={{ width: '100px', marginLeft: '10px', marginRight: '10px'}}>
					<DatePicker
						selected={firstDate}
            onChange={(date) => handleFirstDate(date)}
            placeholderText={'MM/DD/YYYY'}
					/>
				</div>
				<div style={{ width: '100px', marginLeft: '10px', marginRight: '10px'}}>
					<DatePicker
						selected={secondDate}
            onChange={(date) => handleSecondDate(date)}
            placeholderText={'MM/DD/YYYY'}
					/>
				</div>
			</Box>
		</Box>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '150px',
		},
	}),
);

export default DateFilter;
