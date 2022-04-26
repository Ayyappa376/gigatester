import { config } from '@root/config';
import { appLogger } from '@utils/index';
import aws from 'aws-sdk';
const ses = new aws.SES({ region: config.region });

export const sendResetPasswordMessage = async (
    email: string,
    password: string
): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        const site: string = (process.env.DB_ENV === 'development') ? 'dev.gigatester.io' : 'beta.gigatester.io';
        const mailParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: { Data: `To change your password, go to ${site} and select login, then enter your email address and a temporary password: ${password}` },
                },

                Subject: { Data: 'Reset Password' },
            },
            Source: 'no-reply@dev.gigatester.io',
        };
        appLogger.info({ adminResetPasswordMailParams: mailParams });
        ses.sendEmail(mailParams, (err, data) => {
            if (err) {
                appLogger.error({ adminResetPasswordError: err });
                reject(err);
            }
            appLogger.info({ emailSent: data });
            resolve(data);
        });
    });

