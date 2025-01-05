import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
export const userSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
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
    methods: {
      /**
       * @returns UserType without the hash field
       */
      transformWithoutHash: () => {
        const obj = Object(this);
        delete obj.hash;
        obj._id.toString();
        return obj;
      },
      /**
       * @returns UserType without the hash field and with `__typename: "UserPayload"`
       */
      transformWithTypename: () => {
        const obj = Object(this);
        return {
          ...obj.stringifyWithoutHash(),
          __typename: "UserPayload" as const,
        };
      },
    },
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

export const UserModel = model("User", userSchema, "users"); // modelName, schemaName, collectionName
