import {
	createStyles,
	makeStyles,
	Theme,
  Box,
  Button,
} from '@material-ui/core';
import { AnyARecord } from 'dns';
import React, { useEffect, useState } from 'react';
import './stylesRenderFilters.css';
import { filterDate } from './methods';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { processAverageScore } from '../dashboard/common/manipulate_data';

interface DateProp {
  setSortDate: Function;
  setDateRange: Function;
}

const DateFilter = ({  setSortDate, setDateRange }: DateProp) => {
  const [date, setDate] = useState(new Date());
  const [calendar, setCalendar] = useState<any>([new Date(), new Date()])
  const classes = useStyles();

  const dateOptions: string[] = ['1D', '1W', '1M', '6M', '1Y'];

  const handleDateChange = (date: any, filter: string) => {
    const newDate = new Date(date);
    const result: any = filterDate(newDate, filter);
    setDate(result['dateObj']);
    setSortDate(result['epoch']);
  }

  const handleCalendarChange = (event: any) => {
    // console.log('event', event);
    setCalendar(event)
    const result: any = filterDate(calendar, '');
    if (result.start && result.end) {
      setDateRange((prevState: any) => ({
        ...prevState,
        ['startDate']: result.start,
        ['endDate']: result.end,
      }))
    }
  }

  return (
    <Box sx={{
      minWidth: '50%',
      height: 'auto',
      padding: '5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {dateOptions.map((day, index: number) => (
        <Button key={index} id="RenderFilter-btn" size="small" variant="outlined" onClick={(event) => handleDateChange(event, day)}>{day}</Button>
      )) }
      <Box sx={{
        height: '25px'
      }}>
        <DateRangePicker onChange={(event: any) => handleCalendarChange(event)}
          value={calendar}
          clearIcon={null}
        />
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