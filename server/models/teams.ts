import * as mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    hunt_id: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
