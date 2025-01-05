import { Schema, model } from "mongoose";

const { ObjectId, Mixed } = Schema.Types;
const logSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    body: {
      type: Mixed,
      required: true,
    },
    time_stamp: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    methods: {
      transformId: () => {
        const obj = Object(this);
        obj._id.toString();
        return obj;
      },
    },
  }
);

logSchema.index({ time_stamp: 1 }, { expires: "2y" });

export const LogModel = model("Log", logSchema, "event_logs"); // modelName, schemaName, collectionName
