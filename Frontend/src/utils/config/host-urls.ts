import { betaConfig } from './betaConfig';
import { devConfig } from './devConfig';
import { dishintConfig } from './dishintConfig';
import { localConfig } from './localConfig';
import { m1Config } from './m1Config';
import { prodConfig } from './prodConfig';
import { qaConfig } from './qaConfig';

const env = process.env.REACT_APP_STAGE;
export let apiHostUrl: string;
if (env === 'Dev') {
    apiHostUrl = devConfig.apiHostUrl;
} else if (env === 'Beta') {
    apiHostUrl = betaConfig.apiHostUrl;
} else if (env === 'qa') {
    apiHostUrl = qaConfig.apiHostUrl;
} else if (env === 'Prod') {
    apiHostUrl = prodConfig.apiHostUrl;
} else if (env === 'Dishint') {
    apiHostUrl = dishintConfig.apiHostUrl;
} else if (env === 'm1') {
    apiHostUrl = m1Config.apiHostUrl;
} else {
    apiHostUrl = localConfig.apiHostUrl;
}