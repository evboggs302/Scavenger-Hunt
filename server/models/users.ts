import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    // email: {
    //   type: String,
    //   unique: true,
    //   trim: true,
    //   required: true,
    // },
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
    hash: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model("User", userSchema, "users"); // modelName, schemaName, collectionName
