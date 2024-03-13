import TeamModel from "../models/teams";
import ResponseModel from "../models/responses";
import { Resolvers, SendHintInput, Team } from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import twilio from "twilio";
import config from "../config";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = config;
const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

export const responseResolver: Resolvers = {
  Query: {
    // getResponsesByHunt: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     throwResolutionError({ location: "getResponsesByHunt", err });
    //   }
    // },
    // getResponsesByTeam: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     throwResolutionError({ location: "", err });
    //   }
    // },
  },
  Mutation: {
    markResponseCorrect: async (_, args: { id: string }) => {
      try {
        const res_id = createBsonObjectId(args.id);
        await ResponseModel.updateOne(
          { _id: res_id },
          { correct: true }
        ).exec();

        return true;
      } catch (err) {
        throwResolutionError({ location: "markResponseCorrect", err });
        return false;
      }
    },
    sendHint: async (_, args: { input: SendHintInput }) => {
      try {
        let { response_id, team_id, hint_body } = args.input;
        const t_id = createBsonObjectId(team_id);
        const r_id = createBsonObjectId(response_id);
        await ResponseModel.updateOne({ _id: r_id }, { hintSent: true }).exec();

        const team = await TeamModel.findOne({ _id: t_id }).exec();
        if (!team) throw new Error("no team exists for that number");

        await client.messages.create({
          body: `${hint_body}`,
          from: `${TWILIO_NUMBER}`,
          to: team.device_number,
        });

        return true;
      } catch (err) {
        throwResolutionError({ location: "sendHint", err });
        return false;
      }
    },
  },
};
