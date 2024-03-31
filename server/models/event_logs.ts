import { Schema, model } from "mongoose";

const logSchema = new Schema(
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
      type: Schema.Types.Mixed,
      required: true,
    },
    time_stamp: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

logSchema.index({ time_stamp: 1 }, { expires: "2y" });
export default model("Log", logSchema, "event_logs"); // modelName, schemaName, collectionName
