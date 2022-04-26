// import aws from 'aws-sdk';
// const ses = new aws.SES({ region: 'us-east-1' });
// const fs = require('fs');
// const Handlebars = require("handlebars");


// export const processReplyEmail = async (email: string, thanksMessage: string, clientTitle: string, callback: any) => {
//   // Prepare data for template placeholders
//   // inject data into templates

//   fs.readFile('./email.html', function (err: any, emailHtml: any) {
//     if (err) {
//       console.log('Unable to load HTML template');
//       throw err;
//     }
//     const emailData = {
//       'emailTitle': 'Thank you for your feedback!',
//       'thanksMessage': thanksMessage,
//       'client': clientTitle,
//     }

//     const emailTemplate = Handlebars.complile(emailHtml.toString())
//     const bodyHtml = emailTemplate(emailData)
//     console.log(bodyHtml);

//     const mailParams = {
//       Destination: {
//           ToAddresses: [email],
//       },
//       Message: {
//           Body: {
//             Text: {
//                 Data: "Dear customer," + "\n" + thanksMessage + "\n" +  "Sincerely," + "\n" + clientTitle
//           },
//           Html: {
//             Data: bodyHtml
//             }
//           },

//           Subject: { Data: 'Thank you for your feedback!' },
//       },
//       Source: 'no-reply@dev.gigatester.io',
//     };

//     ses.sendEmail(mailParams, (err, data) => {
//       if (err) {
//           // appLogger.error({ emailError: err });
//           console.log(err,err.stack); // error
//           var response = {
//               statusCode: 500,
//               headers: {
//                   "Access-Control-Allow-Origin" : "*",
//                   "Access-Control-Allow-Credentials" : true
//               },
//               body: JSON.stringify({"message":"Error: Unable to Send Message"})
//           }
//           callback(null, response);
//       } else {
//         console.log(data); // success

//         var response = {
//             statusCode: 200,
//             headers: {
//                 "Access-Control-Allow-Origin" : "*",
//                 "Access-Control-Allow-Credentials" : true
//             },
//             body: JSON.stringify({"message":"Message Sent"})
//         }
//         callback(null, response);

//       }
//       // appLogger.info({ emailSent: data });

//   });

//  })


// }