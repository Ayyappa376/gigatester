import {
	createStyles,
	makeStyles,
	Theme,
  Box,
  Button,
} from '@material-ui/core';
import { AnyARecord } from 'dns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import './stylesRenderFilters.css';
import { filterDate } from './methods';

interface DateProp {
  setSortDate: Function;
}

const DateFilter = ({  setSortDate }: DateProp) => {
  const [date, setDate] = useState(new Date());
  const classes = useStyles();

  const dateOptions: string[] = ['1D', '1W', '1M', '6M', '1Y'];

  const handleDateChange = (date: any, filter: string) => {
    const newDate = new Date(date);
    const result: any = filterDate(newDate, filter);
    console.log('result', result);
    if (filter === '') {
      setDate(result['dateObj']);
      setSortDate(result['epoch']);
    } else {
      setDate(result['dateObj'])
      setSortDate(result['epoch'])
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
        <Button key={index} id="RenderFilter-btn" size="small" variant="outlined" onClick={(event) => handleDateChange(event, day)}>{day}</Button>
      )) }
      <Box>
        <DatePicker onChange={(event) => handleDateChange(event, '')}  value={date} />
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