// import the Model/Schema mongoose created
const Hunts = require("./models/cluess");
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
  deleteClue: (req, res, next) => {},
};
