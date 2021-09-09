const mainTableName = 'Configs';
const appClientIdValue = "6dr7paonmudqfqsvpnqiuepb8d";
const appClientURLValue = "qadoitright.auth.us-east-1.amazoncognito.com";
const userpoolIdValue = "us-east-1_OGtCgSmi6";

exports.getConfigsTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createConfigsTable = (ddb, tableName) => {
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

exports.insertConfigsTableData = (ddb, tableName) => {
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
					Item: getGeneralConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params4, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert GeneralConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted GeneralConfig into table " + tableName);
				    }
				});
/*
				let params5 = {
					Item: getCollectorConfig(tablePrefix),
					TableName: tableName
				 };
				ddb.putItem(params5, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert CollectorConfig into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted CollectorConfig into table " + tableName);
				    }
				});
*/
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
					"options": { M: { "customFixed": { S: "Manager,Member" } } }
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

function getGeneralConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "userLevels" },
		"config": { M: {
			"levels": { L: [
					{ M: {
						"name": "Beginner",
						"lowerLimit": { N: 0 },
						"upperLimit": { N: 30 }
					} },
					{ M: {
						"name": "Intermediate",
						"lowerLimit": { N: 31 },
						"upperLimit": { N: 70 }
					} },
					{ M: {
						"name": "High",
						"lowerLimit": { N: 71 },
						"upperLimit": { N: 90 }
					} },
					{ M: {
						"name": "Elite",
						"lowerLimit": { N: 91 },
						"upperLimit": { N: 100 }
					} },
				]},
			"performanceMetricsConstant": { N: 3 }
		}}
	};
}

/*
function getCollectorConfig(tablePrefix) {
	return {
		"orgId": { S: tablePrefix },
		"type": { S: "CollectorConfig" },
		"config": { M: {
			"cicd": { L: [
					{ M: {
						"attributes": { M: {
							"job": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "Jenkins Job" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}},
							"password": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "Password" },
								"mandatory": { BOOL: true },
								"type": { S: "password" }
							}},
							"url": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "URL" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}},
							"userName": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "User Name" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}}
						}}
					} },
					{ M: {
						"collectorSchedule": { S: "0***" }
					} },
					{ M: {
						"name": { S: "Jenkins" }
					} },
					{ M: {
						"processorSchedule": { S: "00**" },
					} },
				]},
				"repository": { L: [
					{ M: {
						"attributes": { M: {
							"region": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "Jenkins Job" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}},
							"password": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "Password" },
								"mandatory": { BOOL: true },
								"type": { S: "password" }
							}},
							"url": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "URL" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}},
							"userName": { M: {
								"custom": {BOOL: false },
								"displayName": { S: "User Name" },
								"mandatory": { BOOL: true },
								"type": { S: "string" }
							}}
						}}
					} },
					{ M: {
						"collectorSchedule": { S: "0***" }
					} },
					{ M: {
						"name": { S: "AWSCodeCommit" }
					} },
					{ M: {
						"processorSchedule": { S: "00**" },
					} },
				]},
				"requirements": { L: [
					{ M: {
						"password": { M: {
							"custom": {BOOL: false },
							"displayName": { S: "Password" },
							"mandatory": { BOOL: true },
							"type": { S: "password" }
						}},
						"url": { M: {
							"custom": {BOOL: false },
							"displayName": { S: "URL" },
							"mandatory": { BOOL: true },
							"type": { S: "string" }
						}},
						"userName": { M: {
							"custom": {BOOL: false },
							"displayName": { S: "User Name" },
							"mandatory": { BOOL: true },
							"type": { S: "string" }
						}}
					} },
					{ M: {
						"collectorSchedule": { S: "0***" }
					} },
					{ M: {
						"name": { S: "AWSCodeCommit" }
					} },
					{ M: {
						"processorSchedule": { S: "00**" },
					} },
				]},
		}}		
	};
}
*/