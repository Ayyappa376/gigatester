var AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
var dir = './dynamoDb-TableData';

let awsConfig = {
  region: 'us-east-1',
//  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
//  accessKeyId: 'AKIAQ2S4FEWF7ZTFTTEY',
//  secretAccessKey: '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',
};

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

let tables = [
  'dev_UserAssessments',
  'dev_Team',
  'dev_Questions',
  'dev_Questionnaires',
  'dev_CognitoUsers',
];

var params = tables.map((table) => {
  return {
    TableName: table,
  };
});

params.forEach((table) => {
  docClient.scan(table, onScan);
  function onScan(err, data) {
    if (err) {
      console.error(
        'Unable to scan the table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      if (!fs.existsSync(path.join(path.dirname(__dirname), dir))) {
        fs.mkdir(path.join(path.dirname(__dirname), dir), (err) => {
          if (err) {
            return console.error(err);
          } else {
            console.log('Directory successfully created');
          }
        });
      }
      fs.writeFile(
        path.join(path.dirname(__dirname), dir, `${table.TableName}.json`),
        JSON.stringify(data.Items, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File successfully created');
          }
        }
      );

      if (typeof data.LastEvaluatedKey != 'undefined') {
        console.log('Scanning for more...');
        table.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(table, onScan);
      }
    }
  }
});
