require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  ACCT_SID,
  AUTH_TOKEN,
  TWILIO_NUMBER,
  MONGO_CONNECTION,
  SERVER_PORT,
} = process.env;
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);

app.use(express.json());

// MONGODB Connection
mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch(() => console.log("Mongo failed"));

// TEST ENDPOINTS
app.get("/api/get_test", (req, res) => {
  console.log(req.body);
  res.send("SERVER WAS HIT!!");
});

// TWILIO END POINTS
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

app.listen(SERVER_PORT, () => console.log(`SERVER on 💩 port: ${SERVER_PORT}`));
