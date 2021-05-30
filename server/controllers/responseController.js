// import the Model/Schema mongoose created
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const mongoose = require("mongoose");
const Response = require("./models/responses");
const Team = require("./models/teams");
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);

module.exports = {
  findActiveTeamByDevice: (req, res, next) => {
    const { From } = req.body;
    Team.aggregate([
      { $match: { device_number: From } },
      {
        $lookup: {
          from: "hunts",
          localField: "hunt_id",
          foreignField: "_id",
          as: "hunt",
        },
      },
      { $unwind: "$hunt" },
      {
        $match: {
          $expr: { $eq: ["$hunt.isActive", true] },
        },
      },
    ]).then((team, err) => {
      if (err) return res.status(418).send({ ErrGettingTeamByDevice: err });
      try {
        console.log(team);
        req.body.time_received = new Date();
        req.body.team_id = team[0]._id;
        req.body.clue_id = team[0].lastClue_sent;
        return next();
      } catch {
        res.send("No Active teams for that number.");
      }
    });
  },
  saveSMS: (req, res, next) => {
    if (+req.body.NumMedia >= 1) return next();
    const { team_id, clue_id, time_received, Body } = req.body;
    res.send({ SMS: req.body });
  },
  saveMMS: (req, res, next) => {
    if (+req.body.NumMedia < 1) return next();
    const { team_id, clue_id, time_received, Body } = req.body;
    res.send({ MMS: req.body });
  },
  sendClue: (req, res, next) => {
    let { clue_id, team_id, recipient, clueDesc } = req.body;
    client.messages
      .create({
        body: clueDesc,
        from: `${TWILIO_NUMBER}`,
        // mediaUrl: [
        //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
        // ],
        to: `${recipient}`,
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
