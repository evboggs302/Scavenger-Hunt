import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
export const clueSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
    hunt_id: {
      type: ObjectId,
      required: true,
    },
    order_number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    methods: {
      /**
       * @returns ClueType with Date and ObjectId fields stringified
       */
      stringifyDatesAndObjectIds: function () {
        const obj = Object(this.toObject());
        obj._id = obj._id.toString();
        obj.hunt_id = obj.hunt_id.toString();
        return obj;
      },
      /**
       * @returns ClueType with `__typename: "Clue"`
       */
      transformWithTypename: function () {
        const obj = Object(this.toObject());
        return {
          ...obj.stringifyDatesAndObjectIds(),
          __typename: "Clue" as const,
        };
      },
    },
  }
);

export const ClueModel = model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
