const mongoose = require("mongoose");
const { responseSchema } = require("./responses.js");

const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hunt_id: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  device_number: {
    type: String,
    required: true,
  },
  responses: {
    type: [responseSchema],
    required: true,
  },
});

module.exports = mongoose.model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
