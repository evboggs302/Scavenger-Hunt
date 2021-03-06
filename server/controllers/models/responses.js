const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    clue_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    response_txt: {
      type: String,
      required: true,
    },
    response_img: mongoose.Mixed, // either String or [String]
    time_received: {
      type: Date,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
