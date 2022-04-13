import {
	createStyles,
	makeStyles,
	Theme,
  Box,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import './stylesRenderFilters.css';
import { filterDate } from './methods';
import { IDateRange } from './common';

interface IDateProps{
  setDateRange: Function;
}

const DateFilter = ({  setDateRange }: IDateProps) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('1Y');
  const classes = useStyles();

  const dateOptions: string[] = ['1D', '1W', '1M', '6M', '1Y'];

  const handleDateChange = (date: any, filter: string) => {
    const newDate = new Date(date);
    const today = new Date();
    const todaysDate = Date.parse(today.toString());
    let result: any = filterDate(newDate, filter);
    console.log('result', result);
    if (filter === '') {
      setSelectedDate(filter);
      setDate(result['dateObj']);
      setDateRange({startDate: todaysDate,  endDate: result['epoch']});
    } else if ( filter === selectedDate){
      result = filterDate(newDate, '1Y')
      setSelectedDate('1Y');
      setDate(result['dateObj']);
      setDateRange({startDate: todaysDate,  endDate: result['epoch']});
    }
    else {
      setSelectedDate(filter)
      setDate(result['dateObj'])
      setDateRange({startDate: todaysDate,  endDate: result['epoch']});
    }
  }

  return (
    <Box sx={{
      width: '52%',
      padding: '5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {dateOptions.map((day, index: number) => (
        <Button key={index} id={day === selectedDate ? "RenderFilter-btnVisited" : "RenderFilter-btn"} size="small" variant="outlined" onClick={(event) => handleDateChange(event, day)}>{day}</Button>
      )) }
      <Box>
        {/* <DatePicker onChange={(event) => handleDateChange(event, '')}  value={date} /> */}
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