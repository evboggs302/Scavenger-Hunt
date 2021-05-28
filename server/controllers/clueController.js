// import the Model/Schema mongoose created
const Clue = require("./models/clues");
const mongoose = require("mongoose");

module.exports = {
  addClue: (req, res, next) => {},
  getCluesByHunt: (req, res, next) => {
    /**
    req.body = {
      hunt_id
    }
    */
  },
  updateSingleClue: (req, res, next) => {
    /**
    req.body = {
      clue_id
    }
    */
  },
  deleteSingleClue: (req, res, next) => {},
  deleteAllCluesByHunt: (req, res, next) => {
    const { hunt_id } = req.body;
    const h_id = mongoose.Types.ObjectId(hunt_id);
    Clue.deleteMany({ hunt_id: h_id })
      .exec()
      .then((data, err) => {
        if (err) return res.status(418).send({ ErrDelettingAllClues: err });
        return next();
      });
  },
};
