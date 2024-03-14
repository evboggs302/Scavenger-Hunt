import ClueModel from "../models/clues";
import ResponseModel from "../models/responses";
import {
  CluePayload,
  CreateMultipleCluesInput,
  CreateSingleClueInput,
  Resolvers,
  UpdateClueDescriptionInput,
  UpdateClueOrderInput,
} from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import { returnedItems } from "../utils/returnedItems";

export const clueResolver: Resolvers = {
  Query: {
    getCluesByHuntId: async (_: unknown, args: { id: string }) => {
      try {
        const h_id = createBsonObjectId(args.id);
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
    // getNextClue: async () => {},
  },
  Mutation: {
    createMultipleClues: async (
      _: unknown,
      args: { input: CreateMultipleCluesInput }
    ) => {
      try {
        const { cluesList } = args.input;
        const h_id = createBsonObjectId(args.input.h_id);
        const mappedClues = cluesList.map((clue) => {
          return { hunt_id: h_id, ...clue };
        });

        await ClueModel.insertMany(mappedClues);
        const clues = await ClueModel.find({ hunt_id: h_id }).exec();

        return clues.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "createMultipleClues", err });
      }
    },
    createSingleClue: async (
      _: unknown,
      args: { input: CreateSingleClueInput }
    ) => {
      try {
        const { clueItem, h_id } = args.input;
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
      args: { input: UpdateClueDescriptionInput }
    ) => {
      try {
        const { clue_id, newDescription } = args.input;
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
      args: { input: UpdateClueOrderInput }
    ) => {
      try {
        const { hunt_id: h_id, newOrder } = args.input;
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
    deleteClueById: async (_: unknown, args: { clue_id: string }) => {
      try {
        const { clue_id } = args;
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

          return deletedCount === 1 ;
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
    deleteAllCluesByHuntId: async (_: unknown, args: { hunt_id: string }) => {
      try {
        const { hunt_id } = args;
        const _id = createBsonObjectId(hunt_id);
        const { deletedCount } = await ClueModel.deleteMany({
          hunt_id: _id,
        }).exec();
        console.log(deletedCount);
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
