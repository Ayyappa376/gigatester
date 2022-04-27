import aws from 'aws-sdk';
const ses = new aws.SES({ region: 'us-east-1' });

const THANKS_MSG = 'Thank you for your valuable feedback.';
const SUBJECT = 'Thank you for your feedback!';
const TITLE = 'Çuvo Team';
const FROM_EMAIL = 'no-reply@dev.gigatester.io';

export const sendFeedbackThanksMessage = async (
        email: string,
        clientTitle: string | undefined,
        thanksMessage: string | undefined,
    ): Promise<any> =>
        new Promise<any>((resolve, reject) => {
            const mailParams = {
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Body: {
                      Text: {
                          Data: `Dear Customer,\n${thanksMessage?thanksMessage:THANKS_MSG}.\nSincerely,\n${clientTitle?clientTitle:TITLE}`
//                          "Dear Customer," + "\n" + thanksMessage  + "." + "\n" +  "Sincerely," + "\n" + clientTitle
                      },
                    },

                    Subject: { Data: SUBJECT },
                },
                Source: FROM_EMAIL,
            };
            ses.sendEmail(mailParams, (err, data) => {
                if (err) {
                  console.log('error', err);
                  reject(err);
                }
                resolve(data);
            });
});
