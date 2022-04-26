import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import StandardSettings from './GeneralSettings';
import FeedbackSettings from './FeedbackSettings';
import BugSettings from './BugSettings';
import LookAndFeel from './LooknFeel';

const useStyles = makeStyles({
  tabs: {

    "& .MuiTabs-indicator": {
      backgroundColor: "#042E5B",
      height: 2.5,
    },
    "& .MuiTab-root.Mui-selected": {
      color: 'black',
      backgroundColor: 'transparent',
    }
  }
})

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EditFeedbackTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Feedback Settings" {...a11yProps(1)} />
          <Tab label="Bugs Settings" {...a11yProps(2)} />
          <Tab label="Widget Appearance" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StandardSettings {...props.settingsProps}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FeedbackSettings {...props.settingsProps}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BugSettings {...props.settingsProps}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LookAndFeel {...props.settingsProps}/>
      </TabPanel>
    </Box>
  );
}