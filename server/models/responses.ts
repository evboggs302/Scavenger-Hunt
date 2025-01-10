import { Document, Schema, model } from "mongoose";

function stringifyResponse(doc: Document) {
  const obj = Object(doc.toObject());
  obj._id = obj._id.toString();
  obj.team_id = obj.team_id.toString();
  obj.clue_id = obj.clue_id.toString();
  obj.time_received = obj.time_received.toISOString();
  return obj;
}

const { ObjectId, Mixed } = Schema.Types;
export const responseSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
      required: true,
    },
    team_id: {
      type: ObjectId,
      required: true,
    },
    clue_id: {
      type: ObjectId,
      required: true,
    },
    response_txt: {
      type: String,
      required: true,
      trim: true,
    },
    response_img: Mixed, // either String or [String]
    time_received: {
      type: Date,
      required: true,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    hintSent: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    methods: {
      /**
       * @returns ResponseType with Date and ObjectId fields stringified
       */
      stringifyDatesAndObjectIds: function () {
        return stringifyResponse(this);
      },
      /**
       * @returns ResponseType with `__typename: "ResponsePayload"`
       */
      transformWithTypename: function () {
        return {
          ...stringifyResponse(this),
          __typename: "ResponsePayload" as const,
        };
      },
    },
  }
);

export const ResponseModel = model("Response", responseSchema, "responses"); // modelName, schemaName, collectionName
