const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const cors = require('cors');
import { ProductInfo } from '@root/models/product';
import { scan } from '@root/utils/dynamoDb/sdk';
import { DynamoDB } from 'aws-sdk';

cors({
    origin: true,
  });
exports.handler = async (event: any) => {
    console.log('feedback-api-config-handler: Received event:', JSON.stringify(event, undefined, 2));
    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
    };
    try {
        switch (event.httpMethod) {
            // case 'DELETE':
            //     body = await dynamo.delete(JSON.parse(event.body)).promise();
            //     break;
           case 'GET':
            //    body = await dynamo.scan({ TableName: 'dev_GT_feedback' }).promise();
               const apiKey = event.queryStringParameters.apiKey;
               const version = event.queryStringParameters.version;
               const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>(<unknown>{
                ExpressionAttributeValues: {
                  ':apiKey': apiKey,
                  ':version': version },
                FilterExpression: 'apiKey = :apiKey AND version = :version',
                TableName: 'dev_GT_Products',
              });
               body = (await scan<ProductInfo[]>(params)).map((prod: ProductInfo) => prod.feedbackSettings);
               break;
            case 'POST':
                // body = await dynamo.put(tableparams).promise();
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
