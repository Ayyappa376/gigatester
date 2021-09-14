var AWS = require('aws-sdk');
const jsonData = require('./dev_CognitoUsers.json');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAQ2S4FEWFXAZI3S5U',
  secretAccessKey: '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',
});

var docClient = new AWS.DynamoDB.DocumentClient();

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

function generatePassword() {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0; i < length; i += 1) {
    const n = charset.length;
    retVal += charset.charAt(Math.floor(Math.random() * n));
    retVal += '1!K';
  }
  return retVal;
}

if (jsonData) {
  jsonData.forEach(function (user) {
    const params = {
      UserPoolId: 'us-east-1_OGtCgSmi6' /* required */,
      Username: user.emailId /* required */,
      TemporaryPassword: generatePassword(),
      UserAttributes: [
        {
          Name: 'email',
          Value: user.emailId,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    };
    cognitoidentityserviceprovider.adminCreateUser(params, (err, data) => {
      if (err) {
        console.log(err.code, ':', user.emailId, 'already exist.');
      }
      if (data) {
        const params = {
          TableName: 'qa_CognitoUsers',
          Item: {
            emailVerified: user.emailVerified,
            roles: user.roles,
            teams: user.teams,
            manages: user.manages,
            emailId: user.emailId,
            order: user.order,
            id: data.User.Username,
          },
        };
        docClient.put(params, function (err, data) {
          if (err) {
            console.log('error in adding congitoUser:', err);
          } else {
            console.log('Success:', user.emailId, 'added successfully');
          }
        });
      }
    });
  });
}
