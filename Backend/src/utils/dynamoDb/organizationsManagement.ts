import { /*ConfigItem, */OrganizationInfo, STATUS_VERIFY_ORG_ALL, STATUS_VERIFY_ORG_APPROVED, STATUS_VERIFY_ORG_DELETED, STATUS_VERIFY_ORG_PENDING } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, /*getOrganizationConfig */} from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { get, put, scan, update } from './sdk';

// Creating Organization and validating parameters
export const createOrganization = async (orgData: OrganizationInfo) => {
  const item: OrganizationInfo = {
    addressLine1: orgData.addressLine1,
    city: orgData.city,
    country: orgData.country,
    email: orgData.email,
    id: `org_${uuidv1()}`,
    name: orgData.name,
    phone: orgData.phone,
    state: orgData.state,
    status: STATUS_VERIFY_ORG_PENDING,
    zipCode: orgData.zipCode
  };

  if(orgData.addressLine2) {
    item.addressLine2 = orgData.addressLine2;
  }
  if(orgData.website) {
    item.website = orgData.website;
  }

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
    TableName: TableNames.getOrganizationsTableName(),
  });

  appLogger.info({ createOrganization_put_params: params });
  return put<DynamoDB.PutItemInput>(params);
};

// //fetch organization Config from dynamoDb and fill in the options
// export const getCreateOrganizationConfig = async (
//   orgId: string
// ): Promise<ConfigItem> => {
//   const organizationConfig: ConfigItem = await getOrganizationConfig(orgId);
//   appLogger.info({ getOrganizationConfig: organizationConfig });

//   const platforms: PlatformInfo[] = await getPlatformsList();
//   const key = 'platforms';
//   organizationConfig.config[key].options = {};
//   platforms.forEach((val: PlatformInfo) => organizationConfig.config[key].options[val.id] = val.name);
//   return organizationConfig;
// };

// fetch organization info
export const getOrganizationDetails = async (id: string): Promise<OrganizationInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getOrganizationsTableName(),
  });
  appLogger.info({ getOrganizationDetails_get_params: params });
  return get<OrganizationInfo>(params);
};

// disable a organization, if it is deleted
export const disableOrganization = async (id: string) => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: {'#status': 'status'},
    ExpressionAttributeValues: {':status': STATUS_VERIFY_ORG_DELETED},
    Key: {
      id,
    },
    TableName: TableNames.getOrganizationsTableName(),
    UpdateExpression: `SET #status = :status`,
  });

  appLogger.info({ updateOrganization_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

//Update organization details -- used by update createOrganization API
export const updateOrganization = async (updateInfo: OrganizationInfo) => {
  const EAN: any = {};
  const EAV: any = {};
  let SET = 'SET ';
  let sep = '';

  Object.keys(updateInfo).forEach((val, i) => {
    if (val !== 'id') {
      EAN[`#${val}`] = val;
      EAV[`:${val}`] = updateInfo[val];
      SET = SET + `${sep} #${val} = :${val}`;
      sep = ',';
    }
  });

  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      id: updateInfo.id,
    },
    TableName: TableNames.getOrganizationsTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateOrganization_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

export const getOrganizationsList = async (queryStatus?: string): Promise<OrganizationInfo[]> => {
  const status = queryStatus ? queryStatus : STATUS_VERIFY_ORG_APPROVED;

  let params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    TableName: TableNames.getOrganizationsTableName(),
  });

  if (status !== STATUS_VERIFY_ORG_ALL) {
    params = <DynamoDB.UpdateItemInput>(<unknown>{
      ExpressionAttributeNames: {'#status': 'status'},
      ExpressionAttributeValues: {':status': status},
      FilterExpression: '#status = :status',
      TableName: TableNames.getOrganizationsTableName(),
    });
  }

  appLogger.info({ getOrganizationList_scan_params: params });
  return scan<OrganizationInfo[]>(params);
};
