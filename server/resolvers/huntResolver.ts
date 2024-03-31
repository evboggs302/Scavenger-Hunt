import HuntModel from "../models/hunts";
import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import { Hunt, Resolvers } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";

export const huntResolver: Resolvers = {
  Query: {
    getHuntsByUserId: async (
      _: unknown,
      _args,
      { user },
      { operation: { name } }
    ) => {
      try {
        const hunts = await HuntModel.find({ created_by: user._id })
          .sort({ created_date: 1 })
          .exec();

        return hunts.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to get hunts at this time.",
          location: name?.value,
          err,
        });
      }
    },
    getHunt: async (_: unknown, { id }, _ctxt, { operation: { name } }) => {
      try {
        const hunt = await HuntModel.findById(id).exec();

        if (!hunt) {
          return throwResolutionError({
            location: name?.value,
            message: "Unable to find hunt.",
          });
        }

        return hunt.toObject();
      } catch (err) {
        return throwServerError({
          message: "Unable to get hunts at the moment",
          location: name?.value,
          err,
        });
      }
    },
    // activateHunt: async (_: unknown, { id }) => {},
    // deactivateHunt: async (_: unknown, { id }) => {},
    deleteAllHuntsByUser: async (
      _: unknown,
      _args,
      { user },
      { operation: { name } }
    ) => {
      try {
        const { deletedCount } = await HuntModel.deleteMany({
          created_by: user._id,
        }).exec();

        return deletedCount > 0;
      } catch (err) {
        return throwServerError({
          message: "Unable to delete hunts at the moment.",
          location: name?.value,
          err,
        });
      }
    },
  },
  Mutation: {
    createHunt: async (
      _: unknown,
      { input: { name, start_date, end_date } },
      { user },
      { operation: { name: opname } }
    ) => {
      try {
        const h_id = createBsonObjectId();
        const hunt = new HuntModel({
          _id: h_id,
          created_by: user._id,
          name,
          start_date,
          end_date,
        });
        await hunt.save();

        const createdHunt = await HuntModel.findOne({ _id: h_id }).exec();
        if (!createdHunt) {
          return throwResolutionError({
            message: "Failed to create or find the specified hunt.",
            location: opname?.value,
          });
        }

        return createdHunt.toObject();
      } catch (err) {
        return throwServerError({
          message: "Unable to create hunts at the moment.",
          location: opname?.value,
          err,
        });
      }
    },
    updateHunt: async (
      _: unknown,
      {
        input: {
          hunt_id,
          start_date: newStart,
          end_date: newEnd,
          recall_message: newRecall,
        },
      },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(hunt_id);

        // @ts-expect-error
        const formattedStart = new Date(newStart);
        // @ts-expect-error
        const formattedEnd = new Date(newEnd);

        const hunt = await HuntModel.findOneAndUpdate(
          { _id },
          [
            {
              $set: {
                start_date: {
                  $cond: [
                    {
                      $and: [
                        newStart,
                        { $ne: [formattedStart, "$start_date"] },
                      ],
                    },
                    newStart,
                    "$start_date",
                  ],
                },
              },
            },
            {
              $set: {
                end_date: {
                  $cond: [
                    {
                      $and: [newEnd, { $ne: [formattedEnd, "$end_date"] }],
                    },
                    newEnd,
                    "$end_date",
                  ],
                },
              },
            },
            {
              $set: {
                recall_message: {
                  $cond: [
                    {
                      $and: [newRecall, { $ne: [newRecall, "$recallMessage"] }],
                    },
                    newRecall,
                    "$recallMessage",
                  ],
                },
              },
            },
          ],
          { new: true }
        );

        if (!hunt) {
          return throwResolutionError({
            message: "No hunt found to update.",
            location: name?.value,
          });
        }

        return hunt.toObject();
      } catch (err) {
        return throwServerError({
          message: "Unable to update hunts at this time.",
          location: name?.value,
          err,
        });
      }
    },
    deleteHuntById: async (
      _: unknown,
      { h_id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(h_id);
        const { deletedCount } = await HuntModel.deleteOne({ _id }).exec();

        return deletedCount === 1;
      } catch (err) {
        return throwServerError({
          message: "Unable to delete hunts at this time.",
          location: name?.value,
          err,
        });
      }
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      return await ClueModel.find({
        hunt_id: h_id,
      });
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      return await TeamModel.find({
        hunt_id: h_id,
      });
    },
  },
};
