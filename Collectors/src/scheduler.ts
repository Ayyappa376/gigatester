//import workerFarm from 'worker-farm'; //alternatives: cluster, worker_threads, Web Worker
import { isDebuggingEnabled, appLogger, setLogLevelToDebug } from './utils';
import { getCollectorsConfig, getTeamsMetricsInfo, setCollectorsConfig } from './dynamoDB';
import { CollectorConfig, ConfigItem } from './models';

const schedulerInterval = 1000*60; //1 min in milliseconds

start().catch(appLogger.error);

async function start() {
	await initialize();
	execute();
}

async function initialize() {
	//process runtime arguments
//	var myArgs = process.argv.slice(2);
//	config.env = (myArgs.length > 0) ? myArgs[0] : 'dev';

	//set log level
	if(isDebuggingEnabled()) {
		setLogLevelToDebug();
	}
}

async function execute() {
	appLogger.info("Executing scheduler");
	getCollectorsConfig()
	.then((data: ConfigItem) => {
		appLogger.info("Received collector config", data);
		const scheduledCollectors: string[] = [];
		Object.keys(data.config).forEach( (key: string) => {
			data.config[key].forEach( (colDetails: CollectorConfig, index: number) => {
				const now = Date.now();
				if (! colDetails.nextCollectorRunTimestamp) {
					data.config[key][index].nextCollectorRunTimestamp = getNextRun(now, colDetails.collectorSchedule);
				} else if(colDetails.nextCollectorRunTimestamp < now) {
					scheduledCollectors.push(colDetails.name);
					data.config[key][index].nextCollectorRunTimestamp = getNextRun(now, colDetails.collectorSchedule);
				}
			});
		});
		setCollectorsConfig(data.config);

		appLogger.info("Running collectors for", scheduledCollectors);
		runCollectors(scheduledCollectors);
	})
	.catch( (err: any) => appLogger.error(err) );
	
	setTimeout(execute, schedulerInterval);
}

/**
 * @abstract Returns the next timestamp after adding the gap converted to millisecs to current
 *
 * @param current, the current timestamp in milliseconds
 * @param gap, the number of hours gap
 *
 * @returns the next timestamp in milliseconds
 */
function getNextRun(current: number, gap: number) {
	return (current + (gap * 3600 * 1000)); //converts hours to milliseconds and add to now
}

//Exit cleanly on ctrl+c pressing 
process.on('SIGINT', async function() {
	//TODO: confirm shutdown and then close
	await shutDown();
	process.exit();
});

async function shutDown() {
}

/*
async function runProcessors() {
	//start the processors
	Object.keys(Collectors).forEach( (name) => {
//		const processorFileName = './' + processorName + 'Processor';
		appLogger.info("Starting " + Collectors[name].processorFile);
//		const service = workerFarm(require.resolve(Collectors[name].processorFile));
//		service('', workerEnded);
	});

//	setTimeout(runProcessors, processorInterval);
}
*/

async function runCollectors(scheduledCollectors: string[]) {
	const teamsMetricsInfo: any  = await getTeamsMetricsInfo();
//	appLogger.info(teamsMetricsInfo);
	teamsMetricsInfo.forEach((team: any) => {
		if(team.metrics) {
			team.metrics.forEach((metricTool: any) => {
//				if((scheduledCollectors.includes(metricTool.toolName)) && (Collectors[metricTool.toolName])) {
				if(scheduledCollectors.includes(metricTool.toolName)) {
					var collectorData = { ...metricTool, teamId: team.teamId };
					const collectorFile = `./${metricTool.toolName}/Collector`;
					appLogger.info("Starting " + collectorFile);
					appLogger.info(collectorData);
//					const service = workerFarm(require.resolve(collectorFile));
//					service(collectorData, workerEnded);
				}
			})
		}
	})
}

/*
function workerEnded(err: any, data: any) {
	if(err) {
		appLogger.error(err);
	} else {
		appLogger.info(data);
	}
}
*/
//https://webpack.js.org/guides/getting-started/
//https://nodejs.org/en/knowledge/getting-started/the-process-module/
/*
// Show how to handle Ctrl+C in Node.js
var zmq = require('zmq')
  , socket = zmq.createSocket('rep');

socket.on('message', function(buf) {
  // echo request back
  socket.send(buf);
});

process.on('SIGINT', function() {
  socket.close();
  process.exit();
});

socket.bindSync('tcp://*:5555');
*/