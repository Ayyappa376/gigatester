import { GroupInfo } from '@models/index';
import * as TableNames from '@utils/dynamoDb/getTableNames';
import { appLogger } from '@utils/index';
import { DynamoDB } from 'aws-sdk';
import uuidv1 from 'uuid/v1';
import { deleteItem, get, put, scan, update } from './sdk';

const regex = /Other:[a-zA-Z0-9!-*]/g;

// Creating Group and validating parameters
export const createGroup = async (groupData: GroupInfo, userId: string): Promise<GroupInfo> => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }

  const item: GroupInfo = {
    children: groupData.children,
    id: `group_${uuidv1()}`,
    name: groupData.name,
    parent: groupData.parent
  };

  Object.keys(groupData).forEach((val, i) => {
    if (
      !(
        val === 'id' ||
        val === 'name' ||
        val === 'parent' ||
        val === 'children'
      )
    ) {
      if (groupData[val].length > 0 && typeof groupData[val] === 'object') {
        item[val] = new Array();
        groupData[val].forEach((ele: any, j: number) => {
          if ((typeof(ele) === 'string') && (ele.match(regex))) {
              item[val].push(ele.split('Other:')[1]);
          } else {
            item[val].push(ele);
          }
        });
      } else {
        item[val] = groupData[val];
      }
    }
  });

  if(item.parent) {
    const parentItem = await getGroupDetails(item.parent);
    if(!parentItem.children) {
      parentItem.children = [];
    }
    parentItem.children.push(item.id);

    const parentParams: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
      Item: parentItem,
      TableName: TableNames.getGroupsTableName(),
    });

    appLogger.info({ createGroup_put_parentParams: parentParams });
    return put<GroupInfo>(parentParams).catch((e) => new Promise((resove: any, reject: any) => {
      appLogger.error({ createGroup_put_parentParams_error: e });
      reject(e);
    }));
  }

  const params: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
    ConditionExpression: 'attribute_not_exists(id)',
    Item: item,
    TableName: TableNames.getGroupsTableName(),
  });

  appLogger.info({ createGroup_put_params: params });
  return put<GroupInfo>(params);
};

// //fetch group Config from dynamoDb and fill in the options
// export const getCreateGroupConfig = async (
//   orgId: string
// ): Promise<ConfigItem> => {
//   const groupConfig: ConfigItem = await getGroupConfig(orgId);
//   appLogger.info({ getGroupConfig: groupConfig });

//   const managers = await fetchManagers();
//   const admins = await fetchAdmins();
//   const key = 'managers';
//   groupConfig.config[key].options = {};
//   managers.forEach((val: string) => groupConfig.config[key].options[val] = val);
//   admins.forEach((val: string) => groupConfig.config[key].options[val] = val);
//   return groupConfig;
// };

// fetch group info
export const getGroupDetails = async (id: string): Promise<GroupInfo> => {
  const params: DynamoDB.GetItemInput = <DynamoDB.GetItemInput>(<unknown>{
    Key: {
      id,
    },
    TableName: TableNames.getGroupsTableName(),
  });
  appLogger.info({ getGroupDetails_get_params: params });
  return get<GroupInfo>(params);
};

// delete a group, if it is in draft state only
export const deleteGroup = async (id: string): Promise<GroupInfo | undefined> => {
  const item: GroupInfo = await getGroupDetails(id);

  //remove this group from the list of children of its parent
  if(item.parent) {
    const parentItem = await getGroupDetails(item.parent);
    if(parentItem.children) {
      parentItem.children.splice(parentItem.children.indexOf(id), 1);

      const parentParams: DynamoDB.PutItemInput = <DynamoDB.PutItemInput>(<unknown>{
        Item: parentItem,
        TableName: TableNames.getGroupsTableName(),
      });

      appLogger.info({ createGroup_put_parentParams: parentParams });
      return put<GroupInfo>(parentParams).catch((e) => new Promise((resove: any, reject: any) => {
        appLogger.error({ createGroup_put_parentParams_error: e });
        reject(e);
      }));
    }
  }
  //recursively delete this group and all its children
  return recurseDeleteSubTree(item);
};

const recurseDeleteSubTree = async (rootGroup: GroupInfo): Promise<GroupInfo | undefined> => {
  //delete all children
  if(rootGroup.children) {
    rootGroup.children.forEach(async (childId: string) => {
      const item: GroupInfo = await getGroupDetails(childId);
      recurseDeleteSubTree(item).catch((e) => {
        appLogger.error({ createGroup_put_parentParams_error: e });
      });
    });
  }
  //remove this group
  const params: DynamoDB.DeleteItemInput = <DynamoDB.DeleteItemInput>(<unknown>{
    Key: {
      id: rootGroup.id,
    },
    TableName: TableNames.getGroupsTableName(),
  });
  appLogger.info({ deleteGroup_delete_params: params });
  return deleteItem<GroupInfo>(params);
};

//Update group details -- used by update createGroup API
export const updateGroup = async (updateInfo: GroupInfo, userId: string): Promise<GroupInfo> => {
  if (!userId) {
    const err = new Error('Unauthorized attempt');
    appLogger.error(err);
    throw err;
  }

  const EAN: any = {};
  const EAV: any = {};
  let SET = 'SET ';
  let sep = '';

  Object.keys(updateInfo).forEach((val, i) => {
    if (!(val === 'id')) {
      if (
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
        SET = SET + `${sep}#${val} = :${val}`;
      } else {
        EAN[`#${val}`] = val;
        EAV[`:${val}`] = updateInfo[val];
        SET = SET + `${sep}#${val} = :${val}`;
      }
      sep = ', ';
    }
  });

  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    ExpressionAttributeNames: EAN,
    ExpressionAttributeValues: EAV,
    Key: {
      id: updateInfo.id,
    },
    TableName: TableNames.getGroupsTableName(),
    UpdateExpression: SET,
  });

  appLogger.info({ updateGroup_update_params: params });
  return update<GroupInfo>(params);
};

export const getGroupsList = async (userEmail: string | undefined): Promise<GroupInfo[]> => {
  const params: DynamoDB.UpdateItemInput = <DynamoDB.UpdateItemInput>(<unknown>{
    TableName: TableNames.getGroupsTableName(),
  });

  appLogger.info({ getGroupList_scan_params: params });
  return scan<GroupInfo[]>(params);
};
