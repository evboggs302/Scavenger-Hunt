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
  },
  { versionKey: false }
);

module.exports = mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
