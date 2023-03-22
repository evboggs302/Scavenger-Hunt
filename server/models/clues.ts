import * as mongoose from "mongoose";

const clueSchema = new mongoose.Schema(
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
    },
  },
  { versionKey: false }
);

export default mongoose.model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
