import { createBsonObjectId } from "../utils/createBsonObjectId";
import { createErrEvent } from "../utils/eventLogHelpers";
import HuntModel from "../models/hunts";
import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import { CreateHuntInput, Hunt } from "../generated/graphql";

const huntResolver = {
  Query: {
    getHuntsByUserId: async (_: unknown, args: { id: string }) => {
      try {
        const u_id = createBsonObjectId(args.id);
        return await HuntModel.find({ created_by: args.id })
          .sort({ created_date: 1 })
          .exec();
      } catch (err) {
        createErrEvent({ location: "getHuntsByUserId", err });
      }
    },
  },
  Mutation: {
    createHunt: async (_: unknown, args: { input: CreateHuntInput }) => {
      try {
        const { created_by, name, start_date, end_date } = args.input;
        const h_id = createBsonObjectId();
        const u_id = createBsonObjectId(created_by);
        const hunt = new HuntModel({
          _id: h_id,
          created_by: u_id,
          name,
          start_date,
          end_date,
        });
        await hunt.save();
        return await HuntModel.findOne({ _id: h_id }).exec();
      } catch (err) {
        createErrEvent({ location: "createHunt", err });
      }
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const clues = await ClueModel.find({
        hunt_id: h_id,
      }).exec();
      return clues;
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const teams = await TeamModel.find({
        hunt_id: h_id,
      }).exec();
      return teams;
    },
  },
};

export default huntResolver;
