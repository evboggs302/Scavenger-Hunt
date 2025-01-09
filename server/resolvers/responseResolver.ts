import twilio from "twilio";
import config from "../config";
import { TeamModel } from "../models/teams";
import { ResponseModel } from "../models/responses";
import { Resolvers } from "../generated/graphql";
import { returnedItems } from "../utils/transforms/returnedItems";
import { markResponseCorrect } from "../utils/transforms/markResponseCorrect";
import { createBsonObjectId } from "../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../utils/pubSub";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = config;

const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

const responseResolver: Resolvers = {
  Subscription: {
    responseReceived: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(["responseReceived"]),
        (payload, value) => {
          console.log(payload);
          console.log(value);
          return true;
        }
      ),
    },
  },
  Query: {
    getResponsesByHunt: async (
      _: unknown,
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
      _: unknown,
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
      _: unknown,
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
    markResponseCorrect: async (_, { id }, _ctxt, { operation: { name } }) => {
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
        return throwServerError({
          message: "Unable to mark response as correct.",
          location: name?.value,
          err,
        });
      }
    },
    sendHint: async (
      _,
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

        await client.messages.create({
          body: `${hint_body}`,
          from: `${TWILIO_NUMBER}`,
          to: activeTeam[0].device_number,
        });

        return true;
      } catch (err) {
        return throwServerError({
          message: "Unable to send hints at this time.",
          location: name?.value,
        });
      }
    },
  },
};

export default { ...responseResolver };
