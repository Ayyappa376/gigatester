const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const cors = require('cors');

cors({
    origin: true,
  });
exports.handler = async (event: any) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
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
                                "id": jsonBody.id,
                                "userId": jsonBody.userId,
                                "createdOn": Date.now(),
                                "productRating": jsonBody.productRating,
                                "productVersion": jsonBody.productVersion,
                                "feedbackComments": jsonBody.feedbackComments,
                                "productId": jsonBody.productId,
                                "productName": jsonBody.productName
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
    }catch (err) {
        statusCode = '400';
        console.error('GT_AppFeedback Failed.', err);
        // body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

