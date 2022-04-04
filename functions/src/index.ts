/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
initializeApp();
import * as cors from "cors";
import * as express from "express";
const app = express();
app.use(cors({origin: true}));


// eslint-disable-next-line max-len
export const createPaymentLink = functions.region("asia-southeast1").https.onCall((data: any, context:any )=> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require("axios").default;
  console.log("hee I am createPaymentLink function");
  const options = {
    method: "POST",
    url: "https://sandbox.cashfree.com/pg/links", // from UI
    headers: {
      "Accept": "application/json",
      "x-client-id": "137262985dc6f60df8c89d6a5a262731", // from UI
      "x-client-secret": "71909436af48eba30ae3098d14d8c3f110e63b52", // from UI
      "x-api-version": "2022-01-01",
      "Content-Type": "application/json",
    },
    data: {
      // from UI
      customer_details: {
        customer_phone: "7677557567",
        customer_email: "abcbcbsef@gmail.com",
        customer_name: "ginims technology",
      },
      // eslint-disable-next-line object-curly-spacing
      link_notify: { send_sms: true, send_email: true },
      link_amount: 500000,
      link_currency: "INR",
      link_purpose: "Payment for laptop",
      link_partial_payments: false,
      link_auto_reminders: false,
      link_id: data.link_id,
    },
  };
  axios
      .request(options)
      .then((response: any) => {
        console.log("Link successfully generated!!");
        const json = response.data;
        return json;
      })
      .catch((error: any) => {
        console.error(error);
        return {error: error.message};
      });
});

// eslint-disable-next-line max-len
export const getSubscriptionStatus = functions.region("asia-southeast1").https.onRequest(
    (request, response) => {
      console.log("getSubscription function working...");
      console.log("request", request.body);
      response.send("Successfully payment done!!");
    }
);


export const getSubscriptionUpdate = functions.https.onRequest(
    (request, response) => {
      console.log("getSubscription function working...");
      console.log("request", request.body);
      response.send("Successfully payment done!!");
    }
);
