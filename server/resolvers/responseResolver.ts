import config from "../config";
import { TeamModel } from "../models/teams";
import { ResponseModel } from "../models/responses";
import { Resolvers, ResponsePayload } from "../generated/graphql";
import { returnedItems } from "../utils/transforms/returnedItems";
import { markResponseCorrect } from "../utils/transforms/markResponseCorrect";
import { createBsonObjectId } from "../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";
import { withFilter } from "graphql-subscriptions";
import { mongodbPubSub } from "../utils/pubSub";
import { twilioClient } from "../utils/twilioClient";

const { TWILIO_NUMBER } = config;

export const RESPONSE_RECEIVED_TOPIC = "RESPONSE_RECEIVED_TOPIC";

const responseResolver: Resolvers = {
  Subscription: {
    responseReceived: {
      subscribe: withFilter<unknown, { hunt_id: string }>(
        () => mongodbPubSub.asyncIterator(RESPONSE_RECEIVED_TOPIC),
        async (payload, variables) => {
          console.log("payload: ", payload);
          console.log("variables: ", variables);
          try {
            const team_id = createBsonObjectId(
              (payload as ResponsePayload).team_id
            );
            const team = await TeamModel.findOne<{
              hunt_id: ReturnType<typeof createBsonObjectId>;
            }>(
              {
                _id: team_id,
              },
              "hunt_id"
            ).exec();

            return team?.hunt_id === variables?.hunt_id;
          } catch {
            return false;
          }
        }
      ),
    },
  },
  Query: {
    getResponsesByHunt: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const h_id = createBsonObjectId(id);
        const teams = await TeamModel.find({ hunt_id: h_id }, "_id").exec();

        const responses = await ResponseModel.find({
          team_id: { $in: teams },
        }).exec();

        return {
          count: responses.length || 0,
          responses: responses.map((res) => res.transformWithTypename()),
          __typename: "ResponsesByHunt" as const,
        };
      } catch (err) {
        return throwServerError({
          message: "",
          location: name?.value,
          err: new Object(err),
        });
      }
    },
    getResponsesByTeam: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const t_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({ team_id: t_id }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to find responses at this time.",
          location: name?.value,
          err,
        });
      }
    },
    getResponsesByClue: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const c_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({
          clue_id: c_id,
        }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to find responses at this time.",
          location: name?.value,
          err,
        });
      }
    },
  },
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
