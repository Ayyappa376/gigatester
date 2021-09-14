var AWS = require('aws-sdk');
const jsonData = require('./dev_Team.json');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAQ2S4FEWFXAZI3S5U',
  secretAccessKey: '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',
});

var docClient = new AWS.DynamoDB.DocumentClient();

if (jsonData) {
  jsonData.forEach(function (team) {
    var params = {
      TableName: 'qa_Team',
      Item: {
        technology: team.technology,
        active: team.active,
        teamName: team.teamName,
        createdOn: team.createdOn,
        manager: team.manager,
        orgId: team.orgId,
        application: team.application,
        managerId: team.managerId,
        order: team.order,
        teamId: team.teamId,
      },
    };
    docClient.put(params, function (err, data) {
      if (err) {
        console.log('error in adding congitoUser:', err);
      } else {
        console.log('Success:', team.teamName, 'added successfully');
      }
    });
  });
}
