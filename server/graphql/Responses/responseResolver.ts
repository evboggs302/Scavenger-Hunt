import ResponseModel from "../../models/responses";
import { Resolvers, SendHintInput } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { createErrEvent } from "../../utils/eventLogHelpers";
import Twilio from "twilio";
import config from "../../config";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = config;
const client = Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

const responseResolver: Resolvers = {
  Query: {
    // getResponsesByTeam: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     createErrEvent({ location: "", err });
    //   }
    // },
  },
  Mutation: {
    // markResponseCorrect: async (parent, args) => {
    //   try {
    //   } catch (err) {
    //     createErrEvent({ location: "", err });
    //   }
    // },
    sendHint: async (_, args: { input: SendHintInput }) => {
      try {
        let { response_id, team_id, hint_body } = args.input;
        const t_id = createBsonObjectId(team_id);
        const r_id = createBsonObjectId(response_id);
        await ResponseModel.updateOne({ _id: r_id }, { hintSent: true });

        // .then(() => {
        //           Team.findOne({ _id: t_id }).then((team, err) => {
        //             client.messages.create({
        //               body: `${hint_body}`,
        //               from: `${TWILIO_NUMBER}`,
        //               to: team.device_number,
        //             });
        //           });
        //         });

        return true;
      } catch (err) {
        createErrEvent({ location: "sendHint", err });
        return false;
      }
    },
  },
};

export default responseResolver;
