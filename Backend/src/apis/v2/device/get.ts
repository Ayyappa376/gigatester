import { API, Handler } from '@apis/index';
import { ConfigItem, DeviceInfo } from '@models/index';
import { config } from '@root/config';
import { appLogger, getCreateDeviceConfig, getDeviceDetails, getDevicesList, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface GetDevices {
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
  params: {
    id: string;
  };
}

async function handler(request: GetDevices, response: Response) {
  appLogger.info({ GetDevices: request }, 'Inside Handler');

  const { headers } = request;
  const { params } = request;
  const cognitoUserId = headers.user['cognito:username'];

  if (!cognitoUserId) {
    const err = new Error('InvalidUser');
    appLogger.error(err, 'Unauthorized');
    return responseBuilder.unauthorized(err, response);
  }
  //returns the devices details and config details of a device if the device id is sent - edit device
  //returns the config details of a device if the device id sent as 0 - create device
  //returns the list of all devices, if the device id is not sent - list devices
  let result: any;
  if (params.id) {
    if(params.id === '0') {
      const deviceConfig: ConfigItem = await getCreateDeviceConfig(config.defaults.orgId);
      appLogger.info({ getCreateDeviceConfig: deviceConfig });
      result = {
        deviceConfig: deviceConfig.config,
      };
    } else {
      const deviceDetails: DeviceInfo = await getDeviceDetails(params.id);
      appLogger.info({ getDeviceDetails: deviceDetails });
      const deviceConfig: ConfigItem = await getCreateDeviceConfig(config.defaults.orgId);
      appLogger.info({ getCreateDeviceConfig: deviceConfig });
      result = {
        deviceConfig: deviceConfig.config,
        devices: [deviceDetails],
      };
    }
  } else {
    const deviceDetailsList: DeviceInfo[] = await getDevicesList();
    appLogger.info({ getDevicesList: deviceDetailsList });
    result = {
      devices: deviceDetailsList,
    };
  }
  return responseBuilder.ok(result, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'get',
  route: '/api/v2/devices/:id?',
};
