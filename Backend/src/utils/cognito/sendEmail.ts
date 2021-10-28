import { appLogger } from '@utils/index';
import aws from 'aws-sdk';
const ses = new aws.SES({ region: 'us-east-1' });

export const sendResetPasswordMessage = async (
    email: string,
    password: string
): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        const mailParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: { Data: `To change your password, go to dev.gigatester.io and select login, then enter your email address and a temporary password: ${password}` },
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
