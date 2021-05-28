const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hunt_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  clue_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  given_response: {
    type: String,
    required: true,
  },
  time_received: {
    type: Date,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
