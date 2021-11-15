//import { config } from '@root/config';
import { CampaignInfo, ConfigItem } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, fetchManagers, getCampaignConfig } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { getUserDocumentFromEmail } from './getUserDocument';
import { get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

// Creating Campaign and validating parameters
export const createCampaign = async (campaignData: CampaignInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
  if (!campaignData.manager) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  const managerId = await getUserDocumentFromEmail(campaignData.manager).catch(
    (e) => {
      const err = new Error('Invalid. Manager does not exists');
      appLogger.error(err);
      throw err;
    }
  );
  if (!managerId[0]) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  if (
    managerId[0] &&
    managerId[0].roles &&
    !managerId[0].roles.includes('Manager') &&
    !managerId[0].roles.includes('Admin')
  ) {
    const err = new Error('Invalid. Manager, user is not a Manager');
    appLogger.error(err);
    throw err;
  }

  const item: CampaignInfo = {
    active: 'true',
    createdBy: userId,
    createdOn: new Date().getTime(),
    id: `campaign_${uuidv1()}`,
    manager: campaignData.manager,
    managerId: managerId[0].id,
    name: campaignData.name,
    products: []
  };

  Object.keys(campaignData).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'active' ||
        val === 'createdBy' ||
        val === 'createdOn' ||
        val === 'name' ||
        val === 'manager' ||
        val === 'managerId'
      )
    ) {
      if (campaignData[val].length > 0 && typeof campaignData[val] === 'object') {
        item[val] = new Array();
        campaignData[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
              item[val].push(ele.split('Other:')[1]);
          } else {
            item[val].push(ele);
          }
        });
      } else {
        item[val] = campaignData[val];
      }
    }
  });

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    TableName: TableNames.getCampaignsTableName(),
    // tslint:disable-next-line: object-literal-sort-keys
    Item: item,
    ConditionExpression:
      'attribute_not_exists(id) AND attribute_not_exists(manager)',
  });

  appLogger.info({ createCampaign_put_params: params });
  put<DynamoDB.PutItemInput>(params).catch((e: any) => {
    appLogger.error({ createCampaign_put_error: e });
  });
};

//fetch campaign Config from dynamoDb and fill in the options
export const getCreateCampaignConfig = async (
  orgId: string
): Promise<ConfigItem> => {
  const campaignConfig: ConfigItem = await getCampaignConfig(orgId);
  appLogger.info({ getCampaignConfig: campaignConfig });

/*  const configDetails = {};
  Object.keys(campaignConfig.config).forEach((val: any) => {
    configDetails[val] = {};
    configDetails[val].displayName = campaignConfig.config[val].displayName;
    configDetails[val].Mandatory = campaignConfig.config[val].mandatory;
    configDetails[val].type = campaignConfig.config[val].type;
    if (campaignConfig.config[val].options) {
      configDetails[val].options = [];
      if (
        campaignConfig.config[val].options.custom &&
        campaignConfig.config[val].options.custom !== ''
      ) {
        configDetails[val].options = campaignConfig.config[val].options.custom
          .split(',')
          .map((item: string) => item.trim());
      } else if (
        campaignConfig.config[val].options.customFixed &&
        campaignConfig.config[val].options.customFixed !== ''
      ) {
        configDetails[val].options = campaignConfig.config[val].options.customFixed
          .split(',')
          .map((item: string) => item.trim());
      }
    }
  });

  const createCampaignConfig: ConfigItem = { config: configDetails, orgId };
*/
  const managers = await fetchManagers();
  const key = 'manager';
  campaignConfig.config[key].options = { custom: managers.join(',') };
  return campaignConfig;
};

// fetch campaign info
export const getCampaignDetails = async (id: string): Promise<CampaignInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getCampaignsTableName(),
  });
  appLogger.info({ getCampaignDetails_get_params: params });
  return get<CampaignInfo>(params);
};

// soft delete a campaign
export const deactivateCampaign = async (id: string): Promise<CampaignInfo> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    //ConditionExpression: 'attribute_exists(emailId)',
    ExpressionAttributeNames: { '#active': 'active' },
    ExpressionAttributeValues: { ':val': 'false' },
    Key: {
      id,
    },
    TableName: TableNames.getCampaignsTableName(),
    UpdateExpression: 'SET #active = :val',
  });
  appLogger.info({ deactivateCampaign_update_params: params });
  return update(params);
};

//Update campaign details -- used by update createCampaign API
export const updateCampaign = async (updateInfo: CampaignInfo, userId: string) => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }

  const EAN: any = {};
  const EAV: any = {};
  let SET = 'SET ';
  if (!updateInfo.manager) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  const managerId = await getUserDocumentFromEmail(updateInfo.manager).catch(
    (e) => {
      const err = new Error('Invalid Manager does not exists');
      appLogger.error(err);
      throw err;
    }
  );
  if (!managerId[0]) {
    const err = new Error('Invalid Manager does not exists');
    appLogger.error(err);
    throw err;
  }
  if (
    managerId[0] &&
    managerId[0].roles &&
    !managerId[0].roles.includes('Manager') &&
    !managerId[0].roles.includes('Admin')
  ) {
    const err = new Error('Invalid Manager, user is not a Manager');
    appLogger.error(err);
    throw err;
  }

  EAN['#order'] = 'order';
  EAV[':order'] = ['admin', updateInfo.manager];
  SET += `#order = :order`;

  Object.keys(updateInfo).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'createdBy' ||
        val === 'createdOn'
      )
    ) {
      if (val === 'manager') {
        if (
          managerId[0] &&
          managerId[0].roles &&
          (managerId[0].roles.includes('Manager') ||
            managerId[0].roles.includes('Admin'))
        ) {
          EAN[`#${val}`] = val;
          EAV[`:${val}`] = updateInfo[val];
          SET = SET + `, #${val} = :${val}`;
        }
      } else if (
        updateInfo[val].length > 0 &&
        typeof updateInfo[val] === 'object'
      ) {
        const item = new Array();
        updateInfo[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
            item.push(ele.split('Other:')[1]);
          } else {
            item.push(ele);
          }
        });
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = item;
        SET = SET + `, #${val} = :${val}`;
      } else {
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = updateInfo[val];
        SET = SET + `, #${val} = :${val}`;
      }
    }
  });

  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      id: updateInfo.id,
    },
    TableName: TableNames.getCampaignsTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateCampaign_update_params: params });
  update<DynamoDB.UpdateItemInput>(params).catch((e: any) => {
    appLogger.error({ updateCampaign_update_error: e });
  });
};

export const getCampaignsList = async (userEmail: string): Promise<CampaignInfo[]> => {
  let params: DynamoDB.ScanInput = <DynamoDB.ScanInput>{
    TableName: TableNames.getCampaignsTableName(),
  };

  if (userEmail !== 'admin') {
    params = <DynamoDB.ScanInput>{
      ScanFilter: {
        manager: {
          AttributeValueList: [userEmail],
          ComparisonOperator: 'IN',
        },
      },
      TableName: TableNames.getCampaignsTableName(),
    };
  }
  appLogger.info({ getCampaignList_scan_params: params });
  return scan<CampaignInfo[]>(params);
};
