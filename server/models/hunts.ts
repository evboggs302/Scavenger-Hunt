import * as mongoose from "mongoose";

export const huntSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
