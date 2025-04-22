import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
const tokenStorageSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
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
  {
    versionKey: false,
    methods: {
      /**
       * @returns Token with `__typename: "AuthPayload"`
       */
      transformWithTypename: function () {
        const obj = Object(this.toObject());
        obj._id = obj._id.toString();
        return {
          ...obj,
          __typename: "AuthPayload" as const,
        };
      },
    },
  }
);

tokenStorageSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const TokenModel = model("Token", tokenStorageSchema, "token_storage"); // modelName, schemaName, collectionName
