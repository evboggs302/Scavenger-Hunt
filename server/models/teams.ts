import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
const teamSchema = new Schema(
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
    members: {
      type: [String],
      required: true,
    },
    device_number: {
      type: String,
      required: true,
    },
    last_clue_sent: {
      type: Number,
      default: 0,
    },
    recall_sent: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    methods: {
      /**
       * @returns TeamType with Date and ObjectId fields stringified
       */
      stringifyDatesAndObjectIds: () => {
        const obj = Object(this);
        obj._id.toString();
        obj.hunt_id.toString();
        return obj;
      },
      /**
       * @returns TeamType with `__typename: "Team"`
       */
      transformWithTypename: () => {
        const obj = Object(this);
        return {
          ...obj.stringifyDatesAndObjectIds(),
          __typename: "Team" as const,
        };
      },
    },
  }
);

export const TeamModel = model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
