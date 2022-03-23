const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const cors = require('cors');
import { DynamoDB } from 'aws-sdk';
import { ProductInfo } from '../../../../models/product';

cors({
    origin: true,
  });
exports.handler = async (event: any) => {
    console.log('feedback-api-config-handler: Received event:', JSON.stringify(event, undefined, 2));
    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Methods':'HEAD, GET',//'HEAD, GET, POST, PUT, DELETE',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
    };
    function scan<T>(params: DynamoDB.ScanInput): Promise<T> {
        return new Promise(
          (resolve: (item: any) => void, reject: (err: AWS.AWSError) => any) => {
            dynamo.scan(
              params,
              async (err: AWS.AWSError, data: DynamoDB.ScanOutput) => {
                if (err) {
                  return reject(err);
                }
                let result: any = data.Items;
                if (data.LastEvaluatedKey) {
                  const newParams = params;
                  newParams.ExclusiveStartKey = data.LastEvaluatedKey;
                  const res: any = await scan(newParams);
                  result = result.concat(res);
                  return resolve(result);
                }
                return resolve(result);
              }
            );
          }
        );
      }
    try {
        switch (event.httpMethod) {
            // case 'DELETE':
            //     body = await dynamo.delete(JSON.parse(event.body)).promise();
            //     break;
           case 'GET':
               const apiKey = event.queryStringParameters.apiKey;
               const version = event.queryStringParameters.version;
               const params: DynamoDB.ScanInput = <DynamoDB.ScanInput>(<unknown>{
                ExpressionAttributeValues: {
                  ':apiKey': apiKey,
                  ':version': version },
                FilterExpression: 'apiKey = :apiKey AND version = :version',
                TableName: getTableNameFor('GT_Products'),
              });
               body = (await scan<ProductInfo[]>(params)).map((prod: ProductInfo) => prod.feedbackAgentSettings);
//               headers['Access-Control-Allow-Headers'] = '*';
//               headers['Access-Control-Allow-Origin'] = '*';
//               headers['Access-Control-Allow-Methods'] = 'HEAD, GET, POST, PUT, DELETE';
               break;
            // case 'POST':
            //     body = await dynamo.put(tableparams).promise();
            //     break;
            // case 'PUT':
            //     body = await dynamo.update(JSON.parse(event.body)).promise();
            //     break;
            case 'OPTIONS':
                statusCode = '200';
//                headers['Access-Control-Allow-Headers'] = '*';
//                headers['Access-Control-Allow-Origin'] = '*';
//                headers['Access-Control-Allow-Methods'] = 'HEAD, GET, POST, PUT, DELETE';
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        console.error('feedback-api-config-handler: Failed.', err);
    } finally {
        body = JSON.stringify(body);
    }
    return {
        body,
        headers,
        statusCode,
    };
};

function getTableNameFor(baseTableName: string): string {
  if(process.env.DB_ENV === 'development') {
    return `dev_${baseTableName}`;
  }
  if(process.env.DB_ENV === 'beta') {
    return `beta_${baseTableName}`;
  }
  return `dish_${baseTableName}`;
}
