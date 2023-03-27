import * as mongoose from "mongoose";

export const clueSchema = new mongoose.Schema(
  {
    hunt_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    order_number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
