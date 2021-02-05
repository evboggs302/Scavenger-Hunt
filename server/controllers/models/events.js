const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Event", eventSchema, "events"); // modelName, schemaName, collectionName
