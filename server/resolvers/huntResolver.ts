import HuntModel from "../models/hunts";
import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import { Hunt, Resolvers } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { NotFoundError, UnknownError } from "../utils/apolloErrorHandlers";
import { createDeleteResponse } from "../utils/createDeleteResponse";

export const huntResolver: Resolvers = {
  Query: {
    getHuntsByUserId: async (_: unknown, {}, { user }, { operation }) => {
      try {
        const hunts = await HuntModel.find({ created_by: user._id })
          .sort({ created_date: 1 })
          .exec();

        return hunts.map(returnedItems);
      } catch {
        const error = await UnknownError(
          "Unable to find hunts by user ID.",
          operation.name?.value
        );
        return [error];
      }
    },
    getHunt: async (_: unknown, { id }, _ctxt, { operation }) => {
      try {
        const hunt = await HuntModel.findById(id).exec();

        if (!hunt) {
          return await NotFoundError(
            "Failed to find the specified hunt.",
            operation.name?.value
          );
        }

        return hunt.toObject();
      } catch {
        return await UnknownError(
          "Unable to find the specified hunt at this time.",
          operation.name?.value
        );
      }
    },
    // activateHunt: async (_: unknown, { id }) => {},
    // deactivateHunt: async (_: unknown, { id }) => {},
    deleteAllHuntsByUser: async (_: unknown, {}, { user }, { operation }) => {
      try {
        const { deletedCount } = await HuntModel.deleteMany({
          created_by: user._id,
        }).exec();

        return createDeleteResponse(deletedCount > 0);
      } catch {
        return await UnknownError(
          "Unable to delete hunts at this time.",
          operation.name?.value
        );
      }
    },
  },
  Mutation: {
    createHunt: async (
      _: unknown,
      { input: { name, start_date, end_date } },
      { user },
      { operation }
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
          return await NotFoundError(
            "Failed to find the newly created hunt.",
            operation.name?.value
          );
        }

        return createdHunt.toObject();
      } catch {
        return await UnknownError(
          "Unable to create hunts at this time.",
          operation.name?.value
        );
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
      { operation }
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
          return await NotFoundError(
            "Failed to find the updated hunt.",
            operation.name?.value
          );
        }

        return hunt.toObject();
      } catch {
        return await UnknownError(
          "Unable to update hunts at this time.",
          operation.name?.value
        );
      }
    },
    deleteHuntById: async (_: unknown, { h_id }, _ctxt, { operation }) => {
      try {
        const _id = createBsonObjectId(h_id);
        const { deletedCount } = await HuntModel.deleteOne({ _id }).exec();

        return createDeleteResponse(deletedCount === 1);
      } catch {
        return await UnknownError(
          "Unable to delete hunts at this time.",
          operation.name?.value
        );
      }
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const clues = await ClueModel.find({
        hunt_id: h_id,
      }).exec();
      return clues.map(returnedItems);
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const teams = await TeamModel.find({
        hunt_id: h_id,
      }).exec();
      return teams.map(returnedItems);
    },
  },
};
