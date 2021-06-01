// import the Model/Schema mongoose created
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const mongoose = require("mongoose");
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);
const Response = require("./models/responses");
const Team = require("./models/teams");
const Hunt = require("./models/hunts");
const { logErr } = require("./event_logController");

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
  saveSMS: (req, res, next) => {
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
  getAllResponsesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Team.aggregate([
      {
        $match: { hunt_id: h_id },
      },
      {
        $lookup: {
          from: "responses",
          localField: "_id",
          foreignField: "team_id",
          as: "responses",
        },
      },
      {
        $project: {
          _id: 0,
          hunt_id: 1,
          responses: 1,
        },
      },
      { $unwind: "$responses" },
      {
        $group: {
          _id: "$hunt_id",
          allResponses: { $push: "$responses" },
        },
      },
    ]).then((clues, err) => {
      if (err) {
        logErr("getAllCluesByHunt", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      return res.status(200).send(clues);
    });
  },
  markResCorrect: (req, res, next) => {
    const { response_id } = req.body;
    const res_id = mongoose.Types.ObjectId(response_id);
    Response.findOne({ _id: res_id }).then((response, err) => {
      req.body.team_id = response.team_id;
      Response.updateOne({ _id: res_id }, { correct: true }).then(
        (data, err) => {
          if (err) {
            logErr("markResCorrect", err);
            return res
              .status(500)
              .send(
                "Error Reported. Please check error logs for more details."
              );
          }
          return next();
        }
      );
    });
  },
  getNextClue: (req, res, next) => {
    // NEEDS TO BE IMPLEMENTED
    const { team_id } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    Team.aggregate([
      { $match: { _id: t_id } },
      {
        $lookup: {
          from: "clues",
          let: { h_id: "$hunt_id", last_sent: "$lastClue_sent" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$hunt_id", "$$h_id"] },
                    { $eq: ["$order_number", { $add: ["$$last_sent", 1] }] },
                  ],
                },
              },
            },
          ],
          as: "nextClue",
        },
      },
    ]).then((data, err) => {
      req.body.hunt_id = data[0].hunt_id;
      req.body.nextClue = data[0].nextClue[0];
      console.log(req.body);
      next();
    });
  },
  sendClue: (req, res, next) => {
    // let { clue_id, team_id, recipient, clueDesc } = req.body;
    // client.messages
    //   .create({
    //     body: clueDesc,
    //     from: `${TWILIO_NUMBER}`,
    //     // mediaUrl: [
    //     //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    //     // ],
    //     to: `${recipient}`,
    //   })
    //   .then((message) => {
    //     res.status(200).send(message);
    //   });
    res.send("sendClue hit!");
  },
  deleteAllResponsesByTeam: (req, res, next) => {
    const { team_id } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    Response.deleteMany({ team_id: t_id })
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("deleteAllResponsesByTeam", err);
          return res
            .status(418)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  deleteAllResponsesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Team.aggregate([
      { $match: { hunt_id: h_id } },
      {
        $project: {
          _id: 1,
        },
      },
    ]).then((data, err) => {
      if (err) {
        logErr("deleteAllResponsesByHunt before bulkWrite", err);
        return res
          .status(418)
          .send("Error Reported. Please check error logs for more details.");
      } else {
        console.log(data);
        const bulkTeamIds = data.map((team) => {
          return {
            deleteMany: {
              filter: { team_id: team._id },
            },
          };
        });
        Response.bulkWrite(bulkTeamIds, { ordered: false }).then(
          (data, err) => {
            if (err) {
              logErr("deleteAllResponsesByHunt after bulkWrite", err);
              return res
                .status(500)
                .send(
                  "Error Reported. Please check error logs for more details."
                );
            }
            return next();
          }
        );
      }
    });
  },
};
