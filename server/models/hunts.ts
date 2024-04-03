import { Schema, model } from "mongoose";

export const huntSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    created_date: {
      type: Date,
      default: new Date(),
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    recall_message: {
      type: String,
      default: "You've completed your hunt.",
      trim: true,
    },
  },
  { versionKey: false }
);

huntSchema.set("toObject", {
  transform: (_doc, ret) => {
    ret.start_date = ret.start_date.toISOString();
    ret.end_date = ret.end_date.toISOString();
    ret.created_date = ret.created_date.toISOString();
    return ret;
  },
});

export default model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
