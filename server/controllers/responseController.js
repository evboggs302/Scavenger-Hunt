// import the Model/Schema mongoose created
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const mongoose = require("mongoose");
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);
const Response = require("./models/responses");
const { logErr } = require("./event_logController");
const Team = require("./models/teams");

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
      if (err) {
        logErr("findActiveTeamByDevice", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      try {
        req.body.time_received = new Date();
        req.body.team_id = team[0]._id;
        req.body.clue_id = team[0].lastClue_sent;
        return next();
      } catch {
        res.send("No Active teams for that number.");
      }
    });
  },
  saveSMS: async (req, res, next) => {
    if (+req.body.NumMedia >= 1) return next();
    const { team_id, clue_id, time_received, Body } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    const c_id = mongoose.Types.ObjectId(clue_id);
    let timeStamp = new Date(time_received);

    const newRes = new Response({
      _id: new mongoose.Types.ObjectId(),
      clue_id: c_id,
      team_id: t_id,
      response_txt: Body.length ? Body : " ",
      time_received: timeStamp,
      correct: false,
    });
    return newRes.save((err) => {
      if (err) {
        logErr("saveSMS", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      res.status(200).send("Response Saved!");
    });
  },
  saveMMS: (req, res, next) => {
    const { team_id, clue_id, time_received, Body } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    const c_id = mongoose.Types.ObjectId(clue_id);
    const timeStamp = new Date(time_received);
    const media =
      +req.body.NumMedia === 1
        ? req.body.MediaUrl0
        : Object.keys(req.body)
            .filter((k) => k.search("MediaUrl") > -1)
            .map((k) => {
              return req.body[k];
            });

    const newRes = new Response({
      _id: new mongoose.Types.ObjectId(),
      team_id: t_id,
      clue_id: c_id,
      response_txt: Body.length ? Body : " ",
      response_img: media,
      time_received: timeStamp,
      correct: false,
    });
    newRes.save((err) => {
      if (err) {
        logErr("saveSMS", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      res.status(200).send("Response Saved!");
    });
  },
  markResCorrect: () => {
    // NEEDS TO BE IMPLEMENTED
  },
  sendClue: (req, res, next) => {
    // NEEDS TO BE BUILT OUT MORE
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
  deleteAllResponsesByTeam: () => {
    // NEEDS TO BE IMPLEMENTED
  },
  deleteAllResponsesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Response.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("deleteAllResponsesByHunt", err);
          return res
            .status(418)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
};
