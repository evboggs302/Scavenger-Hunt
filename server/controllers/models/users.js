const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "users"); // modelName, schemaName, collectionName
