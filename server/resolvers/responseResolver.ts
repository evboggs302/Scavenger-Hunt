import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import ResponseModel from "../models/responses";
import { Resolvers, SendHintInput } from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import twilio from "twilio";
import config from "../config";
import { returnedItems } from "../utils/returnedItems";
import { markResponseCorrect } from "./markResponseCorrect";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = config;
const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

export const responseResolver: Resolvers = {
  Query: {
    getResponsesByTeam: async (_: unknown, { id }) => {
      try {
        const t_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({ team_id: t_id }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "", err });
      }
    },
    getResponsesByClue: async (_: unknown, { id }) => {
      try {
        const c_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({
          clue_id: c_id,
        }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "", err });
      }
    },
  },
  Mutation: {
    markResponseCorrect: async (_, { id }) => {
      try {
        const result = await markResponseCorrect(id);

        const { device_number, recall_message, team_id, next_clue } = result;

        if (next_clue) {
          const { description, order_number } = next_clue;

          // await client.messages
          // .create({
          //   body: `${description}`,
          //   from: `${TWILIO_NUMBER}`,
          //   to: device_number,
          // })
          // .then(async () => {
          await TeamModel.findByIdAndUpdate(team_id, {
            last_clue_sent: order_number,
          }).exec();
          // });
        } else {
          // await client.messages.create({
          //   body: `${recall_message}`,
          //   from: `${TWILIO_NUMBER}`,
          //   to: device_number,
          await TeamModel.findByIdAndUpdate(team_id, {
            recall_sent: true,
          }).exec();
          // });
        }

        return true;
      } catch (err) {
        return throwResolutionError({ location: "markResponseCorrect", err });
      }
    },
    sendHint: async (_, { input: { response_id, team_id, hint_body } }) => {
      try {
        const t_id = createBsonObjectId(team_id);
        const r_id = createBsonObjectId(response_id);
        await ResponseModel.updateOne({ _id: r_id }, { hintSent: true }).exec();

        const activeTeam = await TeamModel.aggregate([
          {
            $match: { _id: t_id },
          },
          {
            $lookup: {
              from: "hunts",
              localField: "_id",
              foreignField: "hunt_id",
              as: "hunts",
            },
          },
        ]).exec();

        if (!activeTeam)
          return throwResolutionError({
            location: "sendHint",
            err: null,
            message: "No team exists for that number",
          });

        await client.messages.create({
          body: `${hint_body}`,
          from: `${TWILIO_NUMBER}`,
          to: activeTeam[0].device_number,
        });

        return true;
      } catch (err) {
        return throwResolutionError({ location: "sendHint", err });
      }
    },
  },
};
