require("dotenv").config();
const express = require("express");
const app = express();
const port = 22306;
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);

app.use(express.json());

app.post("/api/sendtxt", (req, res) => {
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
});

app.listen(port, () => console.log(`SERVER on 💩 port: ${port}`));
