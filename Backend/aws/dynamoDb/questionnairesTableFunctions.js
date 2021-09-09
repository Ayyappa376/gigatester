const mainTableName = 'Questionnaires';

exports.getQuestionnairesTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createQuestionnairesTable = (ddb, tableName) => {
	let params = {
	    AttributeDefinitions: [
	        {
	            AttributeName: "questionnaireId",
	            AttributeType: "S",
	        },
	        {
	            AttributeName: "version",
	            AttributeType: "S",
	        },
	    ],
	    KeySchema: [
	        {
	            AttributeName: "questionnaireId",
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