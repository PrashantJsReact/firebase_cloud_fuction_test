/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionStatus1 =
  exports.getSubscriptionStatus =
  exports.createPaymentLink1 =
    void 0;
// /* eslint-disable @typescript-eslint/no-explicit-any */
const axios = require("axios").default;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({ origin: true }));
admin.initializeApp();
// eslint-disable-next-line max-len

exports.createPaymentLink = functions
  .region("asia-southeast1")
  .https.onCall((data, context) => {
    console.log("CreatePaymentLink function started...");
    const options = {
      method: "POST",
      url: "https://sandbox.cashfree.com/pg/links", // from UI
      headers: {
        Accept: "application/json",
        "x-client-id": "137262985dc6f60df8c89d6a5a262731", // from UI
        "x-client-secret": "71909436af48eba30ae3098d14d8c3f110e63b52", // from UI
        "x-api-version": "2022-01-01",
        "Content-Type": "application/json",
      },
      data: {
        // from UI
        customer_details: {
          customer_phone: "7934949499",
          customer_email: "abcbfsdfsef@gmail.com",
          customer_name: "ginimsss technology",
        },
        // eslint-disable-next-line object-curly-spacing
        link_notify: { send_sms: true, send_email: true },
        link_amount: 500,
        link_currency: "INR",
        link_purpose: "Payment for function",
        link_partial_payments: false,
        link_auto_reminders: false,
        link_id: data.link_id,
      },
    };
    axios
      .request(options)
      .then((res) => {
        return new Promise((resolve, reject) => {
          resolve(res.data);
        });
      })
      .catch((error) => {
        return {
          error: error.response.data,
        };
      });
  });

// eslint-disable-next-line max-len
exports.createPaymentLink1 = functions.https.onCall((data, context) => {
  console.log("function is working", data);
  // eslint-disable-next-line object-curly-spacing
  return { link_id: data.link_id, isFunctionWorking: true };
});
// eslint-disable-next-line max-len

exports.getSubscriptionStatus = functions.https.onRequest(
  (request, response) => {
    request = {
      data: {
        cf_link_id: 1576977,
        link_id: "payment_ps11",
        link_status: "PARTIALLY_PAID",
        link_currency: "INR",
        link_amount: "200.12",
        link_amount_paid: "55.00",
        link_partial_payments: true,
        link_minimum_partial_amount: "11.00",
        link_purpose: "Payment for order 10",
        link_created_at: "2021-08-18T07:13:41",
        customer_details: {
          customer_phone: "9000000000",
          customer_email: "john@gmail.com",
          customer_name: "John ",
        },
        link_meta: {
          notify_url:
            "https://ee08e626ecd88c61c85f5c69c0418cb5.m.pipedream.net",
        },
        link_url: "https://payments-test.cashfree.com/links//U1mgll3c0e9g",
        link_expiry_time: "2021-11-28T21:46:20",
        link_notes: {
          note_key_1: "note_value_1",
        },
        link_auto_reminders: true,
        link_notify: {
          send_sms: true,
          send_email: true,
        },
        order: {
          order_amount: "22.00",
          order_id: "CFPay_U1mgll3c0e9g_ehdcjjbtckf",
          order_expiry_time: "2021-08-18T07:34:50",
          order_hash: "Gb2gC7z0tILhGbZUIeds",
          transaction_id: 1021206,
          transaction_status: "SUCCESS",
        },
      },
      type: "PAYMENT_LINK_EVENT",
      version: 1,
      event_time: "2021-08-18T12:55:06+05:30",
    };
    console.log("getSubscription function working...");
    console.log("request", JSON.stringify(request));
    response.send(JSON.stringify(request));
  }
);
