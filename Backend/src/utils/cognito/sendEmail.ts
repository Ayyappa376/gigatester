import { appLogger } from '@utils/index';
import aws from 'aws-sdk';
var ses = new aws.SES({ region: "us-east-1" });

export const sendResetPasswordMessage = (
    email: string,
    password: string
): any => {
    var mail_params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: { Data: `To change your password, go to dev.gigatester.io and select login, then enter your email address and a temporary password: ${password}` },
            },

            Subject: { Data: "Reset Password" },
        },
        Source: "no-reply@dev.gigatester.io",
    };
    appLogger.debug({ adminResetPasswordMailParams: mail_params });
    // console.log("Sending mail");
    ses.sendEmail(mail_params).promise().catch((err,) => {
        console.log(err);
    });
}
