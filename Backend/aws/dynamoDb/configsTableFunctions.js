const CONFIGS_TABLE_NAME = 'Configs';

const appClientIdValue = '31vurh6heakn3u0nct7ur14n1b';
const appClientURLValue = 'devgigatester.auth.us-east-1.amazoncognito.com';
const userpoolIdValue = 'us-east-1_2CjQz7NaP';

exports.getConfigsTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + CONFIGS_TABLE_NAME;
}

exports.createConfigsTable = (ddb, tablePrefix) => {
	const tableName = this.getConfigsTableNameFor(tablePrefix);
	let params = {
	    AttributeDefinitions: [
	        {
	            AttributeName: "orgId",
	            AttributeType: "S",
	        },
	        {
	            AttributeName: "type",
	            AttributeType: "S",
	        },
	    ],
	    KeySchema: [
	        {
	            AttributeName: "orgId",
	            KeyType: "HASH",
	        },
	        {
	            AttributeName: "type",
	            KeyType: "RANGE",
	        },
	    ],
	    ProvisionedThroughput: {
	        ReadCapacityUnits: 1,
	        WriteCapacityUnits: 1,
	    },
	    TableName: tableName,
	};
	
	// Call DynamoDB to create the table
	ddb.createTable(params, (err, data) => {
	    if (err) {
	        console.error("Error creating table " + tableName, err);
	    } else {
	        console.log("Successfully Created Table " + tableName);
	    }
	});
}

/*
exports.insertConfigsTableData = (ddb, tableName, tablePrefix) => {
	let params = {
		TableName: tableName
	};
	ddb.waitFor('tableExists', params, function(err, data) {
		if (err) {
			console.log("Error: Table doesn't exist' " + tableName, err);
		} else {
		    if( data.Table.TableStatus == 'ACTIVE' ) {
				let params1 = {
					Item: getSystemConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params1, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert SystemConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted SystemConfig into table " + tableName);
				    }
				});

				let params2 = {
					Item: getUserConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params2, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert UserConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted UserConfig into table " + tableName);
				    }
				});

				let params3 = {
					Item: getTeamConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params3, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert TeamConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted TeamConfig into table " + tableName);
				    }
				});

				let params4 = {
					Item: getServiceConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params4, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert ServiceConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted ServiceConfig into table " + tableName);
				    }
				});

				let params5= {
					Item: getGeneralConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params5, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert GeneralConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted GeneralConfig into table " + tableName);
				    }
				});
			}
		}
	});
}

function getSystemConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "SystemConfig" },
		"config": { M: {
				"appClientId": { S: appClientIdValue },
				"appClientURL": { S: appClientURLValue },
				"userpoolId": { S: userpoolIdValue },
				"logLevel": { S: "warn" },
			}
		}
	};
}

function getUserConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "UserConfig" },
		"config": { M: {
				"emailId": { M: {
					"custom": {BOOL: false }, 
					"displayName": { S: "Email" },
					"mandatory": { BOOL: true },
					"type": { S: "string" }
				} },
				"roles": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Roles" },
					"mandatory": { BOOL: true },
					"type": { S: "multi-list" },
					"options": { M: { "customFixed": { S: "Manager,Executive" } } }
				} },
				"teams": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Teams"},
					"mandatory": { BOOL: true},
					"type": { S: "multi-list"},
					"options": { M: { "database": { S: "db-team-user" } } }
				} },
			}
		}
	};
}

function getTeamConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "TeamConfig" },
		"config": { M: {
				"teamName": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Team Name" },
					"mandatory": { BOOL: true },
					"type": { S: "string" }
				} },
				"manager": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Manager"},
					"mandatory": { BOOL: false},
					"type": { S: "list"},
					"options": { M: { "database": { S: "db-user-managers" } } }
				} },
				"department": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Department"},
					"mandatory": { BOOL: true},
					"type": { S: "list-no-others"},
					"options": { M: { "custom": { S: "Others" } } }
				} },
			}
		}
	};
}

function getServiceConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "ServiceConfig" },
		"config": { M: {
				"name": { M: {
					"custom": {BOOL: false },
					"displayName": { S: "Service Name" },
					"mandatory": { BOOL: true },
					"type": { S: "string" }
				} },
				"type": { M: {
					"custom": { BOOL: false },
					"displayName": { S: "Service Type" },
					"mandatory": { BOOL: false },
					"type": { S: "list-no-others" },
					"options": { M: { "custom": { S: "Not Applicable" } } }
				} },
			}
		}
	};
}

function getGeneralConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "GeneralConfig" },
		"config": { M: {
			"levels": { L: [
					{ M: {
						"name": { S: "Beginner" },
						"lowerLimit": { N: 0 },
						"upperLimit": { N: 30 },
						"color": { S: "#949494"}
					} },
					{ M: {
						"name": { S: "Intermediate" },
						"lowerLimit": { N: 31 },
						"upperLimit": { N: 70 },
						"color": { S: "#E7B417"}
					} },
					{ M: {
						"name": { S: "High" },
						"lowerLimit": { N: 71 },
						"upperLimit": { N: 90 },
						"color": { S: "#60BC60"}
					} },
					{ M: {
						"name": { S: "Elite" },
						"lowerLimit": { N: 91 },
						"upperLimit": { N: 100 },
						"color": { S: "#017530"}
					} },
				]},
			"performanceMetricsConstant": { N: 3 },
			"archiveDays": {N: 0}
		}}
	};
}
*/

