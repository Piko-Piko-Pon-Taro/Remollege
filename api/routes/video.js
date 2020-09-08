"use strict";
const router = require("express").Router();

const boom = require("@hapi/boom");
const hmac = require("crypto-js/hmac-sha256");
const CryptoJS = require("crypto-js");

const secretKey = process.env.SKYWAY_SECRET_KEY;
const credentialTTL = 600;

router.post("/authenticate", (req, res, next) => {
  try {
    const peerId = req.body.peerId;
    const sessionToken = req.body.sessionToken;

    if (peerId === undefined || sessionToken === undefined) {
      throw boom.badRequest("peer id or session token is invalid");
      return;
    }

    // checkSessionToken(peerId, sessionToken)
    //   .then(() => {
    // Session token check was successful.

    // We need the current unix timestamp. Date.now() returns in milliseconds so divide by 1000 to get seconds.
    const unixTimestamp = Math.floor(Date.now() / 1000);

    const credential = {
      peerId: peerId,
      timestamp: unixTimestamp,
      ttl: credentialTTL,
      authToken: calculateAuthToken(peerId, unixTimestamp),
    };

    res.send(credential);
    // })
    // .catch(() => {
    //   // Session token check failed
    //   res.status(401).send("Authentication Failed");
    // });
  } catch (err) {
    next(err);
  }
});

// function checkSessionToken(peerId, token) {
//   return new Promise((resolve, reject) => {
//     // Implement checking whether the session is valid or not.
//     // Resolve if the session token is valid.
//     // Reject if it is invalid.

//     resolve();
//   });
// }

function calculateAuthToken(peerId, timestamp) {
  // calculate the auth token hash
  const hash = CryptoJS.HmacSHA256(
    `${timestamp}:${credentialTTL}:${peerId}`,
    secretKey
  );

  // convert the hash to a base64 string
  return CryptoJS.enc.Base64.stringify(hash);
}

module.exports = router;
