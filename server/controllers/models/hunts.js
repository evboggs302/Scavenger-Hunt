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
      required: true,
    },
    recallMessage: {
      type: String,
      default: "Congrats! You've completed your hunt.",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
