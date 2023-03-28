import ClueModel from "../../models/clues";
import {
  CreateMultipleCluesInput,
  CreateSingleClueInput,
  Resolvers,
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
        const { clueItem } = args.input;
        const h_id = createBsonObjectId(args.input.h_id);
        const clue = new ClueModel({
          hunt_id: h_id,
          ...clueItem,
        });
        await clue.save();
        return await ClueModel.find({ hunt_id: h_id }).exec();
      } catch (err) {
        createErrEvent({ location: "createSingleClue", err });
      }
    },
    // updateClueDescription: (_, args) => {},
    // updateClueOrder: (_, args) => {},
    // deleteClueById: (_, args) => {},
    // deleteAllCluesByHuntId: (_, args) => {},
  },
  Clue: {
    // responses: async (parent: Clue) => {}
  },
};

export default clueResolvers;
