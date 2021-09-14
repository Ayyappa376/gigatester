const mainTableName = 'Team';

exports.getTeamTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createTeamTable = (ddb, tableName) => {
	let params = {
	    AttributeDefinitions: [
	        {
	            AttributeName: "teamId",
	            AttributeType: "S",
	        },
	    ],
	    KeySchema: [
	        {
	            AttributeName: "teamId",
	            KeyType: "HASH",
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
	        console.error("Error: Failed to create table " + tableName, err);
	    } else {
	        console.log("Successfully Created Table " + tableName);
	    }
	});
}

exports.insertTeamTableData = (ddb, tableName, tablePrefix) => {
	let params = {
		TableName: tableName
	};
	ddb.waitFor('tableExists', params, function(err, data) {
		if (err) {
			console.log("Error: Table doesn't exist' " + tableName, err);
		} else {
		    if( data.Table.TableStatus == 'ACTIVE' ) {
				let timeNow = new Date().getTime();
				let params1 = {
					Item: {
						"teamId": { S: 'Others' },
						"teamName": { S: 'Others' },
						"active": { S: "true" }, 
						"application": { S: "Login" }, 
						"createdOn": { N: timeNow },
						"order": { L : [ {S: 'admin'} ] },
						"orgId": { S: tablePrefix },
						"technology": { S: 'none' },
						"questionnaireId": { L : [] },
						"questionnaires": { L : [] }
					},
					TableName: tableName
				 };
				ddb.putItem(params1, function(err, data) {
				    if (err) {
				        console.error("Error: Failed to insert item into table" + tableName, err);
				    } else {
				        console.log("Successfully inserted item into table " + tableName);
				    }
				});
			}
		}
	});
}