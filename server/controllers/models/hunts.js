const mongoose = require("mongoose");
const { clueSchema } = require("./clues");

const huntSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: {
    type: Date,
    required: true,
  },
});
module.exports = huntSchema;
module.exports = mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
