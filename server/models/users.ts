import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("User", userSchema, "users"); // modelName, schemaName, collectionName
