// import the Model/Schema mongoose created
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const mongoose = require("mongoose");
const Response = require("./models/responses");
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
  // deleteAllResponsesByTeam: () => {},
  deleteAllResponsesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Response.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDelettingAllResponses: err });
        return next();
      });
  },
};
