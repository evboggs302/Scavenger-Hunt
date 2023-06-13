import ClueModel from "../../models/clues";
import ResponseModel from "../../models/responses";
import {
  CluePayload,
  CreateMultipleCluesInput,
  CreateSingleClueInput,
  Resolvers,
  UpdateClueDescriptionInput,
  UpdateClueOrderInput,
} from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { createErrEvent } from "../../utils/eventLogHelpers";

const clueResolvers: Resolvers = {
  Query: {
    getCluesByHuntId: async (_, args: { id: string }) => {
      try {
        const h_id = createBsonObjectId(args.id);
        return await ClueModel.aggregate([
          {
            $match: { hunt_id: h_id },
          },
          { $sort: { order_number: 1 } },
        ]).exec();
      } catch (err) {
        createErrEvent({ location: "getCluesByHuntId", err });
      }
    },
  },
  Mutation: {
    createMultipleClues: async (
      _,
      args: { input: CreateMultipleCluesInput }
    ) => {
      try {
        const { cluesList } = args.input;
        const h_id = createBsonObjectId(args.input.h_id);
        const mappedClues = cluesList.map((clue) => {
          return { hunt_id: h_id, ...clue };
        });

        await ClueModel.insertMany(mappedClues);

        return await ClueModel.find({ hunt_id: h_id }).exec();
      } catch (err) {
        createErrEvent({ location: "createMultipleClues", err });
      }
    },
    createSingleClue: async (_, args: { input: CreateSingleClueInput }) => {
      try {
        const { clueItem, h_id } = args.input;
        const hunt_id = createBsonObjectId(h_id);
        const clue = new ClueModel({
          hunt_id,
          ...clueItem,
        });
        await clue.save();

        return await ClueModel.find({ hunt_id }).exec();
      } catch (err) {
        createErrEvent({ location: "createSingleClue", err });
      }
    },
    updateClueDescription: async (
      _,
      args: { input: UpdateClueDescriptionInput }
    ) => {
      try {
        const { clue_id, newDescription } = args.input;
        const _id = createBsonObjectId(clue_id);

        return await ClueModel.updateOne(
          { _id },
          { description: newDescription }
        )
          .exec()
          .findOne({ _id })
          .exec();
      } catch (err) {
        createErrEvent({ location: "updateClueDescription", err });
      }
    },
    updateClueOrder: async (_, args: { input: UpdateClueOrderInput }) => {
      try {
        const { hunt_id: h_id, newOrder } = args.input;
        const hunt_id = createBsonObjectId(h_id);
        const bulkWriteArr = newOrder.map((id, index) => {
          return {
            updateOne: {
              filter: { _id: id },
              update: { $set: { order_number: index + 1 } },
            },
          };
        });

        await ClueModel.bulkWrite(bulkWriteArr, { ordered: false });

        return ClueModel.find({ hunt_id }).sort({ order_number: 1 }).exec();
      } catch (err) {
        createErrEvent({ location: "updateClueOrder", err });
      }
    },
    deleteClueById: async (_, args: { clue_id: string }) => {
      try {
        const { clue_id } = args;
        const _id = createBsonObjectId(clue_id);

        return await ClueModel.deleteOne({ _id });
      } catch (err) {
        createErrEvent({ location: "deleteClueById", err });
      }
    },
    deleteAllCluesByHuntId: async (_, args: { hunt_id: string }) => {
      try {
        const { hunt_id } = args;
        const _id = createBsonObjectId(hunt_id);

        return await ClueModel.deleteMany({ hunt_id: _id });
      } catch (err) {
        createErrEvent({ location: "deleteAllCluesByHuntId", err });
      }
    },
  },
  CluePayload: {
    responses: async (parent: CluePayload) => {
      try {
        const clue_id = createBsonObjectId(parent._id);
        return await ResponseModel.find({ clue_id });
      } catch (err) {
        createErrEvent({ location: "CluePayload.responses", err });
      }
    },
  },
};

export default clueResolvers;
