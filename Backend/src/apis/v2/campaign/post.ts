import { API, Handler } from '@apis/index';
import { CampaignInfo } from '@models/index';
import { appLogger, createCampaign, responseBuilder } from '@utils/index';
import { Response } from 'express';

interface PostCampaigns {
  body: {
    campaigns: CampaignInfo[];
  };
  headers: {
    user: {
      'cognito:groups': string[];
      'cognito:username': string;
      email: string;
    };
  };
}

async function handler(request: PostCampaigns, response: Response) {
  appLogger.info({ PostCampaigns: request }, 'Inside Handler');

  const { headers, body } = request;
  if (
    headers.user['cognito:groups'][0] !== 'Manager' &&
    headers.user['cognito:groups'][0] !== 'Admin'
  ) {
    const err = new Error('Forbidden Access: Unauthorized user');
    appLogger.error(err, 'Only Admins and Managers can create campaigns');
    return responseBuilder.forbidden(err, response);
  }

  if (body.campaigns.length < 1) {
    const err = new Error('BadRequest: Missing values');
    appLogger.error(err, 'Campaign to create is missing.');
    return responseBuilder.badRequest(err, response);
  }

  const createData: CampaignInfo = body.campaigns[0];
  if (
    (!createData.managers || createData.managers.length === 0) &&
    ((headers.user['cognito:groups'][0] === 'Manager') || (headers.user['cognito:groups'][0] === 'Admin'))
  ) {
    createData.managers = [headers.user.email];
  }
  const ok: any = await createCampaign(createData, headers.user.email).catch(
    (e) => {
      appLogger.error({ err: e }, 'createCampaign');
      return { error: e.message ? e.message : 'Campaign already exists' };
    }
  );
  appLogger.info({ createCampaign: ok });

  if (ok) {
    const err = new Error(ok.error);
    appLogger.error(err, 'Bad Request');
    return responseBuilder.badRequest(err, response);
  }
  return responseBuilder.ok({ message: ok }, response);
}

export const api: API = {
  handler: <Handler>(<unknown>handler),
  method: 'post',
  route: '/api/v2/campaigns',
};

// async function x(createData: any){
//     const ok = await createCampaign(createData, 'rachitjobs7@gmail.com').catch(e => {
//         // console.log({e});
//         return ({error : 'Campaign already exists'});
//     });
//     return ok;
// }
// var t = {
//     campaignId: 'TechnoBrad',
//     campaignName: 'TechnoBrad'
// }
// x(t).then(res=>{
//   console.log(typeof(res),Object.keys(res), {res})
// //   if(res.Error){

// //   }
// }).catch(e=>{
//     console.log(e);
// })
