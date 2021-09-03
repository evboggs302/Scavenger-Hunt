// import the Model/Schema mongoose created
const User = require("./models/users");
const Hunt = require("./models/hunts");
const Team = require("./models/teams");
const { logErr } = require("./event_logController");
const mongoose = require("mongoose");

module.exports = {
  getHuntData: (req, res, next) => {
    const hunt_id = req.params.id ? req.params.id : req.body.hunt_id;
    Hunt.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(hunt_id),
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "hunt_id",
          as: "teams",
        },
      },
      {
        $lookup: {
          from: "clues",
          let: { h_id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$hunt_id", "$$h_id"] } } },
            { $sort: { order_number: 1 } },
          ],
          as: "clues",
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("getHuntData", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return res.status(200).send(data);
      });
  },
  getUserHunts: (req, res, next) => {
    const { user_id } = req.body;
    User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $lookup: {
          from: "hunts",
          localField: "hunts",
          foreignField: "_id",
          as: "myHuntData",
        },
      },
      {
        $project: {
          _id: 0,
          user_id: "$_id",
          userName: 1,
          myHuntData: 1,
        },
      },
      { $unwind: "$myHuntData" },
      {
        $lookup: {
          from: "teams",
          localField: "myHuntData._id",
          foreignField: "hunt_id",
          as: "teams",
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((info, err) => {
        if (err) {
          logErr("getUserHunts", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return res.status(200).send(info);
      });
  },
  createHunt: (req, res, next) => {
    const { name, startDate, endDate } = req.body;
    // depending on TYPE of date string/object passed
    const today = new Date();
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      start_date: startDate ? startDate : today,
      end_date: endDate ? endDate : today,
    });
    hunt.save((err) => {
      if (err) {
        logErr("createHunt", err);
        return res
          .status(500)
          .send("Error Reported. Please check error logs for more details.");
      }
      req.body.hunt_id = hunt._id;
      return next(); // addHuntToUser(), getHuntData()
    });
  },
  addHuntToUser: (req, res, next) => {
    const { user_id, hunt_id } = req.body;
    User.updateOne(
      { _id: mongoose.Types.ObjectId(user_id) },
      { $addToSet: { hunts: [mongoose.Types.ObjectId(hunt_id)] } }
    )
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("addHuntToUser", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  validateHuntActivation: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    let myHuntNums, activeHuntNums;
    Team.aggregate([
      {
        $match: {
          hunt_id: h_id,
        },
      },
      {
        $group: {
          _id: "$hunt_id",
          deviceNumbers: {
            $push: "$device_number",
          },
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((tm) => {
        myHuntNums = tm[0].deviceNumbers;
        Hunt.aggregate([
          {
            $match: {
              isActive: true,
            },
          },
          {
            $lookup: {
              from: "teams",
              localField: "_id",
              foreignField: "hunt_id",
              as: "teams",
            },
          },
          {
            $unwind: {
              path: "$teams",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $group: {
              _id: "$isActive",
              activeHunt_devices: {
                $push: "$teams.device_number",
              },
            },
          },
        ])
          .exec()
          .then((found) => {
            if (found.length > 0) {
              activeHuntNums = found[0]?.activeHunt_devices;
              let allClear = true;
              let activeNum;
              for (let i = 0; i < activeHuntNums.length; i++) {
                if (myHuntNums.includes(activeHuntNums[i])) {
                  allClear = false;
                  activeNum = activeHuntNums[i];
                  break;
                }
              }
              return !allClear
                ? res.status(500).send({
                    message: `The number ${activeNum} is already in an active hunt. Either wait for their hunt to finish, or change that team's device number.`,
                  })
                : next(); // activateHunt()
            } else {
              next();
            }
          });
      });
  },
  validateHuntNotActive: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Hunt.findOne({ _id: h_id })
      .exec()
      .then((found) => {
        return found.isActive
          ? res.status(500).send({
              message: "Unable to update or delete active hunts.",
            })
          : next();
      });
  },
  updateHunt: (req, res, next) => {
    const { hunt_id, newName, newStart, newEnd, newRecall } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    const formattedStart = new Date(newStart);
    const formattedEnd = new Date(newEnd);
    Hunt.updateOne({ _id: id }, [
      {
        $set: {
          name: {
            $cond: [
              { $and: [newName, { $ne: [newName, "$name"] }] },
              newName,
              "$name",
            ],
          },
        },
      },
      {
        $set: {
          start_date: {
            $cond: [
              { $and: [newStart, { $ne: [formattedStart, "$start_date"] }] },
              formattedStart,
              "$start_date",
            ],
          },
        },
      },
      {
        $set: {
          end_date: {
            $cond: [
              { $and: [newEnd, { $ne: [formattedEnd, "$end_date"] }] },
              formattedEnd,
              "$end_date",
            ],
          },
        },
      },
      {
        $set: {
          recallMessage: {
            $cond: [
              { $and: [newRecall, { $ne: [newRecall, "$recallMessage"] }] },
              newRecall,
              "$recallMessage",
            ],
          },
        },
      },
    ])
      .exec()
      .then((complete, err) => {
        if (err) {
          logErr("updateHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  activateHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    Hunt.updateOne({ _id: id }, { isActive: true })
      .exec()
      .then((complete, err) => {
        if (err) {
          logErr("activateHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
      });
  },
  deactivateHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Hunt.updateOne({ _id: h_id }, { isActive: false })
      .exec()
      .then((complete, err) => {
        if (err) {
          logErr("deactivateHunt at updateOne", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        Team.updateMany(
          { hunt_id: h_id },
          { lastClue_sent: 0, recall_Sent: false }
        )
          .exec()
          .then((complete2, err2) => {
            if (err2) {
              logErr("deactivateHunt at updateMany", err2);
              return res
                .status(500)
                .send(
                  "Error Reported. Please check error logs for more details."
                );
            }
            return next();
          });
      });
  },
  deleteHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Hunt.deleteOne({ _id: h_id })
      .exec()
      .then((data, err) => {
        if (err) {
          logErr("deleteHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        next();
      });
  },
};
