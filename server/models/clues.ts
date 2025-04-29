import { Schema, model, Document } from "mongoose";

function stringifyClue(thisCtx: Document) {
  const obj = Object(thisCtx.toObject());
  obj._id = obj._id.toString();
  obj.hunt_id = obj.hunt_id.toString();
  return obj;
}

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
      ref: "Hunt",
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
        return stringifyClue(this);
      },
      /**
       * @returns ClueType with `__typename: "Clue"`
       */
      transformWithTypename: function () {
        return {
          ...stringifyClue(this),
          __typename: "Clue" as const,
        };
      },
    },
  }
);

export const ClueModel = model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
