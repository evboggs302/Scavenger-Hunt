import * as mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    location: {
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
