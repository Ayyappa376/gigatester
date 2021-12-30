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
                                    audio: jsonBody.feedbackMedia.audio ? jsonBody.feedbackMedia.audio : '',
                                    file: jsonBody.feedbackMedia.file ? jsonBody.feedbackMedia.file : '',
                                    image: jsonBody.feedbackMedia.image ? jsonBody.feedbackMedia.image : '',
                                    video: jsonBody.feedbackMedia.video ? jsonBody.feedbackMedia.video : '',
                                },
                                id: `feedback_${uuidv1()}`,
                                productId: await getproductIdForKey(jsonBody.productKey),
                                productRating: jsonBody.productRating,
                                productVersion: jsonBody.productVersion,
                                userId: jsonBody.userName,
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

async function getproductIdForKey(productKey: string): Promise<string> {
    const params = {
        ConditionExpression: '#apiKey = :apiKey',
        ExpressionAttributeNames: {'#apiKey': 'apiKey'},
        ExpressionAttributeValues: {':apiKey': productKey},
        TableName: 'dev_GT_Products',
    };
    console.log('feedback-api-db-handler: DynamoDBScan params:', params);
    const products = await dynamo.scan(params).Items;
    console.log('feedback-api-db-handler: DynamoDBScan result:', products);
    return (products.length > 0) ? products.map((product: any) => product.id)[0] : '';
}