exports.insertConfigsTableData = (ddbdc, tablePrefix) => {
	const tableName = this.getConfigsTableNameFor(tablePrefix);

	var params_SystemConfig = {
		Item: getSystemConfig(tablePrefix),
		TableName : tableName
	};

	ddbdc.put(params_SystemConfig, function(err, data) {
		if (err) {
			console.error("Error: Failed to insert SystemConfig into table" + tableName, err);
		} else {
			console.log("Successfully inserted SystemConfig into table " + tableName);
		}
	});

	let params_UserConfig = {
		Item: getUserConfig(tablePrefix),
		TableName: tableName
	 };
	ddbdc.putItem(params_UserConfig, function(err, data) {
		if (err) {
			console.error("Error: Failed to insert UserConfig into table" + tableName, err);
		} else {
			console.log("Successfully inserted UserConfig into table " + tableName);
		}
	});

	let params_TeamConfig = {
		Item: getTeamConfig(tablePrefix),
		TableName: tableName
	 };
	ddbdc.putItem(params_TeamConfig, function(err, data) {
		if (err) {
			console.error("Error: Failed to insert TeamConfig into table" + tableName, err);
		} else {
			console.log("Successfully inserted TeamConfig into table " + tableName);
		}
	});

	let params_ServiceConfig = {
		Item: getServiceConfig(tablePrefix),
		TableName: tableName
	 };
	ddbdc.putItem(params_ServiceConfig, function(err, data) {
		if (err) {
			console.error("Error: Failed to insert ServiceConfig into table" + tableName, err);
		} else {
			console.log("Successfully inserted ServiceConfig into table " + tableName);
		}
	});

	let params_GeneralConfig = {
		Item: getGeneralConfig(tablePrefix),
		TableName: tableName
	 };
	ddbdc.putItem(params_GeneralConfig, function(err, data) {
		if (err) {
			console.error("Error: Failed to insert GeneralConfig into table" + tableName, err);
		} else {
			console.log("Successfully inserted GeneralConfig into table " + tableName);
		}
	});
}

function getSystemConfig(tablePrefix) {
	return {
		orgId: tablePrefix,
		type: 'SystemConfig',
		config: {
			appClientId: appClientIdValue,
			appClientURL: appClientURLValue,
			userpoolId: userpoolIdValue,
			logLevel: 'warn',
		}
	};
}

function getUserConfig(tablePrefix) {
	return {
		orgId: tablePrefix,
		type: 'UserConfig',
		config: {
			emailId: {
				custom: false,
				displayName: 'Email',
				mandatory: true,
				type: 'string'
			},
			roles: {
				custom: false,
				displayName: 'Roles',
				mandatory: true,
				type: 'multi-list',
				options: { customFixed: 'Executive,Manager' }
			},
			teams: {
				custom: false,
				displayName: 'Teams',
				mandatory: true,
				type: 'multi-list',
				options: { database: 'db-team-user' }
			},
		}
	};
}

function getTeamConfig(tablePrefix) {
	return {
		orgId: tablePrefix,
		type: 'TeamConfig',
		config: {
			teamName: {
				custom: false,
				displayName: 'Team Name',
				mandatory: true,
				type: 'string'
			},
			manager: {
				custom: false,
				displayName: 'Manager',
				mandatory: false,
				type: 'list',
				options: { database: 'db-user-managers' }
			},
			department: {
				custom: false,
				displayName: 'Department',
				mandatory: true,
				type: 'list-no-others',
				options: { custom: 'Others' }
			},
		}
	};
}

function getServiceConfig(tablePrefix) {
	return {
		orgId: tablePrefix,
		type: 'ServiceConfig',
		config: {
			name: {
				custom: false,
				displayName: 'Service Name',
				mandatory: true,
				type: 'string'
			},
			type: {
				custom: false,
				displayName: 'Service Type',
				mandatory: false,
				type: 'list-no-others',
				options: { custom: 'Not Applicable' }
			},
		}
	};
}

function getGeneralConfig(tablePrefix) {
	return {
		orgId: tablePrefix,
		type: 'GeneralConfig',
		config: {
			levels: [
					{
						name: 'Beginner',
						lowerLimit: 0,
						upperLimit: 30,
						color: '#949494'
					},
					{
						name: 'Intermediate',
						lowerLimit: 31,
						upperLimit: 70,
						color: '#E7B417'
					},
					{
						name: 'High',
						lowerLimit: 71,
						upperLimit: 90,
						color: '#60BC60'
					},
					{
						name: 'Elite',
						lowerLimit: 91,
						upperLimit: 100,
						color: '#017530'
					},
				],
			performanceMetricsConstant: 3,
			archiveDays: 0
		}
	};
}
