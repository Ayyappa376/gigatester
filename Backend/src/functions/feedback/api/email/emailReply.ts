import aws from 'aws-sdk';
const ses = new aws.SES({ region: 'us-east-1' });

export const sendFeedbackThanksMessage = async (
        email: string,
        clientTitle: string,
        thanksMessage: string,
    ): Promise<any> =>
        new Promise<any>((resolve, reject) => {
            // const site: string = (process.env.DB_ENV === 'development') ? 'dev.gigatester.io' : 'beta.gigatester.io';
            const mailParams = {
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Body: {
                      Text: {
                          Data: "Dear customer," + "\n" + thanksMessage + "\n" +  "Sincerely," + "\n" + clientTitle
                      },
                    },

                    Subject: { Data: 'Thank you for your feedback!' },
                },
                Source: 'no-reply@dev.gigatester.io',
            };
            ses.sendEmail(mailParams, (err, data) => {
                if (err) {
                    // appLogger.error({ emailError: err });
                  console.log('error', err)
                    reject(err);
                }
                // appLogger.info({ emailSent: data });
                resolve(data);
            });
});