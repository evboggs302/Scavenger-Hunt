const mongoose = require("mongoose");

const huntSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    recallMessage: {
      type: String,
      default: "You've completed your hunt.",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
