// import the Model/Schema mongoose created
const Hunt = require("./models/hunts");
const User = require("./models/users");
const Clue = require("./models/clues");
const Team = require("./models/teams");
const Response = require("./models/responses");
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
        if (err) res.status(500).send(err);
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
    // req.body needs "clues" props that takes an empty array or array of strings
    const { clues, user_id, name } = req.body;
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      date: new Date(),
    });
    hunt.save(async (err) => {
      if (err) res.status(400).send({ "Error saving hunt": err });
      req.body.hunt_id = hunt._id;
      await createClues(clues, hunt._id, res);
      await addHuntToUser(user_id, hunt._id, res);
      return next(); // getHuntData()
    });
  },
  updateHunt: (req, res, next) => {
    // const { hunt_id } = req.body;
    res.status(200).send("updateHunt not yet created");
  },
  deleteHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const models = [Hunt, Clue, Team, Response];
    User.updateOne({}, { $pull: { hunts: hunt_id } })
      .exec()
      .then((err) => {
        if (err) res.status(500).send(err);
        models.forEach(async (e) => {
          await e.deleteMany();
        });
      });
    // res.status(200).send("deleteHunt not yet created");
  },
};

const createClues = async (arr, id, res) => {
  if (arr.length === 0) {
    arr.push("CREATE CLUES TO ENJOY THIS HUNT");
  }
  const mappedClues = arr.map((e) => {
    return {
      clue_id: new mongoose.Types.ObjectId(),
      hunt_id: mongoose.Types.ObjectId(id),
      description: e,
    };
  });
  return Clue.insertMany(mappedClues).then((data, err) => {
    if (err) {
      res.status(400).send({ clueError: err });
    }
  });
};

const addHuntToUser = async (user_id, hunt_id, res) => {
  return User.updateOne(
    { _id: mongoose.Types.ObjectId(user_id) },
    { $addToSet: { hunts: [mongoose.Types.ObjectId(hunt_id)] } }
  )
    .exec()
    .then((data, err) => {
      if (err) res.status(400).send({ addHuntToUser: err });
    });
};
