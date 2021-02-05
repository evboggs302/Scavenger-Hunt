const mongoose = require("mongoose");
const responseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
