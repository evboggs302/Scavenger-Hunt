import { Resolvers } from "@generated/graphql";
import { TeamModel } from "@models/teams";
import { ResponseModel } from "@models/responses";
import { markResponseCorrect } from "@utils/transforms/markResponseCorrect";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { throwServerError } from "@utils/apolloErrorHandlers";
import { twilioClient } from "@utils/twilioClient";
import { sendHint } from "../sendHint";

const resolver: Resolvers = {
  Mutation: {
    sendHint,
    markResponseCorrect: async (
      _parent,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const {
          device_number,
          recall_message,
          team_id,
          next_clue,
          twilio_number,
        } = await markResponseCorrect(id);

        if (next_clue) {
          const { description, order_number } = next_clue;

          await twilioClient.messages.create({
            body: `${description}`,
            from: `${twilio_number}`,
            to: device_number,
          });

          await TeamModel.findByIdAndUpdate(team_id, {
            last_clue_sent: order_number,
          }).exec();
        } else {
          await twilioClient.messages.create({
            body: `${recall_message}`,
            from: `${twilio_number}`,
            to: device_number,
          });

          await TeamModel.findByIdAndUpdate(team_id, {
            recall_sent: true,
          }).exec();
        }

        return true;
      } catch (err) {
        return throwServerError({
          message: "Unable to mark response as correct.",
          location: name?.value,
          err,
        });
      }
    },

    deleteAllResponsesByHunt: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(id);

        const teams = await TeamModel.find<{ _id: typeof hunt_id }>(
          { hunt_id },
          "_id"
        ).exec();

        const { acknowledged } = await ResponseModel.deleteMany({
          team_id: { $in: teams },
        }).exec();

        return acknowledged;
      } catch {
        return throwServerError({
          location: name?.value,
          message: "There was a problem deleing responses by hunt.",
        });
      }
    },
    deleteAllResponsesByTeam: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const team_id = createBsonObjectId(id);

        const { acknowledged } = await ResponseModel.deleteMany({
          team_id,
        }).exec();

        return acknowledged;
      } catch {
        return throwServerError({
          location: name?.value,
          message: "There was a problem deleing responses by team.",
        });
      }
    },
  },
};

export default { ...resolver };
