const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const cors = require('cors');
import uuidv1 from 'uuid/v1';

cors({
    origin: true,
  });
exports.handler = async (event: any) => {
    console.log('feedback-api-db-handler: Received event:', JSON.stringify(event, undefined, 2));
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
//            case 'GET':
//                body = await dynamo.scan({ TableName: 'dev_GT_feedback' }).promise();
//                break;
            case 'POST':
                const jsonBody = JSON.parse(event.body);
                const tableparams = {
                            Item: {
                                createdOn: Date.now(),
                                feedbackComments: jsonBody.feedbackComments,
                                feedbackMedia: {
                                    audio: '',
                                    file: jsonBody.feedbackMedia.file,
                                    image: jsonBody.feedbackMedia.image,
                                    video: jsonBody.feedbackMedia.video,
                                },
                                id: `feedback_${uuidv1()}`,
                                productId: jsonBody.productId,
                                productRating: jsonBody.productRating,
                                productVersion: jsonBody.productVersion,
                                userId: jsonBody.userId,
                            },
                            TableName: 'dev_GT_feedback'
                        };
                body = await dynamo.put(tableparams).promise();
                break;
            case 'PUT':
                body = await dynamo.update(JSON.parse(event.body)).promise();
                break;
            case 'OPTIONS':
                statusCode = '200';
                headers['Access-Control-Allow-Headers'] = '*';
                headers['Access-Control-Allow-Origin'] = '*';
                headers['Access-Control-Allow-Methods'] = 'HEAD, GET, POST, PUT, DELETE';
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        console.error('GT_AppFeedback Failed.', err);
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
