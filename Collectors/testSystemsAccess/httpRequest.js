var http = require('http');
var https = require('https');
var urlModule = require('url');

const supportedRequestTypes = ['GET', 'POST', 'PUT', 'HEAD'];
const MAX_RETRY = 5;
const TIMEOUT_TIME = 10000; //10 seconds

exports.httpRequest = (reqType, url, body = undefined, auth = undefined, headers = undefined) => {
    const reqTypeUpperCase = reqType.toUpperCase();
    if (!supportedRequestTypes.includes(reqTypeUpperCase)) {
        const err = new Error(`Invalid reqType: ${reqType}`);
        console.log(err);
        throw err;
    }

    let urlObject;

    try {
        urlObject = new urlModule.URL(url);
        console.log({urlObject: urlObject});
    } catch (error) {
        const err = new Error(`Invalid url ${url}`);
        console.log(err);
        console.log(error);
        throw err;
    }

    let protocolObj = http;
    if(urlObject.protocol.startsWith('https')) {
        protocolObj = https;
    } else if(urlObject.protocol.startsWith('http')) {
        protocolObj = http;
    } else {
        const err = new Error(`Unsupported protocol ${urlObject.protocol}`);
        console.log(err);
        throw err;
    }

    if (body && reqTypeUpperCase !== 'POST' && reqTypeUpperCase !== 'PUT') {
//        const err = new Error(`Invalid use of the body parameter while using the ${reqType} method.`);
        console.log(`Ignoring body for ${reqType} request for ${url}.`);
//        throw err;
    }

    const options = {
        hostname: urlObject.hostname,
        method: reqType,
        path: urlObject.pathname + urlObject.search,
        protocol: urlObject.protocol,
        timeout: TIMEOUT_TIME,
    };

    if(urlObject.port) {
        options.port = urlObject.port;
    }

    if(headers) {
        options.headers = headers;
    }

    if(body && (reqTypeUpperCase === 'POST' || reqTypeUpperCase === 'PUT')) {
        if(options.headers) {
            options.headers.set('Content-Length', Buffer.byteLength(body));
        } else {
            options.headers = {'Content-Length':Buffer.byteLength(body)};
        }
    }

    if(auth) {
        options.auth = auth;
    }

    return sendRequest(protocolObj, reqTypeUpperCase, options, body);
};

const sendRequest = (protocolObj, reqTypeUpperCase, options, body = undefined, retryNum = 1) => {
    console.log(`Try ${retryNum} of ${MAX_RETRY}.....`);
    return new Promise(async (resolve, reject) => {

        if(retryNum > MAX_RETRY) {
            return reject(`Max retry exceeded for url ${options.path}`);
        }

        if(retryNum > 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        const clientRequest = protocolObj.request(options, (incomingMessage) => {

            // Reject on response error.
            incomingMessage.on('error', (error) => {
                console.log('Error receiving response. Will retry.', error);
                return sendRequest(protocolObj, reqTypeUpperCase, options, body, retryNum + 1);
            });

            if(incomingMessage.statusCode >= 500) {
                return sendRequest(protocolObj, reqTypeUpperCase, options, body, retryNum + 1);
            }

            // Response object.
            const response = {
                buffers: [],
                body: '',
                headers: incomingMessage.headers,
                statusCode: incomingMessage.statusCode
            };

            // Collect response body data.
            incomingMessage.on('data', (chunk) => {
                console.log(`Received response data from ${options.path}`);
                response.buffers.push(chunk);
            });

            // Resolve on end.
            incomingMessage.on('end', () => {
                console.log({statusCode: response.statusCode}, `End of response from ${options.path}`);
                if (response.buffers.length) {
                    response.body = Buffer.concat(response.buffers).toString();
                }

                resolve(response);
            });
        });

        console.log({clientRequest: clientRequest});

        // Reject on request error.
        clientRequest.on('error', (error) => {
            console.log('Error sending request. Will retry.', error);
            return sendRequest(protocolObj, reqTypeUpperCase, options, body, retryNum + 1);
        });

        // Write request body if present.
        if (body && (reqTypeUpperCase === 'POST' || reqTypeUpperCase === 'PUT')) {
            clientRequest.write(body);
            console.log(`Sent body for ${options.path}`);
        }

        // Close HTTP connection.
        clientRequest.end();
    });
}
