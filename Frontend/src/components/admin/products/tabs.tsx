import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import StandardSettings from './GeneralSettings';
import FeedbackSettings from './FeedbackSettings';
import BugSettings from './BugSettings';
import LookAndFeel from './LooknFeel';
import EmailSettings from './email/EmailSettings';
import FeatureRequestSettings from './FeatureReq';

const useStyles = makeStyles({
	tabs: {
		'& .MuiTabs-indicator': {
			backgroundColor: '#042E5B',
			height: 2.5,
		},
		'& .MuiTab-root.Mui-selected': {
			color: 'black',
			backgroundColor: 'transparent',
		},
	},
});

function TabPanel(props: any) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function tabProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface tabComponentType {
	[key: string]: Element | any;
}

export default function EditFeedbackTabs(props: any) {
	const [value, setValue] = React.useState(0);
	const [tabMap, setTabMap] = React.useState<any>([]);
	const classes = useStyles();
	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

<<<<<<< HEAD:Frontend/src/components/admin/products/tabs.tsx
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className={classes.tabs} value={value} onChange={handleChange}   variant="scrollable"
  scrollButtons="auto" aria-label="tabs">
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Feedback Settings" {...a11yProps(1)} />
          <Tab label="Bugs Settings" {...a11yProps(2)} />
          <Tab label="Email Setttings" {...a11yProps(3)} />
          <Tab label="Widget Appearance" {...a11yProps(4)} />
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
        <EmailSettings {...props.settingsProps}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <LookAndFeel {...props.settingsProps}/>
      </TabPanel>
    </Box>
  );
=======
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					variant='scrollable'
					className={classes.tabs}
					value={value}
					onChange={handleChange}
					aria-label='tabs'
				>
					<Tab label='General Settings' {...tabProps(0)} />
					<Tab label='Feedback Settings' {...tabProps(1)} />
					<Tab label='Bugs Settings' {...tabProps(2)} />
					<Tab label='Feature Request Settings' {...tabProps(3)}/>
					<Tab label='Email Setttings' {...tabProps(4)} />
					<Tab label='Widget Appearance' {...tabProps(5)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<StandardSettings {...props.settingsProps} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<FeedbackSettings {...props.settingsProps} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<BugSettings {...props.settingsProps} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<FeatureRequestSettings {...props.settingsProps} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<EmailSettings {...props.settingsProps} />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<LookAndFeel {...props.settingsProps} />
			</TabPanel>
		</Box>
	);
>>>>>>> feature-request:Frontend/src/components/admin/products/tabs.tsx
}
// {tabMap.length > 0
// 	? tabMap.map((tab: any, index: number) => (
// 			<Tab key={tab.name} label={tab.name} {...tabProps(index)} />
// 		))
// 	: null}

// {tabMap.length > 0
// 	? tabMap.map((item: any, index: number) => (
// 			<TabPanel key={item.name} value={value} index={index}>
// 				{item.child}
// 			</TabPanel>
// 	  ))
// 	: null}

// 			 /**
//  * Standard array of objects with components that will not be rendered conditionally.
//  * No need to modify this unless a new mandatory tab is needed.
//  */
// 	const tabComponentArray = [
// 		{
// 			name: 'General Settings',
// 			child: <StandardSettings {...props.settingsProps} />,
// 		},
// 		{
// 			name: 'Email Settings',
// 			child: <EmailSettings {...props.settingsProps} />,
// 		},
// 		{
// 			name: 'Widget Appearance',
// 			child: <LookAndFeel {...props.settingsProps} />,
// 		},
// 	];

//   /**
//   * For dynamic tabs: add new component here that will render conditionally.
//   * Example: Feature Request is a new feedback type and a tab will be created for it
//   * conditionally based on user configuration.
//   */
// 	const tabComponents: tabComponentType = {
// 		'FEEDBACK': <FeedbackSettings {...props.settingsProps} />,
// 		'BUGS': <BugSettings {...props.settingsProps} />,
// 		'FEATURE_REQUEST': <FeatureRequestSettings {...props.settingsProps}/>,
// 	};

// 	React.useEffect(() => {
// 		if (
// 			props.settingsProps &&
// 			props.settingsProps.productParams &&
// 			props.settingsProps.productParams.products[0] &&
// 			props.settingsProps.productParams.products[0].feedbackAgentSettings &&
// 			props.settingsProps.productParams.products[0].feedbackAgentSettings.feedbackTypes
// 		) {
// 			console.log('is this running')
//       const types = props.settingsProps.productParams.products[0].feedbackAgentSettings.feedbackTypes;
//       types.reverse();
//       types.forEach((type: string) => {
//         // removes any underscores and add Settings for tab name
//         const title = type.concat(" ", 'Settings');
//         const titleType = title.replace(/_/g, " ");
//         // this inserts object into the tabMap after General Settings and before Email + Widget tabs
// 				tabComponentArray.splice(1, 0, { name: titleType, child: tabComponents[type] });
// 			});
// 			setTabMap(tabComponentArray);
// 		}
// 	}, []);
