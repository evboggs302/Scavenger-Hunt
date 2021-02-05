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
const {
  getAllUsers,
  getSingleUser,
  addUser,
} = require("./controllers/userController");
// const {} = require("./controllers/teamController");
// const {} = require("./controllers/eventController");
// const {} = require("./controllers/clueController");
// const {} = require("./controllers/responseController");
app.use(express.json());

// MONGODB Connection
mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Mongo failed"));

// USER ENDPOINTS
app.get("/api/getAllUsers", getAllUsers); // PostMan Confirmed
app.get("/api/getUser", getSingleUser); // PostMan Confirmed
app.post("/api/addUser", addUser); // PostMan Confirmed

// TWILIO ENDPOINTS
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);
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
