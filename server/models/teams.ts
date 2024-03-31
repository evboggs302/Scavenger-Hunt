import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    hunt_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    device_number: {
      type: String,
      required: true,
    },
    last_clue_sent: {
      type: Number,
      default: 0,
    },
    recall_sent: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export default model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
