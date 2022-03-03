import { config } from '@root/config';
import { appLogger } from '@utils/index';
import aws from 'aws-sdk';
import { sendResetPasswordMessage } from './sendEmail';
aws.config.update({ region: config.cognito.userPoolRegion });
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

//This file contains cognitoIdentityServices API calls
export interface CognitoAttribute {
  Name: string;
  Value: string;
}
export interface CognitoUser {
  Attributes: CognitoAttribute[];
  Enabled: boolean;
  UserCreateDate: Date;
  UserLastmodifiedDate: Date;
  Username: string;
  UserStatus: string;
}
export const addUserToCognitoGroup = async (
  cognitoUser: string,
  groupName: string
): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      GroupName: groupName,
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminAddUserToGroup_params: params });
    cognitoidentityserviceprovider.adminAddUserToGroup(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const removeUserFromCognitoGroup = async (
  cognitoUser: string,
  groupName: string
): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      GroupName: groupName,
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminRemoveUserFromGroup_params: params });
    cognitoidentityserviceprovider.adminRemoveUserFromGroup(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const addCognitoUser = async (
  email: string,
): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      DesiredDeliveryMediums: ['EMAIL'],
      TemporaryPassword: generatePassword(),
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      UserPoolId: config.cognito.userPoolId /* required */,
      Username: email /* required */,
    };
    appLogger.info({ adminCreateUser_params: params });
    cognitoidentityserviceprovider.adminCreateUser(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const deleteCognitoUser = async (cognitoUser: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminDeleteUser_params: params });
    cognitoidentityserviceprovider.adminDeleteUser(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const disableCognitoUser = async (cognitoUser: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminDisableUser_params: params });
    cognitoidentityserviceprovider.adminDisableUser(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const getCognitoUser = async (cognitoUser: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminDisableUser_params: params });
    cognitoidentityserviceprovider.adminGetUser(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const updateCognitoUserToLowerCase = async (
  cognitoUser: string,
  email: string
): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      UserAttributes: [
        {
          Name: 'email',
          Value: email.toLowerCase(),
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      UserPoolId: config.cognito.userPoolId,
      Username: cognitoUser,
    };
    appLogger.info({ adminDisableUser_params: params });
    cognitoidentityserviceprovider.adminUpdateUserAttributes(
      params,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const resetUserPassword = async (
  cognitoUser: string,
  email: string
): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const params = {
      Password: generatePassword(), /* required */
      Permanent: false,
      UserPoolId: config.cognito.userPoolId, /* required */
      Username: cognitoUser, /* required */
    };
    appLogger.info({ adminSetUserPassword_params: params });
    cognitoidentityserviceprovider.adminSetUserPassword(params, async (err, data) => {
      if (err) {
        appLogger.error({ adminSetUserPasswordError: err }); // an error occurred
        reject(err);
      } else {
        appLogger.info({ adminSetUserPasswordData: data });
        await sendResetPasswordMessage(email, params.Password);
        resolve(data);
      }
    });
  });

function generatePassword() {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$*';
  const n = charset.length;
  let retVal = '';
  for (let i = 0; i < length; i += 1) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
    retVal += '1!K';
  }
  return retVal;
}
