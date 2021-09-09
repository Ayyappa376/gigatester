import { API, Handler } from '@apis/index';
import { MetricsTool } from '@models/index';
import { appLogger, connectToTool, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface ToolsConnect {
    body: {
        tool: MetricsTool;
    };
    headers: {
        user: {
            'cognito:groups': string[];
            'cognito:username': string;
            email: string;
        };
    };
}

async function handler(request: ToolsConnect, response: Response) {
    appLogger.info({SetMetricsTool: request}, 'Inside Handler');

    const { headers, body } = request;
    if (headers.user['cognito:groups'][0] !== 'Manager' && headers.user['cognito:groups'][0] !== 'Admin') {
        const err = new Error('Forbidden Access, Unauthorized user');
        appLogger.error(err, 'Forbidden');
        return responseBuilder.forbidden(err, response);
    }

    let result: any = {
        connect: false,
        tool: body.tool,
    };
    connectToTool(body.tool)
    .then((tool: MetricsTool) => {
        appLogger.info({testToolConnection: tool});
        result = {
            connect: true,
            tool,
        };
    })
    .catch((e: any) => {
        appLogger.error({err: e}, 'testToolConnection');
    });
    return responseBuilder.ok(result, response);
}

export const api: API = {
    handler: <Handler><unknown>handler,
    method: 'post',
    route: '/api/metrics/connect',
};
