const mongoose = require("mongoose");
const clueSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
