import * as mongoose from "mongoose";

const tokenStorageSchema = new mongoose.Schema(
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
export default mongoose.model("Token", tokenStorageSchema, "token_storage"); // modelName, schemaName, collectionName
