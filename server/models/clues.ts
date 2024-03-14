import { Schema, model } from "mongoose";

export const clueSchema = new Schema(
  {
    hunt_id: {
      type: Schema.Types.ObjectId,
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

export default model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
