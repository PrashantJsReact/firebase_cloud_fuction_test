/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
// import * as axios from "axios";
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions";
import * as cors from "cors";
import * as express from "express";
const app = express();
app.use(cors({origin: true}));
admin.initializeApp();


// // eslint-disable-next-line max-len
// export const createPaymentLink = functions.https.onCall((data: any, context:any )=> {
//   console.log("hee I am createPaymentLink function");
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const options = {
//     method: "POST",
//     url: "https://sandbox.cashfree.com/pg/links", // from UI
//     headers: {
//       "Accept": "application/json",
//       "x-client-id": "137262985dc6f60df8c89d6a5a262731", // from UI
//       "x-client-secret": "71909436af48eba30ae3098d14d8c3f110e63b52", // from UI
//       "x-api-version": "2022-01-01",
//       "Content-Type": "application/json",
//     },
//     data: {
//       // from UI
//       customer_details: {
//         customer_phone: "7934949499",
//         customer_email: "abcbfsdfsef@gmail.com",
//         customer_name: "ginimsss technology",
//       },
//       // eslint-disable-next-line object-curly-spacing
//       link_notify: { send_sms: true, send_email: true },
//       link_amount: 500,
//       link_currency: "INR",
//       link_purpose: "Payment for function",
//       link_partial_payments: false,
//       link_auto_reminders: false,
//       link_id: data.link_id,
//     },
//   };
//   axios.default.post("https://sandbox.cashfree.com/pg/links", options)
//       .then((response: any) => {
//         console.log("Link successfully generated!!");
//         const json = response.data;
//         return json;
//       })
//       .catch((error: any) => {
//         console.error(error);
//         return {error: error.message};
//       });
// });

// eslint-disable-next-line max-len
export const createPaymentLink1 = functions.https.onCall((data: any, context:any )=> {
  console.log("function is working", data);
  return data;
});


// // eslint-disable-next-line max-len
// export const getSubscriptionStatus = functions.https.onRequest(
//     (request, response) => {
//       console.log("getSubscription function working...");
//       console.log("request", request.body);
//       response.send("Successfully payment done!!");
//     }
// );

