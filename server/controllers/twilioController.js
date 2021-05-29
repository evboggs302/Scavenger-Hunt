// const mongoose = require("mongoose");
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);

module.exports = {
  sendText: (req, res) => {
    let { recipient, sms_msg } = req.body;
    client.messages
      .create({
        body: sms_msg,
        from: `${TWILIO_NUMBER}`,
        to: `+1${recipient}`,
      })
      .then((message) => {
        res.status(200).send(message);
      });
  },
};
