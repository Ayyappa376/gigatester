var aws = require("aws-sdk");
aws.config.update({ region: 'us-west-2' });
var documentClient = new aws.DynamoDB.DocumentClient();
//var ses = new aws.SES({ region: "us-west-2" });

exports.handler = (event, context, callback) => {
  console.log(event.request);

  //add to database
  const item = {
    id: event.request.userAttributes.sub,
    emailId: event.request.userAttributes.email,
    emailVerified: event.request.userAttributes.email_verified,
    //    roles: event.request.groupConfiguration.groupsToOverride ? event.request.groupConfiguration.groupsToOverride : ['Tester'],
    teams: [{
      "name": 'Others',
      "isLead": false,
    }],
    manages: [],
    order: ['admin'],
    roles: ['Tester']
  }

  const params = {
    TableName: "dev_CognitoUsers",
    Item: item
  }

  documentClient.put(params, function (err, data) {
    if (err) console.log(err);
  });
  /*
    //notify admin
    var mail_params = {
      Destination: {
        ToAddresses: ['gargi.basak@dish.com'],
      },
      Message: {
        Body: {
          Text: { Data: "New user " + event.request.userAttributes.email + " has registered on dev.gigatester.io" },
        },
  
        Subject: { Data: "New user registered" },
      },
      Source: "no-reply@dev.gigatester.io",
    };
  
    console.log("Sending mail", mail_params);
    ses.sendEmail(mail_params).promise().catch((err) => {
      console.log(err);
    });
  */
  callback(null, event);
};

