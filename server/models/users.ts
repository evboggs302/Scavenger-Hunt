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
    account: {
      type: ObjectId,
      ref: "Account",
    },
  },
  {
    versionKey: false,
    methods: {
      /**
       * @returns UserType without the hash field
       */
      transformWithoutHash: function () {
        const obj = Object(this.toObject());
        obj._id = obj._id.toString();
        delete obj.hash;
        return obj;
      },
    },
    statics: {
      async getUserForLogin(user_name: string) {
        console.log(
          await this.findOne({ user_name }).populate("account").exec()
        );
        return await this.findOne({ user_name }).populate("account").exec();
      },
      async findUsername(user_name: string) {
        return await this.find({ user_name }).select({ hash: 0 }).exec();
      },
    },
  }
);

export const UserModel = model("User", userSchema, "users"); // modelName, schemaName, collectionName
