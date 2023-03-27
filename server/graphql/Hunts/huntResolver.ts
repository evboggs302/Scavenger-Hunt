import { BsonObjectId } from "../../utils/BsonObjectIdCreater";
import HuntModel from "../../models/hunts";
import ClueModel from "../../models/clues";
import TeamModel from "../../models/teams";
import {
  Clue,
  CreateHuntInput,
  Hunt,
  Resolvers,
  Team,
} from "../../generated/graphql";

const huntResolver: Resolvers = {
  // Query: {
  //   getCluesByHuntId: (_, args) => {},
  // },
  Mutation: {
    createHunt: async (_, args: { input: CreateHuntInput }) => {
      const { created_by, name, start_date, end_date } = args.input;
      const h_id = BsonObjectId();
      const u_id = BsonObjectId(created_by);
      const hunt = new HuntModel({
        _id: h_id,
        created_by: u_id,
        name,
        start_date,
        end_date,
      });
      await hunt.save();
      return await HuntModel.findOne({ _id: h_id }).exec();
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = BsonObjectId(parent._id);
      const clues: [Clue] = await ClueModel.find({
        hunt_id: h_id,
      }).exec();
      return clues;
    },
    teams: async (parent: Hunt) => {
      const h_id = BsonObjectId(parent._id);
      const teams: [Team] = await TeamModel.find({
        hunt_id: h_id,
      }).exec();
      return teams;
    },
  },
};

export default huntResolver;
