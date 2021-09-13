import * as bunyan from 'bunyan';

//Read the documentation in https://github.com/trentm/node-bunyan to know how to use it.

export const appLogger: bunyan = bunyan.createLogger({
    level: <bunyan.LogLevelString> ((process.env.NODE_ENV === 'development') ? 'info' : 'warn'),
    name: 'gigatester-collectors',
    serializers: bunyan.stdSerializers,
    src: true,
    streams: [
        {
            level:'debug',
            stream: process.stdout
        },
        {
            level: 'info',
            type: 'rotating-file',
            path: './logs/gigatester.log',
            period: '1d',   // "ms" (milliseconds), "h" (hours), "d" (days), "w" (weeks), "m" (months), "y" (years)
            count: 30        // keep 30 back copies
        },
        {
            level: 'fatal',
            type: 'rotating-file',
            path: './logs/gigatester-fatal.log',
            period: '1w',   // "ms" (milliseconds), "h" (hours), "d" (days), "w" (weeks), "m" (months), "y" (years)
            count: 5        // keep 5 back copies
        }
    ]
});

function setLogLevel (logLevel: string) {
    appLogger.level(<bunyan.LogLevelString>logLevel);
    appLogger.info('Log level changed to [%s]', appLogger.level());
}

export function setLogLevelToDebug() {
	setLogLevel('debug');
}

export const installLogger: bunyan = bunyan.createLogger({
    level: <bunyan.LogLevelString> 'info',
    name: 'gigatester-collectors-install',
    serializers: bunyan.stdSerializers,
    src: true,
    streams: [
        {
            level:'debug',
            stream: process.stdout
        },
        {
            level: 'info',
            type: 'rotating-file',
            path: './logs/gigatester-collectors-install.log',
            period: '1d',   // "ms" (milliseconds), "h" (hours), "d" (days), "w" (weeks), "m" (months), "y" (years)
            count: 5        // keep 5 back copies
        }
    ]
});
