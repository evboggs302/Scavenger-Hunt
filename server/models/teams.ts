import { Document, Schema, model } from "mongoose";

function stringifyTeam(doc: Document) {
  const obj = Object(doc.toObject());
  obj._id = obj._id.toString();
  obj.hunt_id = obj.hunt_id.toString();
  return obj;
}

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
      ref: "Hunt",
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
      stringifyDatesAndObjectIds: function () {
        return stringifyTeam(this);
      },
      /**
       * @returns TeamType with `__typename: "Team"`
       */
      transformWithTypename: function () {
        return {
          ...stringifyTeam(this),
          __typename: "Team" as const,
        };
      },
    },
  }
);

export const TeamModel = model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
