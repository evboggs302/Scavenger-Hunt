import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import HuntModel from "../models/hunts";
import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import { CreateHuntInput, Hunt, Resolvers } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";

export const huntResolver: Resolvers = {
  Query: {
    getHuntsByUserId: async (_: unknown, {}, { user }) => {
      try {
        const hunts = await HuntModel.find({ created_by: user._id })
          .sort({ created_date: 1 })
          .exec();

        return hunts.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "getHuntsByUserId", err });
      }
    },
  },
  Mutation: {
    createHunt: async (
      _: unknown,
      args: { input: CreateHuntInput },
      { user }
    ) => {
      try {
        const { name, start_date, end_date } = args.input;
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
            location: "createHunt",
            err: null,
            message: "Failed to create or find the specified hunt.",
          });
        }

        return createdHunt.toObject();
      } catch (err) {
        return throwResolutionError({ location: "createHunt", err });
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
