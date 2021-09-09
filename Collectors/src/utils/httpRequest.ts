import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import { appLogger } from './logger';

const supportedRequestTypes: string[] = ['GET', 'POST', 'HEAD'];

export const httpRequest = (reqType: string, url: string, body: any = null, auth: any = null, headers: any = null): Promise<any> => {
	reqType = reqType.toUpperCase();
    if (!supportedRequestTypes.includes(reqType)) {
        const err: Error = new Error(`Invalid reqType: ${reqType}`);
        appLogger.error(err);
        throw err;
    }

    let urlObject: URL;

    try {
        urlObject = new URL(url);
    } catch (error) {
        const err: Error = new Error(`Invalid url ${url}`);
        appLogger.error(err);
        throw err;
    }

    let protocolObj: any = http;
    if(urlObject.protocol === 'https') {
        protocolObj = https;
    } else if(urlObject.protocol === 'http') {
        protocolObj = http;
    } else {
        const err: Error = new Error(`Unsupported protocol ${urlObject.protocol}`);
        appLogger.error(err);
        throw err;
    }

    if (body && reqType !== 'POST') {
        const err: Error = new Error(`Invalid use of the body parameter while using the ${reqType} method.`);
        appLogger.error(err);
        throw err;
    }

    let options: any = {
        method: reqType,
        hostname: urlObject.hostname,
        port: urlObject.port,
        path: url
    };

    if(headers) {
        options.headers = headers;
    }

    if(body) {
        if(options.headers) {
            options.headers.set('Content-Length', Buffer.byteLength(body));
        } else {
            options.headers = {'Content-Length':Buffer.byteLength(body)};
        }
    }

    if(auth) {
        options.auth = auth;
    }

    return new Promise((resolve, reject) => {

        const clientRequest = protocolObj.request(options, (incomingMessage: any) => {

            // Reject on response error.
            incomingMessage.on('error', (error: any) => {
                appLogger.error(error);
                reject(error);
            });

            // Response object.
            let response: {statusCode: number|undefined; headers: any, body: any} = {
                statusCode: incomingMessage.statusCode,
                headers: incomingMessage.headers,
                body: []
            };

            // Collect response body data.
            incomingMessage.on('data', (chunk: any) => {
                response.body.push(chunk);
            });

            // Resolve on end.
            incomingMessage.on('end', () => {
                if (response.body.length) {
                    response.body = response.body.join();
                }

                resolve(response);
            });
        });

        // Reject on request error.
        clientRequest.on('error', (error: any) => {
            appLogger.error(error);
            reject(error);
        });

        // Write request body if present.
        if (body) {
            clientRequest.write(body);
        }

        // Close HTTP connection.
        clientRequest.end();
    });
}

/*
import * as http from 'http';
import { URL } from 'url';

export const httpRequest = (reqType: string, url: string, body: any = null, auth: any = null): Promise<any> => {
	reqType = reqType.toUpperCase();
    if (!['GET', 'POST', 'HEAD'].includes(reqType)) {
        throw new Error(`Invalid reqType: ${reqType}`);
    }

    let urlObject: URL;

    try {
        urlObject = new URL(url);
    } catch (error) {
        throw new Error(`Invalid url ${url}`);
    }

    if (body && reqType !== 'POST') {
        throw new Error(`Invalid use of the body parameter while using the ${reqType} method.`);
    }

    let options: any = {
        method: reqType,
        hostname: urlObject.hostname,
        port: urlObject.port,
        path: url
    };

    if (body) {
        options.headers = {'Content-Length':Buffer.byteLength(body)};
    }

    if(auth) {
        options.auth = auth;
    }

    return new Promise((resolve, reject) => {

        const clientRequest = http.request(options, (incomingMessage) => {

            // Response object.
            let response: {statusCode: number|undefined; headers: http.IncomingHttpHeaders, body: any} = {
                statusCode: incomingMessage.statusCode,
                headers: incomingMessage.headers,
                body: []
            };

            // Collect response body data.
            incomingMessage.on('data', chunk => {
                response.body.push(chunk);
            });

            // Resolve on end.
            incomingMessage.on('end', () => {
                if (response.body.length) {
                    response.body = response.body.join();
                }

                resolve(response);
            });
        });

        // Reject on request error.
        clientRequest.on('error', error => {
            reject(error);
        });

        // Write request body if present.
        if (body) {
            clientRequest.write(body);
        }

        // Close HTTP connection.
        clientRequest.end();
    });
}
*/
