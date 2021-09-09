import * as fs from 'fs';
import * as dotenv from 'dotenv';

const DEFAULT_AWS_REGION = 'us-east-1';
const DEFAULT_ORG_ID = 'dev';
const DEFAULT_ES_HOST = 'localhost';
const DEFAULT_ES_PORT = '9200';

export const config = {
	//dynamodb tables
	teamTable: 'Team',
	configTable: 'Configs',

	//elasticsearch indexes
	stateIndex: 'state-data',
	buildIndex: 'build-data',
	qualityIndex: 'quality-data',
	repoIndex: 'repo-data',
	reqIndex: 'req-data'
};

const envConfig = dotenv.parse(fs.readFileSync('./conf/settings.env'));
//for (const k in envConfig) {
//  process.env[k] = envConfig[k]
//}

export function getTableNameForOrg(name: string) {
	return `${getOrgId()}_${name}`;
}

export function getOrgId() {
	return (((!envConfig.ORG_ID) || (envConfig.ORG_ID === '')) ? DEFAULT_ORG_ID : envConfig.ORG_ID);
}

export function getAWSRegion() {
	return (((!envConfig.AWS_REGION) || (envConfig.AWS_REGION === '')) ? DEFAULT_AWS_REGION : envConfig.AWS_REGION);
}

export function isDebuggingEnabled() {
	return (envConfig.DEBUG_MODE && (envConfig.DEBUG_MODE === 'true'));
}

export function getElasticSearchURL() {
	return `http://${getElasticSearchHost()}:${getElasticSearchPort()}`;
}

function getElasticSearchHost() {
	return (((!envConfig.ES_HOST) || (envConfig.ES_HOST === '')) ? DEFAULT_ES_HOST : envConfig.ES_HOST);
}

function getElasticSearchPort() {
	return (((!envConfig.ES_PORT) || (envConfig.ES_PORT === '')) ? DEFAULT_ES_PORT : envConfig.ES_PORT);
}
