import { Schema, model } from "mongoose";

export const responseSchema = new Schema(
  {
    team_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    clue_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    response_txt: {
      type: String,
      required: true,
      trim: true,
    },
    response_img: Schema.Types.Mixed, // either String or [String]
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

responseSchema.set("toObject", {
  transform: (_doc, ret) => {
    ret.time_received = ret.time_received.toISOString();
    return ret;
  },
});

export default model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
