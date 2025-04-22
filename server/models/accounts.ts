import { Schema, model, InferSchemaType } from "mongoose";

const { ObjectId } = Schema.Types;
export const accountSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    account_sid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    selectPopulatedPaths: false,
  }
);

export type AccountDocument = InferSchemaType<typeof accountSchema>;
export const AccountModel = model<AccountDocument>(
  "Account",
  accountSchema,
  "accounts"
); // modelName, schemaName, collectionName
