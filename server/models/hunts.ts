import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
export const huntSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: ObjectId,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    created_date: {
      type: Date,
      default: new Date(),
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    recall_message: {
      type: String,
      default: "You've completed your hunt.",
      trim: true,
    },
  },
  {
    versionKey: false,
    methods: {
      /**
       * @returns HuntType with Date and ObjectId fields stringified
       */
      stringifyDatesAndObjectIds: () => {
        const obj = Object(this);
        obj._id.toString();
        obj.created_by.toString();
        obj.start_date.toISOString();
        obj.end_date.toISOString();
        obj.created_date.toISOString();
        return obj;
      },
      /**
       * @returns HuntType with `__typename: "Hunt"`
       */
      transformWithTypename: () => {
        const obj = Object(this);
        return {
          ...obj.stringifyDatesAndObjectIds(),
          __typename: "Hunt" as const,
        };
      },
    },
  }
);

export const HuntModel = model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
