// import the Model/Schema mongoose created
const Hunt = require("./models/hunts");
const Clue = require("./models/clues");
const mongoose = require("mongoose");

module.exports = {
  getSingleHunt: (req, res, next) => {
    console.log(req.body);
    let { hunt_id } = req.body;
    Hunt.findById(hunt_id)
      .exec()
      .then((hunt) => {
        console.log(hunt);
        res.status(200).send(hunt);
      });
  },
  createHunt: (req, res, next) => {
    // req.body needs a "clues" props that takes an empty array or array of strings
    const clues = req.body.clues.map((e) => {
      return new Clue({
        _id: new mongoose.Types.ObjectId(),
        description: e.length ? e : ["CREATE CLUES TO ENJOY THIS HUNT!"],
      });
    });
    console.log(clues);
    const hunt = new Hunt({
      _id: new mongoose.Types.ObjectId(),
      date: new Date(),
      clues: clues,
    });
    hunt.save((err) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      Hunt.find(hunt._id)
        .exec()
        .then((hunt) => {
          res.status(200).send(hunt);
        });
    });
  },
  updateHunt: (req, res, next) => {},
  deleteHunt: (req, res, next) => {},
};
