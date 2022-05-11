import React, {useEffect} from 'react';
import {
	Grid,
	makeStyles
} from '@material-ui/core';
import {
	IProductParams,
} from '../../../../model';
import ExtSystemConfig from './ExtSystemConfig';

interface SettingsProps {
	productParams: IProductParams;
	handleChangeJiraFieldMapping: Function;
	handleChangeExtSeverityFilter: Function;
	handleChangeExtCategoryFilter: Function;
	handleURLChange: Function,
	handleAuthChange: Function,
	handleTrackingSytemProjectDetails: Function,
	handleSystemTypeChange: Function,
	handleExtSystemSeverity: Function,
}

const useStyles = makeStyles((theme) => ({
	actionsBlock: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '20%',
	},
	accordSummary: {
		textTransform: 'none',
	},
	accordionTitle: {
		fontSize: '17px',
		fontWeight: 'normal',
		textTransform: 'none',
	},
	accordionBox: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
}));

const ExtTrackingSystemSettings = ({
	productParams,
	handleChangeJiraFieldMapping,
	handleChangeExtSeverityFilter,
	handleChangeExtCategoryFilter,
	handleURLChange,
	handleAuthChange,
	handleTrackingSytemProjectDetails,
	handleSystemTypeChange,
	handleExtSystemSeverity
}: SettingsProps) => {
	const classes = useStyles();
	// useEffect(()=> {
	// 	handleExtTrackingSystemSync();
	// }, [])
	return (
		<Grid
			container
			spacing={1}
			style={{ borderBottom: 'solid 1px #dddddd', padding: '20px 0' }}
		>
			<Grid item xs={12} sm={12}>
				{productParams.products &&
				productParams.products[0] &&
				productParams.products[0].feedbackAgentSettings &&
				productParams.products[0].feedbackAgentSettings.feedbackTypes.length > 0 ?
                    <ExtSystemConfig  productParams={productParams} handleChangeJiraFieldMapping={handleChangeJiraFieldMapping} handleChangeExtSeverityFilter={handleChangeExtSeverityFilter} handleChangeExtCategoryFilter={handleChangeExtCategoryFilter}
					handleURLChange={handleURLChange} handleExtSystemSeverity={handleExtSystemSeverity} handleAuthChange={handleAuthChange} handleTrackingSytemProjectDetails={handleTrackingSytemProjectDetails} handleSystemTypeChange={handleSystemTypeChange}/>
								: null}
			</Grid>
		</Grid>
	);
};

export default ExtTrackingSystemSettings;
