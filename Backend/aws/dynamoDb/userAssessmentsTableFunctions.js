const mainTableName = 'UserAssessments';

exports.getUserAssessmentsTableNameFor = (tablePrefix) => {
	return tablePrefix + '_' + mainTableName;
}

exports.createUserAssessmentsTable = (ddb, tableName) => {
	let params = {
		AttributeDefinitions: [
			{
				AttributeName: "userId",
				AttributeType: "S",
			},
			{
				AttributeName: "assessmentId",
				AttributeType: "S",
			},
		],
		KeySchema: [
			{
				AttributeName: "userId",
				KeyType: "HASH",
			},
			{
				AttributeName: "assessmentId",
				KeyType: "RANGE",
			},
		],
//		BillingMode: PAY_PER_REQUEST, //use for on-demand billing
		ProvisionedThroughput: { //use for provisioned billing
			ReadCapacityUnits: 5,
			WriteCapacityUnits: 5,
		},
		TableName: tableName,
		GlobalSecondaryIndexes: [
			{
				IndexName: "assessmentId-index-dev",
				KeySchema: [
					{
						AttributeName: "assessmentId",
						KeyType: "HASH"
					}
				],
				Projection: {
					ProjectionType: "ALL"
				},
//				BillingMode: PAY_PER_REQUEST, //use for on-demand billing
				ProvisionedThroughput: { //use for provisioned billing
					ReadCapacityUnits: 5,
					WriteCapacityUnits: 5
				}
			},
		]
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