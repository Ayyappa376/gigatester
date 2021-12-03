import { /*ConfigItem, */ROLE_USER_ADMIN, ROLE_USER_EXECUTIVE, ROLE_USER_MANAGER, ROLE_USER_TESTER, UserInfo } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger, /*getUserConfig */} from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { get, put, scan, update } from './sdk';

// Creating User and validating parameters
export const createUser = async (userData: UserInfo, currUserEmail?: string) => {
  const item: UserInfo = {
    active: true,
    createdOn: new Date().getTime(),
    emailId: userData.emailId,
    emailVerified: userData.emailVerified,
    id: `user_${uuidv1()}`,
    name: userData.name,
    roles: userData.roles
  };

  if(item.roles.includes(ROLE_USER_ADMIN) || item.roles.includes(ROLE_USER_EXECUTIVE) || item.roles.includes(ROLE_USER_MANAGER)) {
    if(userData.detailsOrgUser) {
      item.detailsOrgUser = {
        createdBy: currUserEmail ? currUserEmail : userData.emailId,
        groupIds: userData.detailsOrgUser.groupIds,
        lastModifiedBy: currUserEmail ? currUserEmail : userData.emailId,
        lastModifiedOn: item.createdOn,
        orgId: userData.detailsOrgUser.orgId
      };
      Object.keys(userData.detailsOrgUser).forEach((key, i) => {
        if (item.detailsOrgUser && userData.detailsOrgUser &&
            !(
              (key === 'createdBy') ||
              (key === 'groupIds') ||
              (key === 'lastModifiedBy') ||
              (key === 'lastModifiedOn') ||
              (key === 'orgId')
            )
        ) {
          item.detailsOrgUser[key] = userData.detailsOrgUser[key];
        }
      });
    } else {
      const err = new Error('Profile incomplete for user of an organiation.');
      appLogger.error(err, 'createUser_error');
    }
  }
  if(item.roles.includes(ROLE_USER_TESTER)) {
    if(userData.detailsTester) {
      item.detailsTester = {
        profileCompleted: false
      };
      Object.keys(userData.detailsTester).forEach((key, i) => {
        if ((key !== 'profileCompleted') && item.detailsTester && userData.detailsTester) {
          item.detailsTester[key] = userData.detailsTester[key];
        }
      });
    }
  }

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
    TableName: TableNames.getUsersTableName(),
  });

  appLogger.info({ createUser_put_params: params });
  return put<DynamoDB.PutItemInput>(params);
};

// //fetch user Config from dynamoDb and fill in the options
// export const getCreateUserConfig = async (
//   userId: string
// ): Promise<ConfigItem> => {
//   const userConfig: ConfigItem = await getUserConfig(userId);
//   appLogger.info({ getUserConfig: userConfig });

//   const platforms: PlatformInfo[] = await getPlatformsList();
//   const key = 'platforms';
//   userConfig.config[key].options = {};
//   platforms.forEach((val: PlatformInfo) => userConfig.config[key].options[val.id] = val.name);
//   return userConfig;
// };

// fetch user info
export const getUserDetails = async (id: string): Promise<UserInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getUsersTableName(),
  });
  appLogger.info({ getUserDetails_get_params: params });
  return get<UserInfo>(params);
};

// disable a user, if it is deleted
export const disableUser = async (id: string) => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: {'#active': 'active'},
    ExpressionAttributeValues: {':active': false},
    Key: {
      id,
    },
    TableName: TableNames.getUsersTableName(),
    UpdateExpression: `SET #active = :active`,
  });

  appLogger.info({ updateUser_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

//Update user details -- used by update createUser API
export const updateUser = async (updateInfo: UserInfo) => {
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
    TableName: TableNames.getUsersTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateUser_update_params: params });
  return update<DynamoDB.UpdateItemInput>(params);
};

export const getUsersList = async (): Promise<UserInfo[]> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: {'#active': 'active'},
    ExpressionAttributeValues: {':active': true},
    FilterExpression: '#active = :active',
    TableName: TableNames.getUsersTableName(),
  });

  appLogger.info({ getUserList_scan_params: params });
  return scan<UserInfo[]>(params);
};
