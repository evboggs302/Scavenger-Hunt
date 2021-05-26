// import the Model/Schema mongoose created
const Hunt = require("./models/hunts");
const User = require("./models/users");
const Clue = require("./models/clues");
const mongoose = require("mongoose");

module.exports = {
  getSingleHunt: (req, res, next) => {
    // needs to be updated to include the agg pipeline for clues, responses, teams
    let { hunt_id } = req.body;
    Hunt.findById(hunt_id)
      .exec()
      .then((hunt) => {
        res.status(200).send(hunt);
      });
  },
  createHunt: (req, res, next) => {
    // req.body needs "clues" props that takes an empty array or array of strings
    const { clues, user_id } = req.body;
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      date: new Date(),
    });
    hunt.save(async (err) => {
      if (err) {
        res.status(400).send({ "Error saving hunt": err });
      }
      await createClues(clues, hunt._id, res);
      await addHuntToUser(user_id, hunt._id);
      req.body.hunt_id = hunt._id;
      return next();
    });
  },
  updateHunt: (req, res, next) => {
    res.status(200).send("updateHunt not yet created");
  },
  deleteHunt: (req, res, next) => {
    res.status(200).send("deleteHunt not yet created");
  },
};

const createClues = async (arr, id, res) => {
  if (arr.length === 0) {
    arr.push("CREATE CLUES TO ENJOY THIS HUNT");
  }
  for (let i = 0; i < arr.length; i++) {
    let clue = new Clue({
      _id: new mongoose.Types.ObjectId(),
      hunt_id: id,
      description: arr[i],
    });
    await clue.save((err) => {
      if (err) {
        res.status(400).send({ error: err });
      }
    });
  }
  return;
};

const addHuntToUser = async (user_id, hunt_id) => {
  return User.updateOne(
    { _id: user_id },
    { $addToSet: { hunts: [hunt_id] } }
  ).exec();
};
