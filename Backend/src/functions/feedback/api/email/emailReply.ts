import aws from 'aws-sdk';
const ses = new aws.SES({ region: 'us-east-1' });

const THANKS_MSG = 'Thank you for your valuable feedback.';
const SUBJECT = 'Thank you for your feedback!';
const TITLE = 'Çuvo Team';
const FROM_EMAIL = 'no-reply@dev.gigatester.io';

async function sendThanksEmail(
        email: string,
        clientTitle: string | undefined,
        thanksMessage: string | undefined,
): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const mailParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                  Text: {
                      Data: `Dear Customer,\n${thanksMessage?thanksMessage:THANKS_MSG}\nSincerely,\n${clientTitle?clientTitle:TITLE}`
                  },
                },

                Subject: { Data: SUBJECT },
            },
            Source: FROM_EMAIL,
        };
        ses.sendEmail(mailParams, (err, data) => {
            if (err) {
              reject(err);
            } else {
               resolve(data);
            }
        });
    });
}

/* *
 * Validates email and checks product email configuration before sending email
 * @param  {string} userName- User's email
 *  @param {string} jsonFeedbackType- Feedback types (FEEDBACK or BUG_REPORT) from jsonBody POST data
 * @param {any} product - Product information object (needed for emailConfig)
 * @param {number} productRating - Rating from 1-5 submitted by user
 * @param {string} bugPriority - Severity (configured prior by Jira or User)
 */

export const processThankYouEmail = async (userName: string, jsonFeedbackType: string, product: any, productRating: number, bugPriority: string) => {
    const { feedbackTypes, emailText, ratingLimit, severityLimit } = product.emailConfig;
    console.log('Product emailConfig:', product.emailConfig);
    let type = jsonFeedbackType;
    let validEmail = false;
    let checkRating = false;
    let checkSeverity = false;
    let result;

    if (userName && userName !== '' && userName.includes('@')) {
        validEmail = true;
    }

    //mismatch in naming convention causes bug email not to send
    if (type === 'BUG_REPORT') {
        type = 'BUGS';
    }

    if (feedbackTypes.includes(type)) {
        if (productRating !== 0) {
            if (ratingLimit[productRating] === true) {
                checkRating = true;
            }
        } else if (bugPriority.length > 0) {
            if (severityLimit[bugPriority] === true) {
                checkSeverity = true;
            }
        }

        if ((checkRating || checkSeverity) && validEmail) {
            console.log('Email- type:', type, 'checkRating:', checkRating, 'checkSeverity:', checkSeverity, 'userName:', userName, 'validEmail:', validEmail);
            try {
                const thankYouEmail: any = await sendThanksEmail(userName, product.feedbackAgentSettings.title, emailText[type]);
                console.log('Email sent result:', thankYouEmail);
                result = thankYouEmail;
            } catch (error) {
                console.log(`error sending ${type} email`, error);
            }
        } else {
            return undefined;
        }

    }

    return result;
};
