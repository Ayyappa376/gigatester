const mainTableName = 'Questions';

exports.getQuestionsTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createQuestionsTable = (ddb, tableName) => {
	let params = {
	    AttributeDefinitions: [
	        {
	            AttributeName: "id",
	            AttributeType: "S",
	        },
	        {
	            AttributeName: "version",
	            AttributeType: "N",
	        },
	    ],
	    KeySchema: [
	        {
	            AttributeName: "id",
	            KeyType: "HASH",
	        },
	        {
	            AttributeName: "version",
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