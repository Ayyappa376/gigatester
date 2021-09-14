const mainTableName = 'CognitoUsers';

exports.getCognitoUsersTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createCognitoUsersTable = (ddb, tableName) => {
	let params = {
	    AttributeDefinitions: [
	        {
	            AttributeName: "id",
	            AttributeType: "S",
	        },
	    ],
	    KeySchema: [
	        {
	            AttributeName: "id",
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
	        console.error("Error creating table " + tableName, err);
	    } else {
	        console.log("Successfully Created Table " + tableName);
	    }
	});
}