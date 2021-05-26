const mongoose = require("mongoose");

const clueSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hunt_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = clueSchema;
module.exports = mongoose.model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
