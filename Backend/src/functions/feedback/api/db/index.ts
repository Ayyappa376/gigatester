const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const cors = require('cors');
const axios = require('axios');
import uuidv1 from 'uuid/v1';
import { sendFeedbackThanksMessage } from './emailReply';

cors({
  origin: true,
});

exports.handler = async (event: any) => {
  console.log('feedback-api-db-handler: Received event:', JSON.stringify(event, undefined, 2));
  console.log('feedback-api-db-handler: Received:', 'JIRA upload');
  let body;
  let statusCode = '200';
  // const headers = {
  //   'Access-Control-Allow-Origin':'*',
  //   'Content-Type': 'application/json'
  // };
  const headers = {
    'Access-Control-Allow-Headers':'*',
    'Access-Control-Allow-Methods':'HEAD, POST',//'HEAD, GET, POST, PUT, DELETE',
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
};
try {
    switch (event.httpMethod) {
      // case 'DELETE':
      //     body = await dynamo.delete(JSON.parse(event.body)).promise();
      //     break;
      case 'POST':
        const jsonBody = JSON.parse(event.body);
        const now = new Date();
        const tableparams = {
          Item: {
            bugPriority: jsonBody.bugPriority.toLowerCase(),
            contextDetails: jsonBody.contextDetails,
            createdOn: Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()),
            feedbackCategory: jsonBody.feedbackCategory,
            feedbackComments: JSON.stringify(jsonBody.feedbackComments),
            feedbackMedia: {
              audio: jsonBody.feedbackMedia.audio ? jsonBody.feedbackMedia.audio : '',
              file: jsonBody.feedbackMedia.file ? jsonBody.feedbackMedia.file : '',
              image: jsonBody.feedbackMedia.image ? jsonBody.feedbackMedia.image : '',
              video: jsonBody.feedbackMedia.video ? jsonBody.feedbackMedia.video : '',
            },
            feedbackType: jsonBody.feedbackType,
            id: `feedback_${uuidv1()}`,
            pageURL: jsonBody.pageURL,
            platformName: jsonBody.platformName,
            platformOs: jsonBody.platformOs,
            platformVersion: jsonBody.platformVersion,
            productId: await getproductIdForKey(jsonBody.productKey),
            productRating: jsonBody.productRating,
            productVersion: jsonBody.productVersion,
            sourceIP: event.requestContext.identity.sourceIp,
            userDetails: jsonBody.userDetails,
            userId: jsonBody.userName,
          },
          TableName: getTableNameFor('GT_feedback')
        };

        const trackingSystemDetails: any = await getproductTrackingSystemDetails(jsonBody.productKey);
        if(trackingSystemDetails.uploadToTrackingSystem) {
          const postJIRA = await postJIRAIncident(
             {
              appToken: trackingSystemDetails.auth.authKey,
              email: trackingSystemDetails.auth.authUser,
            },
            JSON.stringify(jsonBody.feedbackComments),
            trackingSystemDetails.url,
            jsonBody.feedbackCategory
          );
          console.log('JIRA upload', postJIRA);
        }
        console.log(trackingSystemDetails);

        const thankYouEmail: any = await sendFeedbackThanksMessage(jsonBody.userName, jsonBody.title, jsonBody.thanksMsg);
        console.log('thank you ', thankYouEmail);
        body = await dynamo.put(tableparams).promise();
        break;
      // case 'PUT':
      //   body = await dynamo.update(JSON.parse(event.body)).promise();
      //   break;
      case 'OPTIONS':
        statusCode = '200';
        // headers['Access-Control-Allow-Headers'] = '*';
        // headers['Access-Control-Allow-Origin'] = '*';
        // headers['Access-Control-Allow-Methods'] = 'HEAD, GET, POST, PUT, DELETE';
        break;
      default:
        throw new Error(`Unsupported method "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = '400';
    console.error('feedback-api-db-handler: Failed.', err);
    // body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    body,
    headers,
    statusCode,
  };
};

async function getproductIdForKey(productKey: string): Promise<string> {
    const params = {
        ExpressionAttributeNames: {'#apiKey': 'apiKey'},
        ExpressionAttributeValues: {':apiKey': productKey},
        FilterExpression: '#apiKey = :apiKey',
        TableName: getTableNameFor('GT_Products'),
    };
    console.log('feedback-api-db-handler: DynamoDBScan params:', params);
    const result = await dynamo.scan(params).promise();
    console.log('feedback-api-db-handler: DynamoDBScan result:', result);
    return (result.Items.length > 0) ? result.Items[0].id : '';
}

async function getproductTrackingSystemDetails(productKey: string): Promise<string> {
  const params = {
      ExpressionAttributeNames: {'#apiKey': 'apiKey'},
      ExpressionAttributeValues: {':apiKey': productKey},
      FilterExpression: '#apiKey = :apiKey',
      TableName: getTableNameFor('GT_Products'),
  };
  console.log('feedback-api-db-handler: DynamoDBScan params:', params);
  const result = await dynamo.scan(params).promise();
  console.log('feedback-api-db-handler: DynamoDBScan result:', result);
  return (result.Items.length > 0) ? result.Items[0].trackingSystem : '';
}

async function postJIRAIncident(
  auth: any,
  description: any,
  externalSystemURL: string,
  summary: any,
): Promise<any> {
  return new Promise((resolve: (item: any) => void, reject: (err: any) => any): any => {
const data = JSON.stringify({
  fields: {
    description,
    issuetype: {
      name: 'Bug'
    },
    project: {
      key: 'GTI'
    },
    summary
  }
});
const token = `${auth.email}:${auth.appToken}`;
const encodedToken = Buffer.from(token).toString('base64');
console.log(encodedToken);
const config = {
  data,
  headers: {
    'Authorization': 'Basic '+ `${encodedToken}`,
    'Content-Type': 'application/json',
  },
  method: 'post',
  url: `${externalSystemURL}/rest/api/latest/issue`,
};

axios(config)
.then(function (response: any) {
  console.log(JSON.stringify(response.data));
  resolve(JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
  reject(error);
});
  });
}

function getTableNameFor(baseTableName: string): string {
  if(process.env.DB_ENV === 'development') {
    return `dev_${baseTableName}`;
  }
  if(process.env.DB_ENV === 'beta') {
    return `beta_${baseTableName}`;
  }
  return `dish_${baseTableName}`;
}
