//import { config } from '@root/config';
import { CampaignInfo, ConfigItem, ProductInfo, STATUS_CAMPAIGN_DRAFT } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, fetchAdmins, fetchManagers, getCampaignConfig } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
//import { getUserDocumentFromEmail } from './getUserDocument';
import { deleteItem, get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

// Creating Campaign and validating parameters
export const createCampaign = async (campaignData: CampaignInfo, userId: string): Promise<CampaignInfo> => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }
  if (!campaignData.managers) {
    const err = new Error('Invalid. Manager does not exists');
    appLogger.error(err);
    throw err;
  }
/*  const managerId = await getUserDocumentFromEmail(campaignData.manager).catch(
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
*/
  const item: CampaignInfo = {
    createdBy: userId,
    createdOn: new Date().getTime(),
//    endDate?: number;
    id: `campaign_${uuidv1()}`,
    managers: campaignData.managers,
    name: campaignData.name,
    products: processProducts(campaignData.products), //add product id for newly added products
    startDate: campaignData.startDate,
    status: campaignData.status
  };

  Object.keys(campaignData).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'status' ||
        val === 'createdBy' ||
        val === 'createdOn' ||
        val === 'name' ||
        val === 'managers' ||
        val === 'products' ||
        val === 'startDate'
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
  return put<CampaignInfo>(params);
//  .catch((e: any) => {
//    appLogger.error({ createCampaign_put_error: e });
//  });
};

//add id to products which do not have id
const processProducts = (products: ProductInfo[]): ProductInfo[] => products.map((product: ProductInfo) => {
  if(! product.id || product.id === '') {
    product.id = `prod_${uuidv1()}`;
  }
  return product;
});

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
  const admins = await fetchAdmins();
  const key = 'managers';
  campaignConfig.config[key].options = {};
  managers.forEach((val: string) => campaignConfig.config[key].options[val] = val);
  admins.forEach((val: string) => campaignConfig.config[key].options[val] = val);
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

// delete a campaign, if it is in draft state only
export const deleteCampaign = async (id: string): Promise<CampaignInfo | undefined> => {
  const params: DynamoDB.DeleteItemInput = <DynamoDB.DeleteItemInput>(<unknown>{
    ConditionExpression: '#status = :val',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':val': STATUS_CAMPAIGN_DRAFT },
    Key: {
      id,
    },
    TableName: TableNames.getCampaignsTableName(),
  });
  appLogger.info({ deleteCampaign_delete_params: params });
  return deleteItem(params);
};

//Update campaign details -- used by update createCampaign API
export const updateCampaign = async (updateInfo: CampaignInfo, userId: string): Promise<CampaignInfo> => {
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
/*
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
*/
  EAN['#products'] = 'products';
  EAV[':products'] = processProducts(updateInfo.products); //add product id for newly added products
  SET += `#products = :products`;

  Object.keys(updateInfo).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'createdBy' ||
        val === 'createdOn' ||
        val === 'products'
      )
    ) {
//      if (val === 'manager') {
//        if (
//          managerId[0] &&
//          managerId[0].roles &&
//          (managerId[0].roles.includes('Manager') ||
//            managerId[0].roles.includes('Admin'))
//        ) {
//          EAN[`#${val}`] = val;
//          EAV[`:${val}`] = updateInfo[val];
//          SET = SET + `, #${val} = :${val}`;
//        }
/*      } else*/ if (
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
  return update<CampaignInfo>(params);
//  .catch((e: any) => {
//    appLogger.error({ updateCampaign_update_error: e });
//  });
};

export const getCampaignsList = async (userEmail: string | undefined, queryStatus?: string): Promise<CampaignInfo[]> => {
  const EAN: any = {};
  const EAV: any = {};
  let FE = '';

  if(userEmail && userEmail !== 'admin') {
    EAN['#managers'] = 'managers';
    EAV[':email'] = userEmail;
    FE = '#managers CONTAINS :email';
  }

  if(queryStatus) {
    EAN['#status'] = 'status';
    EAV[':status'] = queryStatus;
    FE = (FE === '') ? '#status = :status' : `(${FE}) and (#status = :status)`;
  }

  let params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    TableName: TableNames.getCampaignsTableName(),
  });

  if(FE !== '') {
    params = <DynamoDB.UpdateItemInput>(<unknown>{
      ExpressionAttributeNames: EAN,
      ExpressionAttributeValues: EAV,
      FilterExpression: FE,
      TableName: TableNames.getCampaignsTableName(),
    });
  }

  appLogger.info({ getCampaignList_scan_params: params });
  return scan<CampaignInfo[]>(params);
};
