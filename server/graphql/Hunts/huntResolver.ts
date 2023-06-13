import { createBsonObjectId } from "../../utils/createBsonObjectId";
import HuntModel from "../../models/hunts";
import ClueModel from "../../models/clues";
import TeamModel from "../../models/teams";
import {
  CluePayload,
  CreateHuntInput,
  Hunt,
  Resolvers,
  Team,
} from "../../generated/graphql";

const huntResolver: Resolvers = {
  // Query: {
  //   getHuntsByUserId: (_, args) => {    //       try {
  //   } catch (err) {
  // createErrEvent({ location: "", err });
  // },
  // },
  Mutation: {
    createHunt: async (_, args: { input: CreateHuntInput }) => {
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
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const clues: [CluePayload] = await ClueModel.find({
        hunt_id: h_id,
      }).exec();
      return clues;
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const teams: [Team] = await TeamModel.find({
        hunt_id: h_id,
      }).exec();
      return teams;
    },
  },
};

export default huntResolver;
