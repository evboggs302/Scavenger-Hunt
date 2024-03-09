import TeamModel from "../../models/teams";
import ResponseModel from "../../models/responses";
import { Resolvers, SendHintInput, Team } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { createErrEvent } from "../../utils/eventLogHelpers";
import Twilio from "twilio";
import config from "../../config";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = config;
const client = Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

const responseResolver: Resolvers = {
  Query: {
    // getResponsesByHunt: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     createErrEvent({ location: "getResponsesByHunt", err });
    //   }
    // },
    // getResponsesByTeam: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     createErrEvent({ location: "", err });
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
        createErrEvent({ location: "markResponseCorrect", err });
        return false;
      }
    },
    sendHint: async (_, args: { input: SendHintInput }) => {
      try {
        let { response_id, team_id, hint_body } = args.input;
        const t_id = createBsonObjectId(team_id);
        const r_id = createBsonObjectId(response_id);
        await ResponseModel.updateOne({ _id: r_id }, { hintSent: true }).exec();

        const team: Team = await TeamModel.findOne({ _id: t_id }).exec();
        await client.messages.create({
          body: `${hint_body}`,
          from: `${TWILIO_NUMBER}`,
          to: team.device_number,
        });

        return true;
      } catch (err) {
        createErrEvent({ location: "sendHint", err });
        return false;
      }
    },
  },
};

export default responseResolver;
