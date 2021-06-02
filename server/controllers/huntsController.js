// import the Model/Schema mongoose created
const Hunt = require("./models/hunts");
const User = require("./models/users");
const { logErr } = require("./event_logController");
const mongoose = require("mongoose");

module.exports = {
  getHuntData: (req, res, next) => {
    const { hunt_id } = req.body;
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
            { $match: { $expr: { hunt_id: "$$h_id" } } },
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
    const { name } = req.body;
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      date: new Date(),
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
  validateActiveHunts: (req, res, next) => {
    const { hunt_id } = req.body;
    Hunt.find({ isActive: true })
      .exec()
      .then((found) => {
        return found.length > 0 && found[0]._id.toString() !== hunt_id
          ? res.status(500).send({
              message:
                "A hunt is already active. Please end your other hunt before starting another.",
            })
          : next(); // activateHunt()
      });
  },
  validateHuntNotActive: (req, res, next) => {
    /**
     *
     * SHOULDNT BE ABLE TO UPDATE A HUNT, ITS TEAMS, NOR ITS CLUES WHILE ACTIVE
     *
     **/
    // const { hunt_id } = req.body;
    // Hunt.find({ isActive: true })
    //   .exec()
    //   .then((found) => {
    //     return found.length > 0 && found[0]._id.toString() !== hunt_id
    //       ? res.status(500).send({
    //           message:
    //             "A hunt is already active. Please end your other hunt before starting another.",
    //         })
    //       : next(); // activateHunt()
    //   });
  },
  updateHunt: (req, res, next) => {
    const { hunt_id, newName, newDate, newRecall } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    const formattedDate = new Date(newDate);
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
          date: {
            $cond: [
              { $and: [newDate, { $ne: [formattedDate, "$date"] }] },
              formattedDate,
              "$date",
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
    /**
     *
     * all teams for that hunt shoud have values for `lastSent_clue` and `recall_sent` reset back to defaults
     *
     **/

    const { hunt_id } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    Hunt.updateOne({ _id: id }, { isActive: false })
      .exec()
      .then((complete, err) => {
        if (err) {
          logErr("deactivateHunt", err);
          return res
            .status(500)
            .send("Error Reported. Please check error logs for more details.");
        }
        return next();
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
        return res
          .status(200)
          .send({ message: "Hunt has been removed successfully." });
      });
  },
};
