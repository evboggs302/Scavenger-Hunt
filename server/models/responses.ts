import * as mongoose from "mongoose";

export const responseSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    clue_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    response_txt: {
      type: String,
      required: true,
      trim: true,
    },
    response_img: mongoose.Schema.Types.Mixed, // either String or [String]
    time_received: {
      type: Date,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    hintSent: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
