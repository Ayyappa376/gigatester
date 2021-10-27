import { appLogger } from '@utils/index';
import aws from 'aws-sdk';
var ses = new aws.SES({ region: "us-east-1" });

export const sendResetPasswordMessage = async (
    email: string,
    password: string
): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        var mail_params = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: { Data: `Click on dev.gigatester.io to select login and enter email and temporary password ${password} in the login form to change your password.` },
                },

                Subject: { Data: "Reset Password" },
            },
            Source: "darshan.hn@pinimbus.com",
        };
        appLogger.debug({ adminResetPasswordMailParams: mail_params });
        console.log("Sending mail");
        ses.sendEmail(mail_params).promise().catch((err,) => {
            console.log(err);
        });
    });