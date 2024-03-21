import ClueModel from "../models/clues";
import ResponseModel from "../models/responses";
import { returnedItems } from "../utils/returnedItems";
import { Clue, Resolvers } from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { NotFoundError, UnknownError } from "../utils/apolloErrorHandlers";
import { createDeleteResponse } from "../utils/createDeleteResponse";

export const clueResolver: Resolvers = {
  Query: {
    getCluesByHuntId: async (_: unknown, { id }, _ctxt, { operation }) => {
      try {
        const h_id = createBsonObjectId(id);
        const orderedClues = await ClueModel.aggregate([
          {
            $match: { hunt_id: h_id },
          },
          { $sort: { order_number: 1 } },
        ]).exec();
        return orderedClues;
      } catch {
        const error = await UnknownError(
          "Unable to find clues by hunt.",
          operation.name?.value
        );
        return [error];
      }
    },
  },
  Mutation: {
    createMultipleClues: async (
      _: unknown,
      { input: { cluesList, h_id } },
      _ctxt,
      { operation }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedClues = cluesList.map((clue) => {
          return { hunt_id, ...clue };
        });

        await ClueModel.insertMany(mappedClues);
        const clues = await ClueModel.find({ hunt_id }).exec();

        return clues.map(returnedItems);
      } catch {
        const error = await UnknownError(
          "Unable to create multiple clues at this time.",
          operation.name?.value
        );
        return [error];
      }
    },
    createSingleClue: async (
      _: unknown,
      { input: { clueItem, h_id } },
      _ctxt,
      { operation }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const clue = new ClueModel({
          hunt_id,
          ...clueItem,
        });
        await clue.save();

        const allClues = await ClueModel.find({ hunt_id }).exec();
        return allClues.map(returnedItems);
      } catch {
        const error = await UnknownError(
          "Unable to create that clue at this time.",
          operation.name?.value
        );
        return [error];
      }
    },
    updateClueDescription: async (
      _: unknown,
      { input: { clue_id, newDescription } },
      _ctxt,
      { operation }
    ) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const updatedClue = await ClueModel.findOneAndUpdate(
          { _id },
          { description: newDescription },
          { new: true }
        ).exec();

        if (!updatedClue) {
          return await NotFoundError(
            "Failed to update or find the specified clue.",
            operation.name?.value
          );
        }

        return {
          __typename: "Clue",
          ...updatedClue.toObject(),
        };
      } catch {
        return await UnknownError(
          "Unable to update clue description at this time.",
          operation.name?.value
        );
      }
    },
    updateClueOrder: async (
      _: unknown,
      { input: { hunt_id: h_id, newOrder } },
      _ctxt,
      { operation }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const bulkWriteArr = newOrder.map((id, index) => {
          return {
            updateOne: {
              filter: { _id: createBsonObjectId(id) },
              update: { $set: { order_number: index + 1 } },
            },
          };
        });

        await ClueModel.bulkWrite(bulkWriteArr, { ordered: false });
        const orderedClues = await ClueModel.find({ hunt_id })
          .sort({ order_number: 1 })
          .exec();

        return orderedClues.map(returnedItems);
      } catch {
        const error = await UnknownError(
          "Unable to update the clue order at this time.",
          operation.name?.value
        );
        return [error];
      }
    },
    deleteClueById: async (_: unknown, { clue_id }, _ctxt, { operation }) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const clue = await ClueModel.findById(_id).exec();

        if (!clue) {
          return await NotFoundError(
            "No clue found to be deleted.",
            operation.name?.value
          );
        }
        const { deletedCount } = await ClueModel.deleteOne({ _id }).exec();

        const { hunt_id } = clue;
        const orderedClues = await ClueModel.aggregate([
          {
            $match: { hunt_id: hunt_id },
          },
          { $sort: { order_number: 1 } },
        ]).exec();

        const bulkWriteArr = orderedClues.map((clu, index) => {
          return {
            updateOne: {
              filter: { _id: clu._id },
              update: { $set: { order_number: index + 1 } },
            },
          };
        });

        await ClueModel.bulkWrite(bulkWriteArr, { ordered: false });

        return createDeleteResponse(deletedCount === 1);
      } catch {
        return await UnknownError(
          "Unable to delete specified clue",
          operation.name?.value
        );
      }
    },
    deleteAllCluesByHuntId: async (
      _: unknown,
      { hunt_id },
      _ctxt,
      { operation }
    ) => {
      try {
        const _id = createBsonObjectId(hunt_id);
        const { deletedCount } = await ClueModel.deleteMany({
          hunt_id: _id,
        }).exec();

        return createDeleteResponse(deletedCount > 0);
      } catch {
        return await UnknownError(
          "Unable to find the newly saved user",
          operation.name?.value
        );
      }
    },
  },
  Clue: {
    responses: async (parent: Clue) => {
      const clue_id = createBsonObjectId(parent._id);
      return await ResponseModel.find({ clue_id });
    },
  },
};
