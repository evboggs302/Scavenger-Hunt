const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
