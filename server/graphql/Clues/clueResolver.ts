import ClueModel from "../../models/clues";
import {
  Clue,
  CreateMultipleCluesInput,
  CreateMultTeamsInput,
  CreateSingleClueInput,
  CreateSingleTeamInput,
  Resolvers,
} from "../../generated/graphql";
import { BsonObjectId } from "../../utils/BsonObjectIdCreater";

const clueResolvers: Resolvers = {
  Query: {
    getCluesByHuntId: async (_, args: { id: string }) => {
      const h_id = BsonObjectId(args.id);
      return await ClueModel.aggregate([
        {
          $match: { hunt_id: h_id },
        },
        { $sort: { order_number: 1 } },
      ]).exec();
    },
  },
  Mutation: {
    createMultipleClues: async (
      _,
      args: { input: CreateMultipleCluesInput }
    ) => {
      const { cluesList } = args.input;
      const h_id = BsonObjectId(args.input.h_id);
      const mappedClues = cluesList.map((clue) => {
        return { hunt_id: h_id, ...clue };
      });
      await ClueModel.insertMany(mappedClues);
      return await ClueModel.find({ hunt_id: h_id }).exec();
    },
    createSingleClue: async (_, args: { input: CreateSingleClueInput }) => {
      const { clueItem } = args.input;
      const h_id = BsonObjectId(args.input.h_id);
      const clue = new ClueModel({
        hunt_id: h_id,
        ...clueItem,
      });
      await clue.save();
      return await ClueModel.find({ hunt_id: h_id }).exec();
    },
    // updateClueDescription: (_, args) => {},
    // updateClueOrder: (_, args) => {},
    // deleteClueById: (_, args) => {},
    // deleteAllCluesByHuntId: (_, args) => {},
  },
  Clue: {
    // responses: async () => {}
  },
};

export default clueResolvers;
