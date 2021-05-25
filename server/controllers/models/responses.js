const mongoose = require("mongoose");
const responseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  clue_id: {
    type: String,
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

module.exports = responseSchema;
module.exports = mongoose.model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
