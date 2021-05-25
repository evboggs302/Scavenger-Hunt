const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  hunts: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = userSchema;
module.exports = mongoose.model("User", userSchema, "users"); // modelName, schemaName, collectionName
