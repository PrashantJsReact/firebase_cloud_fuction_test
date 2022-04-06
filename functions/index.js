/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
/* eslint-disable indent */
"use strict";
const axios = require("axios").default;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        url: data.url,
        headers: {
          Accept: "application/json",
          "x-client-id": data.xClientId,
          "x-client-secret": data.xClientSecret,
          "x-api-version": "2022-01-01",
          "Content-Type": "application/json",
        },
        data: data.data,
      };

      axios
        .request(options)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  });

// Cashfree Payment Link Webhook
exports.getPaymentStatus = functions.https.onRequest((request, response) => {
  //   console.log(JSON.stringify(request.body));
  // Remove promise It is not working here.
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection("allSubscription")
      .doc(request.body.data.link_id)
      .update({
        createdDate: request.body.event_time,
        status: request.body.data.link_status,
        "currPaymentDetails.refNo":
          request.body.data.order.transaction_id,
      })
      .then(
        (response) => {
          resolve(response.id); // undefined
          console.log(response.id); // undefined
        },
        (error) => reject(error)
      );
  });
  //   response.send(JSON.stringify(request.body));
});
