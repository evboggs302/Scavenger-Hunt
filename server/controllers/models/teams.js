const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hunt_id: {
    type: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
