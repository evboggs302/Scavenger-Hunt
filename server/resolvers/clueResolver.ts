import ClueModel from "../models/clues";
import ResponseModel from "../models/responses";
import { CluePayload, Resolvers } from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import { returnedItems } from "../utils/returnedItems";

export const clueResolver: Resolvers = {
  Query: {
    getCluesByHuntId: async (_: unknown, { id }) => {
      try {
        const h_id = createBsonObjectId(id);
        const orderedClues = await ClueModel.aggregate([
          {
            $match: { hunt_id: h_id },
          },
          { $sort: { order_number: 1 } },
        ]).exec();
        return orderedClues;
      } catch (err) {
        return throwResolutionError({ location: "getCluesByHuntId", err });
      }
    },
  },
  Mutation: {
    createMultipleClues: async (_: unknown, { input: { cluesList, h_id } }) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedClues = cluesList.map((clue) => {
          return { hunt_id, ...clue };
        });

        await ClueModel.insertMany(mappedClues);
        const clues = await ClueModel.find({ hunt_id }).exec();

        return clues.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "createMultipleClues", err });
      }
    },
    createSingleClue: async (_: unknown, { input: { clueItem, h_id } }) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const clue = new ClueModel({
          hunt_id,
          ...clueItem,
        });
        await clue.save();

        const allClues = await ClueModel.find({ hunt_id }).exec();
        return allClues.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "createSingleClue", err });
      }
    },
    updateClueDescription: async (
      _: unknown,
      { input: { clue_id, newDescription } }
    ) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const updatedClue = await ClueModel.findOneAndUpdate(
          { _id },
          { description: newDescription },
          { new: true }
        ).exec();

        if (!updatedClue) {
          return throwResolutionError({
            location: "updateClueDescription",
            err: null,
            message: "Failed to update or find the specified clue description.",
          });
        }

        return updatedClue.toObject();
      } catch (err) {
        return throwResolutionError({ location: "updateClueDescription", err });
      }
    },
    updateClueOrder: async (
      _: unknown,
      { input: { hunt_id: h_id, newOrder } }
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
      } catch (err) {
        return throwResolutionError({ location: "updateClueOrder", err });
      }
    },
    deleteClueById: async (_: unknown, { clue_id }) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const clue = await ClueModel.findById(_id).exec();

        if (clue) {
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

          return deletedCount === 1;
        } else {
          return throwResolutionError({
            location: "deleteClueById",
            err: null,
          });
        }
      } catch (err) {
        return throwResolutionError({ location: "deleteClueById", err });
      }
    },
    deleteAllCluesByHuntId: async (_: unknown, { hunt_id }) => {
      try {
        const _id = createBsonObjectId(hunt_id);
        const { deletedCount } = await ClueModel.deleteMany({
          hunt_id: _id,
        }).exec();

        return deletedCount > 0;
      } catch (err) {
        return throwResolutionError({
          location: "deleteAllCluesByHuntId",
          err,
        });
      }
    },
  },
  CluePayload: {
    responses: async (parent: CluePayload) => {
      try {
        const clue_id = createBsonObjectId(parent._id);
        return await ResponseModel.find({ clue_id });
      } catch (err) {
        return throwResolutionError({ location: "CluePayload.responses", err });
      }
    },
  },
};
