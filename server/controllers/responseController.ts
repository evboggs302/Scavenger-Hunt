// import the Model/Schema mongoose created
const { ACCT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const mongoose = require("mongoose");
const client = require("twilio")(ACCT_SID, AUTH_TOKEN);
const Response = require("./models/responses");
const Team = require("./models/teams");
const { logErr } = require("./event_logController");

module.exports = {
  findActiveTeamByDevice: (req, res, next) => {
    const { From } = req.body;
    Team.aggregate([
      { $match: { device_number: From, recall_sent: false } },
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
  getAllResponsesByHunt: async (req, res, next) => {
    const { id } = req.params;
    const h_id = mongoose.Types.ObjectId(id);
    Team.aggregate([
      {
        $match: {
          hunt_id: h_id,
        },
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
      {
        $unwind: {
          path: "$responses",
        },
      },
      {
        $project: {
          _id: "$responses._id",
          hunt_id: "$hunt_id",
          clue_id: "$responses.clue_id",
          team_id: "$responses.team_id",
          response_txt: "$responses.response_txt",
          time_received: "$responses.time_received",
          correct: "$responses.correct",
        },
      },
      {
        $sort: {
          time_received: 1,
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((responses, err) => {
        if (err) {
          logErr("getAllResponsesByHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return res.status(200).send(responses);
      });
  },
  markResCorrect: (req, res, next) => {
    const { response_id } = req.body;
    const res_id = mongoose.Types.ObjectId(response_id);
    Response.findOne({ _id: res_id }).then((response, err) => {
      if (err) {
        logErr("markResCorrect at find", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      req.body.team_id = response.team_id;
      Response.updateOne({ _id: res_id }, { correct: true }).then(
        (data, err) => {
          if (err) {
            logErr("markResCorrect at update", err);
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
      {
        $lookup: {
          from: "hunts",
          localField: "hunt_id",
          foreignField: "_id",
          as: "hunt_data",
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("getNextClue", err);
          return;
        }
        req.body.device_number = data[0].device_number;
        req.body.hunt_id = data[0].hunt_id;
        req.body.nextClue = data[0].nextClue[0];
        req.body.recall_sent = data[0].recall_sent;
        req.body.recallMessage = data[0].hunt_data[0].recallMessage;
        next();
      });
  },
  sendClue: (req, res, next) => {
    let { team_id, nextClue, recall_sent, device_number, recallMessage } =
      req.body;
    const t_id = mongoose.Types.ObjectId(team_id);

    if (nextClue) {
      Team.updateOne(
        { _id: t_id },
        { lastClue_sent: nextClue.order_number }
      ).then((complete, err) => {
        if (err) {
          logErr("sendClue at update #1", err);
          return;
        }
        client.messages.create({
          body: `CLUE: ${nextClue.description}`,
          from: `${TWILIO_NUMBER}`,
          to: device_number,
        });
      });
    } else if (!recall_sent) {
      Team.updateOne({ _id: t_id }, { recall_sent: true }).then(
        (complete, err) => {
          if (err) {
            logErr("sendClue at update #2", err);
            return;
          }
          client.messages.create({
            body: `CONGRATS! ${recallMessage}`,
            from: `${TWILIO_NUMBER}`,
            to: device_number,
          });
        }
      );
    } else {
      res.sendStatus(200);
    }
  },
  sendFirstClue: (req, res, next) => {
    const { device_numbers, firstClue } = req.body;
    for (let i = 0; i < device_numbers.length; i++) {
      client.messages.create({
        body: `CLUE: ${firstClue.description}`,
        from: `${TWILIO_NUMBER}`,
        to: device_numbers[i],
      });
    }
    res.sendStatus(200);
  },
  sendHint: (req, res, next) => {
    let { response_id, team_id, hint_body } = req.body;
    const t_id = mongoose.Types.ObjectId(team_id);
    const r_id = mongoose.Types.ObjectId(response_id);
    Response.updateOne({ _id: r_id }, { hintSent: true }).then(() => {
      Team.findOne({ _id: t_id }).then((team, err) => {
        client.messages.create({
          // body: `HINT: ${hint_body}`,
          body: hint_body,
          from: `${TWILIO_NUMBER}`,
          to: team.device_number,
        });
      });
    });
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
    ])
      .allowDiskUse(true)
      .exec()
      .then((data, err) => {
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
