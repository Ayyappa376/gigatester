import aws from 'aws-sdk';
import { String } from 'aws-sdk/clients/batch';
const ses = new aws.SES({ region: 'us-east-1' });

const THANKS_MSG = 'Thank you for your valuable feedback.';
const SUBJECT = 'Thank you for your feedback!';
const TITLE = 'Çuvo Team';
const FROM_EMAIL = 'no-reply@dev.gigatester.io';

async function sendFeedbackThanksMessage(
        email: string,
        clientTitle: string | undefined,
        thanksMessage: string | undefined,
): Promise<any> {
    new Promise<any>((resolve, reject) => {
        const mailParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                  Text: {
                      Data: `Dear Customer,\n${thanksMessage?thanksMessage:THANKS_MSG}.\nSincerely,\n${clientTitle?clientTitle:TITLE}`
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
            } else {
               resolve(data);
            }
        });
    });
}

export const processThankYouEmail = async (userName: string, jsonFeedbackType: string, product: any, productRating: number, bugPriority: string) => {
    const { feedbackType, emailText, ratingLimit, severitLimit } = product.emailConfig;
    let validEmail = false;
    let checkRating = false;
    let checkSeverity = false;

    if (userName && userName !== '' && userName.includes('@')) {
        validEmail = true;
    }

    if (feedbackType.includes(jsonFeedbackType)) {
        if (productRating !== 0) {
            if (ratingLimit[productRating] === true) {
                checkRating = true;
            }
        } else if (bugPriority) {
            if (severitLimit[bugPriority]) {
                checkSeverity = true;
            }
        }

        if (jsonFeedbackType === 'FEEDBACK' && checkRating && validEmail) {
            const thankYouEmail: any = await sendFeedbackThanksMessage(userName, product.feedbackAgentSettings.title, emailText[jsonFeedbackType]);
            return thankYouEmail;
        } else if (jsonFeedbackType === 'BUGS' && checkSeverity && validEmail) {
            const thankYouEmail: any = await sendFeedbackThanksMessage(userName, product.feedbackAgentSettings.title, emailText[jsonFeedbackType]);
            return thankYouEmail;
        } else {
            return;
        }
    } else {
        return;
     }

}


          // if(jsonBody.userName && jsonBody.userName !== '' && jsonBody.userName.includes('@')) {
          //   const thankYouEmail: any = await sendFeedbackThanksMessage(
          //     jsonBody.userName,
          //     product.feedbackAgentSettings?.title,
          //     (jsonBody.feedbackType === 'FEEDBACK') ? product.emailConfig?.emailText['FEEDBACK'] : product.emailConfig?.emailText['BUGS']);
          //   console.log('thank you ', thankYouEmail);
          // }