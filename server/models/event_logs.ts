import mongoose from "mongoose";

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
      type: mongoose.Schema.Types.Mixed,
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
export default mongoose.model("Log", logSchema, "event_logs"); // modelName, schemaName, collectionName
