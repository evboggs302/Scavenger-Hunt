// import the Model/Schema mongoose created
const Hunt = require("./models/hunts");
const User = require("./models/users");
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
          localField: "_id",
          foreignField: "hunt_id",
          as: "clues",
        },
      },
      {
        $lookup: {
          from: "responses",
          localField: "teams",
          foreignField: "team_id",
          as: "responses",
        },
      },
    ])
      .allowDiskUse(true)
      .exec()
      .then((data, err) => {
        if (err) res.status(500).send({ getHuntDataErr: err });
        res.status(200).send(data);
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
        if (err) res.status(500).send({ error: err });
        res.status(200).send(info);
      });
  },
  createHunt: (req, res, next) => {
    const { name } = req.body;
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      date: new Date(),
    });
    hunt.save(async (err) => {
      if (err) res.status(400).send({ "Error saving hunt": err });
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
        if (err) return res.status(400).send({ addHuntToUser: err });
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
  updateHunt: (req, res, next) => {
    const { hunt_id, newName, newDate, nextIsActive } = req.body;
    const id = mongoose.Types.ObjectId(hunt_id);
    const formattedDate = new Date(newDate);
    Hunt.updateOne({ _id: id }, [
      { $set: { name: { $cond: [newName, newName, "$name"] } } },
      { $set: { date: { $cond: [newDate, formattedDate, "$date"] } } },
      {
        $set: {
          isActive: {
            $cond: [
              { $ne: [nextIsActive, "$members"] },
              nextIsActive,
              "$isActive",
            ],
          },
        },
      },
    ])
      .exec()
      .then((complete, err) => {
        if (err) res.status(500).send({ huntUpdateErr: err });
        next();
      });
  },
  deleteHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Hunt.deleteOne({ _id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDeleteHunt: err });
        return res
          .status(200)
          .send({ message: "Hunt has been removed successfully." });
      });
  },
};
