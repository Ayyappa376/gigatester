const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const cors = require('cors');


cors({
    origin: true,
  });
/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    };
   
    try {
        switch (event.httpMethod) {
            case 'DELETE':
                body = await dynamo.delete(JSON.parse(event.body)).promise();
                break;
            case 'GET':
                body = await dynamo.scan({ TableName: "dev_GT_feedback" }).promise();
                break;
            case 'POST':
                const jsonBody = JSON.parse(event.body);
                console.log(jsonBody.body.data.id)
                const tableparams = {
                            TableName: "dev_GT_feedback",
                            Item: {
                                "id": jsonBody.body.data.id,
                                "userId": jsonBody.body.data.userId,
                                "createdOn": Date.now(),
                                "productRating": jsonBody.body.data.productRating,
                                "productVersion": jsonBody.body.data.productVersion,
                                "feedbackComments": jsonBody.body.data.feedbackComments,
                                "productId": jsonBody.body.data.productId,
                                "productName": jsonBody.body.data.productName
                            }
                        }
                body = await dynamo.put(tableparams).promise();
                break;
            case 'PUT':
                body = await dynamo.update(JSON.parse(event.body)).promise();
                break;
            case 'OPTIONS':
                statusCode = '204';
                
                headers["Access-Control-Allow-Headers"] = "*";
                headers["Access-Control-Allow-Origin"] = "*";
                headers["Access-Control-Allow-Methods"] = "HEAD, GET, POST, PUT, DELETE";
                body={};
                
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        console.error('GT_AppFeedback Failed.', err);
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

