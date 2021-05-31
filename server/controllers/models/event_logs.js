const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: {
      type: String,
      required: true,
    },
    where: {
      type: String,
      required: true,
    },
    body: {
      type: mongoose.Mixed,
      required: true,
    },
    time_stamp: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

logSchema.index({ time_stamp: 1 }, { expires: "1 year" });
module.exports = mongoose.model("Log", logSchema, "event_logs"); // modelName, schemaName, collectionName
