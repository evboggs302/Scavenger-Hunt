import config from "../../config";
import { TeamModel } from "../../models/teams";
import { ResponseModel } from "../../models/responses";
import { Resolvers } from "../../generated/graphql";
import { markResponseCorrect } from "../../utils/transforms/markResponseCorrect";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";
import { twilioClient } from "../../utils/twilioClient";

const { TWILIO_NUMBER } = config;

const responseResolver: Resolvers = {
  Mutation: {
    markResponseCorrect: async (
      _parent,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const { device_number, recall_message, team_id, next_clue } =
          await markResponseCorrect(id);

        if (next_clue) {
          const { description, order_number } = next_clue;

          await twilioClient.messages.create({
            body: `${description}`,
            from: `${TWILIO_NUMBER}`,
            to: device_number,
          });

          await TeamModel.findByIdAndUpdate(team_id, {
            last_clue_sent: order_number,
          }).exec();
        } else {
          await twilioClient.messages.create({
            body: `${recall_message}`,
            from: `${TWILIO_NUMBER}`,
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
    sendHint: async (
      _parent,
      { input: { response_id, team_id, hint_body } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const t_id = createBsonObjectId(team_id);
        const r_id = createBsonObjectId(response_id);
        const response = await ResponseModel.findOneAndUpdate(
          { _id: r_id },
          { hintSent: true },
          { new: true }
        );

        if (!response) {
          return throwResolutionError({
            message: "Unable to send a hint for this response.",
            location: name?.value,
          });
        }

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
            message: "No team exists for that number.",
            location: name?.value,
          });

        await twilioClient.messages.create({
          body: `${hint_body}`,
          from: `${TWILIO_NUMBER}`,
          to: activeTeam[0].device_number,
        });

        return true;
      } catch (err) {
        return throwServerError({
          message: "Unable to send hints at this time.",
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

export default { ...responseResolver };
