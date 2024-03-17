import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    user_name: {
      type: String,
      unique: true,
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
  {
    versionKey: false,
    statics: {
      async getUserForLogin(user_name: string) {
        return await this.findOne({ user_name }).exec();
      },
      async findUsername(user_name: string) {
        return await this.find({ user_name }).select({ hash: 0 }).exec();
      },
    },
  }
);

export default model("User", userSchema, "users"); // modelName, schemaName, collectionName
