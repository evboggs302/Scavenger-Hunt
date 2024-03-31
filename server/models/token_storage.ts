import { Schema, model } from "mongoose";

const tokenStorageSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    issuedToUser: {
      type: String,
      required: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

tokenStorageSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
export default model("Token", tokenStorageSchema, "token_storage"); // modelName, schemaName, collectionName
